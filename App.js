import React from "react";
import { Provider } from "react-redux";
import store from "./components/store"; // Assurez-vous que le chemin est correct
import Posts from "./components/Posts";

const App = () => {
  return (
    <Provider store={store}>
      <Posts />
    </Provider>
  );
};

export default App;
