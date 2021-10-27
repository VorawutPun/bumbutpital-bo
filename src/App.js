import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Authen from "./app/auth/Authen";
import AddContent from "./app/content/AddContent";
import AddPromotion from "./app/promotion/AddPromotion";
import AddUser from "./app/user/AddUser";
import AddVideo from "./app/video/AddVideo";
import AddHospital from "./app/hospital/AddHospital";
import Forum from "./app/forum/Forum";
import Home from "./app/home/Home";
import ListOfUsers from "./app/user/ListOfUser";
import ManageVideo from "./app/video/Video";
import ManageContent from "./app/content/Content";
import ManageHospital from "./app/hospital/Hospital";
import ManagePromotion from "./app/promotion/Promotion";
import EditUser from "./app/user/EditUser";
import EditContent from "./app/content/EditContent";
import EditPromotion from "./app/promotion/EditPromotion";
import EditHospital from "./app/hospital/EditHospital";
import EditVideo from "./app/video/EditVideo";
// import ManageUser from "./app/management/User";

function App() {
  const httpLink = createHttpLink({
    uri: "http://localhost:3001/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            {/* <Navbar /> */}
            <div className="container">
              <Switch>
                <Route exact path="/" component={Authen} />
                <Router>
                  <Sidebar/>
                    <Route exact path="/home" component={Home} />
                    <Route path="/forum" component={Forum} />
                    <Route path="/contents" component={ManageContent} />
                    <Route path="/content/:contentID" component={EditContent} />
                    <Route path="/createContent" component={AddContent} />
                    <Route path="/videos" component={ManageVideo} />
                    <Route path="/createVideo" component={AddVideo} />
                    <Route path="/video/:videoID" component={EditVideo} />
                    <Route path="/users" component={ListOfUsers} />
                    <Route path="/user/:id" component={EditUser} />
                    <Route path="/createUser" component={AddUser} />
                    <Route path="/promotions" component={ManagePromotion} />
                    <Route path="/promotion/add" component={AddPromotion} />
                    <Route
                      path="/promotion/:promotionId"
                      component={EditPromotion}
                    />
                    <Route path="/hospitals" component={ManageHospital} />
                    <Route path="/hospital/add" component={AddHospital} />
                    <Route
                      path="/hospital/:hospitalID"
                      component={EditHospital}
                    />
                </Router>
              </Switch>
            </div>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
