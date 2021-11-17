import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { ArrowBack } from "@material-ui/icons";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      borderRadius: "14px",
      width: "360px",
      height: "640px",
      overflowY:"scroll",
    },
    header: {
      padding: "16px",
      color: "black",
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

const PreviewChange = (props) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader title={<ArrowBack />} className={classes.header} />
      <CardContent>
        <Typography variant="h5">{props.title}</Typography>
        <CardMedia
          component="img"
          alt="No photo"
          height="auto"
          width="200px"
          image={props.pictureUrl}
          title="No photo"
        />
        <Typography className={classes.title}>{props.description}</Typography>
      </CardContent>
      <CardActions className={classes.action}></CardActions>
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={props.onClick}
      >
        Done
      </Button>
    </Card>
  );
};

export default PreviewChange;
