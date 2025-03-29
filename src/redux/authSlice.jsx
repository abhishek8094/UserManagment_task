import { postRequest, setToken } from "../services/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const API_ENDPOINTS = {
  LOGIN: "api/login ",
};

export const appLogin = createAsyncThunk(
  "auth/appLogin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await postRequest(API_ENDPOINTS.LOGIN, data);
      const token = response.token || response.data?.token;
      setToken(token);
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch auth data"
      );
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(appLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(appLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(appLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
