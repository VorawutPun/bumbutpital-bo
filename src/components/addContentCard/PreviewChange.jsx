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

const PreviewChange = ({ onClick, title, description, file }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader title={<ArrowBack />} className={classes.header} />
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <CardMedia
          component="img"
          alt="No photo"
          height="auto"
          width="200px"
          image={file}
          title="No photo"
        />
        <Typography className={classes.title}>
          {description}
        </Typography>
      </CardContent>
      <CardActions className={classes.action}>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={onClick}
        >
          Done
        </Button>
      </CardActions>
    </Card>
  );
};

export default PreviewChange;
