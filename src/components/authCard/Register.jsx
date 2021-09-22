import React from "react";
import classes from "./AuthCard.module.css";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 12,
    border: 0,
    color: "white",
    height: 52,
    padding: "0 30px",
    margin: "13px 0",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
});

const Register = ({ onClick }) => {
  const style = useStyles();

  return (
    <div className={classes.authCard}>
      <h1 className={classes.authCardTitle}>Admin Login</h1>
      <form className={classes.authCardForm}>
        <div className={classes.authCardItem}>
          <label>First name</label>
          <input
            type="text"
            placeholder="First name"
            className={classes.authCardInput}
          />
        </div>
        <div className={classes.authCardItem}>
          <label>Last name</label>
          <input
            type="text"
            placeholder="Last name"
            className={classes.authCardInput}
          />
        </div>
        <div className={classes.authCardItem}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            className={classes.authCardInput}
          />
        </div>
        <div className={classes.authCardItem}>
          <label>Email</label>
          <input
            type="text"
            placeholder="Email"
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
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={style.root}
          onClick={onClick}
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
