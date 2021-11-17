import React, { useState, useEffect } from "react";
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

const EditContent = (props) => {
  const contentID = props.match.params.contentID;
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [appropiatePHQSeverity, setAppropiatePHQSeverity] = useState("");

  const [updateContent] = useMutation(UPDATE_CONTENT, {
    refetchQueries: [GET_ALL_CONTENT, GET_CONTENT],
  });

  const { data } = useQuery(GET_CONTENT, {
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

  const submitHandler = (e) => {
    e.preventDefault();
    updateContent({
      variables: {
        contentID: contentID,
        title: title,
        description: description,
        pictureUrl: pictureUrl,
        appropiatePHQSeverity: appropiatePHQSeverity,
      },
    });
    console.log(appropiatePHQSeverity)
    history.push("/contents");
  };

  useEffect(() => {
    // console.log(data, "DATA");
    if (data) {
      setTitle(data.getContent[0].title);
      setDescription(data.getContent[0].description);
      setPictureUrl(data.getContent[0].pictureUrl);
      setAppropiatePHQSeverity(data.getContent[0].appropiatePHQSeverity);
    }
  }, [data]);
  // console.log(data);

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
                  color="primary"
                  defaultValue={content.pictureUrl}
                  placeholder="Picture URL"
                  variant="outlined"
                  fullWidth
                  required
                  id="title"
                  onChange={(e) => {
                    setPictureUrl(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={3}>
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
                      onClick={submitHandler}
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
                        onChange={(e) => {setAppropiatePHQSeverity(e.target.value)}}
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
        ))}
    </div>
  );
};

export default EditContent;
