import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Folder, File, Breadcrumbs } from "../../utils/Interfaces";
import axios from "axios";

const api = import.meta.env.VITE_API;

interface FolderState {
  allfolders: Folder[];
  folders: Folder[];
  files: File[];
  breadcrumbs: Breadcrumbs[];
  selectedItems: string[];
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: FolderState = {
  allfolders: [],
  folders: [],
  files: [],
  breadcrumbs: [],
  selectedItems: [],
  loading: false,
  error: null,
};

// Async Actions (Thunks)

export const fetchFolders = createAsyncThunk("folders/fetchFolders", async () => {
  const response = await axios.get<Folder[]>(`${api}/api/folder/`);
  return response.data;
});

export const fetchFoldersById = createAsyncThunk("folders/fetchFoldersById", async (id: string) => {
  const response = await axios.get<{ folder: Folder[] }>(`${api}/api/folder/getFolderById/${id}`);
  return response.data.folder;
});

export const fetchFilesById = createAsyncThunk("files/fetchFilesById", async (id: string) => {
  const response = await axios.get<{ file: File[] }>(`${api}/api/file/getFileById/${id}`);
  return response.data.file;
});

export const fetchBreadcrumbsById = createAsyncThunk("breadcrumbs/fetchBreadcrumbsById", async (id: string) => {
  const response = await axios.get<{ breadcrumbs: Breadcrumbs[] }>(`${api}/api/folder/getBreadcrumbsById/${id}`);
  return response.data.breadcrumbs;
});

export const createFolder = createAsyncThunk("folders/createFolder", async ({ name, masterId }: { name: string; masterId: string }) => {
  await axios.post(`${api}/api/folder/`, { name, master_id: masterId });
  // console.log('folder')
});

export const createFile = createAsyncThunk("files/createFile", async ({ name, folderId }: { name: string; folderId: string }) => {
  await axios.post(`${api}/api/file/`, { name, folder_id: folderId });
});

export const deleteSelectedItems = createAsyncThunk("folders/deleteSelectedItems", async (selectedItems: string[]) => {
  await axios.post(`${api}/api/folder/deleteBulk`, { items: selectedItems });
  return selectedItems;
});

// Slice
const folderSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    toggleSelectItem: (state, action: PayloadAction<string>) => {
      if (state.selectedItems.includes(action.payload)) {
        state.selectedItems = state.selectedItems.filter((id) => id !== action.payload);
      } else {
        state.selectedItems.push(action.payload);
      }
    },
    clearSelectedItems: (state) => {
      state.selectedItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFolders.fulfilled, (state, action) => {
        state.allfolders = action.payload;
      })
      .addCase(fetchFoldersById.fulfilled, (state, action) => {
        state.folders = action.payload;
      })
      .addCase(fetchFilesById.fulfilled, (state, action) => {
        state.files = action.payload;
      })
      .addCase(fetchBreadcrumbsById.fulfilled, (state, action) => {
        state.breadcrumbs = action.payload;
      })
      .addCase(deleteSelectedItems.fulfilled, (state, action) => {
        state.folders = state.folders.filter((folder) => !action.payload.includes(folder._id!));
        state.files = state.files.filter((file) => !action.payload.includes(file._id!));
        state.selectedItems = [];
      });
  },
});

export const { toggleSelectItem, clearSelectedItems } = folderSlice.actions;
export default folderSlice.reducer;
