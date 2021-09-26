import React, { useState } from "react";
import classes from "./Management.module.css";
// import AddVideoCard from "../../components/addVideoCard/AddVideoCard";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
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

import { useMutation, useQuery } from "@apollo/client";
import { CREATE_VIDEO } from "../../Graphql/Video/Mutation";
import { GET_ALL_VIDEO } from "../../Graphql/Video/Queries";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      background: "#6367EA",
      borderRadius: 5,
      border: 0,
      color: "white",
      height: 36,
      float: "right",
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    backdropRoot: {
      borderRadius: "14px",
      width: "760px",
    },
    header: {
      backgroundColor: "#6367EA",
      padding: "16px",
      color: "white",
    },
    title: {
      fontSize: "16px",
      fontWeight: 500,
    },
    action: {
      padding: "16px",
      justifyContent: "space-between",
    },
    field: {
      marginBottom: "10px",
    },
    tableCell: {
      width: "300px",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  })
);

const ManageVideo = (props) => {
  const style = useStyles();
  const [createVideo] = useMutation(CREATE_VIDEO);
  const { data } = useQuery(GET_ALL_VIDEO);

  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [appropiatePHQSeverity, setAppropiatePHQSeverity] = useState("");
  const [staffID /* setStaffID */] = useState("");

  const [open, setOpen] = useState(false);
  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    createVideo({
      variables: {
        title: title,
        videoUrl: videoUrl,
        pictureUrl: pictureUrl,
        appropiatePHQSeverity: appropiatePHQSeverity,
        staffID: staffID,
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

  const depressionSeverity = [
    {
      severity: "Minimal Depression",
    },
    {
      severity: "Mild Depression",
    },
    {
      severity: "Moderate Depression",
    },
    {
      severity: "Moderately severe Depression",
    },
    {
      severity: "Severe Depression",
    },
  ];
  // const [value, setValue] = useState("Depression");
  const handleChangeSeverity = (event) => {
    setAppropiatePHQSeverity(event.target.value);
  };

  return (
    <div className={classes.manageList}>
      <div className={classes.manageTitle}>
        Video Management
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={style.root}
          onClick={handleToggle}
        >
          Add Video
        </Button>
        <Dialog onClose={handleClose} open={open}>
          {/* <AddVideoCard onClick={handleSubmit} /> */}
          <Card>
            <CardHeader
              title={
                <Typography className={style.title}>
                  Add Youtube Link
                </Typography>
              }
              className={style.header}
            />
            <CardContent>
              <TextField
                label="Title"
                variant="outlined"
                color="primary"
                fullWidth
                required
                id="title"
                className={style.field}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <TextField
                label="Link"
                variant="outlined"
                color="primary"
                fullWidth
                required
                id="link"
                className={style.field}
                onChange={(e) => {
                  setVideoUrl(e.target.value);
                }}
              />
              <TextField
                label="Picture Url"
                variant="outlined"
                color="primary"
                fullWidth
                required
                id="pictureUrl"
                className={style.field}
                onChange={(e) => {
                  setPictureUrl(e.target.value);
                }}
              />
              <Typography className={style.title}>
                Depression Severity
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={appropiatePHQSeverity}
                  onChange={handleChangeSeverity}
                >
                  {depressionSeverity.map((item) => (
                    <FormControlLabel
                      value={item.severity}
                      control={<Radio color="primary" />}
                      label={item.severity}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions className={style.action}>
              <Button
                // variant="contained"
                size="small"
                color="secondary"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={handleSubmit}
              >
                Post Link
              </Button>
            </CardActions>
          </Card>
        </Dialog>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell align="left">title</TableCell>
              <TableCell align="left">videoUrl</TableCell>
              <TableCell align="left">pictureUrl</TableCell>
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
                    <div className={style.tableCell}>
                      <Typography variant="body2" nowrap>
                        <Link href={video.videoUrl}>{video.videoUrl}</Link>
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell align="left">{video.pictureUrl}</TableCell>
                  <TableCell align="left">{video.createAt}</TableCell>
                  <TableCell align="left">
                    {video.appropiatePHQSeverity}
                  </TableCell>
                  <TableCell align="left">
                    <Link
                      to={"/user/" + video.id}
                      className={classes.manageListDetail}
                    >
                      View Detail
                    </Link>
                    <Button
                      className={classes.manageListDelete}
                      // onClick={() => {
                      //   deleteUser({ variables: { id: user.id } });
                      // }}
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
