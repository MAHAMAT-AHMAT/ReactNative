// App.js
import React from "react";
import { SafeAreaView } from "react-native";
import Posts from "./components/Posts"; //chemin de mon components

const App = () => {
  return (
    <SafeAreaView>
      <Posts />
    </SafeAreaView>
  );
};

export default App;
