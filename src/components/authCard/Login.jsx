import React, { useState } from "react";
import classes from "./AuthCard.module.css";
import { Button, Checkbox, Link, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 12,
    border: 0,
    color: "white",
    height: 52,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
});

const Login = ({onClick}) => {
  const style = useStyles();
  const history = useHistory();
  const [checked, setChecked] = useState(true);

  const submitHandler = () => {
    history.push("/home");
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className={classes.authCard}>
      <h1 className={classes.authCardTitle}>Admin Login</h1>
      <div className={classes.authCardForm}>
        <div className={classes.authCardItem}>
          <label>Username or Email</label>
          <input
            type="text"
            placeholder="Username"
            className={classes.authCardInput}
          />
        </div>
        <div className={classes.authCardItem}>
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            className={classes.authCardInput}
          />
        </div>
        <div className={classes.authCheckbox}>
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          <span>Remember me</span>
        </div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={style.root}
          onClick={submitHandler}
        >
          Login
        </Button>
        <Link onClick={onClick} className={classes.authLink}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
