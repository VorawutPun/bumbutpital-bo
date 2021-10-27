import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import UploadCard from "../../components/addContentCard/UploadCard";
// import { useMutation } from "@apollo/client";
import { GET_VIDEO } from "../../Graphql/Video/Queries";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import SelectCategoryCard from "../../components/addContentCard/SelectCategoryCard";
import SelectDepressionCard from "../../components/addContentCard/SelectDepressionCard";

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

const EditVideo = (props) => {
  const classes = useStyles();
  const videoID = props.match.params.videoID;
  const history = useHistory();
//   const [title, setTitle] = useState("");
//   const [videoUrl, setVideoUrl] = useState("");
//   const [pictureUrl, setPictureUrl] = useState("");
//   const [appropiatePHQSeverity, setAppropiatePHQSeverity] = useState("");
//   const [staffID /* setStaffID */] = useState("");
//   const [videoType, setVideoType] = useState("");

//   const handleChangeSeverity = (event) => {
//     setAppropiatePHQSeverity(event.target.value);
//   };

//   const handleChangeCategory = (event) => {
//     setVideoType(event.target.value);
//   };

//   const [createVideo] = useMutation(CREATE_VIDEO, {
//     refetchQueries: [{ query: GET_ALL_VIDEO }],
//   });

  const { data } = useQuery(GET_VIDEO, {
    variables: {
      videoID,
    },
  });

//   const submitHandler = (e) => {
//     e.preventDefault();
//     createVideo({
//       variables: {
//         title: title,
//         videoUrl: videoUrl,
//         pictureUrl: pictureUrl,
//         appropiatePHQSeverity: appropiatePHQSeverity,
//         staffID: staffID,
//         videoType: videoType,
//       },
//     });
//     history.push("/videos");
//   };

  return (
    <div className={classes.root}>
      {data &&
        data.getVideo.map((video) => (
          <>
            <Typography gutterBottom className={classes.title}>
              Edit Video
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
                  defaultValue={video.title}
                //   onChange={(e) => {
                //     setTitle(e.target.value);
                //   }}
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
                //   onChange={(e) => {
                //     setVideoUrl(e.target.value);
                //   }}
                />
                <Typography gutterBottom className={classes.profileTitle}>
                  Promotion Url:
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
  /*                 onChange={(e) => {
                    setPictureUrl(e.target.value);
                  }} */
                />
                <Typography gutterBottom className={classes.profileTitle}>
                  Promotion Picture:
                </Typography>
                <div className={classes.uploadCard}>
                  <UploadCard />
                </div>
                <SelectCategoryCard videoType={video.videoType} />
                <SelectDepressionCard
                  appropiatePHQSeverity={video.appropiatePHQSeverity}
                />
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
    /*                 onClick={submitHandler} */
                  >
                    Edit
                  </Button>
                </Grid>
              </Paper>
            </Card>
          </>
        ))}
    </div>
  );
};

export default EditVideo;
