import { configureStore } from "@reduxjs/toolkit";

import PostReducer from "./slices/post/PostSlice";

export const store = configureStore({
  reducer: {
    posts: PostReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch