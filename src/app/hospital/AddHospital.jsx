import React, { useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import UploadCard from "../../components/addContentCard/UploadCard";
import { gql, isApolloError, useMutation } from "@apollo/client";
import { CREATE_HOSPITAL } from "../../Graphql/Hospital/Mutation";
import { useHistory } from "react-router-dom";
import { GET_ALL_HOSPITAL } from "../../Graphql/Hospital/Quries";
import { useForm } from "react-hook-form";

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

const AddHospital = () => {
  const { register, handleSubmit, formState, reset, errors, setError } =
    useForm();
  const classes = useStyles();
  const history = useHistory();
  const [staffID /* setUserId */] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalDescription, setHospitalDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [createHospital, { error, loading }] = useMutation(CREATE_HOSPITAL, {
    refetchQueries: [{ query: GET_ALL_HOSPITAL }],
  });

  // if (loading) return "Submitting...";
  // if (error) return `Submission error! ${error.message}`;
  let errorMessage;

  // if (error) {
  //   if (
  //     error.networkError &&
  //     typeof window !== "undefined" &&
  //     !window.navigator.onLine
  //   ) {
  //     errorMessage = "Sorry, your browser is offline";
  //   } else {
  //     errorMessage = {error};
  //   }
  // }
    
  // const submitHandler = (event) => {
  //   event.preventDefault();
  //   createHospital({
  //     variables: {
  //       staffID: staffID,
  //       hospitalName: hospitalName,
  //       hospitalDescription: hospitalDescription,
  //       imageUrl: imageUrl,
  //     },
  //   });
  //   history.push("/hospitals");
  // }

  const submitHandler = () => {
    try {
      createHospital({
        variables: {
          staffID: staffID,
          hospitalName: hospitalName,
          hospitalDescription: hospitalDescription,
          imageUrl: imageUrl,
        },
      });
      history.push("/hospitals");
    } catch (e) {
      console.log({ e })
      if (isApolloError(e)) {
        for (const gqlError of e.graphQLErrors) {
          if (gqlError.extensions?.code === 'BAD_USER_INPUT') {
            if (Array.isArray(gqlError.extensions?.errors)) {
              for (const fieldError of gqlError.extensions.errors) {
                setError(fieldError.property, { message: fieldError.message });
              }
            }
          }
        }
      }
    }
  };

  return (
    <div className={classes.root}>
      <Typography gutterBottom className={classes.title}>
        Add Hospital
      </Typography>
      {errorMessage && <p>{error.message}</p>}
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
            onChange={(e) => {
              setHospitalName(e.target.value);
            }}
            // {...register('hospitalName', { required: true })}
          />
          {/* {errors.hospitalName && <p>{errors.hospitalName.message}</p>} */}
          {/* {console.log(errors)} */}
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
            onChange={(e) => {
              setHospitalDescription(e.target.value);
            }}
          />
          <Typography gutterBottom className={classes.profileTitle}>
            Hospital Picture:
          </Typography>
          <div className={classes.uploadCard}>
            <UploadCard />
          </div>
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
                history.push("/hospitals");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              // disabled={formState.isSubmitting}
              onClick={submitHandler} 
            >
              Create
            </Button>
          </Grid>
        </Paper>
      </Card>
    </div>
  );
};

export default AddHospital;
