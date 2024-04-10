import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IComment,
  IPost,
  IPostWithouId,
} from "../../../api/services/post.types";
import { PostService } from "../../../api/services/post.service";
import { store } from "../../store";

interface IInitialState {
  posts: IPost[];
  comments: { [id: number]: IComment[] };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  postById: IPost | null;
}
const initialState: IInitialState = {
  posts: [],
  comments: {},
  status: "idle",
  postById: null,
  error: null,
};

const postsSlice = createSlice({
  initialState,
  name: "posts",
  reducers: {
    postAdded(state, action: PayloadAction<IPost[]>) {
      state.posts.push(...action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "error";
      });
    ///
    builder
      .addCase(getPostByID.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPostByID.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.postById = action.payload;
      })
      .addCase(getPostByID.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "error";
      })
      //
      .addCase(getCommenstByPostID.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCommenstByPostID.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments[action.payload[0].postId] = action.payload;
      })
      .addCase(getCommenstByPostID.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "error";
      });
    //
    builder.addCase(addPost.fulfilled, (state, action) => {
      state.posts.push(action.payload);
    });
    //
    builder.addCase(changePostById.fulfilled, (state, action) => {
      state.posts = state.posts.map((post) => {
        if (action.payload.id === post.id) return action.payload;
        return post;
      });
    });
    //
    builder.addCase(deletePostById.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload.id);
    });
  },
});

export const { postAdded } = postsSlice.actions;

export const getPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await PostService.getPosts();
  return response;
});
export const getPostByID = createAsyncThunk(
  "posts/getById",
  async (postId: string) => {
    const response = await PostService.getById(postId);
    return response;
  }
);
export const getCommenstByPostID = createAsyncThunk(
  "posts/getCommentsByPostId",
  async (postId: number) => {
    const response = await PostService.getCommentsByPostId(postId);
    return response;
  }
);

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (data: IPostWithouId) => {
    const response = await PostService.addPost(data);
    return response;
  }
);
export const changePostById = createAsyncThunk(
  "posts/changePostById",
  async (data: IPost) => {
    const response = await PostService.changePostById(data);
    return response;
  }
);
export const deletePostById = createAsyncThunk(
  "posts/deletePostById",
  async (id: number) => {
    const response = await PostService.deletePostById(id);
    return { id };
    return response;
  }
);
export default postsSlice.reducer;
