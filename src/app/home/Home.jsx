import React from "react";
import classes from "./Home.module.css";
import Chart from "../../components/dashboardCard/Chart";
import ContentCard from "../../components/dashboardCard/ContentCard";
import ForumCard from "../../components/dashboardCard/ForumCard";
import OverviewInfo from "../../components/dashboardCard/OvervewInfo";

const Home = () => {
  return (
    <div className={classes.home}>
      <h1 className={classes.dashboardTitle}>Overview</h1>
      <OverviewInfo />
      <Chart />
      <div className={classes.cards}>
        <ForumCard />
        <ContentCard />
      </div>
    </div>
  );
};

export default Home;