import React, { useState } from "react";
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
  })
);

const AddContent = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [createContent, { error }] = useMutation(CREATE_CONTENT, {
    refetchQueries: [{ query: GET_ALL_CONTENT }],
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [appropiatePHQSeverity, setAppropiatePHQSeverity] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleChangeSeverity = (event) => {
    setAppropiatePHQSeverity(event.target.value);
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
            Picture URL
          </Typography>
          <TextField
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
          />
        </Grid>
        <Grid item xs={3}>
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
                  pictureUrl={pictureUrl}
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
                disabled={
                  !title ||
                  !description ||
                  !pictureUrl ||
                  !appropiatePHQSeverity
                }
                onClick={() => {
                  if (
                    title &&
                    description &&
                    pictureUrl &&
                    appropiatePHQSeverity
                  ) {
                    createContent({
                      variables: {
                        title: title,
                        description: description,
                        pictureUrl: pictureUrl,
                        appropiatePHQSeverity: appropiatePHQSeverity,
                      },
                    });
                    history.push("/contents");
                  }
                }}
              >
                Post
              </Button>
            </CardActions>
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
