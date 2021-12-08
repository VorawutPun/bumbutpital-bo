import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "./App.css";
import Authen from "./app/auth/Authen";
import Layout from "./app/Layout";
import { useEffect, useState } from "react";
import PrivateRoute from './components/PrivateRoute'

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
            <div className="container">
              <Switch>
                <Route exact path="/login" component={Authen} />
                <PrivateRoute path="/" component={Layout} />
                <Redirect to="/login" />
              </Switch>
            </div>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
