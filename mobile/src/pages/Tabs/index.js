import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import Main from "../Main";
import Medicine from "../Medicine";
const TabScreen = createMaterialTopTabNavigator(
  {
    Main: {
      screen: Main,
      navigationOptions: () => ({
        header: null
      })
    },
    Medicine: {
      screen: Medicine,
      navigationOptions: () => ({
        header: null
      })
    }
  },
  {
    tabBarPosition: "bottom",
    swipeEnabled: true,
    // animationEnabled: true,

    tabBarOptions: {
      activeTintColor: "#FFFFFF",

      inactiveTintColor: "#F8F8F8",
      style: {
        backgroundColor: "#4AC0EF"
      },
      labelStyle: {
        textAlign: "center"
      },
      indicatorStyle: {
        borderBottomColor: "#fff",
        borderBottomWidth: 2
      }
    }
  }
);

export default TabScreen;
