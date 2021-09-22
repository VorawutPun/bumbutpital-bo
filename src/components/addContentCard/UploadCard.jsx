import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  makeStyles,
  TextField,
  CardHeader,
  Grid,
} from "@material-ui/core";


const useStyles = makeStyles({
    root: {
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
    title: {
      fontSize: "16px",
      fontWeight: 600,
    },
    textField: {
      margin: "20px"
    },
    image: {
      width: "90%",
      height: "35%",
      margin: "8px",
    },
    paperRoot: {
      maxWidth: 345,
        padding: "30px"
    },
  }
);

const UploadCard = () => {
  const classes = useStyles();
  const [file, setFile] = useState("");

  const handleChange = (e) => {
    let url = URL.createObjectURL(e.target.files[0]);
    setFile(url);
    console.log(url);
  };

  return (
    <Grid item xs={6}>
      <Card className={classes.root}>
        <CardHeader
          title={<Typography className={classes.title}>Photo</Typography>}
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
      </Card>
    </Grid>
  );
};

export default UploadCard;
