import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    backdropRoot: {
      borderRadius: "14px",
      width: "760px",
    },
    header: {
      backgroundColor: "#6367EA",
      padding: "16px",
      color: "white",
    },
    title: {
      fontSize: "16px",
      fontWeight: 500,
    },
    action: {
      float: "right",
      padding: "16px",
    },
    field: {
      marginBottom: "10px",
    },
  })
);

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

const categoryItems = [
  {
    category: "Depression",
  },
  {
    category: "Health",
  },
];

const EditVideoCard = (props) => {
  const classes = useStyles();

  const handleChangeSeverity = (event) => {
    props.setAppropiatePHQSeverity(event.target.value);
  };

  const handleChangeCategory = (event) => {
    props.setVideoType(event.target.value);
  };
  return (
    <Card>
      <CardHeader
        title={
          <Typography className={classes.title}>Add Youtube Link</Typography>
        }
        className={classes.header}
      />
      <CardContent>
        <TextField
          label="Title"
          variant="outlined"
          color="primary"
          fullWidth
          required
          id="title"
          className={classes.field}
          onChange={(e) => {
            props.setTitle(e.target.value);
          }}
        />
        <TextField
          label="Link"
          variant="outlined"
          color="primary"
          fullWidth
          required
          id="link"
          className={classes.field}
          onChange={(e) => {
            props.setVideoUrl(e.target.value);
          }}
        />
        <TextField
          label="Picture Url"
          variant="outlined"
          color="primary"
          fullWidth
          required
          id="pictureUrl"
          className={classes.field}
          onChange={(e) => {
            props.setPictureUrl(e.target.value);
          }}
        />
        <Typography className={classes.title}>Category</Typography>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="category"
            name="category"
            value={props.videoType}
            onChange={handleChangeCategory}
          >
            {categoryItems.map((item) => (
              <FormControlLabel
                key={item}
                value={item.category}
                control={<Radio color="primary" />}
                label={item.category}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <Typography className={classes.title}>Depression Severity</Typography>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={props.appropiatePHQSeverity}
            onChange={handleChangeSeverity}
          >
            {depressionSeverity.map((severity) => (
              <FormControlLabel
                key={severity}
                value={severity.severity}
                control={<Radio color="primary" />}
                label={severity.severity}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </CardContent>
      <CardActions className={classes.action}>
        <Button size="small" color="secondary" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={props.onClick}
        >
          Post Link
        </Button>
      </CardActions>
    </Card>
  );
};

export default EditVideoCard;
