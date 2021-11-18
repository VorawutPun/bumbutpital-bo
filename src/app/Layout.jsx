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

const Layout = () => {
  return (
    <>
      <Sidebar />
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/forum" component={Forum} />
        <Route path="/contents" component={ManageContent} />
        <Route path="/content/:contentID" component={EditContent} />
        <Route path="/createContent" component={AddContent} />
        <Route path="/videos" component={ManageVideo} />
        <Route path="/createVideo" component={AddVideo} />
        <Route path="/video/:videoID" component={EditVideo} />
        <Route path="/users" component={ListOfUsers} />
        <Route path="/user/:id" component={Profile} />
        <Route path="/createUser" component={AddUser} />
        <Route path="/promotions" component={ManagePromotion} />
        <Route path="/promotion/add" component={AddPromotion} />
        <Route path="/promotion/:promotionId" component={EditPromotion} />
        <Route path="/hospitals" component={ManageHospital} />
        <Route path="/hospital/add" component={AddHospital} />
        <Route path="/hospital/:hospitalID" component={EditHospital} />
        <Redirect to="/home"/>
      </Switch>

    </>
  );
};

export default Layout;
