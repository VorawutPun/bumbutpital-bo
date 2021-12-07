import React, { useEffect, useState, useRef } from "react";
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
import { GET_ALL_VIDEO, GET_VIDEO } from "../../Graphql/Video/Queries";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { depressionSeverity } from "../../utils/util";
import { UPDATE_VIDEO } from "../../Graphql/Video/Mutation";
import firebase from "../../firebase/firebase";
import { v4 as uuidv4 } from "uuid";

const EditVideo = (props) => {
  const videoID = props.match.params.videoID;
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [appropiatePHQSeverity, setAppropiatePHQSeverity] = useState("");
  const [image, setImage] = useState({
    forRender: [],
    forUpload: [],
  });

  const imageInput = useRef();

  const [updateVideo] = useMutation(UPDATE_VIDEO, {
    refetchQueries: [GET_ALL_VIDEO, GET_VIDEO],
  });

  const { data, refetch } = useQuery(GET_VIDEO, {
    variables: {
      videoID,
    },
  });

  const handleChangeSeverity = (event) => {
    setAppropiatePHQSeverity(event.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let url = pictureUrl;
    if (image.forUpload.length > 0) {
      const storage = firebase.storage();
      const storageRef = storage.ref().child(`/content/${uuidv4()}.jpg`);
      const result = await storageRef.put(image.forUpload[0].fileForUpload);
      url = await result.ref.getDownloadURL();
    }
    updateVideo({
      variables: {
        videoID: videoID,
        title: title,
        videoUrl: videoUrl,
        pictureUrl: url,
        appropiatePHQSeverity: appropiatePHQSeverity,
      },
    });
    console.log(appropiatePHQSeverity);
    history.push("/videos");
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

  useEffect(() => {
    if (data) {
      setTitle(data.getVideo[0].title);
      setVideoUrl(data.getVideo[0].videoUrl);
      setPictureUrl(data.getVideo[0].pictureUrl);
      setAppropiatePHQSeverity(data.getVideo[0].appropiatePHQSeverity);
      refetch();
    }
  }, [data]);

  const getRenderImage = () => {
    if (image.forRender.length > 0) {
      return image.forRender[0].file;
    }
    return pictureUrl;
  };

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
                  Upload Picture:
                </Typography>
                <div>
                  <Button variant="contained" component="label">
                    Choose Photo
                    <input
                      hidden
                      type="file"
                      accept="image/png, image/jpeg"
                      id="image"
                      ref={imageInput}
                      onChange={() => handleImageChange()}
                    />
                  </Button>
                  <div className={classes.pictureUrl}>
                    <img
                      className={classes.imageStyle}
                      src={getRenderImage()}
                      alt="ContentPic"
                    />
                  </div>
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
                            key={severity.severity}
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
                      <Typography className={classes.cardTitle}>
                        Publish
                      </Typography>
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
                      onClick={submitHandler}
                    >
                      Publish
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </div>
        ))}
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
    pictureUrl: {
      marginTop: "10px",
    },
    imageStyle: {
      width: "100%",
      maxWidth: "200px",
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
  })
);

export default EditVideo;
