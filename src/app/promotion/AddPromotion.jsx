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
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PROMOTION } from "../../Graphql/Promotion/Mutation";
import { GET_ALL_PROMOTION } from "../../Graphql/Promotion/Query";
import { useHistory } from "react-router-dom";
import { GET_ALL_HOSPITAL } from "../../Graphql/Hospital/Quries";
import firebase from "../../firebase/firebase";
import { v4 as uuidv4 } from "uuid";

const AddPromotion = () => {
  const classes = useStyles();
  const history = useHistory();
  const [couponCode /* setCouponCode */] = useState("");
  const [title, setTitle] = useState("");
  const [hospitalDetail, setHospitalDetail] = useState("");
  const [expiredDate, setExpiredDate] = useState("");
  const [currentHospital, setCurrentHospital] = useState("");
  const [image, setImage] = useState({
    forRender: [],
    forUpload: [],
  });

  const imageInput = useRef();

  const [createPromotion] = useMutation(CREATE_PROMOTION, {
    refetchQueries: [{ query: GET_ALL_PROMOTION }],
  });

  const { data } = useQuery(GET_ALL_HOSPITAL);

  const submitHandler = async () => {
    if (
      currentHospital &&
      title &&
      hospitalDetail &&
      image.forUpload.length > 0 &&
      expiredDate
    ) {
      const storage = firebase.storage();
      const storageRef = storage.ref().child(`/video/${uuidv4()}.jpg`);
      const result = await storageRef.put(image.forUpload[0].fileForUpload);
      const url = await result.ref.getDownloadURL();
      createPromotion({
        variables: {
          hospitalId:
            data &&
            data.getAllHospital.find(
              (hospital) => hospital.hospitalName === currentHospital
            ).hospitalID,
          title: title,
          hospitalDetail: hospitalDetail,
          couponCode: couponCode,
          Url: url,
          expiredDate: expiredDate,
        },
      });
      history.push("/promotions");
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
      <Typography className={classes.title}>Add Promotion</Typography>
      <Card className={classes.card} elevation={0}>
        <Paper className={classes.paper} elevation={0}>
          <Typography gutterBottom className={classes.profileTitle}>
            Title:
          </Typography>
          <TextField
            className={classes.field}
            fullWidth
            placeholder="Title"
            variant="outlined"
            color="primary"
            size="medium"
            required
            id="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Typography gutterBottom className={classes.profileTitle}>
            Condition:
          </Typography>
          <TextField
            className={classes.field}
            color="primary"
            fullWidth
            id="Hospital"
            placeholder="Condition"
            required
            variant="outlined"
            multiline
            rows={5}
            onChange={(e) => {
              setHospitalDetail(e.target.value);
            }}
          />
          <Typography gutterBottom className={classes.profileTitle}>
            Title:
          </Typography>
          <TextField
            className={classes.field}
            fullWidth
            placeholder="Title"
            variant="outlined"
            color="primary"
            size="medium"
            required
            id="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Typography gutterBottom className={classes.profileTitle}>
            Select Hospital:
          </Typography>
          <Autocomplete
            id="combo-box-demo"
            options={data && data.getAllHospital}
            getOptionLabel={(option) => option.hospitalName}
            onInputChange={(event, newInputValue) => {
              setCurrentHospital(newInputValue);
            }}
            style={{ width: 400 }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Hospital"
                variant="outlined"
              />
            )}
          />
          <Typography gutterBottom className={classes.profileTitle}>
            Upload Promotion Picture:
          </Typography>
          <div>
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
          </div>
          <Typography gutterBottom className={classes.profileTitle}>
            Expired Date:
          </Typography>
          <TextField
            type="datetime-local"
            InputProps={{
              inputProps: {
                min: new Date().toISOString().slice(0, -8),
              },
            }}
            className={classes.field}
            fullWidth
            placeholder="Expired date"
            variant="outlined"
            color="primary"
            size="medium"
            required
            id="expiredDate"
            onChange={(e) => {
              setExpiredDate(e.target.value);
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
              disabled={
                !currentHospital ||
                !title ||
                !hospitalDetail ||
                !image ||
                !expiredDate
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
      margin: "0px 48px",
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

export default AddPromotion;
