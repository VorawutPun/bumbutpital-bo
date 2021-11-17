import React, { useEffect, useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  TextField,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { GET_ALL_VIDEO, GET_VIDEO } from "../../Graphql/Video/Queries";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { depressionSeverity } from "../../utils/util";
import { UPDATE_VIDEO } from "../../Graphql/Video/Mutation";

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
    addUserTitle: {
      fontSize: "24px",
      fontWeight: 500,
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

const EditVideo = (props) => {
  const videoID = props.match.params.videoID;
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [appropiatePHQSeverity, setAppropiatePHQSeverity] = useState("");

  const [updateVideo] = useMutation(UPDATE_VIDEO, {
    refetchQueries: [GET_ALL_VIDEO, GET_VIDEO],
  });

  const { data } = useQuery(GET_VIDEO, {
    variables: {
      videoID,
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    updateVideo({
      variables: {
        videoID: videoID,
        title: title,
        videoUrl: videoUrl,
        pictureUrl: pictureUrl,
        appropiatePHQSeverity: appropiatePHQSeverity,
      },
    });
    console.log(appropiatePHQSeverity);
    history.push("/videos");
  };

  useEffect(() => {
    if (data) {
      setTitle(data.getVideo[0].title);
      setVideoUrl(data.getVideo[0].videoUrl);
      setPictureUrl(data.getVideo[0].pictureUrl);
      setAppropiatePHQSeverity(data.getVideo[0].appropiatePHQSeverity);
    }
  }, [data]);

  return (
    <div className={classes.root}>
      {data &&
        data.getVideo.map((video) => (
          <div key={video.videoID}>
            <Typography gutterBottom className={classes.title}>
              Edit Video
            </Typography>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              spacing={3}
            >
              <Grid item xs={8}>
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
                  defaultValue={video.title}
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
                  id="Hospital"
                  placeholder="Condition"
                  required
                  variant="outlined"
                  multiline
                  rows={10}
                  defaultValue={video.videoUrl}
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
                  placeholder="Promotion Url"
                  variant="outlined"
                  color="primary"
                  size="medium"
                  required
                  id="Url"
                  defaultValue={video.pictureUrl}
                  onChange={(e) => {
                    setPictureUrl(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                {/* <SelectDepressionCard
                  appropiatePHQSeverity={video.appropiatePHQSeverity}
                /> */}
                <Typography className={classes.profileTitle}>
                  Depression Severity
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={appropiatePHQSeverity}
                    onChange={(e) => {setAppropiatePHQSeverity(e.target.value)}}
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
              </Grid>
            </Grid>

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
                onClick={submitHandler}
              >
                Edit
              </Button>
            </Grid>
          </div>
        ))}
    </div>
  );
};

export default EditVideo;
