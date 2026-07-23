import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ApiUser } from "../user/userSlice";
import type { FeedUser } from "../feed/feedSlice";

// Status values the backend uses for a connection request.
export type RequestStatus = "ignore" | "interested" | "accepted" | "rejected";

// Shape of a connection request as returned by the API. For received
// requests, `fromUserId` is populated with the full sender user object.
export interface ApiConnectionRequest {
  _id: string;
  fromUserId: ApiUser;
  toUserId: string;
  status: RequestStatus;
  createdAt?: string;
  updatedAt?: string;
}

// Clean frontend shape — uses `id`, and flattens the populated sender.
export interface ConnectionRequest {
  id: string;
  status: RequestStatus;
  fromUser: FeedUser;
}

const initialState: ConnectionRequest[] = [];

const requestSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    setRequests: (_state, action: PayloadAction<ApiConnectionRequest[]>) =>
      action.payload.map(({ _id, status, fromUserId }) => {
        const { _id: fromId, ...rest } = fromUserId;
        return { id: _id, status, fromUser: { id: fromId, ...rest } };
      }),
    removeRequest: (state, action: PayloadAction<string>) =>
      state.filter((request) => request.id !== action.payload),
    clearRequests: () => initialState,
  },
});

export const { setRequests, removeRequest, clearRequests } =
  requestSlice.actions;

export default requestSlice.reducer;
