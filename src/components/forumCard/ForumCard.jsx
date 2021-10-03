import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Modal,
  Typography,
  TextField,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
// import AnswerCard from "./AnswerCard";
import UrgentCard from "./UrgentCard";
import { ANSWER_FORUM } from "../../Graphql/Forum/Mutation";
import { useMutation } from "@apollo/client";
// import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      padding: "24px",
      justifyContent: "space-between",
    },
    question: {
      fontSize: "24px",
      fontWeight: 600,
    },
    detail: {
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flex: "1 0 auto",
    },
    questionDetail: {
      fontSize: "16px",
      fontWeight: 300,
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
    adminAnswer: {
      fontSize: "24px",
      fontWeight: 300,
      padding: "16px",
      color: "#3CA75A",
    },
  })
);

const ForumCard = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const [openAnswer, setOpenAnswer] = useState(false);
  const [openUrgent, setOpenUrgent] = useState(false);
  const [answerForum] = useMutation(ANSWER_FORUM);
  const [answer, setAnswer] = useState("");

  const handleAnswerBackdrop = () => {
    answerForum({
      variables: {
        forumID: props.forum.forumID,
        adminAnswer: answer,
      },
    });
    setOpenAnswer(false);
  };

  const handleAnswer = () => {
    setOpenAnswer(!openAnswer);
  };

  const handleUrgentBackdrop = () => {
    setOpenUrgent(false);
  };

  const handleUrgent = () => {
    setOpenUrgent(!openUrgent);
  };

  return (
    <>
      <Card variant="outlined" className={classes.root}>
        <div className={classes.detail}>
          <CardContent className={classes.content}>
            <div className={classes.user}>
              <Typography variant="subtitle1" color="textSecondary">
                User: Wisa Asked on 30 April 2021
              </Typography>
            </div>
            <Typography className={classes.question} gutterBottom>
              {props.forum.title}
            </Typography>
            <Typography
              className={classes.questionDetail}
              component="h5"
              variant="h5"
              gutterBottom
            >
              {props.forum.description}
            </Typography>
            <Typography
              className={classes.adminAnswer}
              component="h5"
              variant="h5"
              gutterBottom
            >
              Answer: {props.forum.answer}
            </Typography>
            <TextField
              className={classes.field}
              color="primary"
              fullWidth
              id="hospitalDescription"
              placeholder="Hospital Description"
              required
              variant="outlined"
              // multiline
              rows={1}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
            />
            <Button
              variant="contained"
              className={classes.buttonAnswer}
              onClick={handleAnswer}
            >
              Answer
            </Button>
          </CardContent>
        </div>
        {/* <CardActions className={classes.action}>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Avatar className={classes.messageNumber}>1</Avatar>
            <Typography
              variant="body1"
              component="h5"
              className={classes.answer}
              gutterBottom
            >
              Answer
            </Typography>

          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
          >

            <Modal
              open={openAnswer}
              className={classes.modal}
              onClose={handleAnswerBackdrop}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <AnswerCard onClick={handleAnswerBackdrop} setAnswer={setAnswer}/>
            </Modal>
            <Button variant="contained" className={classes.buttonPinned}>
              Pin
            </Button>

            <Button
              variant="contained"
              className={classes.buttonUrgent}
              onClick={handleUrgent}
            >
              Urgent
            </Button>
            <Modal
              open={openUrgent}
              className={classes.modal}
              onClose={handleUrgentBackdrop}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <UrgentCard onClick={handleUrgentBackdrop} />
            </Modal>
          </Grid>
        </CardActions> */}
      </Card>
    </>
  );
});

export default ForumCard;
