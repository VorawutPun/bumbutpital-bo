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
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import AnswerCard from "./AnswerCard";
import UrgentCard from "./UrgentCard";

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
      paddingTop: "32px",
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

const ForumCard = () => {
  const classes = useStyles();
  const [openAnswer, setOpenAnswer] = useState(false);
  const [openUrgent, setOpenUrgent] = useState(false);

  const handleAnswerBackdrop = () => {
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
    <Card variant="outlined" className={classes.root}>
      <div className={classes.detail}>
        <CardContent className={classes.content}>
          <Typography
            className={classes.question}
            gutterBottom
          >
            Q: I want you to help.
          </Typography>
          <Typography
            className={classes.questionDetail}
            component="h5"
            variant="h5"
            gutterBottom
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Typography>
          <div className={classes.user}>
            <Typography variant="subtitle1" color="textSecondary">
              User: Wisa Asked on 30 April 2021
            </Typography>
          </div>
        </CardContent>
      </div>
      <CardActions className={classes.action}>
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
          <Button
            variant="contained"
            className={classes.buttonAnswer}
            onClick={handleAnswer}
          >
            Answer
          </Button>
          <Modal
            open={openAnswer}
            className={classes.modal}
            onClose={handleAnswerBackdrop}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <AnswerCard onClick={handleAnswerBackdrop} />
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
      </CardActions>
    </Card>
  );
};

export default ForumCard;
