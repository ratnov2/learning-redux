import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import {
  useAppDispatch,
  useAppSelector,
} from "../store/hooks/typed-dispatch-selector/hooks";

import {
  CommentsByPostIdSelector,
  PostsSelector,
} from "../store/selectors/useSelectors";
import { Fragment, useEffect, useState } from "react";
import {
  getCommenstByPostID,
  getPostByID,
  getPosts,
} from "../store/slices/post/PostSlice";
import { PostForm } from "./post-form/PostForm";
import { CommentItem } from "./comment-item/ui";
import { PostItem } from "./post-item/ui";

export const Home = () => {
  const dispatch = useAppDispatch();
  const posts = PostsSelector();

  useEffect(() => {
    if (posts.status === "idle") {
      dispatch(getPosts());
    }
  }, []);

  const [postId, setPostId] = useState("");
  return (
    <>
      <Box sx={{ alignItems: "center", display: "flex" }}>
        <Typography
          sx={{ display: "inline" }}
          component="span"
          variant="body2"
          color="text.primary"
        >
          Get POST BY ID
        </Typography>
        <Button onClick={() => dispatch(getPostByID(postId))}>Get By Id</Button>
        <TextField
          value={postId}
          onChange={(e) => setPostId(e.currentTarget.value)}
        />
      </Box>
      <PostForm />
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {posts.posts.map((post) => (
          <PostItem {...post} />
        ))}
      </List>
    </>
  );
};
