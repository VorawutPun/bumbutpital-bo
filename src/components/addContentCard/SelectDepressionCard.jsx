import React from "react";
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

const SelectDepressionCard = () => {
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

  const classes = useStyles();

  const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          <Typography className={classes.title}>Depression Severity</Typography>
        }
        className={classes.header}
      />
      <CardContent>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={value}
            onChange={handleChange}
          >
            {depressionSeverity.map((item) => (
              <FormControlLabel
                value={item.severity}
                control={<Radio color="primary" />}
                label={item.severity}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default SelectDepressionCard;
