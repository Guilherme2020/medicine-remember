import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './pages/Login';
import Main from './pages/Main';
import TabScreen from './pages/Tabs'

const Routes = createAppContainer(
  createStackNavigator({
    TabScreen:{
      screen: TabScreen,
      navigationOptions: () => ({
        header: null
      })
    },
    Login: {
      screen: Login,
      navigationOptions: () => ({
        header: null
      })
    },
    Main: {
      screen: Main,
      navigationOptions: () => ({
        header: null
      })
    }
  })
)

export default Routes;

