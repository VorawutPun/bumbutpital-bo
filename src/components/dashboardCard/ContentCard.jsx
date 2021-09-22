import React from "react";
import classes from "./ContentCard.module.css";

//have to deconstruct, will do later, lazy for
const ContentCard = () => {
  return (
    <div className={classes.contentCard}>
      <div className={classes.contentCardTitle}>Content</div>
      <ul className={classes.contentCardList}>
        <li className={classes.contentCardListItem}>
          <img
            src="https://icon-library.com/images/username-icon/username-icon-18.jpg"
            alt=""
            className={classes.avatar}
          />
          <div className={classes.contentDetail}>
            <span className={classes.contentDetailTitle}>
              Content About depression
            </span>
            <span className={classes.contentDetailAdmin}>By: MOPH Admin</span>
            <span className={classes.contentBriefDetail}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </span>
          </div>
          <div className={classes.contentDate}>
            <span className={classes.date}>30</span>
            <span className={classes.month}>April</span>
          </div>
        </li>
        <hr />
        <li className={classes.contentCardListItem}>
          <img
            src="https://icon-library.com/images/username-icon/username-icon-18.jpg"
            alt=""
            className={classes.avatar}
          />
          <div className={classes.contentDetail}>
            <span className={classes.contentDetailTitle}>
              Content About depression
            </span>
            <span className={classes.contentDetailAdmin}>By: MOPH Admin</span>
            <span className={classes.contentBriefDetail}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </span>
          </div>
          <div className={classes.contentDate}>
            <span className={classes.date}>30</span>
            <span className={classes.month}>April</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ContentCard;
