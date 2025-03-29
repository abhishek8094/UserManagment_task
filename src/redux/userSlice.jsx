import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_ENDPOINTS = {
  LOGIN: "/api/login",
  USERS: "/api/users?page=1",
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await getRequest(API_ENDPOINTS.USERS, userData);
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      return rejectWithValue(errorMessage);
    }

    return response.data.data;
  }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  await axios.delete(`https://reqres.in/api/users/${id}`);
  return id;
});

const userSlice = createSlice({
  name: "users",
  initialState: { users: [], status: null, error: null, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
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
      .addCase(deleteUser.pending, (state) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })

      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
