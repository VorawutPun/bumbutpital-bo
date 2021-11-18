import React, { useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  Grid,
  Paper,
  TextField,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { CREATE_VIDEO } from "../../Graphql/Video/Mutation";
import { GET_ALL_VIDEO } from "../../Graphql/Video/Queries";
import { useHistory } from "react-router-dom";
import { depressionSeverity } from "../../utils/util";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: "32px",
      marginTop: "60px",
    },
    title: {
      fontSize: "34px",
      fontWeight: 600,
    },
    card: {
      margin: "20px 48px",
    },
    addUserTitle: {
      fontSize: "24px",
      fontWeight: 500,
    },
    paper: {
      alignItems: "center",
      margin: "20px 48px",
      width: "600px",
    },
    profileTitle: {
      margin: "8px 0px",
      fontSize: "20px",
      fontWeight: 600,
    },
    field: {
      display: "block",
      marginRight: "10px",
      marginTop: "10px",
      minWidth: "400px",
    },
    buttonGroup: {
      marginTop: "20px",
    },
    uploadCard: {
      marginTop: "-40px",
      marginBottom: "-30px",
    },
  })
);

const AddVideo = () => {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [appropiatePHQSeverity, setAppropiatePHQSeverity] = useState("");
  const [staffID /* setStaffID */] = useState("");

  const handleChangeSeverity = (event) => {
    setAppropiatePHQSeverity(event.target.value);
  };

  const [createVideo] = useMutation(CREATE_VIDEO, {
    refetchQueries: [{ query: GET_ALL_VIDEO }],
  });

  const submitHandler = () => {
    if (title && videoUrl && pictureUrl && appropiatePHQSeverity) {
      createVideo({
        variables: {
          title: title,
          videoUrl: videoUrl,
          pictureUrl: pictureUrl,
          appropiatePHQSeverity: appropiatePHQSeverity,
          staffID: staffID,
        },
      });
      history.push("/videos");
    }
  };

  return (
    <div className={classes.root}>
      <Typography gutterBottom className={classes.title}>
        Add Video
      </Typography>
      <Card className={classes.card} elevation={0}>
        <Paper className={classes.paper} elevation={0}>
          <Typography gutterBottom className={classes.profileTitle}>
            Title:
          </Typography>
          <TextField
            className={classes.field}
            fullWidth
            placeholder="Title"
            variant="outlined"
            color="primary"
            size="medium"
            required
            id="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Typography gutterBottom className={classes.profileTitle}>
            Video Url:
          </Typography>
          <TextField
            className={classes.field}
            color="primary"
            fullWidth
            id="VideoUrl"
            placeholder="Condition"
            required
            variant="outlined"
            rows={10}
            onChange={(e) => {
              setVideoUrl(e.target.value);
            }}
          />
          <Typography gutterBottom className={classes.profileTitle}>
            Picture of Video's Url :
          </Typography>
          <TextField
            className={classes.field}
            fullWidth
            placeholder="Picture of Video's Url"
            variant="outlined"
            color="primary"
            size="medium"
            required
            id="Url"
            onChange={(e) => {
              setPictureUrl(e.target.value);
            }}
          />
          <Typography className={classes.profileTitle}>
            Depression Severity
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={appropiatePHQSeverity}
              onChange={handleChangeSeverity}
            >
              {depressionSeverity.map((severity) => (
                <FormControlLabel
                  key={severity}
                  value={severity.severity}
                  control={<Radio color="primary" />}
                  label={severity.severity}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className={classes.buttonGroup}
          >
            <Button
              color="secondary"
              size="large"
              onClick={() => {
                history.push("/videos");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={
                !title || !videoUrl || !pictureUrl || !appropiatePHQSeverity
              }
              onClick={submitHandler}
            >
              Create
            </Button>
          </Grid>
        </Paper>
      </Card>
    </div>
  );
};

export default AddVideo;
