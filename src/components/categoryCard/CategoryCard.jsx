import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
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
  })
);

const CategoryCard = ({ onClick }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          <Typography className={classes.title}>Add Category</Typography>
        }
        className={classes.header}
      />
      <CardContent>
        <TextField
          label="New category"
          variant="outlined"
          color="primary"
          fullWidth
          required
          id="category"
        />
      </CardContent>
      <CardActions className={classes.action}>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={onClick}
        >
          Add category
        </Button>
      </CardActions>
    </Card>
  );
};

export default CategoryCard;
