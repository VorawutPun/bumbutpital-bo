import React from "react";
import classes from "./OverviewInfo.module.css";
import { VideoLibrary } from "@material-ui/icons";
import { useQuery } from "@apollo/client";
import { COUNT_VIDEO } from "../../Graphql/Video/Queries";

const TotalVideoCard = () => {
  const { data } = useQuery(COUNT_VIDEO);

  return (
    <div className={classes.overviewItem}>
      <div className={classes.overviewNumberContainer}>
        <span className={classes.overviewIcon}>
          <VideoLibrary style={{ fontSize: 80 }} />
        </span>
        <div className={classes.overviewRoot}>
          <span className={classes.overviewNumber}>{data && data.countVideo}</span>
          <span className={classes.overviewTitle}>Video</span>
        </div>
      </div>
    </div>
  );
};

export default TotalVideoCard;
