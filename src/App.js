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
import Landing from "./app/landing/Landing";
import ManageVideo from "./app/management/Video";
// import ManageUser from "./app/management/User";
import ManagePromotion from "./app/management/Promotion";
import ManageCategory from "./app/management/Category";
import ManageContent from "./app/management/Content";
import ListOfUsers from "./app/management/ListOfUser";

import { setContext } from "@apollo/client/link/context";

function App() {
  const httpLink = createHttpLink({
    uri: "http://localhost:3001/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTYzMjU1OTMyOX0.zQMaTM30cTiUP5bO85cV1l1zDN52VhX8QelITMLGsp0",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/auth" component={Authen} />
              <Router>
                <Sidebar />
                <Route exact path="/home" component={Home} />
                <Route path="/forum" component={Forum} />
                <Route path="/postCategories" component={ManageCategory} />
                <Route path="/videos" component={ManageVideo} />
                <Route path="/contents" component={ManageContent} />
                <Route path="/createContent" component={AddContent} />
                <Route path="/users" component={ListOfUsers} />
                <Route path="/createUser" component={AddUser} />
                <Route path="/user/:id" component={EditUser} />
                <Route path="/promotions" component={ManagePromotion} />
                <Route path="/promotion/add" component={AddPromotion} />
              </Router>
            </Switch>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
