import React, { useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../Graphql/Mutation";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: "32px",
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
  const [value, setValue] = useState("Basic User");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [createUser] = useMutation(CREATE_USER);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const submitHandler = () => {
    createUser({
      variables: {
        name: name,
        surname: surname,
        username: userName,
        password: password,
        email: email,
        phoneNumber: phoneNumber,
      },
    });
    history.push("/users");
  };

  const cancelSubmitHandler = () => {
    history.push("/users");
  };

  return (
    <div className={classes.root}>
      <Typography gutterBottom className={classes.title}>
        Create Staff Account
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
        </Paper>
        <Typography gutterBottom className={classes.addUserTitle}>
          Security
        </Typography>
        <Paper className={classes.paper} elevation={0}>
          <Typography gutterBottom className={classes.profileTitle}>
            User Type Role:
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="userType"
              name="gender1"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="SystemAdministrator"
                control={<Radio color="primary" />}
                label="System Administrator"
              />
              <FormControlLabel
                value="moph"
                control={<Radio color="primary" />}
                label="Ministry of Public Health Staff"
              />
            </RadioGroup>
          </FormControl>
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
