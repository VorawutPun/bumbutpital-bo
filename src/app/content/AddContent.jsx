import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Backdrop,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardActions,
  CardContent,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";

// import PublishCard from "../../components/addContentCard/PublishCard";
// import SelectCategoryCard from "../../components/addContentCard/SelectCategoryCard";
// import SelectDepressionCard from "../../components/addContentCard/SelectDepressionCard";
// import UploadCard from "../../components/addContentCard/UploadCard";
import PreviewChange from "../../components/addContentCard/PreviewChange";
// import "filepond/dist/filepond.min.css";
// import storage from "../../firebase";

import { CREATE_CONTENT } from "../../Graphql/Content/Mutation";

import { useMutation } from "@apollo/client";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: "32px",
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
  })
);

const AddContent = (props) => {
  const classes = useStyles();
  const history = useHistory();
  // const [image, setImage] = useState();

  const [createContent] = useMutation(CREATE_CONTENT);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [updateTime, setUpdateTime] = useState(Date());
  const [pictureUrl, setPictureUrl] = useState("");
  // const [createAt, setCreateAt] = useState(Date());
  const [appropiatePHQSeverity, setAppropiatePHQSeverity] = useState("");

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   createContent({
  //     variables: {
  //       title: title,
  //       description: description,
  //       pictureUrl: pictureUrl,
  //       appropiatePHQSeverity: appropiatePHQSeverity,
  //     },
  //   });
  //   props.history.push("/contents");
  // };

  // const upload = () => {
  //   if (image == null) return;
  //   storage
  //     .ref(`/images/${image.name}`)
  //     .put(image)
  //     .on("state_changed", alert("success"), alert);
  //   console.log(storage);
  // };

  //Upload Card
  const [file, setFile] = useState("");

  const handleChange = (e) => {
    let url = URL.createObjectURL(e.target.files[0]);
    setFile(url);
    console.log(url);
  };

  //Publish Card
  const [status, setStatus] = useState("");
  const [visibility, setVisibility] = useState("");
  const [publish, setPublish] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleVisibilityChange = (event) => {
    setVisibility(event.target.value);
  };
  const handlePublishChange = (event) => {
    setPublish(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  //SelectDepressionCard
  const depressionSeverity = [
    {
      severity: "Minimal Depression",
    },
    {
      severity: "Mild Depression",
    },
    {
      severity: "Moderate Depression",
    },
    {
      severity: "Moderately severe Depression",
    },
    {
      severity: "Severe Depression",
    },
  ];
  // const [value, setValue] = useState("Depression");
  const handleChangeSeverity = (event) => {
    setAppropiatePHQSeverity(event.target.value);
  };

  // const uploadImage = (e) => {
  //   setImage(e.target.files[0]);
  // };

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     let result = await storage
  //       .ref()
  //       .child("Name Of Your Files Map in storage")
  //       .listAll();
  //     let urlPromises = result.items.map((imageRef) =>
  //       imageRef.getDownloadURL()
  //     );

  //     return Promise.all(urlPromises);
  //   };

  //   const loadImages = async () => {
  //     const urls = await fetchImages();
  //     setFiles(urls);
  //   };
  //   loadImages();
  // }, []);

  // console.log(files);

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
            // hiddenLabel
            placeholder="Description"
            variant="outlined"
            color="primary"
            fullWidth
            required
            id="body"
            multiline
            rows={20}
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
            Picture URL :P
          </Typography>
          <TextField
            className={classes.field}
            placeholder="Picture URL"
            variant="outlined"
            color="primary"
            fullWidth
            required
            id="title"
            onChange={(e) => {
              setPictureUrl(e.target.value);
            }}
          />
          <Card className={classes.uploadRoot}>
            <CardHeader
              title={
                <Typography className={classes.cardTitle}>Photo</Typography>
              }
              className={classes.header}
            />
            <TextField
              className={classes.textField}
              id="photo"
              label="Image Upload"
              name="upload-photo"
              type="file"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={handleChange}
            />
            {file.length > 0 && (
              <Card className={classes.paperRoot}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="auto"
                    image={file}
                    title="Contemplative Reptile"
                  />
                </CardActionArea>
              </Card>
            )}
            <Button>Upload</Button>
          </Card>
          {/* <UploadCard
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            onClick={upload}
          /> */}
          {/* <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <button onClick={upload}>Upload</button> */}
          {/* <button>Upload</button> */}
        </Grid>
        <Grid item xs={3}>
          {/* <PublishCard onClick={submitHandler} /> */}
          <Card className={classes.cardRoot}>
            <CardHeader
              title={
                <Typography className={classes.cardTitle}>Publish</Typography>
              }
              className={classes.header}
            />
            <CardContent className={classes.content}>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Typography variant="body2" color="textSecondary" component="p">
                  Status:
                </Typography>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  size="small"
                >
                  <InputLabel id="status">Status</InputLabel>
                  <Select
                    labelId="status"
                    id="status"
                    onChange={handleStatusChange}
                    value={status}
                    label="Status"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Draft"}>Draft</MenuItem>
                    <MenuItem value={"Sent"}>Sent</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Typography variant="body2" color="textSecondary" component="p">
                  Visibility:
                </Typography>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  size="small"
                >
                  <InputLabel id="visibility">Visibility</InputLabel>
                  <Select
                    labelId="visibility"
                    id="visibility"
                    onChange={handleVisibilityChange}
                    value={visibility}
                    label="visibility"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Private"}>Private</MenuItem>
                    <MenuItem value={"Public"}>Public</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Typography variant="body2" color="textSecondary" component="p">
                  Publish:
                </Typography>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  size="small"
                >
                  <InputLabel id="publish">Publish</InputLabel>
                  <Select
                    labelId="publish"
                    id="publish"
                    onChange={handlePublishChange}
                    value={publish}
                    label="publish"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"immediately"}>immediately</MenuItem>
                    <MenuItem value={1}>in 1 hour</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Button size="medium" color="primary" onClick={handleToggle}>
                Preview Changes
              </Button>
              <Backdrop className={classes.backdrop} open={open}>
                <PreviewChange title={title} description={description} file={file} pictureUrl={pictureUrl} onClick={handleClose} />
              </Backdrop>
            </CardContent>
            <CardActions className={classes.action}>
              <Button size="small" color="secondary">
                Move to Trash
              </Button>
              <Button
                variant="contained"
                size="small"
                color="primary"
                type="submit"
                onClick={async (e) => {
                  e.preventDefault();
                  createContent({
                    variables: {
                      title: title,
                      description: description,
                      pictureUrl: pictureUrl,
                      appropiatePHQSeverity: appropiatePHQSeverity,
                    },
                  });
                  history.push("/contents");
                }}
              >
                Post
              </Button>
            </CardActions>
          </Card>
          {/* <SelectCategoryCard /> */}

          {/* <SelectDepressionCard
            onChange={(e) => {
              setAppropiatePHQSeverity(e.target.value);
            }}
          /> */}
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
        </Grid>
      </Grid>
    </div>
  );
};

export default AddContent;
