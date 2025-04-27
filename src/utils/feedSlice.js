// src/utils/feedSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./constants";

// Async thunk to fetch feed users
export const fetchFeedUsers = createAsyncThunk(
  'feed/fetchFeedUsers',
  async (page = 1, { rejectWithValue }) => {
    try {
      // FIXED URL: /user/feed
      const res = await axios.get(BASE_URL + `user/feed?page=${page}&limit=10`, {
        withCredentials: true,
      });
      console.log(res.data.users)
      return res.data.users;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    users: [],
    loading: false,
    error: null,
    page: 1,
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    clearFeed(state) {
      state.users = [];
      state.loading = false;
      state.error = null;
      state.page = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchFeedUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setPage, clearFeed } = feedSlice.actions;
export default feedSlice.reducer;
