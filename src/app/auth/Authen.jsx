import React from "react";
import Login from "../../components/authCard/Login";
import {
  Grid,
  makeStyles,
  AppBar,
  Container,
  Typography,
  Toolbar,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#ecf2ff",
    width: "100%",
    height: "100%",
    padding: "100px auto",
  },
  logoContainer: {
    textAlign: "center",
  },
  login: {
    justifyContent: "center",
    margin: "150px 100px 200px 100px",
  },
  footer: {
    backgroundColor: "white",
  },
}));

const Authen = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={6}>
            <div className={classes.logoContainer}>
              <img
                src="/assets/images/BPTLogo.png"
                alt="BPT logo"
                width="300"
                height="300"
              />
              <h1>BUMBUTPITAL</h1>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={classes.login}>
              <Login />
            </div>
          </Grid>
        </Grid>
        <AppBar position="static" style={{ backgroundColor: "white", color: "black" }} elevation={0}>
          <Container maxWidth="md">
            <Toolbar>
              <Typography variant="body1" color="inherit">
                © 2021 Bumbutpital
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
      </Grid>
    </div>
  );
};

export default Authen;
