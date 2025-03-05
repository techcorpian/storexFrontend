import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../../utils/Interfaces";
import axios from "axios";

interface ProjectState {
  allprojects: Project[],
  projects: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  allprojects: [],
  projects: [],
  loading: false,
  error: null,
};

const api = import.meta.env.VITE_API;

// Async thunk for fetching projects
export const fetchProjects = createAsyncThunk("projects/fetchProjects", async () => {
  const response = await axios.get<Project[]>(`${api}/api/project/`);
  return response.data;
});

// Fetch projects by id
export const fetchProjectsById = createAsyncThunk("folders/fetchProjectsById", async (id: string) => {
  const response = await axios.get<{ project: Project[] }>(`${api}/api/folder/getProjectById/${id}`);
  return response.data.project;
});

// Async thunk for adding a project
export const addProject = createAsyncThunk("projects/addProject", async (name: string) => {
  const response = await axios.post<Project>(`${api}/api/project/`, { name });
  return response.data;
});

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
        state.loading = false;
        state.allprojects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch projects";
      })
      .addCase(addProject.fulfilled, (state, action: PayloadAction<Project>) => {
        state.projects.push(action.payload);
      })
      .addCase(fetchProjectsById.fulfilled, (state, action) => {
        state.projects = action.payload;
      });
  },
});

export default projectSlice.reducer;
