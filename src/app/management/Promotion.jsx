import React from "react";
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
import { Link, useHistory } from "react-router-dom";

import { GET_ALL_PROMOTION } from "../../Graphql/Promotion/Query";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_PROMOTION } from "../../Graphql/Promotion/Mutation";

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
    paperpong: {
      textAlign: "center",
    },
  })
);
const ManagePromotion = () => {
  const history = useHistory();
  const classes = useStyles();
  const { data } = useQuery(GET_ALL_PROMOTION);
  const [deletePromotion] = useMutation(DELETE_PROMOTION);

  // const handleDelete = (id) => {
  //   content.filter((item) => item.id !== id);
  // };

  const submitHandler = () => {
    history.push("/promotion/add");
  };

  return (
<div className={classes.root}>
      <Typography
        className={classes.addTitle}
        gutterBottom
        variant="h1"
        component="h1"
      >
         Promotion Management
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.titleButton}
          onClick={submitHandler}
        >
          Add Promotion
        </Button>
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Hospital </TableCell>
              <TableCell align="left">CreateAt</TableCell>
              {/* <TableCell align="left">Url</TableCell> */}
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.getAllPromotion.map((promotion) => (
                <TableRow key={promotion.promotionId}>
                  <TableCell component="th" scope="row">
                    {promotion.promotionId}
                  </TableCell>
                  <TableCell align="left">{promotion.title}</TableCell>
                  <TableCell align="left">{promotion.hospitalDetail}</TableCell>
                  <TableCell align="left">{promotion.createAt}</TableCell>
                  {/* <TableCell align="left">{promotion.Url}</TableCell> */}
                  <TableCell align="left">
                    <Link
                      to={"/user/" + promotion.promotionID}
                      className={classes.manageListDetail}
                    >
                      View Detail
                    </Link>
                    <Button
                      className={classes.manageListDelete}
                      onClick={() => {
                        deletePromotion({ variables: { promotionID: promotion.promotionID } });
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

export default ManagePromotion;
