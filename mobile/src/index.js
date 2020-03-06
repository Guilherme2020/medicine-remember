import React from "react";
import { StatusBar } from "react-native";
import "~/config/ReactotronConfig";
import { YellowBox } from "react-native";
import Routes from "~/routes";

YellowBox.ignoreWarnings(["Unrecognized WebSocket"]);

const App = () => {
  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" backgroundColor="#4AC0EF" />
      <Routes />
    </React.Fragment>
  );
};

export default App;
