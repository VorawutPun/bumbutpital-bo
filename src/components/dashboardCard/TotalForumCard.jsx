import React from "react";
import classes from "./OverviewInfo.module.css";
import { Message } from "@material-ui/icons";
import { useQuery } from "@apollo/client";
import { COUNT_FORUM } from "../../Graphql/Forum/Queries";

const TotalForumCard = () => {
  const { data } = useQuery(COUNT_FORUM);

  return (
    <div className={classes.overviewItem}>
      <div className={classes.overviewNumberContainer}>
        <span className={classes.overviewIcon}>
          <Message style={{ fontSize: 80 }} />
        </span>
        <div className={classes.overviewRoot}>
          <span className={classes.overviewNumber}>
            {data && data.countForum}
          </span>
          <span className={classes.overviewTitle}>forum message</span>
        </div>
      </div>
    </div>
  );
};

export default TotalForumCard;
