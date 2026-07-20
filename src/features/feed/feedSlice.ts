import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ApiUser } from "../user/userSlice";

// Clean frontend shape — uses `id`, matches the rest of the app.
export interface FeedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age?: number;
  gender?: string;
  photoURL?: string;
  about?: string;
  skills?: string[];
}

const initialState: FeedUser[] = [];

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setFeed: (_state, action: PayloadAction<ApiUser[]>) =>
      action.payload.map(({ _id, ...rest }) => ({ id: _id, ...rest })),
    removeUserFromFeed: (state, action: PayloadAction<string>) =>
      state.filter((user) => user.id !== action.payload),
    clearFeed: () => initialState,
  },
});

export const { setFeed, removeUserFromFeed, clearFeed } = feedSlice.actions;

export default feedSlice.reducer;
