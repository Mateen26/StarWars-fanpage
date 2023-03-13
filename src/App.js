import React from "react";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./store/store";
import Loader from "./store/Loader";
import Routes from './Routes';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <Loader />
        <Routes/>
      </Provider>

    </>
  );
};

export default App;
