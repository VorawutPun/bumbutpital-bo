import React from "react";
import classes from "./OverviewInfo.module.css";
import { People, PostAdd, Message, VideoLibrary } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 500,
  },
});

const OverviewInfo = (props) => {
  const style = useStyles();

  return (
    <div className={classes.overview}>
      <div className={classes.overviewItem}>
        <div className={classes.overviewNumberContainer}>
          <span className={classes.overviewIcon}>
            <People style={{ fontSize: 80 }} />
          </span>
          <div className={style.root}>
            <span className={classes.overviewNumber}>112</span>
            <span className={classes.overviewTitle}>total user</span>
          </div>
        </div>
      </div>

      <div className={classes.overviewItem}>
        <div className={classes.overviewNumberContainer}>
          <span className={classes.overviewIcon}>
            <PostAdd style={{ fontSize: 80 }} />
          </span>
          <div className={style.root}>
            <span className={classes.overviewNumber}>13</span>
            <span className={classes.overviewTitle}>content post</span>
          </div>
        </div>
      </div>

      <div className={classes.overviewItem}>
        <div className={classes.overviewNumberContainer}>
          <span className={classes.overviewIcon}>
            <Message style={{ fontSize: 80 }} />
          </span>
          <div className={style.root}>
            <span className={classes.overviewNumber}>100</span>
            <span className={classes.overviewTitle}>forum message</span>
          </div>
        </div>
      </div>

      <div className={classes.overviewItem}>
        <div className={classes.overviewNumberContainer}>
          <span className={classes.overviewIcon}>
            <VideoLibrary style={{ fontSize: 80 }} />
          </span>
          <div className={style.root}>
            <span className={classes.overviewNumber}>10</span>
            <span className={classes.overviewTitle}>video</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewInfo;