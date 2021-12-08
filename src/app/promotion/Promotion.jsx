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
import { Avatar } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { GET_ALL_PROMOTION } from "../../Graphql/Promotion/Query";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_PROMOTION } from "../../Graphql/Promotion/Mutation";
import { GET_ALL_HOSPITAL } from "../../Graphql/Hospital/Quries";
import DeleteDialog from "../../components/dialog/DeleteDialog";

const ManagePromotion = () => {
  const history = useHistory();
  const classes = useStyles();
  const { data } = useQuery(GET_ALL_PROMOTION);
  const { data: queryHospital } = useQuery(GET_ALL_HOSPITAL);
  const [deletePromotion] = useMutation(DELETE_PROMOTION, {
    refetchQueries: [{ query: GET_ALL_PROMOTION }],
  });

  const [open, setOpen] = React.useState({
    show: false,
    id: null,
    title: "",
  });

  const handleDelete = (id, title) => {
    setOpen({
      show: true,
      id,
      title,
    });
  };

  const handleDeleteTrue = () => {
    if (open.show && open.id) {
      setOpen({
        show: false,
        id: null,
        title: "",
      });
    }
  };

  const handleDeleteFalse = () => {
    setOpen({
      show: false,
      id: null,
    });
  };

  const submitHandler = () => {
    history.push("/promotion/add");
  };

  let hospitalID =
    queryHospital &&
    queryHospital.getAllHospital.find((hospital) => hospital.hospitalID);

  console.log(hospitalID);

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
              <TableCell align="left">Create At</TableCell>
              <TableCell align="left">Expired Date</TableCell>
              <TableCell align="left">Picture</TableCell>
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
                  <TableCell align="left">
                    {hospitalID !== promotion.hospitalId
                      ? (hospitalID = "")
                      : queryHospital &&
                        queryHospital.getAllHospital.find(
                          (hospital) =>
                            hospital.hospitalID === promotion.hospitalId
                        ).hospitalName}
                    {/* 
                    {queryHospital &&
                      queryHospital.getAllHospital.find(
                        (hospital) =>
                          hospital.hospitalID === promotion.hospitalId
                      ).hospitalName} */}
                  </TableCell>
                  <TableCell align="left">
                    {new Date(promotion.createAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="left">{promotion.expiredDate}</TableCell>
                  <TableCell align="left">
                    <Avatar
                      alt="Remy Sharp"
                      src={promotion.Url}
                      style={{ width: 56, height: 56 }}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      component={Link}
                      to={"/promotion/" + promotion.promotionId}
                      className={classes.manageListDetail}
                    >
                      View Detail
                    </Button>
                    <Button
                      className={classes.manageListDelete}
                      onClick={() =>
                        handleDelete(promotion.promotionId, promotion.title)
                      }
                    >
                      Delete
                    </Button>
                    {open.show && (
                      <DeleteDialog
                        open={open.show}
                        handleDeleteTrue={() => {
                          handleDeleteTrue();
                          deletePromotion({
                            variables: { promotionId: open.id },
                          });
                        }}
                        handleDeleteFalse={handleDeleteFalse}
                        title={open.title}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

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
    paperpong: {
      textAlign: "center",
    },
  })
);

export default ManagePromotion;
