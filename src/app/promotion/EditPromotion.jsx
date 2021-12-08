import React, { useState, useEffect, useRef } from "react";
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
import { UPDATE_PROMOTION } from "../../Graphql/Promotion/Mutation";
import {
  GET_ALL_PROMOTION,
  GET_PROMOTION,
} from "../../Graphql/Promotion/Query";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { GET_ALL_HOSPITAL } from "../../Graphql/Hospital/Quries";
import firebase from "../../firebase/firebase";
import { v4 as uuidv4 } from "uuid";

const EditPromotion = (props) => {
  const promotionId = props.match.params.promotionId;
  const classes = useStyles();
  const history = useHistory();
  const [hospitalId, setHospitalId] = useState("");
  const [title, setTitle] = useState("");
  const [hospitalDetail, setHospitalDetail] = useState("");
  const [Url, setUrl] = useState("");
  const [expiredDate, setExpiredDate] = useState("");
  const [currentHospital, setCurrentHospital] = useState("");
  const [image, setImage] = useState({
    forRender: [],
    forUpload: [],
  });

  const imageInput = useRef();

  const [updatePromotion] = useMutation(UPDATE_PROMOTION, {
    refetchQueries: [GET_ALL_PROMOTION],
  });

  const { data, refetch } = useQuery(GET_PROMOTION, {
    variables: {
      promotionId,
    },
  });

  const { data: queryHospital } = useQuery(GET_ALL_HOSPITAL);

  const submitHandler = async (e) => {
    e.preventDefault();
    let url = Url;
    let hospitalIdOfHospital = hospitalId;
    if (image.forUpload.length > 0) {
      const storage = firebase.storage();
      const storageRef = storage.ref().child(`/content/${uuidv4()}.jpg`);
      const result = await storageRef.put(image.forUpload[0].fileForUpload);
      url = await result.ref.getDownloadURL();
    }
    if (currentHospital) {
      console.log(hospitalIdOfHospital, "sdf")
      hospitalIdOfHospital =
        queryHospital &&
        queryHospital.getAllHospital.find(
          (hospital) => hospital.hospitalName === currentHospital
        ).hospitalID;
    }
    updatePromotion({
      variables: {
        promotionId: promotionId,
        hospitalId: hospitalIdOfHospital,
        title: title,
        hospitalDetail: hospitalDetail,
        Url: url,
        expiredDate: expiredDate,
      },
    });
    refetch();
    history.push("/promotions");
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

  useEffect(() => {
    refetch()
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (data) {
      setTitle(data.getPromotion[0].title);
      setHospitalDetail(data.getPromotion[0].hospitalDetail);
      setUrl(data.getPromotion[0].Url);
      setExpiredDate(data.getPromotion[0].expiredDate);
      setHospitalId(data.getPromotion[0].hospitalId);
    }
  }, [data]);

  const getRenderImage = () => {
    if (image.forRender.length > 0) {
      return image.forRender[0].file;
    }
    return Url;
  };

  return (
    <div className={classes.root}>
      {data &&
        data.getPromotion.map((promotion, promotionId) => (
          <div key={promotionId}>
            <Typography gutterBottom className={classes.title}>
              Edit Promotion
            </Typography>
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
                  defaultValue={promotion.title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <Typography gutterBottom className={classes.profileTitle}>
                  Coupon Code: {promotion.couponCode}
                </Typography>
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
                  rows={10}
                  defaultValue={promotion.hospitalDetail}
                  onChange={(e) => {
                    setHospitalDetail(e.target.value);
                  }}
                />
                <Typography gutterBottom className={classes.profileTitle}>
                  Select Hospital:
                </Typography>
                <Autocomplete
                  id="combo-box-demo"
                  options={queryHospital && queryHospital.getAllHospital}
                  getOptionLabel={(option) => option.hospitalName}
                  onInputChange={(event, newInputValue) => {
                    setCurrentHospital(newInputValue);
                  }}
                  style={{ width: 400 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder={
                        queryHospital &&
                        queryHospital.getAllHospital.find(
                          (hospital) =>
                            hospital.hospitalID === promotion.hospitalId
                        ).hospitalName
                      }
                      variant="outlined"
                    />
                  )}
                />
                <Typography gutterBottom className={classes.profileTitle}>
                  Change Picture:
                </Typography>
                <div>
                  <Button variant="contained" component="label">
                    Choose Photo
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
                    <img
                      className={classes.imageStyle}
                      src={getRenderImage()}
                      alt="ContentPic"
                    />
                  </div>
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
                  defaultValue={promotion.expiredDate}
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
                    onClick={submitHandler}
                  >
                    Edit
                  </Button>
                </Grid>
              </Paper>
            </Card>
          </div>
        ))}
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
      marginTop: "10px",
    },
    imageStyle: {
      width: "100%",
      maxWidth: "200px",
    },
  })
);

export default EditPromotion;
