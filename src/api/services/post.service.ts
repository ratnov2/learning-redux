import { request } from "../request.api";
import { IComment, IPost, IPostWithouId } from "./post.types";

export const PostService = {
  async getPosts() {
    const response = await request<IPost[]>({ url: "posts", method: "GET" });
    return response;
  },
  async getById(id: string) {
    const response = await request<IPost>({
      url: `posts/${id}`,
      method: "GET",
    });
    return response;
  },
  async addPost(data: IPostWithouId) {
    const response = await request<IPost>({
      url: `posts`,
      method: "POST",
      data,
    });
    return response;
  },
  async changePostById(data: IPost) {
    const response = await request<IPost>({
      url: `posts/${data.id}`,
      method: "PUT",
      data,
    });
    return response;
  },
  async deletePostById(id: number) {
    const response = await request<{ id: string }>({
      url: `posts/${id}`,
      method: "DELETE",
    });
    return { id };
  },
  async getCommentsByPostId(id: number) {
    const response = await request<IComment[]>({
      url: `posts/${id}/comments`,
      method: "GET",
    });
    return response;
  },
};
