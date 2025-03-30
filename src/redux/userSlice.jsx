import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, putRequest, deleteRequest } from "../services/api";

const API_ENDPOINTS = {
  LOGIN: "/api/login",
  USERS: "api/users",
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRequest(API_ENDPOINTS.USERS);
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, ...data }, { rejectWithValue }) => {
    try {
      const response = await putRequest(`${API_ENDPOINTS.USERS}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      return rejectWithValue(errorMessage);
    }
  }
);

export const removeUser = createAsyncThunk(
  "users/removeUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await deleteRequest(`${API_ENDPOINTS.USERS}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      return rejectWithValue(errorMessage);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: { users: null, status: null, error: null, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })

      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeUser.pending, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })

      .addCase(removeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
