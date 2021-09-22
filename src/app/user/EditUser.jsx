import React, { useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import { Person } from "@material-ui/icons";
import Chart from "../../components/dashboardCard/Chart";
import ForumCard from "../../components/forumCard/ForumCard";
import OverviewInfo from "../../components/dashboardCard/OvervewInfo";
// import { GET_ALL_USERS } from "../../Graphql/Queries";
// import { useQuery } from "@apollo/client";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flex: "auto",
      padding: "32px",
    },
    title: {
      fontSize: "34px",
      fontWeight: 600,
    },
    card: {
      margin: "20px 48px",
      justifyContent: "center",
    },
    addUserTitle: {
      fontSize: "24px",
      fontWeight: 500,
      alignItems: "center",
      margin: "0px 48px",
      width: "600px",
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
      marginTop: "24px",
    },
    button: {
      marginLeft: "20px",
    },
    avatar: {
      width: "160px",
      height: "160px",
      marginLeft: "210px",
    },
    avatarIcon: {
      width: "120px",
      height: "120px",
    },
  })
);

const EditUser = () => {
  const classes = useStyles();

  const [value, setValue] = useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // const { data } = useQuery(GET_ALL_USERS);

  return (
    <div className={classes.root}>
      <Typography gutterBottom className={classes.title}>
        Edit User
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid item xs={6}>
          <Paper className={classes.paper} elevation={0}>
            <Avatar className={classes.avatar}>
              <Person className={classes.avatarIcon} />
            </Avatar>
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
            />
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
            />
            <Typography gutterBottom className={classes.profileTitle}>
              Nickname:
            </Typography>
            <TextField
              className={classes.field}
              fullWidth
              label="Nickname"
              variant="outlined"
              color="primary"
              size="medium"
              required
              id="nickname"
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
              id="Email"
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
            />
          </Paper>
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
                  value="basicUser"
                  control={<Radio color="primary" />}
                  label="Basic User"
                />
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
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              className={classes.buttonGroup}
            >
              <Button color="secondary" size="large">
                Cancel
              </Button>
              <Button variant="contained" color="primary" size="large">
                Edit
              </Button>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Chart />
          {/* will change later */}
          <OverviewInfo />
          <ForumCard />
        </Grid>
      </Grid>
    </div>
  );
};

export default EditUser;
