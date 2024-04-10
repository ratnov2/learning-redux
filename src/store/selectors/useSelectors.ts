import { useAppSelector } from "../hooks/typed-dispatch-selector/hooks";

export const PostsSelector = () => useAppSelector((state) => state.posts);
export const CommentsByPostIdSelector = () =>
  useAppSelector((state) => state.posts.comments);
