import React from "react";
import classes from "./OverviewInfo.module.css";
import { People } from "@material-ui/icons";
import { useQuery } from "@apollo/client";
import { COUNT_USER } from "../../Graphql/User/Queries";

const TotalUserCard = () => {
  const { data } = useQuery(COUNT_USER);

  return (
    <div className={classes.overviewItem}>
      <div className={classes.overviewNumberContainer}>
        <span className={classes.overviewIcon}>
          <People style={{ fontSize: 80 }} />
        </span>
        <div className={classes.overviewRoot}>
          <span className={classes.overviewNumber}>
            {data && data.countUser}
          </span>
          <span className={classes.overviewTitle}>Total User</span>
        </div>
      </div>
    </div>
  );
};

export default TotalUserCard;
