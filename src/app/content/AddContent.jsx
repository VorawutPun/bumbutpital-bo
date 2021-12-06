import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Backdrop,
  Button,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import PreviewChange from "../../components/addContentCard/PreviewChange";
import { CREATE_CONTENT } from "../../Graphql/Content/Mutation";
import { useMutation } from "@apollo/client";
import { GET_ALL_CONTENT } from "../../Graphql/Content/Queries";
import { depressionSeverity } from "../../utils/util";
import firebase from "../../firebase/firebase";
import { v4 as uuidv4 } from "uuid";

const AddContent = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [appropiatePHQSeverity, setAppropiatePHQSeverity] = useState("");
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState({
    forRender: [],
    forUpload: [],
  });

  const imageInput = useRef();

  const [createContent, { error }] = useMutation(CREATE_CONTENT, {
    refetchQueries: [{ query: GET_ALL_CONTENT }],
  });

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleChangeSeverity = (event) => {
    setAppropiatePHQSeverity(event.target.value);
  };

  const submitHandler = async () => {
    if (
      title &&
      description &&
      appropiatePHQSeverity &&
      image.forUpload.length > 0
    ) {
      const storage = firebase.storage();
      const storageRef = storage.ref().child(`/content/${uuidv4()}.jpg`);
      const result = await storageRef.put(image.forUpload[0].fileForUpload);
      const url = await result.ref.getDownloadURL();
      createContent({
        variables: {
          title: title,
          description: description,
          pictureUrl: url,
          appropiatePHQSeverity: appropiatePHQSeverity,
        },
      });
      history.push("/contents");
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

  let errorMessage;
  if (error) {
    errorMessage = { error };
  }

  return (
    <div className={classes.root}>
      <Typography
        variant="h1"
        component="h1"
        gutterBottom
        className={classes.title}
      >
        Add Content
      </Typography>
      <Grid container direction="row" justifyContent="flex-start" spacing={3}>
        <Grid item xs={9}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            className={classes.textTitle}
          >
            Title
          </Typography>
          <TextField
            className={classes.field}
            placeholder="Title"
            variant="outlined"
            color="primary"
            fullWidth
            required
            id="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          {errorMessage && <p>{errorMessage}</p>}
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            className={classes.textTitle}
          >
            Body
          </Typography>
          <TextField
            className={classes.field}
            placeholder="Description"
            variant="outlined"
            color="primary"
            fullWidth
            required
            id="body"
            multiline
            rows={15}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            className={classes.textTitle}
          >
            Upload Picture
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
          {/* <TextField
            className={classes.field}
            placeholder="Picture URL"
            variant="outlined"
            color="primary"
            fullWidth
            required
            id="pictureUrl"
            onChange={(e) => {
              setPictureUrl(e.target.value);
            }}
          /> */}
        </Grid>
        <Grid item xs={3}>
          <Card className={classes.cardRoot}>
            <CardHeader
              title={
                <Typography className={classes.cardTitle}>
                  Depression Severity
                </Typography>
              }
              className={classes.header}
            />
            <CardContent>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={appropiatePHQSeverity}
                  onChange={handleChangeSeverity}
                >
                  {depressionSeverity.map((item) => (
                    <FormControlLabel
                      key={item.severity}
                      value={item.severity}
                      control={<Radio color="primary" />}
                      label={item.severity}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>
          <Card className={classes.cardRoot}>
            <CardHeader
              title={
                <Typography className={classes.cardTitle}>Publish</Typography>
              }
              className={classes.header}
            />
            <CardContent className={classes.content}>
              <Button size="medium" color="primary" onClick={handleToggle}>
                Preview Changes
              </Button>
              <Backdrop className={classes.backdrop} open={open}>
                <PreviewChange
                  title={title}
                  description={description}
                  onClick={handleClose}
                  getRenderImage={getRenderImage}
                />
              </Backdrop>
            </CardContent>
            <CardActions className={classes.action}>
              <Button
                size="small"
                color="secondary"
                onClick={() => {
                  history.push("/contents");
                }}
              >
                cancel
              </Button>
              <Button
                variant="contained"
                size="small"
                color="primary"
                type="submit"
                disabled={
                  !title || !description || !appropiatePHQSeverity || !image
                }
                onClick={submitHandler}
              >
                Publish
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
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
      fontSize: "32px",
      fontWeight: 600,
    },
    paper: {
      padding: "30px",
      margin: "auto",
      maxWidth: 500,
      backgroundColor: "#FFFFFF",
    },
    textTitle: {
      paddingTop: "24px",
      fontSize: "24px",
      fontWeight: 400,
    },
    field: {
      display: "block",
      marginRight: "10px",
    },
    uploadRoot: {
      border: "solid",
      borderWidth: "1px",
      borderColor: "#D1D1D1",
      borderRadius: "8px",
      marginBottom: "40px",
      marginTop: "40px",
    },
    header: {
      backgroundColor: "#F8F8F8",
      padding: "16px",
    },
    cardTitle: {
      fontSize: "16px",
      fontWeight: 600,
    },
    textField: {
      margin: "20px",
    },
    image: {
      width: "90%",
      height: "35%",
      margin: "8px",
    },
    paperRoot: {
      maxWidth: 345,
      padding: "30px",
    },
    cardRoot: {
      border: "solid",
      borderWidth: "1px",
      borderColor: "#D1D1D1",
      borderRadius: "8px",
      marginBottom: "40px",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 100,
    },
    content: {
      alignItems: "center",
    },
    action: {
      backgroundColor: "#F8F8F8",
      justifyContent: "space-between",
      padding: "16px",
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    pictureUrl: {
      marginTop: "30px",
    },
  })
);

export default AddContent;
