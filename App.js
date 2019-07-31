
import React, {Fragment,Component} from 'react';
import {
  
  StyleSheet,
  
} from 'react-native';
import * as firebase from 'firebase';

import {createBottomTabNavigator,createStackNavigator,createAppContainer} from 'react-navigation';
import WelcomeScreen from './screens/WelcomeScreen'
import LoginScreen from './screens/LoginScreen'
import {Provider} from 'react-redux'
import store from './store'
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import Geolocation from '@react-native-community/geolocation';

Geolocation.getCurrentPosition(info => console.log(info));

const TabNavigator = createBottomTabNavigator({
  welcome: WelcomeScreen,
  login: LoginScreen,
  
},{
  defaultNavigationOptions: {
    tabBarVisible: false,
  },
    
    lazy:true
});
const AppContainer = createAppContainer(TabNavigator);
class App extends Component{
 

  componentDidMount(){
    firebase.initializeApp({
      apiKey: "AIzaSyCLH8ohcht6C9UuSegOPGP-Gaiy-EHgEb8",
    authDomain: "enjoy-510df.firebaseapp.com",
    databaseURL: "https://enjoy-510df.firebaseio.com",
    projectId: "enjoy-510df",
    storageBucket: "",
    messagingSenderId: "942617148522",
    appId: "1:942617148522:web:8e3e337335d504bd"
    });
  }
  render(){
        return (
          <Provider store={store}>
              <AppContainer />
          </Provider>
           
        );
        }
};

const styles = StyleSheet.create({
  
});

export default App;