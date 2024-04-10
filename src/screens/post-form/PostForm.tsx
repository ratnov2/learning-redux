import { Box, Button, TextField, Typography } from "@mui/material";
import { useAppDispatch } from "../../store/hooks/typed-dispatch-selector/hooks";
import { addPost } from "../../store/slices/post/PostSlice";
import { useState } from "react";

export const PostForm = () => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const canSave =
    [title, body, userId].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        await dispatch(
          addPost({ title, body, userId: Number(userId) })
        ).unwrap();
        setTitle("");
        setBody("");
        setUserId("");
      } catch (err) {
        console.error("Failed to save the post: ", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    <Box sx={{ alignItems: "center", display: "flex" }}>
      <Typography
        sx={{ display: "inline" }}
        component="span"
        variant="body2"
        color="text.primary"
      >
        Add POST
      </Typography>
      <Button onClick={onSavePostClicked}>ADD POST</Button>
      <TextField
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        placeholder="value"
      />
      <TextField
        value={body}
        onChange={(e) => setBody(e.currentTarget.value)}
        placeholder="body"
      />
      <TextField
        value={userId}
        onChange={(e) => setUserId(e.currentTarget.value)}
        placeholder="userID"
      />
    </Box>
  );
};
