import React from "react";
import { Link, useHistory } from "react-router-dom";

import { GET_ALL_CONTENT } from "../../Graphql/Content/Queries";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_CONTENT } from "../../Graphql/Content/Mutation";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
import { Avatar } from "@material-ui/core";
import DeleteDialog from "../../components/dialog/DeleteDialog";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flex: "4",
      padding: "30px",
      marginTop: "60px",
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
  })
);

const ManageContent = () => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

 /*  const handleClickOpen = () => {
    setOpen(true);
  }; */

  const handleClose = () => {
    setOpen(false);
  };

  const { data } = useQuery(GET_ALL_CONTENT);
  const [deleteContent] = useMutation(DELETE_CONTENT, {
    refetchQueries: [{ query: GET_ALL_CONTENT }],
  });

  const submitHandler = () => {
    history.push("/createContent");
  };

  return (
    <div className={classes.root}>
      <Typography
        className={classes.addTitle}
        gutterBottom
        variant="h1"
        component="h1"
      >
        Content Management
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.titleButton}
          onClick={submitHandler}
        >
          Add Content
        </Button>
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell align="left">Title</TableCell>
              {/* <TableCell align="left">Description</TableCell> */}
              <TableCell align="left">UpdateTime</TableCell>
              <TableCell align="left">PictureUrl</TableCell>
              <TableCell align="left">CreateAt</TableCell>
              <TableCell align="left">AppropiatePHQSeverity</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.getAllContent.map((content) => (
                <TableRow key={content.contentID}>
                  <TableCell component="th" scope="row">
                    {content.contentID}
                  </TableCell>
                  <TableCell align="left">{content.title}</TableCell>
                  {/* <TableCell align="left">{content.description}</TableCell> */}
                  <TableCell align="left">
                    {" "}
                    {new Date(content.updateTime).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="left">
                    <Avatar
                      alt="Remy Sharp"
                      src={content.pictureUrl}
                      style={{ width: 56, height: 56 }}
                    />
                  </TableCell>
                  <TableCell align="left">
                    {new Date(content.createAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="left">
                    {content.appropiatePHQSeverity}
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      component={Link}
                      to={"/content/" + content.contentID}
                      className={classes.manageListDetail}
                    >
                      View Detail
                    </Button>
                    <Button
                      className={classes.manageListDelete}
                      onClick={() => {
                        setOpen(true);
                        console.log(content.contentID);
                      }}
                    >
                      Delete
                    </Button>
                    <DeleteDialog
                      open={open}
                      onClose={handleClose}
                      onClick={() => {
                        deleteContent({
                          variables: { contentID: content.contentID },
                        });
                        setOpen(false);
                      }}
                      title={content.title}
                    />
                    {/* <Dialog open={open} onClose={handleClose}>
                      <DialogTitle>
                        {"Are you sure you want to delete?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          You are about to delete the content "{content.title}"
                          and all its data. Do you want to continue?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button
                          color="error"
                          onClick={() => {
                            deleteContent({
                              variables: { contentID: content.contentID },
                            });
                            setOpen(false);
                          }}
                        >
                          Delete
                        </Button>
                      </DialogActions>
                    </Dialog> */}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManageContent;
