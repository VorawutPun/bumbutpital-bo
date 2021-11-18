import React, { useState } from "react";
import {
  // Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Modal,
  Typography,
  TextField,
  CardHeader,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { ANSWER_FORUM } from "../../Graphql/Forum/Mutation";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_FORUM } from "../../Graphql/Forum/Queries";
import { GET_ALL_USERS } from "../../Graphql/User/Queries";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      padding: "24px",
      justifyContent: "space-between",
      marginRight: "48px",
    },
    question: {
      fontSize: "24px",
      fontWeight: 600,
    },
    detail: {
      display: "flex",
      flexDirection: "column",
      minWidth: "1000px",
    },
    content: {
      flex: "1 0 auto",
      padding: "8px 8px 0px 8px",
    },
    questionDetail: {
      fontSize: "16px",
      fontWeight: 300,
    },
    adminAnswer: {
      fontSize: "14px",
      fontWeight: 300,
      padding: "16px 16px 0px 16px",
    },
    user: {
      display: "flex",
      alignItems: "center",
    },
    action: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    messageNumber: {
      backgroundColor: "#63EA89",
      width: "60px",
      height: "60px",
    },
    buttonAnswer: {
      padding: "10px",
      margin: "8px",
      background: "#3CA75A",
      color: "white",
    },
    buttonPinned: {
      padding: "10px",
      margin: "8px",
      background: "#6367EA",
      color: "white",
    },
    buttonUrgent: {
      padding: "10px",
      margin: "8px",
      background: "#EA6363",
      color: "white",
    },
    answer: {
      fontSize: "14px",
      fontWeight: 600,
    },
    backdrop: {
      // zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);

const ForumUserCard = (props) => {
  const classes = useStyles();
  const [answer, setAnswer] = useState("");
  const { data: queryForum } = useQuery(GET_ALL_FORUM);
  const { data: queryUser } = useQuery(GET_ALL_USERS);
  const [answerForum] = useMutation(ANSWER_FORUM, {
    refetchQueries: [{ query: GET_ALL_FORUM }],
  });

  return (
    <>
      {queryForum &&
        queryForum.getAllForum.map((forum) =>
          forum ? (
            <>
              <Card variant="outlined" className={classes.root}>
                <div className={classes.detail}>
                  <CardContent className={classes.content}>
                    <div className={classes.user}>
                      <Typography variant="subtitle1" color="textSecondary">
                        User:{" "}
                        {queryUser &&
                          queryUser.getAllUsers.find(
                            (user) => user.id === forum.userID
                          ).name}{" "}
                        Asked on {new Date(forum.createAt).toLocaleDateString()}
                      </Typography>
                    </div>
                    <Typography className={classes.question} gutterBottom>
                      {forum.title}
                    </Typography>
                    <Typography
                      className={classes.questionDetail}
                      component="h5"
                      variant="h5"
                      gutterBottom
                    >
                      {forum.description}
                    </Typography>
                    <Typography
                      className={classes.adminAnswer}
                      component="h5"
                      variant="h5"
                    >
                      {forum.answer}
                    </Typography>
                  </CardContent>
                  {!forum.answer && (
                    <CardHeader
                      action={
                        <>
                          <Button
                            variant="contained"
                            className={classes.buttonAnswer}
                            onClick={(e) => {
                              answerForum({
                                variables: {
                                  forumID: props.forum.forumID,
                                  answer: answer,
                                },
                              });
                            }}
                          >
                            Answer
                          </Button>
                        </>
                      }
                      title={
                        <TextField
                          color="primary"
                          fullWidth
                          placeholder="Hospital Description"
                          required
                          variant="outlined"
                          multiline
                          maxRows={4}
                          onChange={(e) => {
                            setAnswer(e.target.value);
                          }}
                        />
                      }
                    />
                  )}
                </div>
              </Card>
            </>
          ) : (
            <p>asdasdasdasdasdasdasd</p>
          )
        )}
    </>
  );
};

export default ForumUserCard;
