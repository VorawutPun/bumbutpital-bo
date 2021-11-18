import React, { useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  Grid,
  Paper,
  TextField,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { USER_REGISTER } from "../../Graphql/User/Mutation";
import { GET_ALL_USERS } from "../../Graphql/User/Queries";
import { useHistory } from "react-router-dom";

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
  })
);

const AddUser = () => {
  const classes = useStyles();
  const history = useHistory();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const [createUser] = useMutation(USER_REGISTER, {
    refetchQueries: [{ query: GET_ALL_USERS }],
  });

  const submitHandler = () => {
    if (
      name &&
      surname &&
      username &&
      password &&
      email &&
      phoneNumber &&
      role
    ) {
      createUser({
        variables: {
          name: name,
          surname: surname,
          username: username,
          password: password,
          email: email,
          phoneNumber: phoneNumber,
          role: role,
        },
      });
      history.push("/users");
    }
  };

  const cancelSubmitHandler = () => {
    history.push("/users");
  };

  return (
    <div className={classes.root}>
      <Typography gutterBottom className={classes.title}>
        Create Account
      </Typography>
      <Card className={classes.card} elevation={0}>
        <Typography gutterBottom className={classes.addUserTitle}>
          Profile
        </Typography>
        <Paper className={classes.paper} elevation={0}>
          <Typography gutterBottom className={classes.profileTitle}>
            First Name:
          </Typography>
          <TextField
            className={classes.field}
            fullWidth
            label="First Name"
            variant="outlined"
            color="primary"
            size="medium"
            required
            id="firstName"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Typography gutterBottom className={classes.profileTitle}>
            Last Name:
          </Typography>
          <TextField
            className={classes.field}
            fullWidth
            label="Last Name"
            variant="outlined"
            color="primary"
            size="medium"
            required
            id="lastName"
            onChange={(e) => {
              setSurname(e.target.value);
            }}
          />
          <Typography gutterBottom className={classes.profileTitle}>
            Username:
          </Typography>
          <TextField
            className={classes.field}
            fullWidth
            label="Username"
            variant="outlined"
            color="primary"
            size="medium"
            required
            id="Username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <Typography gutterBottom className={classes.profileTitle}>
            Email:
          </Typography>
          <TextField
            className={classes.field}
            fullWidth
            label="Email"
            variant="outlined"
            color="primary"
            size="medium"
            required
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Typography gutterBottom className={classes.profileTitle}>
            Phone Number:
          </Typography>
          <TextField
            className={classes.field}
            fullWidth
            label="Phone Number"
            variant="outlined"
            color="primary"
            size="medium"
            required
            id="phoneNumber"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
          <Typography gutterBottom className={classes.profileTitle}>
            User Type Role:
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="userType"
              name="gender1"
              value={role}
              onChange={handleChangeRole}
            >
              <FormControlLabel
                value="System Administrator"
                control={<Radio color="primary" />}
                label="System Administrator"
              />
              <FormControlLabel
                value="Ministry of Public Health Staff"
                control={<Radio color="primary" />}
                label="Ministry of Public Health Staff"
              />
            </RadioGroup>
          </FormControl>
        </Paper>
        <Paper className={classes.paper} elevation={0}>
          <Typography gutterBottom className={classes.profileTitle}>
            Password:
          </Typography>
          <TextField
            className={classes.field}
            type="password"
            fullWidth
            label="password"
            variant="outlined"
            color="primary"
            size="medium"
            required
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Typography gutterBottom className={classes.profileTitle}>
            Confirm password:
          </Typography>
          <TextField
            className={classes.field}
            type="password"
            fullWidth
            label="password"
            variant="outlined"
            color="primary"
            size="medium"
            required
            id="password"
            
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
              onClick={cancelSubmitHandler}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              disabled={
                !name ||
                !surname ||
                !username ||
                !password ||
                !email ||
                !phoneNumber ||
                !role
              }
              onClick={submitHandler}
            >
              Create
            </Button>
          </Grid>
        </Paper>
      </Card>
    </div>
  );
};

export default AddUser;
