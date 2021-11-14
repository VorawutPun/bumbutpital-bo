import React from "react";
import classes from "./Chart.module.css";
import GaugeChart from "react-gauge-chart";
import { useQuery } from "@apollo/client";
import { TOTAL_PHQ9 } from "../../Graphql/User/Queries";

const ChartDashBoard = () => {
  const chartStyle = {
    height: 243,
    width: 540,
  };
  const { data } = useQuery(TOTAL_PHQ9);

  return (
    <div className={classes.chart}>
      <h3 className={classes.chartTitle}>
        Average PHQ-9 score {data && data.totalPHQ9.toFixed(2)}
      </h3>
      {data && data.totalPHQ9 >= 0 && data.totalPHQ9 <= 4 && (
        <h3 className={classes.chartPHQ}>Minimal Depression</h3>
      )}
      {data && data.totalPHQ9 > 4 && data.totalPHQ9 <= 9 && (
        <h3 className={classes.chartPHQ}>Mild Depression</h3>
      )}
      {data && data.totalPHQ9 > 9 && data.totalPHQ9 <= 14 && (
        <h3 className={classes.chartPHQ}>Moderate Depression</h3>
      )}
      {data && data.totalPHQ9 > 14 && data.totalPHQ9 <= 19 && (
        <h3 className={classes.chartPHQ}>Moderately severe Depression</h3>
      )}
      {data && data.totalPHQ9 > 19 && data.totalPHQ9 <= 27 && (
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
