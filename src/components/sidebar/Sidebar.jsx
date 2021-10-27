import React from "react";
// import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import {
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core";
import clsx from "clsx";
import ReorderIcon from "@material-ui/icons/Reorder";
import AddIcon from "@material-ui/icons/Add";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import classes from "./Sidebar.module.css";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#cbcedd",
      width: "100%",
      padding: theme.spacing(3),
    },
    root: {
      display: "flex",
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: "#6367EA",
      top: 0,
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      background: "#ecf2ff",
      color: "black",
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    active: {
      color: "black",
      backgroundColor: "#CEDEFF",
    },
    title: {
      padding: theme.spacing(2),
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    navLogo: {
      width: "50px",
      height: "50px",
      marginRight: "8px",
      borderRadius: "10px",
    },
  };
});

const Sidebar = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuItems = [
    {
      text: "Dashboard",
      path: "/home",
    },
    {
      text: "Manage Contents",
      path: "/contents",
    },
    {
      text: "Manage Videos",
      path: "/videos",
    },
    {
      text: "Manage Users",
      path: "/users",
    },
    {
      text: "Manage Promotions",
      path: "/promotions",
    },
    {
      text: "Manage Hospitals",
      path: "/hospitals",
    },
    {
      text: "Forum",
      path: "/forum",
    },
  ];

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
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
          <Typography variant="h6" noWrap>
            BUMBUTPITAL
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        open={open}
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>

        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
              className={
                location.pathname === item.path ? classes.active : null
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
    // <div className={classes.sidebar}>
    //   <div className={classes.sidebarWrapper}>
    //     <div className={classes.sidebarMenu}>
    //       <ul className={classes.sidebarList}>
    //         <Link to="/home" className={classes.sidebarLink}>
    //           <li className={classes.sidebarListItem} active>
    //             Dashboard
    //           </li>
    //         </Link>
    //         <Link to="/contents" className={classes.sidebarLink}>
    //           <li className={classes.sidebarListItem}>Manage Posts</li>
    //         </Link>
    //         <Link to="/videos" className={classes.sidebarLink}>
    //           <li className={classes.sidebarListItem}>Manage Video</li>
    //         </Link>
    //         <Link to="/users" className={classes.sidebarLink}>
    //           <li className={classes.sidebarListItem}>Manage Users</li>
    //         </Link>
    //         <Link to="/promotions" className={classes.sidebarLink}>
    //           <li className={classes.sidebarListItem}>Manage Promotion</li>
    //         </Link>
    //         <Link to="/hospitals" className={classes.sidebarLink}>
    //           <li className={classes.sidebarListItem}>Manage Hospital</li>
    //         </Link>
    //         <Link to="/forum" className={classes.sidebarLink}>
    //           <li className={classes.sidebarListItem}>Forum</li>
    //         </Link>
    //       </ul>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Sidebar;
