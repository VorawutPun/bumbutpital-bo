import React from "react";
import classes from "./OverviewInfo.module.css";
import { PostAdd } from "@material-ui/icons";
import { useQuery } from "@apollo/client";
import { COUNT_CONTENT } from "../../Graphql/Content/Queries";

const TotalContentCard = () => {
  const { data } = useQuery(COUNT_CONTENT);

  return (
    <div className={classes.overviewItem}>
    <div className={classes.overviewNumberContainer}>
      <span className={classes.overviewIcon}>
        <PostAdd style={{ fontSize: 80 }} />
      </span>
      <div className={classes.overviewRoot}>
        <span className={classes.overviewNumber}>
          {data && data.countContent}
        </span>
        <span className={classes.overviewTitle}>Content Post</span>
      </div>
    </div>
  </div>
  );
};

export default TotalContentCard;
