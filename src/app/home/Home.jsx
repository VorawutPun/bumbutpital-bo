import React from "react";
import classes from "./Home.module.css";
// import Chart from "../../components/dashboardCard/Chart";
import ContentCard from "../../components/dashboardCard/ContentCard";
import OverviewInfo from "../../components/dashboardCard/OvervewInfo";
import ChartDashBoard from "../../components/dashboardCard/ChartDashBoard";
import { useQuery } from "@apollo/client";
import { GET_ALL_CONTENT } from "../../Graphql/Content/Queries";
import { Button, Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const { data } = useQuery(GET_ALL_CONTENT);

  return (
    <div className={classes.home}>
      <h1 className={classes.dashboardTitle}>Overview</h1>
      <OverviewInfo />
      <ChartDashBoard />
      {/* <div className={classes.cards}> */}
      <div className={classes.cards}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          className={classes.grid}
        >
          <Typography variant="h5">Lastest Content</Typography>
          <Button onClick={() => {history.push("/contents")}}>See All</Button>
        </Grid>
        <div className={classes.overview}>
          {data &&
            data.getAllContent
              .slice(-3)
              .map((content) => (
                <ContentCard
                  key={content.contentID}
                  title={content.title}
                  pictureURL={content.pictureUrl}
                  createAt={new Date(content.createAt).toDateString()}
                  description={content.description}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
