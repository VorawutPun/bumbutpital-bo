import React from "react";
import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { GET_ALL_USERS } from "../../Graphql/User/Queries";
import { useQuery } from "@apollo/client";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      borderRadius: "14px",
      width: "760px",
    },
    header: {
      backgroundColor: "#EA6363",
      padding: "16px",
      color: "white",
    },
    title: {
      fontSize: "16px",
      fontWeight: 500,
    },
    action: {
      float: "right",
      padding: "16px",
    },
    field: {
      marginBottom: "10px",
      [`& fieldset`]: {
        borderRadius: 0,
      },
    },
  })
);

const UrgentCard = (props) => {
  const classes = useStyles();
  const { data: queryUser } = useQuery(GET_ALL_USERS);

  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          <Typography className={classes.title}>Answer To Username</Typography>
        }
        className={classes.header}
      />
      <CardContent>
        <Typography className={classes.title}>Username:</Typography>
        <Typography className={classes.title}>
          {queryUser &&
            queryUser.getAllUsers.find((user) => user.id === props.userID)
              .username}
        </Typography>
        <Typography className={classes.title}>Name:</Typography>
        <Typography className={classes.title}> </Typography>
        <Typography className={classes.title}>Phone Number:</Typography>
        <Typography className={classes.title}> </Typography>
        <Typography className={classes.title}>Email:</Typography>
        <Typography className={classes.title}> </Typography>
      </CardContent>
      {/* <CardActions className={classes.action}>

      </CardActions> */}
    </Card>
  );
};

export default UrgentCard;
