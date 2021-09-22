import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Person } from "@material-ui/icons";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      borderRadius: "14px",
      width: "760px",
    },
    header: {
      backgroundColor: "#EA6363",
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
      [`& fieldset`]: {
        borderRadius: 0,
      },
    },
  })
);

const UrgentCard = ({ onClick }) => {
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
        <Typography className={classes.title}>Username:</Typography>
        <TextField
          label="Help our Patient :)"
          variant="outlined"
          color="primary"
          fullWidth
          required
          id="answer"
          className={classes.field}
        />
        <Typography className={classes.title}>Phone Number:</Typography>
        <TextField
          label="Phone number"
          variant="outlined"
          color="primary"
          fullWidth
          required
          id="answer"
          className={classes.field}
        />
        <Avatar><Person/></Avatar>
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
          color="secondary"
          onClick={onClick}
        >
          Answer
        </Button>
      </CardActions>
    </Card>
  );
};

export default UrgentCard;
