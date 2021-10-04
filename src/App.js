import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";

import AddContent from "./app/content/AddContent";
import AddPromotion from "./app/promotion/AddPromotion";
import AddUser from "./app/user/AddUser";
import Authen from "./app/auth/Authen";
import EditUser from "./app/user/EditUser";
import Forum from "./app/forum/Forum";
import Home from "./app/home/Home";
// import Landing from "./app/landing/Landing";
import ManageVideo from "./app/video/Video";
// import ManageUser from "./app/management/User";
import ManagePromotion from "./app/promotion/Promotion";
import ManageCategory from "./app/management/Category";
import ManageContent from "./app/content/Content";
import ListOfUsers from "./app/user/ListOfUser";

import { setContext } from "@apollo/client/link/context";
import EditContent from "./app/content/EditContent";
import ManageHospital from "./app/hospital/Hospital";
import AddHospital from "./app/hospital/AddHospital";

function App() {
  const httpLink = createHttpLink({
    uri: "http://localhost:3001/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("token");
    // return the headers to the context so httpLink can read them
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
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Authen} />
                <Router>
                  <Sidebar />
                  <Route exact path="/home" component={Home} />
                  <Route path="/forum" component={Forum} />
                  <Route path="/postCategories" component={ManageCategory} />
                  <Route path="/videos" component={ManageVideo} />
                  <Route path="/contents" component={ManageContent} />
                  <Route path="/content/:id" component={EditContent} />
                  <Route path="/createContent" component={AddContent} />
                  <Route path="/users" component={ListOfUsers} />
                  <Route path="/createUser" component={AddUser} />
                  <Route path="/user/:id" component={EditUser} />
                  <Route path="/promotions" component={ManagePromotion} />
                  <Route path="/promotion/add" component={AddPromotion} />
                  <Route path="/hospitals" component={ManageHospital} />
                  <Route path="/hospital/add" component={AddHospital} />
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
