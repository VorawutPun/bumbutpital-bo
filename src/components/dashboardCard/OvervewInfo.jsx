import React from "react";
import classes from "./OverviewInfo.module.css";
import TotalUserCard from "./TotalUserCard";
import TotalContentCard from "./TotalContentCard";
import TotalForumCard from "./TotalForumCard";
import TotalVideoCard from "./TotalVideoCard";

const OverviewInfo = (props) => {
  return (
    <div className={classes.overview}>
      <TotalUserCard />
      <TotalContentCard />
      <TotalForumCard />
      <TotalVideoCard />
    </div>
  );
};

export default OverviewInfo;
