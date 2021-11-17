import React, { useState, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { UPDATE_HOSPITAL } from "../../Graphql/Hospital/Mutation";
import { useHistory } from "react-router-dom";
import { GET_ALL_HOSPITAL, GET_HOSPITAL } from "../../Graphql/Hospital/Quries";
import { useQuery } from "@apollo/client";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: "32px",
      marginTop: "60px",
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
    uploadCard: {
      marginTop: "-40px",
      marginBottom: "-30px",
    },
  })
);

const EditHospital = (props) => {
  const hospitalID = props.match.params.hospitalID;
  const classes = useStyles();
  const history = useHistory();
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalDescription, setHospitalDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [updateHospital] = useMutation(UPDATE_HOSPITAL, {
    refetchQueries: [{ query: GET_ALL_HOSPITAL }],
  });

  const { data } = useQuery(GET_HOSPITAL, {
    variables: {
      hospitalID,
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    updateHospital({
      variables: {
        hospitalID: hospitalID,
        hospitalName: hospitalName,
        hospitalDescription: hospitalDescription,
        imageUrl: imageUrl,
      },
    });
    history.push("/hospitals");
  };

  useEffect(() => {
    if (data) {
      setHospitalName(data.getHospital[0].hospitalName);
      setHospitalDescription(data.getHospital[0].hospitalDescription);
      setImageUrl(data.getHospital[0].imageUrl);
    }
  }, [data]);

  return (
    <div className={classes.root}>
      {data &&
        data.getHospital.map((hospital) => (
          <>
            <Typography gutterBottom className={classes.title}>
              Edit Hospital
            </Typography>
            <Card className={classes.card} elevation={0}>
              <Paper className={classes.paper} elevation={0}>
                <Typography gutterBottom className={classes.profileTitle}>
                  Hospital Name:
                </Typography>
                <TextField
                  className={classes.field}
                  fullWidth
                  placeholder="Hospital Name"
                  variant="outlined"
                  color="primary"
                  size="medium"
                  required
                  id="hospitalName"
                  defaultValue={hospital.hospitalName}
                  onChange={(e) => {
                    setHospitalName(e.target.value);
                  }}
                />
                <Typography gutterBottom className={classes.profileTitle}>
                  Hospital Description:
                </Typography>
                <TextField
                  className={classes.field}
                  color="primary"
                  fullWidth
                  id="hospitalDescription"
                  placeholder="Hospital Description"
                  required
                  variant="outlined"
                  multiline
                  rows={10}
                  defaultValue={hospital.hospitalDescription}
                  onChange={(e) => {
                    setHospitalDescription(e.target.value);
                  }}
                />
                <Typography gutterBottom className={classes.profileTitle}>
                  Hospital Picture Url:
                </Typography>
                <TextField
                  className={classes.field}
                  fullWidth
                  placeholder="Promotion Url"
                  variant="outlined"
                  color="primary"
                  size="medium"
                  required
                  id="Url"
                  defaultValue={hospital.imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                  }}
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
                    onClick={() => {
                      history.push("/promotions");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={submitHandler}
                  >
                    Edit
                  </Button>
                </Grid>
              </Paper>
            </Card>
          </>
        ))}
    </div>
  );
};

export default EditHospital;
