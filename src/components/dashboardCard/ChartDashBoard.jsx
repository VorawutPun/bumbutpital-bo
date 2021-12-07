import React from "react";
import classes from "./Chart.module.css";
import GaugeChart from "react-gauge-chart";
import { useQuery } from "@apollo/client";
import { TOTAL_PHQ9, COUNT_USER } from "../../Graphql/User/Queries";

const ChartDashBoard = (props) => {
  const chartStyle = {
    height: 243,
    width: 540,
  };
  const { data } = useQuery(TOTAL_PHQ9);
  const { data: countUser } = useQuery(COUNT_USER);

  return (
    <div className={classes.chart}>
      <h3 className={classes.chartTitle}>
        Average PHQ-9 score {props.totalScore}
      </h3>
      {props.totalScore >= 0 && props.totalScore <= 4 && (
        <h3 className={classes.chartPHQ}>Minimal Depression</h3>
      )}
      {props.totalScore > 4 && props.totalScore<= 9 && (
        <h3 className={classes.chartPHQ}>Mild Depression</h3>
      )}
      {props.totalScore > 9 && props.totalScore <= 14 && (
        <h3 className={classes.chartPHQ}>Moderate Depression</h3>
      )}
      {props.totalScore > 14 && props.totalScore<= 19 && (
        <h3 className={classes.chartPHQ}>Moderately severe Depression</h3>
      )}
      {props.totalScore > 19 && props.totalScore <= 27 && (
        <h3 className={classes.chartPHQ}>Severe Depression</h3>
      )}
      <GaugeChart
        nrOfLevels={5}
        colors={["#20CBFE", "#32D475", "#FFBC17", "#E76849", "#F14949"]}
        arcWidth={0.1}
        percent={data && data.totalPHQ9 / 27}
        hideText
        cornerRadius={4}
        arcPadding={0}
        style={chartStyle}
        className={classes.gaugeChart}
        textColor="#00000"
      />
    </div>
  );
};

export default ChartDashBoard;
