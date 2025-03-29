import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getRequest } from "../services/api";

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

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  await axios.delete(`https://reqres.in/api/users/${id}`);
  return id;
});

const userSlice = createSlice({
  name: "users",
  initialState: { users: null , status: null, error: null, loading: false },
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
      .addCase(deleteUser.pending, (state, action) => {
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
