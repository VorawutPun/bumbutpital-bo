import { Reply } from "@material-ui/icons";
import React from "react";
import classes from "./ForumCard.module.css";

const ForumCard = () => {
  return (
    <div className={classes.forumCard}>
      <div className={classes.forumCardTitle}>Forum</div>
      <ul className={classes.forumCardList}>
        <li className={classes.forumCardListItem}>
          <img
            src="https://icon-library.com/images/username-icon/username-icon-18.jpg"
            alt=""
            className={classes.avatar}
          />
          <div className={classes.forumCardQA}>
            <span className={classes.forumQuestion}>
              Question: Quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex?
            </span>
            <div>
              <input
                className={classes.replyInput}
                type="text"
                placeholder="Reply..."
              />
              <button className={classes.replyButton}>
                <Reply className={classes.replyIcon} />
                Reply
              </button>
            </div>
          </div>
        </li>
        <hr />
        <li className={classes.forumCardListItem}>
          <img
            src="https://icon-library.com/images/username-icon/username-icon-18.jpg"
            alt=""
            className={classes.avatar}
          />
          <div className={classes.forumCardQA}>
            <span className={classes.forumQuestion}>
              Question: Quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex?
            </span>
            <div>
              <input
                className={classes.replyInput}
                type="text"
                placeholder="Reply..."
              />
              <button className={classes.replyButton}>
                <Reply className={classes.replyIcon} />
                Reply
              </button>
            </div>
          </div>
        </li>
      </ul>
      <span></span>
    </div>
  );
};

export default ForumCard;
