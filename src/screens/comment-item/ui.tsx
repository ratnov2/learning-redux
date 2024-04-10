import { ListItem, ListItemText, Typography } from "@mui/material";
import { FC, Fragment } from "react";
import { IComment } from "../../api/services/post.types";

export const CommentItem: FC<IComment> = ({
  body,
  email,
  id,
  name,
  postId,
}) => {
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
          <Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {name}
            </Typography>
            {email}
          </Fragment>
        }
      />
    </ListItem>
  );
};
