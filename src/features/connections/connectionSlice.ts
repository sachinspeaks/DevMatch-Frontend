import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ApiUser } from "../user/userSlice";
import type { FeedUser } from "../feed/feedSlice";

const initialState: FeedUser[] = [];

const connectionSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {
    setConnections: (_state, action: PayloadAction<ApiUser[]>) =>
      action.payload.map(({ _id, ...rest }) => ({ id: _id, ...rest })),
    removeConnections: () => initialState,
  },
});

export const { setConnections, removeConnections } = connectionSlice.actions;

export default connectionSlice.reducer;
