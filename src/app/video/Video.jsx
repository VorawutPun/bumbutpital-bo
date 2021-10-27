import React from "react";
// import classes from "./Management.module.css";
import {
  Button,
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
import { DELETE_VIDEO } from "../../Graphql/Video/Mutation";
import { GET_ALL_VIDEO } from "../../Graphql/Video/Queries";
import { useHistory, Link as RouterLink } from "react-router-dom";

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
  })
);

const ManageVideo = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { data } = useQuery(GET_ALL_VIDEO);
  const [deleteVideo] = useMutation(DELETE_VIDEO, {
    refetchQueries: [{ query: GET_ALL_VIDEO }],
  });

  const submitHandler = () => {
    history.push("/createVideo");
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
          onClick={submitHandler}
        >
          Add Video
        </Button>
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
                      <Typography variant="body2">
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
                      component={RouterLink}
                      to={"/video/" + video.videoID}
                      className={classes.manageListDetail}
                    >
                      View Detail
                    </Button>
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
