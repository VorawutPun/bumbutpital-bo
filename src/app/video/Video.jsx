import React, { useState } from "react";
// import classes from "./Management.module.css";
import AddVideoCard from "../../components/addVideoCard/AddVideoCard";
import EditVideoCard from "../../components/addVideoCard/EditVideoCard";
import {
  Button,
  Dialog,
  Typography,
  createStyles,
  makeStyles,
  Link,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Avatar } from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_VIDEO, DELETE_VIDEO } from "../../Graphql/Video/Mutation";
import { GET_ALL_VIDEO, GET_VIDEO } from "../../Graphql/Video/Queries";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flex: "4",
      padding: "30px",
    },
    addTitle: {
      fontSize: "32px",
      fontWeight: 600,
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    manageListDetail: {
      padding: "5px 10px",
      color: "#6367ea",
      cursor: "pointer",
      marginRight: "20px",
      textDecoration: "none",
      fontSize: "16px",
    },
    manageListDelete: {
      padding: "5px 10px",
      color: "#ea6363",
      cursor: "pointer",
      marginRight: "20px",
      textDecoration: "none",
      fontSize: "16px",
    },
    titleButton: {
      background: "#6367EA",
      borderRadius: 5,
      border: 0,
      color: "white",
      height: 36,
      float: "right",
    },
    navLogo: {
      width: "50px",
      height: "50px",
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    tableCell: {
      width: "300px",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  })
);

const ManageVideo = (props) => {
  const videoID = props.match.params.videoID;
  const classes = useStyles();
  const [createVideo] = useMutation(CREATE_VIDEO, {
    refetchQueries: [{ query: GET_ALL_VIDEO }],
  });
  const { data } = useQuery(GET_ALL_VIDEO, GET_VIDEO, {
    variables: {
      videoID,
    },
  });
  const [deleteVideo] = useMutation(DELETE_VIDEO, {
    refetchQueries: [{ query: GET_ALL_VIDEO }],
  });

  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [appropiatePHQSeverity, setAppropiatePHQSeverity] = useState("");
  const [staffID /* setStaffID */] = useState("");
  const [videoType, setVideoType] = useState("");

  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    createVideo({
      variables: {
        title: title,
        videoUrl: videoUrl,
        pictureUrl: pictureUrl,
        appropiatePHQSeverity: appropiatePHQSeverity,
        staffID: staffID,
        videoType: videoType,
      },
    });
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Typography
        className={classes.addTitle}
        gutterBottom
        variant="h1"
        component="h1"
      >
        Video Management
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.titleButton}
          onClick={handleToggle}
        >
          Add Video
        </Button>
        <Dialog onClose={handleClose} open={open}>
          <AddVideoCard
            onClick={handleSubmit}
            setTitle={setTitle}
            setVideoUrl={setVideoUrl}
            setPictureUrl={setPictureUrl}
            setAppropiatePHQSeverity={setAppropiatePHQSeverity}
            setVideoType={setVideoType}
          />
        </Dialog>
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell align="left">title</TableCell>
              <TableCell align="left">videoUrl</TableCell>
              <TableCell align="left">picture</TableCell>
              <TableCell align="left">createAt</TableCell>
              <TableCell align="left">AppropiatePHQSeverity</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.getAllVideo.map((video) => (
                <TableRow key={video.videoID}>
                  <TableCell component="th" scope="row">
                    {video.videoID}
                  </TableCell>
                  <TableCell align="left">{video.title}</TableCell>
                  <TableCell align="left">
                    <div className={classes.tableCell}>
                      <Typography variant="body2" nowrap>
                        <Link href={video.videoUrl}>{video.videoUrl}</Link>
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell align="left">
                    <Avatar
                      alt="Remy Sharp"
                      src={video.pictureUrl}
                      style={{ width: 56, height: 56 }}
                    />
                  </TableCell>
                  <TableCell align="left">
                    {new Date(video.createAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="left">
                    {video.appropiatePHQSeverity}
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      className={classes.manageListDetail}
                      onClick={() => {
                        deleteVideo({ variables: { videoID: video.videoID } });
                      }}
                    >
                      Edit
                    </Button>
                    <Dialog onClose={handleClose} open={open}>
                      <EditVideoCard
                        onClick={handleSubmit}
                        setTitle={setTitle}
                        setVideoUrl={setVideoUrl}
                        setPictureUrl={setPictureUrl}
                        setAppropiatePHQSeverity={setAppropiatePHQSeverity}
                        setVideoType={setVideoType}
                      />
                    </Dialog>
                    <Button
                      className={classes.manageListDelete}
                      onClick={() => {
                        deleteVideo({ variables: { videoID: video.videoID } });
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManageVideo;
