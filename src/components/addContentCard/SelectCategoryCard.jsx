import React, {useState} from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { categoryItems } from "../../utils/util";

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
  })
);

const SelectCategoryCard = (props) => {
  const classes = useStyles();
  const [videoValue, setVideoValue] = useState(props.videoType);

  const handleChange = (e) => {
    setVideoValue(e.target.value);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          <Typography className={classes.title}>Categories</Typography>
        }
        className={classes.header}
      />
      <CardContent>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="category"
            name="category"
            value={videoValue}
            onChange={handleChange}
          >
            {categoryItems.map((item) => (
              <FormControlLabel
                key={item.category}
                value={item.category}
                control={<Radio color="primary" />}
                label={item.category}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default SelectCategoryCard;
