import React from "react";
import classes from "./Chart.module.css";
import GaugeChart from "react-gauge-chart";

const ChartDashBoard = (props) => {
  const chartStyle = {
    height: 243,
    width: 540,
  };

  return (
    <div className={classes.chart}>
      <h3 className={classes.chartTitle}>
        Average PHQ-9 score of All User in the System is {props.totalScore.toFixed(2)}
      </h3>
      
      <GaugeChart
        nrOfLevels={5}
        colors={["#20CBFE", "#32D475", "#FFBC17", "#E76849", "#F14949"]}
        arcWidth={0.1}
        percent={props.totalScore / 27}
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
