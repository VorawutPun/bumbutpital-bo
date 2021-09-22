import React, { useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Grid, TextField, Typography } from "@material-ui/core";
import PublishCard from "../../components/addContentCard/PublishCard";
import SelectCategoryCard from "../../components/addContentCard/SelectCategoryCard";
import SelectDepressionCard from "../../components/addContentCard/SelectDepressionCard";
// import UploadCard from "../../components/addContentCard/UploadCard";
// import "filepond/dist/filepond.min.css";
import storage from "../../firebase";

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
  })
);

const AddContent = () => {
  const classes = useStyles();
  const [image, setImage] = useState();
  const upload = () => {
    if (image == null) return;
    storage
      .ref(`/images/${image.name}`)
      .put(image)
      .on("state_changed", alert("success"), alert);
  };

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
            label="Title"
            variant="outlined"
            color="primary"
            fullWidth
            required
            id="title"
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
            label="Body"
            variant="outlined"
            color="primary"
            fullWidth
            required
            id="body"
            multiline
            rows={20}
          />
          {/* <UploadCard/> */}
          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <button>Upload</button>
        </Grid>
        <Grid item xs={3}>
          <PublishCard />
          <SelectCategoryCard />
          <SelectDepressionCard />
        </Grid>
      </Grid>
    </div>
  );
};

export default AddContent;
