import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/userSlice";
import feedReducer from "@/features/feed/feedSlice";
import connectionReducer from "@/features/connections/connectionSlice";
import requestReducer from "@/features/requests/requestSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
    requests: requestReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
