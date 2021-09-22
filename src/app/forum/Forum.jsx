import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Grid, Link, Typography } from "@material-ui/core";
import ForumCard from "../../components/forumCard/ForumCard";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flex: "auto",
    },
    title: {
      fontSize: "32px",
      fontWeight: 600,
      padding: "32px 32px 10px 32px",
    },
    selectionItem: {
      color: "black",
      fontSize: "24px",
      fontWeight: 400,
      padding: "32px 0px 0px 32px",
      textDecoration: "none",
      "&:active, &:hover,": {
        textDecoration: "underline",
        textDecorationThickness: "6px",
        textDecorationColor: "#FFB55E",
      },
    },
    stat: {
      fontSize: "32px",
      fontWeight: 400,
      alignItems: "center",
      marginRight: "12px",
    },
    rectangleQuestion: {
      backgroundColor: "#6367EA",
      width: 8,
      height: 60,
      alignItems: "center",
      marginRight: "8px",
    },
    rectangleUser: {
      backgroundColor: "#FFBC17",
      width: 8,
      height: 60,
      alignItems: "center",
      marginRight: "8px",
    },
    question: {
      marginRight: "40px",
    },
  })
);

const Forum = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container direction="row" alignItems="center" spacing={3}>
        <Grid item xs={10}>
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            className={classes.title}
          >
            Forum
          </Typography>
        </Grid>

        <div className={classes.rectangleQuestion} />
        <div className={classes.question}>
          Question
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            className={classes.stat}
          >
            12
          </Typography>
        </div>

        <div className={classes.rectangleUser} />
        <div>
          User
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            className={classes.stat}
          >
            12
          </Typography>
        </div>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item>
          <Link className={classes.selectionItem}>Lastest</Link>
        </Grid>
        <Grid item>
          <Link className={classes.selectionItem}>Pinned</Link>
        </Grid>
      </Grid>
      <ForumCard />
      <ForumCard />
    </div>
  );
};

export default Forum;
