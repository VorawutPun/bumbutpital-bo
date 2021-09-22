import React from "react";
import { useHistory } from "react-router-dom";
import { Button, makeStyles } from "@material-ui/core";
import classes from "./Landing.module.css";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 12,
    border: 0,
    color: "white",
    width: 200,
    height: 52,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  }
});

const Landing = () => {
  const style = useStyles();
  const history = useHistory();
  const submitHandler = () => {
    history.push("/auth")
  }

  return (
    <div className={classes.landing}>
      <div className={classes.imgContainer}>
        <img
          className={classes.img}
          src="/assets/images/mophLogo.png"
          alt="MoPHLogo"
        />
      </div>
      <div className={classes.quote}>
        <h1>Let we help you, to find the patient</h1>
        <h2>Good Mental health is precise.</h2>
        <Button variant="contained" color="primary" size="large" className={style.root} onClick={submitHandler}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Landing;
