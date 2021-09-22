import React from "react";

import classes from "./Navbar.module.css";

const Navbar = (props) => {
  return (
    <div className={classes.navbar}>
      <div className={classes.navbarWrapper}>
        <div className={classes.navbarLeft}>
          <img
            src="/assets/images/mophLogo.png"
            alt="test"
            className={classes.navLogo}
          />
          <img
            src="/assets/images/BPTLogo.png"
            alt="test"
            className={classes.navLogo}
          />
          <h2 className={classes.navTitle}>BUMBUTPITAL</h2>
        </div>
        <div className={classes.navRight}>
          <img
            src="https://icon-library.com/images/username-icon/username-icon-18.jpg"
            alt=""
            className={classes.navAvatar}
          />
          Username
        </div>
      </div>
    </div>
  );
};

export default Navbar;
