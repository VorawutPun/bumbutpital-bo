import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";
  
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
      content: {
        alignItems: "center",
      },
      contentTitle: {
        fontSize: "14px",
        fontWeight: 600,
        textDecoration: "underline",
        textDecorationThickness: "6px",
        textDecorationColor: "#FFB55E",
        "&:hover": {
          textDecoration: "none",
        },
      },
      paper: {
        padding: "0px 12px",
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 100,
      },
      action: {
        padding: "0px 16px 16px 16px",
      },
      button: {
        color: "#6367EA",
      },
    })
  );
  
  const SelectCategoryCard = () => {
    const categoryItems = [
      {
        category: "Uncategorized",
      },
      {
        category: "Depression",
      },
      {
        category: "Health",
      },
    ];
  
    const classes = useStyles();
    const [state, setState] = useState(categoryItems);
  
    const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    };
  
    return (
      <Card className={classes.root}>
        <CardHeader
          title={<Typography className={classes.title}>Categories</Typography>}
          className={classes.header}
        />
        <CardContent className={classes.content}>
          <Typography className={classes.contentTitle}>All Categories</Typography>
          <Paper className={classes.paper}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormGroup>
                {categoryItems.map((item) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        //   checked={item.category}
                        onChange={handleChange}
                        name={item.category}
                        color="primary"
                      />
                    }
                    label={item.category}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Paper>
        </CardContent>
        <CardActions className={classes.action}>
          <Button size="small" className={classes.button}>
            <Add />
            Add New Category
          </Button>
        </CardActions>
      </Card>
    );
  };
  
  export default SelectCategoryCard;
  