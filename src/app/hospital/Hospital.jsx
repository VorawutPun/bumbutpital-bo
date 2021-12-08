import React, { useEffect } from "react";
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
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_HOSPITAL, GET_HOSPITAL } from "../../Graphql/Hospital/Quries";
import { DELETE_HOSPITAL } from "../../Graphql/Hospital/Mutation";
import DeleteDialog from "../../components/dialog/DeleteDialog";
import { GET_ALL_PROMOTION } from "../../Graphql/Promotion/Query";

const ManageHospital = () => {
  const history = useHistory();
  const classes = useStyles();
  const { data, error, refetch } = useQuery(GET_ALL_HOSPITAL);
  const [deleteHospital] = useMutation(DELETE_HOSPITAL, {
    refetchQueries: [GET_ALL_HOSPITAL, GET_HOSPITAL, GET_ALL_PROMOTION],
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
    history.push("/hospital/add");
  };

  useEffect(() => {
    refetch();
    //eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <Typography
        className={classes.addTitle}
        gutterBottom
        variant="h1"
        component="h1"
      >
        Hospital Management
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.titleButton}
          onClick={submitHandler}
        >
          Add Hospital
        </Button>
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Picture</TableCell>
              <TableCell align="left">Hospital Name</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.getAllHospital.map((hospital) => (
                <TableRow key={hospital.hospitalID}>
                  <TableCell align="left">
                    <Avatar
                      alt="Remy Sharp"
                      src={hospital.imageUrl}
                      style={{ width: 56, height: 56 }}
                    />
                  </TableCell>
                  <TableCell align="left">{hospital.hospitalName}</TableCell>
                  <TableCell align="left">
                    <Button
                      onClick={() => refetch()}
                      component={Link}
                      to={"/hospital/" + hospital.hospitalID}
                      className={classes.manageListDetail}
                    >
                      View Detail
                    </Button>
                    <Button
                      className={classes.manageListDelete}
                      onClick={() => handleDelete(hospital.hospitalID, hospital.hospitalName)}
                    >
                      Delete
                    </Button>
                    {open.show && (
                      <DeleteDialog
                        open={open.show}
                        handleDeleteTrue={() => {
                          handleDeleteTrue();
                          deleteHospital({
                            variables: { hospitalID: open.id },
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

export default ManageHospital;
