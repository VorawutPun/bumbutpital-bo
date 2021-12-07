import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Button, Card, CardContent, Chip, Typography } from "@material-ui/core";
import { GET_USER } from "../../Graphql/User/Queries";
import Chart from "../../components/userProfile/Chart";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import TotalForumCard from "../../components/dashboardCard/TotalForumCard";
// import ForumUserCard from "../../components/userProfile/ForumUserCard";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flex: "auto",
      padding: "32px",
      marginTop: "60px",
    },
    title: {
      fontSize: "32px",
      fontWeight: 600,
    },
    name: {
      fontSize: "30px",
      fontWeight: 600,
    },
    overview: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      padding: "24px 0px 0px 0px",
    },
    card: {
      width: "100%",
      maxWidth: 500,
      maxHeight: 300,
      backgroundColor: "#ecf2ff",
      borderRadius: "10px",
      marginRight: "24px",
      boxShadow: "none",
    },
    titleButton: {
      background: "#6367EA",
      borderRadius: 5,
      border: 0,
      color: "white",
      height: 36,
      float: "right",
    },
  })
);

const Profile = (props) => {
  const id = props.match.params.id;
  const classes = useStyles();
  const history = useHistory();
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
              User Profile
              <Button
                variant="outlined"
                onClick={() => {
                  history.push("/users");
                }}
                className={classes.titleButton}
              >
                Done
              </Button>
            </Typography>
            <div className={classes.overview}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography className={classes.name} gutterBottom>
                    {user.name} {user.surname}
                    <Chip label={user.role} />
                  </Typography>
                  <Typography variant="h5" component="h2">
                    Email
                  </Typography>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {user.email}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    Phone Number
                  </Typography>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {user.phoneNumber}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    Registeration Time
                  </Typography>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {user.createdAt}{user.appropiatePHQSeverityScore}
                  </Typography>
                </CardContent>
              </Card>
              <TotalForumCard />
              <Chart
                appropiatePHQSeverityScore={user.appropiatePHQSeverityScore}
                appropiatePHQSeverity={user.appropiatePHQSeverity}
              />
              {/* <ForumUserCard userId={id}/> */}
            </div>
          </>
        ))}
    </div>
  );
};

export default Profile;
