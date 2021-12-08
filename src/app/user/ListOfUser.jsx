import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Button, LinearProgress } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { DELETE_USER } from "../../Graphql/User/Mutation";
import { GET_ALL_USERS, GET_CURRENT_USER } from "../../Graphql/User/Queries";
import { useMutation, useQuery } from "@apollo/client";
import DeleteDialog from "../../components/dialog/DeleteDialog";

const ListOfUsers = () => {
  const classes = useStyles();
  const history = useHistory();
  const { data, loading } = useQuery(GET_ALL_USERS);
  const { data: getUser } = useQuery(GET_CURRENT_USER);
  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_ALL_USERS }],
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
    history.push("/createUser");
  };

  if(!(getUser && getUser.getCurrentUser.map((staff) => staff.role).includes("System Administrator"))){
    return (
      <div className={classes.root}><h1>You can't access this page</h1></div>
    )
  }

  if(loading){
    return <LinearProgress/>
  }

  return (
    <div className={classes.root}>
      <Typography
        className={classes.addTitle}
        gutterBottom
        variant="h1"
        component="h1"
      >
        User Management
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.titleButton}
          onClick={submitHandler}
        >
          Add User
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
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.getAllUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    {user.id}
                  </TableCell>
                  <TableCell align="left">{user.username}</TableCell>
                  <TableCell align="left">{user.name}</TableCell>
                  <TableCell align="left">{user.surname}</TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  <TableCell align="left">{user.role}</TableCell>
                  <TableCell align="left">
                    <Button
                      component={Link}
                      to={"/user/" + user.id}
                      className={classes.manageListDetail}
                    >
                      View Detail
                    </Button>
                    <Button
                      className={classes.manageListDelete}
                      onClick={() => handleDelete(user.id, user.username)}
                    >
                      Delete
                    </Button>
                    {open.show && (
                      <DeleteDialog
                        open={open.show}
                        handleDeleteTrue={() => {
                          handleDeleteTrue();
                          deleteUser({
                            variables: { id: open.id },
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
      flex: "auto",
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

export default ListOfUsers;
