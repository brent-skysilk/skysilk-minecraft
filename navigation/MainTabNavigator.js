import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';





import Home from "../screens/Home";
import Plans from "../screens/Plans";
import PanelView from "../screens/PanelView";
import Backups from "../screens/BackupManager";
import Account from "../screens/Account";


 const HomeStack = createStackNavigator({
  Home: {
  screen: Home,
  navigationOptions: {
  header:null,
  },
  },
  Plans: {
  screen: Plans,
  navigationOptions: {
  header:null,
  },
  },
  Backups: {
  screen: Backups,
  navigationOptions: {
  header:null,
  },
  },
  Account: {
  screen: Account,
  navigationOptions: {
  header:null,
  },
  },
  PanelView: {
  screen: PanelView,
  navigationOptions: {
  header:null,
  },
  },
});





const MainNavigator = createStackNavigator({
  Home: {
  screen: HomeStack,
  navigationOptions: {
    header:null,
    },
    }
  

});

const MainView = createAppContainer(MainNavigator);

export default MainView;



                                 


