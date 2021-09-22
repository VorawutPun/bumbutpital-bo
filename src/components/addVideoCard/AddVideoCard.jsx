import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      borderRadius: "14px",
      width: "760px",
    },
    header: {
      backgroundColor: "#6367EA",
      padding: "16px",
      color: "white",
    },
    title: {
      fontSize: "16px",
      fontWeight: 500,
    },
    action: {
      float: "right",
      padding: "16px",
    },
    field: {
      marginBottom: "10px"
    },
  })
);

const AddVideoCard = ({ onClick }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          <Typography className={classes.title}>Add Youtube Link</Typography>
        }
        className={classes.header}
      />
      <CardContent>
        <TextField
          label="Link"
          variant="outlined"
          color="primary"
          fullWidth
          required
          id="link"
          className={classes.field}
        />
        <TextField
          label="Description"
          variant="outlined"
          color="primary"
          fullWidth
          required
          id="link"
          className={classes.field}
        />
        <TextField
          label="Video length"
          variant="outlined"
          color="primary"
          fullWidth
          required
          id="Video length"
          className={classes.field}
        />
      </CardContent>
      <CardActions className={classes.action}>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={onClick}
        >
          Post Link
        </Button>
      </CardActions>
    </Card>
  );
};

export default AddVideoCard;
