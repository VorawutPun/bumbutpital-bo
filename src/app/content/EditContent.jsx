import React, { useState, useEffect, useRef } from "react";
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
import { UPDATE_CONTENT } from "../../Graphql/Content/Mutation";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_CONTENT, GET_CONTENT } from "../../Graphql/Content/Queries";
import { depressionSeverity } from "../../utils/util";
import firebase from "../../firebase/firebase";
import { v4 as uuidv4 } from "uuid";

const EditContent = (props) => {
  const contentID = props.match.params.contentID;
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [appropiatePHQSeverity, setAppropiatePHQSeverity] = useState("");
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState({
    forRender: [],
    forUpload: [],
  });

  const imageInput = useRef();

  const [updateContent] = useMutation(UPDATE_CONTENT, {
    refetchQueries: [GET_ALL_CONTENT, GET_CONTENT],
  });

  const { data, error, refetch } = useQuery(GET_CONTENT, {
    variables: {
      contentID,
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let url = pictureUrl;
    if (image.forUpload.length > 0) {
      const storage = firebase.storage();
      const storageRef = storage.ref().child(`/content/${uuidv4()}.jpg`);
      const result = await storageRef.put(image.forUpload[0].fileForUpload);
      url = await result.ref.getDownloadURL();
    }
    updateContent({
      variables: {
        contentID: contentID,
        title: title,
        description: description,
        pictureUrl: url,
        appropiatePHQSeverity: appropiatePHQSeverity,
      },
    });
    history.push("/contents");
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
    if (data) {
      setTitle(data.getContent[0].title);
      setDescription(data.getContent[0].description);
      setPictureUrl(data.getContent[0].pictureUrl);
      setAppropiatePHQSeverity(data.getContent[0].appropiatePHQSeverity);
      refetch();
    }
  }, [data]);

  const getRenderImage = () => {
    if (image.forRender.length > 0) {
      return image.forRender[0].file;
    }
    return data && data.getContent[0].pictureUrl;
  };

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className={classes.root}>
      {data &&
        data.getContent.map((content) => (
          <div key={content.contetID}>
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              className={classes.title}
            >
              Edit Content
            </Typography>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              spacing={3}
            >
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
                  color="primary"
                  defaultValue={content.title}
                  fullWidth
                  id="title"
                  placeholder="Title"
                  required
                  variant="outlined"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
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
                  color="primary"
                  defaultValue={content.description}
                  placeholder="Description"
                  variant="outlined"
                  fullWidth
                  required
                  id="body"
                  multiline
                  rows={20}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <Card className={classes.cardRoot}>
                  <CardHeader
                    title={
                      <Typography className={classes.cardTitle}>
                        Upload photo
                      </Typography>
                    }
                    className={classes.header}
                  />
                  <CardContent className={classes.content}>
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
                  </CardContent>
                </Card>
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
                        aria-label="Depression Severity"
                        name="DepressionSeverity"
                        value={appropiatePHQSeverity}
                        onChange={(e) => {
                          setAppropiatePHQSeverity(e.target.value);
                        }}
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
                      <Typography className={classes.cardTitle}>
                        Publish
                      </Typography>
                    }
                    className={classes.header}
                  />
                  <CardContent className={classes.content}>
                    <Button
                      size="medium"
                      color="primary"
                      onClick={handleToggle}
                    >
                      Preview Changes
                    </Button>
                    <Backdrop className={classes.backdrop} open={open}>
                      <PreviewChange
                        title={title}
                        description={description}
                        pictureUrl={getRenderImage()}
                        onClick={handleClose}
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
                      onClick={submitHandler}
                    >
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
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
      marginBottom: "10px",
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
      marginTop: "10px",
    },
    imageStyle: {
      width: "100%",
      maxWidth: "200px",
    },
  })
);

export default EditContent;
