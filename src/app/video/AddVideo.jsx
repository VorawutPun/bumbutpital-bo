import React, { useState, useRef } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Grid,
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
import firebase from "../../firebase/firebase";
import { v4 as uuidv4 } from "uuid";

const AddVideo = () => {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [appropiatePHQSeverity, setAppropiatePHQSeverity] = useState("");
  const [image, setImage] = useState({
    forRender: [],
    forUpload: [],
  });

  const imageInput = useRef();

  const handleChangeSeverity = (event) => {
    setAppropiatePHQSeverity(event.target.value);
  };

  const [createVideo] = useMutation(CREATE_VIDEO, {
    refetchQueries: [{ query: GET_ALL_VIDEO }],
  });

  const submitHandler = async () => {
    if (
      title &&
      videoUrl &&
      appropiatePHQSeverity &&
      image.forUpload.length > 0
    ) {
      const storage = firebase.storage();
      const storageRef = storage.ref().child(`/video/${uuidv4()}.jpg`);
      const result = await storageRef.put(image.forUpload[0].fileForUpload);
      const url = await result.ref.getDownloadURL();
      createVideo({
        variables: {
          title: title,
          videoUrl: videoUrl,
          pictureUrl: url,
          appropiatePHQSeverity: appropiatePHQSeverity,
        },
      });
      history.push("/videos");
    }
  };

  const handleImageChange = () => {
    const tempFiles = imageInput.current.files;

    if (tempFiles) {
      const filesArray = Array.from(tempFiles).map((file) => {
        const currentId = uuidv4();
        return {
          render: { id: currentId, file: URL.createObjectURL(file) },
          upload: { id: currentId, fileForUpload: file },
        };
      });

      const newImage = {
        forRender: filesArray.map((obj) => obj.render),
        forUpload: filesArray.map((obj) => obj.upload),
      };

      setImage(newImage);
      imageInput.current.value = null;
    }
  };

  const getRenderImage = () => {
    if (image.forRender.length > 0) {
      return image.forRender[0].file;
    }
  };

  return (
    <div className={classes.root}>
      <Typography gutterBottom className={classes.title}>
        Add Video
      </Typography>
      <Grid container direction="row" justifyContent="flex-start" spacing={8}>
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
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Typography gutterBottom className={classes.profileTitle}>
            Youtube Url:
          </Typography>
          <TextField
            className={classes.field}
            color="primary"
            fullWidth
            id="VideoUrl"
            placeholder="Video Url"
            required
            variant="outlined"
            rows={10}
            onChange={(e) => {
              setVideoUrl(e.target.value);
            }}
          />
          <Typography gutterBottom className={classes.profileTitle}>
            Upload Picture:
          </Typography>
          <div>
            <div className={classes.pictureUrl}>
              {image.forUpload.length > 0 && (
                <img
                  src={getRenderImage()}
                  className={classes.imageStyle}
                  alt="hospitalPic"
                />
              )}
            </div>
            <Button variant="contained" component="label">
              Upload Picture
              <input
                hidden
                type="file"
                accept="image/png, image/jpeg"
                id="image"
                ref={imageInput}
                onChange={() => handleImageChange()}
              />
            </Button>
          </div>
        </Grid>
        <Grid item xs={4}>
          <Card className={classes.cardRoot}>
            <CardHeader
              title={
                <Typography className={classes.cardTitle}>
                  Depression Severity
                </Typography>
              }
              className={classes.header}
            />
            <CardContent>
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
            </CardContent>
          </Card>
          <Card className={classes.cardRoot}>
            <CardHeader
              title={
                <Typography className={classes.cardTitle}>Publish</Typography>
              }
              className={classes.header}
            />
            <CardActions className={classes.action}>
              <Button
                color="secondary"
                size="small"
                onClick={() => {
                  history.push("/videos");
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                disabled={
                  !title || !videoUrl || !image.forUpload.length > 0 || !appropiatePHQSeverity
                }
                onClick={submitHandler}
              >
                Publish
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

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
    cardRoot: {
      border: "solid",
      borderWidth: "1px",
      borderColor: "#D1D1D1",
      borderRadius: "8px",
      marginBottom: "10px",
    },
    header: {
      backgroundColor: "#F8F8F8",
      padding: "16px",
    },
    cardTitle: {
      fontSize: "16px",
      fontWeight: 600,
    },
    action: {
      backgroundColor: "#F8F8F8",
      justifyContent: "space-between",
      padding: "16px",
    },
    pictureUrl: {
      marginTop: "10px",
    },
    imageStyle: {
      width: "100%",
      maxWidth: "200px",
    },
  })
);

export default AddVideo;
