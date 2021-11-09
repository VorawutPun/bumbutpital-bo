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
        Overall PHQ-9 score
      </h3>
      <GaugeChart
        nrOfLevels={5}
        colors={["#20CBFE", "#32D475", "#FFBC17", "#E76849", "#F14949"]}
        arcWidth={0.1}
        percent={data && data.totalPHQ9 / 100}
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
