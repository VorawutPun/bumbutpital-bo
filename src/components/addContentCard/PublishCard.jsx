import React, { useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Backdrop,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import PreviewChange from "./PreviewChange";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      border: "solid",
      borderWidth: "1px",
      borderColor: "#D1D1D1",
      borderRadius: "8px",
      marginBottom: "40px",
    },
    header: {
      backgroundColor: "#F8F8F8",
      padding: "16px",
    },
    title: {
      fontSize: "16px",
      fontWeight: 600,
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

const PublishCard = () => {
  const classes = useStyles();
  const [status, setStatus] = useState("");
  const [visibility, setVisibility] = useState("");
  const [publish, setPublish] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleStatusChange = (event) => {
    setStatus(event.target.value );
  };
  const handleVisibilityChange = (
    event
  ) => {
    setVisibility(event.target.value);
  };
  const handlePublishChange = (
    event
  ) => {
    setPublish(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        title={<Typography className={classes.title}>Publish</Typography>}
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
        <Button size="medium" color="primary"           onClick={handleToggle}>
          Preview Changes
        </Button>
        <Backdrop className={classes.backdrop} open={open} >
          <PreviewChange onClick={handleClose}/>
        </Backdrop>
      </CardContent>
      <CardActions className={classes.action}>
        <Button size="small" color="secondary">
          Move to Trash
        </Button>
        <Button variant="contained" size="small" color="primary">
          Post
        </Button>
      </CardActions>
    </Card>
  );
};

export default PublishCard;
