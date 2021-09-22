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

const PreviewChange = ({ onClick }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader title={<ArrowBack />} className={classes.header} />
      <CardContent>
        <Typography variant="h5">What is?</Typography>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="auto"
          width="200px"
          image="/assets/images/BPTLogo.png"
          title="Contemplative Reptile"
        />
        <Typography className={classes.title}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim non
          nulla odio in. Morbi dignissim interdum molestie nulla nulla. Facilisi
          aliquet egestas nunc aliquet cursus. Egestas at viverra posuere ornare
          venenatis.
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
