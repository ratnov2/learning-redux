import {
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment } from "react/jsx-runtime";
import {
  CommentsByPostIdSelector,
  PostsSelector,
} from "../../store/selectors/useSelectors";
import { FC, useState } from "react";
import { IPost } from "../../api/services/post.types";
import { CommentItem } from "../comment-item/ui";
import {
  changePostById,
  deletePostById,
  getCommenstByPostID,
} from "../../store/slices/post/PostSlice";
import { useAppDispatch } from "../../store/hooks/typed-dispatch-selector/hooks";

export const PostItem: FC<IPost> = ({ id, body, title, userId }) => {
  const comments = CommentsByPostIdSelector();
  const dispatch = useAppDispatch();
  const [isEditable, setIsEditable] = useState(false);

  const [stateTitle, setTitle] = useState(title);
  const [stateBody, setBody] = useState(body);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const onChangePost = async () => {
    if (addRequestStatus === "idle") {
      try {
        setAddRequestStatus("pending");
        const data: IPost = {
          title: stateTitle,
          body: stateBody,
          id,
          userId,
        };
        await dispatch(changePostById(data)).unwrap();
      } catch (error) {
        console.log("error:", error);
      } finally {
        setAddRequestStatus("idle");
        setIsEditable(false);
      }
    }
  };

  return (
    <ListItem
      alignItems="flex-start"
      key={id}
      sx={{
        border: "orangered",
        borderStyle: "solid",
        borderBlockWidth: 2,
        borderRadius: "20px",
        marginBottom: 1,
      }}
    >
      <ListItemText
        primary={id}
        secondary={
          !isEditable ? (
            <Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
                onClick={() => setIsEditable(true)}
              >
                {title}
              </Typography>
              {body}
            </Fragment>
          ) : (
            <>
              <TextField
                value={stateTitle}
                onChange={(e) => setTitle(e.currentTarget.value)}
                placeholder="stateTitle"
              />
              <TextField
                value={stateBody}
                onChange={(e) => setBody(e.currentTarget.value)}
                placeholder="stateBody"
              />
              <Button onClick={onChangePost}>Set Change</Button>
            </>
          )
        }
      />
      <Button onClick={() => dispatch(getCommenstByPostID(id))}>
        Get Comment By Id
      </Button>
      <Button
        onClick={() => dispatch(deletePostById(id))}
        sx={{ color: "red" }}
      >
        Delete
      </Button>
      {comments[id] !== undefined && (
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          {comments[id].map((comment) => (
            <CommentItem {...comment} />
          ))}
        </List>
      )}
    </ListItem>
  );
};
