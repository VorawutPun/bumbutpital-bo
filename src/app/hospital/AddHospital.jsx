import React, { useState, useRef } from "react";
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
import { CREATE_HOSPITAL } from "../../Graphql/Hospital/Mutation";
import { useHistory } from "react-router-dom";
import { GET_ALL_HOSPITAL } from "../../Graphql/Hospital/Quries";
import firebase from "../../firebase/firebase";
import { v4 as uuidv4 } from "uuid";

const AddHospital = () => {
  const classes = useStyles();
  const history = useHistory();
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalDescription, setHospitalDescription] = useState("");

  // Image For Render, Image for Upload
  const [image, setImage] = useState({
    forRender: [],
    forUpload: [],
  });

  const imageInput = useRef();

  const [createHospital] = useMutation(CREATE_HOSPITAL, {
    refetchQueries: [{ query: GET_ALL_HOSPITAL }],
  });

  const submitHandler = async () => {
    if (hospitalName && hospitalDescription && image.forUpload.length > 0) {
      const storage = firebase.storage();
      const storageRef = storage.ref().child(`/hospital/${uuidv4()}.jpg`);
      const result = await storageRef.put(image.forUpload[0].fileForUpload);
      const url = await result.ref.getDownloadURL();
      createHospital({
        variables: {
          hospitalName: hospitalName,
          hospitalDescription: hospitalDescription,
          imageUrl: url,
        },
      });
      history.push("/hospitals");
    }
  };

  const handleImageChange = () => {
    const tempFiles = imageInput.current.files;

    if (tempFiles) {
      const filesArray = Array.from(tempFiles).map((file) => {
        const currentId = uuidv4();
        return {
          render: { id: currentId, file: URL.createObjectURL(file) },
          upload: { id: currentId, fileForUpload: file },
        };
      });

      const newImage = {
        forRender: filesArray.map((obj) => obj.render),
        forUpload: filesArray.map((obj) => obj.upload),
      };

      setImage(newImage);
      imageInput.current.value = null;
    }
  };

  const getRenderImage = () => {
    if (image.forRender.length > 0) {
      return image.forRender[0].file;
    }
  };

  return (
    <div className={classes.root}>
      <Typography gutterBottom className={classes.title}>
        Add Hospital
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
            onChange={(e) => {
              setHospitalDescription(e.target.value);
            }}
          />
          <Typography gutterBottom className={classes.profileTitle}>
            Hospital Picture:
          </Typography>
          <div>
            <Button variant="contained" component="label">
              Upload Picture
              <input
                hidden
                type="file"
                accept="image/png, image/jpeg"
                id="image"
                ref={imageInput}
                onChange={() => handleImageChange()}
              />
            </Button>
            <div className={classes.pictureUrl}>
              {image.forUpload.length > 0 && (
                <img
                  src={getRenderImage()}
                  width="200px"
                  height="200px"
                  alt="hospitalPic"
                />
              )}
            </div>
          </div>
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
              disabled={
                !hospitalName ||
                !hospitalDescription ||
                !image.forUpload.length > 0
              }
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
    pictureUrl: {
      marginTop: "30px",
    },
  })
);

export default AddHospital;
