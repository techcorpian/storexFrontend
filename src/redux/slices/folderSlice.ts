import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = import.meta.env.VITE_API

export const createFolder = createAsyncThunk('/folder', async (payload: { name: string; master_id: string }) => {
    const response = await axios.post(`${api}/api/folder`, payload);
    return response.data.token;
  });

  export const createFile = createAsyncThunk('/folder', async (payload: { name: string; folder_id: string }) => {
    const response = await axios.post(`${api}/api/file`, payload);
    return response.data.token;
  });