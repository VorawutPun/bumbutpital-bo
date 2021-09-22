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
      marginBottom: "10px",
    },
  })
);

const AnswerCard = ({ onClick }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          <Typography className={classes.title}>Answer To Username</Typography>
        }
        className={classes.header}
      />
      <CardContent>
        <TextField
          label="Help our Patient :)"
          variant="outlined"
          color="primary"
          fullWidth
          required
          id="answer"
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
          Answer
        </Button>
      </CardActions>
    </Card>
  );
};

export default AnswerCard;
