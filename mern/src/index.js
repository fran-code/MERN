import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';
import { Provider } from "react-redux";
import store from "./redux/store/index";

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql/',
  });

  ReactDOM.render(
    <ApolloProvider client={client}>
      <Provider store={store}>
      <App />
      </Provider>
    </ApolloProvider>,
    document.getElementById("root")
  );