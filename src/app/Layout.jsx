import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import AddContent from "./content/AddContent";
import AddPromotion from "./promotion/AddPromotion";
import AddUser from "./user/AddUser";
import AddVideo from "./video/AddVideo";
import AddHospital from "./hospital/AddHospital";
import Forum from "./forum/Forum";
import Home from "./home/Home";
import ListOfUsers from "./user/ListOfUser";
import ManageVideo from "./video/Video";
import ManageContent from "./content/Content";
import ManageHospital from "./hospital/Hospital";
import ManagePromotion from "./promotion/Promotion";
// import EditUser from "./user/EditUser";
import EditContent from "./content/EditContent";
import EditPromotion from "./promotion/EditPromotion";
import EditHospital from "./hospital/EditHospital";
import EditVideo from "./video/EditVideo";
import Profile from "./user/Profile";
import PrivateRoute from '../components/PrivateRoute'

const Layout = () => {
  

  return (
    <>
      <Sidebar />
      <Switch>
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/forum" component={Forum} />
        <PrivateRoute path="/contents" component={ManageContent} />
        <PrivateRoute path="/content/:contentID" component={EditContent} />
        <PrivateRoute path="/createContent" component={AddContent} />
        <PrivateRoute path="/videos" component={ManageVideo} />
        <PrivateRoute path="/createVideo" component={AddVideo} />
        <PrivateRoute path="/video/:videoID" component={EditVideo} />
        <PrivateRoute path="/users" component={ListOfUsers} />
        <PrivateRoute path="/user/:id" component={Profile} />
        <PrivateRoute path="/createUser" component={AddUser} />
        <PrivateRoute path="/promotions" component={ManagePromotion} />
        <PrivateRoute path="/promotion/add" component={AddPromotion} />
        <PrivateRoute path="/promotion/:promotionId" component={EditPromotion} />
        <PrivateRoute path="/hospitals" component={ManageHospital} />
        <PrivateRoute path="/hospital/add" component={AddHospital} />
        <PrivateRoute path="/hospital/:hospitalID" component={EditHospital} />
        <Redirect to="/home"/>
      </Switch>

    </>
  );
};

export default Layout;
