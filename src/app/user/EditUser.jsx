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
import { GET_USER } from "../../Graphql/User/Queries";
import Chart from "../../components/dashboardCard/Chart";
// import ForumCard from "../../components/forumCard/ForumCard";
// import OverviewInfo from "../../components/dashboardCard/OvervewInfo";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";

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

const EditUser = (props) => {
  const id = props.match.params.id;
  const classes = useStyles();
  const history = useHistory();

  const [value, setValue] = useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const { data } = useQuery(GET_USER, {
    variables: {
      id,
    },
  });

  return (
    <div className={classes.root}>
      {data &&
        data.getUser.map((user) => (
          <>
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
                    placeholder="Username"
                    variant="outlined"
                    color="primary"
                    size="medium"
                    required
                    id="Username"
                    defaultValue={user.username}
                  />
                  <Typography gutterBottom className={classes.profileTitle}>
                    First Name:
                  </Typography>
                  <TextField
                    className={classes.field}
                    fullWidth
                    placeholder="First Name"
                    variant="outlined"
                    color="primary"
                    size="medium"
                    required
                    id="firstName"
                    defaultValue={user.name}
                  />
                  <Typography gutterBottom className={classes.profileTitle}>
                    Last Name:
                  </Typography>
                  <TextField
                    className={classes.field}
                    fullWidth
                    placeholder="Last Name"
                    variant="outlined"
                    color="primary"
                    size="medium"
                    required
                    id="lastName"
                    defaultValue={user.surname}
                  />
                  <Typography gutterBottom className={classes.profileTitle}>
                    Email:
                  </Typography>
                  <TextField
                    className={classes.field}
                    fullWidth
                    placeholder="Email"
                    variant="outlined"
                    color="primary"
                    size="medium"
                    required
                    id="Email"
                    defaultValue={user.email}
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
                    defaultValue={user.phoneNumber}
                  />
                </Paper>
                <Paper className={classes.paper} elevation={0}>
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
                      onClick={() => {
                        history.push("/users");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button variant="contained" color="primary" size="large">
                      Edit
                    </Button>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Chart appropiatePHQSeverity={user.appropiatePHQSeverity} />
                {/* will change later */}
                {/* <OverviewInfo /> */}
                {/* <ForumCard /> */}
              </Grid>
            </Grid>
          </>
        ))}
    </div>
  );
};

export default EditUser;
