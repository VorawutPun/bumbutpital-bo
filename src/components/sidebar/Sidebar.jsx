import React from "react";
import { Link } from "react-router-dom";

import classes from "./Sidebar.module.css";

const Sidebar = (props) => {
  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebarWrapper}>
        <div className={classes.sidebarMenu}>
          <ul className={classes.sidebarList}>
            <Link to="/home" className={classes.sidebarLink}>
              <li className={classes.sidebarListItem}>
                Dashboard
              </li>
            </Link>
            <Link to="/contents" className={classes.sidebarLink}>
              <li className={classes.sidebarListItem}>Manage Posts</li>
            </Link>
            <Link to="/videos" className={classes.sidebarLink}>
              <li className={classes.sidebarListItem}>Manage Video</li>
            </Link>
            <Link to="/users" className={classes.sidebarLink}>
              <li className={classes.sidebarListItem}>Manage Users</li>
            </Link>
            <Link to="/promotions" className={classes.sidebarLink}>
              <li className={classes.sidebarListItem}>Manage Promotion</li>
            </Link>
            <Link to="/hospitals" className={classes.sidebarLink}>
              <li className={classes.sidebarListItem}>Manage Hospital</li>
            </Link>
            <Link to="/forum" className={classes.sidebarLink}>
              <li className={classes.sidebarListItem}>Forum</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
