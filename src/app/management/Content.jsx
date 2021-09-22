import React from "react";
import { Link, useHistory } from "react-router-dom";

// import { GET_ALL_CONTENT } from "../../Graphql/Queries";
// import { useMutation, useQuery } from "@apollo/client";
// import { DELETE_CONTENT } from "../../Graphql/Mutation";

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

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flex: "auto",
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
    paperpong: {
      textAlign: "center",
    },
  })
);

const ManageContent = () => {
  const classes = useStyles();
  const history = useHistory();
//   const { data } = useQuery(GET_ALL_CONTENTS);
//   const [deleteContent] = useMutation(DELETE_CONTENT);

  const submitHandler = () => {
    history.push("/content/createContent");
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
              <TableCell align="left">Username</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Surname</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Phone Number</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {data &&
              data.getAllContent.map((content) => (
                <TableRow key={content.contentID}>
                  <TableCell component="th" scope="row">
                    {content.id}
                  </TableCell>
                  <TableCell align="left">{content.username}</TableCell>
                  <TableCell align="left">{content.name}</TableCell>
                  <TableCell align="left">{content.surname}</TableCell>
                  <TableCell align="left">{content.email}</TableCell>
                  <TableCell align="left">{content.phoneNumber}</TableCell>
                  <TableCell align="left">
                    <Link
                      to={"/user/" + content.id}
                      className={classes.manageListDetail}
                    >
                      View Detail
                    </Link>
                    <Button
                      className={classes.manageListDelete}
                      onClick={() => {
                        deleteContent({ variables: { id: content.id } });
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManageContent;
