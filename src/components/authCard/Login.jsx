import React, { useState } from "react";
import classes from "./AuthCard.module.css";
import {
  Button,
  Checkbox,
  makeStyles,
  TextField,
  Link,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { USER_LOGIN } from "../../Graphql/User/Mutation";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 12,
    border: 0,
    color: "white",
    height: 52,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    marginTop: "20px"
  },
});

const Login = ({ onClick }) => {
  const style = useStyles();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(true);

  const [userLogin, { error }] = useMutation(USER_LOGIN);

  if (error) {
    return <h1> {error} </h1>;
  }
  return (
    <div className={classes.authCard}>
      <h1 className={classes.authCardTitle}>Admin Login</h1>
      <div className={classes.authCardForm}>
        <div className={classes.authCardItem}>
          <label>Username</label>
          <TextField
            required
            variant="outlined"
            type="text"
            placeholder="Username"
            className={classes.authCardInput}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            // error={authError}
            // helperText="Incorrect entry."
          />
        </div>
        <div className={classes.authCardItem}>
          <label>Password</label>
          <TextField
            required
            variant="outlined"
            type="password"
            placeholder="Password"
            className={classes.authCardInput}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            // error={authError}
            // helperText="Incorrect entry."
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={style.root}
          onClick={async (e) => {
            e.preventDefault();
            setAuthError(false);
            if (username === "") {
              setAuthError(true);
            }
            if (password === "") {
              setAuthError(true);
            }
            if (username && password) {
              const result = await userLogin({
                variables: {
                  username: username,
                  password: password,
                },
              });
              localStorage.setItem("token", result.data.userLogin.accessToken);
              history.push("/home");
            }
          }}
        >
          Login
        </Button>

      </div>
    </div>
  );
};

export default Login;
