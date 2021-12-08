import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import ForumCard from "../../components/forumCard/ForumCard";
import { useQuery } from "@apollo/client";
import { GET_ALL_FORUM } from "../../Graphql/Forum/Queries";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flex: "4",
      marginTop: "60px",
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
  const { data } = useQuery(GET_ALL_FORUM);

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
            Question & Answer
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
      </Grid>
      {data &&
        data.getAllForum.map((forum) => (
            <ForumCard forum={forum} key={forum}/>
        ))}
    </div>
  );
};

export default Forum;