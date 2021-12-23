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
import { depressionSeverity } from "../../utils/util";

const SelectDepressionCard = (props) => {
  const classes = useStyles();
  const [appropiatePHQSeverity, setAppropiatePHQSeverity] = React.useState(
    props.appropiatePHQSeverity
  );

  const handleChange = (event) => {
    setAppropiatePHQSeverity(event.target.value);
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
            aria-label="depressionSeverity"
            name="depressionSeverity"
            value={appropiatePHQSeverity}
            onChange={handleChange}
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
  );
};

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

export default SelectDepressionCard;
