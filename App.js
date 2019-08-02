import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Dimensions, AsyncStorage } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';

import { createRootNavigator } from "./navigation/MainTabNavigator";



import { isSignedIn, onSignIn } from "./auth";
import SetCookieParser from "set-cookie-parser";
import './global.js'
import './auth.js'

import Home from './screens/Home';


import MainTabNavigator from './navigation/MainTabNavigator';

var needToFakeLogin = true;


var screenHeight = Dimensions.get('window').height;


export default class App extends React.Component {
  constructor(props) {
        super(props);
      
        this.state = {
        signedIn: false,
        checkedSignIn: false,
        isLoadingComplete: false,
        username: '',
        password: '',
        csrf_token: '',
        ci_session: '',
        csrf_token_hash: '',
        full_cookie: '',
        };
    }
    
    componentDidMount() {
    if (Platform.OS === 'ios'){
      this.GetCookies();
        }
        else {
        this.GetCookies();
        }
       
        isSignedIn()
        .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
        .catch(err => alert("An error occurred"));
    }
    
    GetCookies = async () => {
        console.log('trying to get cookies');
        fetch('https://www.skysilk.com/login/?bigiftrue', {
              method: 'HEAD',
              headers: {
              'Content-Type': 'text/html',
              }
              }).then((response) => response)
        .then((res) => {
             
              if(typeof(res.message) != "undefined"){
              Alert.alert("Error", "Error: "+ res.message);
              }
              else{
              
              if(Platform.OS == 'android'){
              
              console.log('full header for android was ' + JSON.stringify(res.headers));
              }
              
              else {
              
              console.log('full header for ios was ' + JSON.stringify(res.headers));
              }
              
              var setCookie = require('set-cookie-parser');
              
              
              
              // This is mainly for React Native; Node.js does not combine set-cookie headers.
              var combinedCookieHeader = res.headers.get('Set-Cookie');
              this.state.full_cookie = combinedCookieHeader;
              var splitCookieHeaders = setCookie.splitCookiesString(combinedCookieHeader)
              var cookies = setCookie.parse(splitCookieHeaders);
              
              
              console.log('behold cookies length ' + cookies.length);
              for(var i = 0; i < cookies.length; i ++){
              var cookie = cookies[i];
              if(cookie.name == 'csrf_skysilk_cookie'){
              
              console.log('behold csrf cookie ' + cookie.value);
              var csrf_str = 'csrf_skysilk_cookie=' + cookie.value + '; expires=' + cookie.expires + '; Max-Age=7200; path=/';
              
              this.state.csrf_token = csrf_str;
              this.state.csrf_token_hash = cookie.value;
              
              global.csrf_token = csrf_str;
              global.csrf_token_hash = cookie.value;
              global.tier = '';
              global.template = '';
              global.hardware = '';
              global.region= '';
              global.plan = '';
              global.templateId = '';
              global.sshKeys = [];
              global.dataCenters = {};
              global.selectedSSHKey = '0';
              global.selectedCPU = '';
              global.selectedRAM = '';
              global.selectedDisk = '';
              global.selectedBandwidth = '';
              global.selectedTransfer = '';
              global.selectedPPM = '';
              global.selectedImage = '';
              global.selectedPlanName = '';
              global.selectedTemplateName = '';
              global.selectedRegionName = '';
              global.selectedHardwareName = '';
              global.userHasPaymentMethod = false;
              global.usingCreditCard = false;
              global.personalDict = {};
              global.mainTemplateId = 116;
              planTierOne = '';
              planTierTwo = '';
              planTierThree = '';
              planTierFour = '';
              planTierFive = '';
              
            
            
              
              
              }
              
              if(cookie.name == 'ci_session'){
              
              console.log('behold ci session ' + cookie.value);
              var ci_str = 'ci_session=' + cookie.value + '; expires=' + cookie.expires + '; Max-Age=7200; path=/; HttpOnly';
              
              this.state.ci_session = ci_str;
              global.ci_session = ci_str;
              
              }
              
              }
              
              
              
             console.log('why yes trying a fake login attempt');
              if(needToFakeLogin){
              this.FakeLogin();
              needToFakeLogin = false;
              }
              else {
              
              
              AutoLogUser();
              
              
              }
              
              
              
              /*
               for(var i = 0; i < res.headers.map['set-cookie'].length; i++){
               
               console.log(res.headers.map['set-cookie'][i]);
               
               }
               
               this.setState({ auth_token: res.auth_token });
               */
              }
              }).catch((error) => {
                       console.error(error);
                       });
    }
    
    
    GetCookiesAndroid () {
    console.log('getting cookies android');
    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
    if (request.readyState !== 4) {
    return;
  }

  if (request.status === 200) {
    console.log('success', request.responseHeaders);
  } else {
    console.warn('error');
  }
};

    request.open('GET', 'https://www.skysilk.com/login/?bigiftrue');
    request.send();
    
    }
    
    
    FakeLogin = async (username, password, navigate) => {
    
        console.log('global hash for FAKE FIRST  login attempt is ' + global.csrf_token_hash);
    
    
        var form = new FormData();
        form.append("csrf_skysilk_token", global.csrf_token_hash);
        form.append("email", "haha@gmail.com");
        form.append("password", "Habla567!");
    
    try {
        fetch('https://www.skysilk.com/api_v2/user/Account/login', {
              method: 'POST',
              credentials: 'include',
              headers: {
              'Content-Type': 'multipart/form-data',
              'Set-Cookie':  global.csrf_token,
              'Set-Cookie': global.ci_session,
              
              },
              body: form
              
              }).then((response) => response.text())
        .then(text => {
    try {
        const res = JSON.parse(text);
        if(typeof(res.message) != "undefined"){
  
              }
              else{
             
              console.log('first fake login res is ' + res);
              
              console.log('res code is ' + res['CODE'] + ' errors are ' + res['ERRORS']);
              if(res.status == '403'){
              Alert.alert("Forbidden", " 403 for login");
              }
              else {
              
              console.log('getting cookies again from successful ? fakelogin');
              this.GetCookies();
              
              if(res['CODE'] != 'OK'){
              
              }
              
              else {
             
              
              
              }
              
         
              
              /*
              GetUserVMs();
              GetUserInformation();
               */
              }
              }
              } catch(err) {
              console.log('getting cookies from 500 error fakelogin');
              this.GetCookies();
                }
              }).catch((error) => {
                       console.error(error);
                       });
     
        
        
        } catch(err) {
        console.log("Error fetching data-----------", err);
    }
    }

    //this is necessary for some reason to properly receive cookies
    
    
   render() {
            const { checkedSignIn, signedIn } = this.state;
       
            // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
            
       
            const Layout = MainTabNavigator;
            return <Layout />;
    }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
    
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const get_set_cookies = function(headers) {
    const set_cookies = []
    for (const [name, value] of headers) {
        if (name === "set-cookie") {
            set_cookies.push(value)
        }
    }
    return set_cookies
}

GetUserSSHKeys = async () => {

console.log('uh trying to get user info');
    
    // Cancel any in-progress requests
    // Load new data and update profileOrError
    
    //Have a try and catch block for catching errors.
    try {
        fetch('https://www.skysilk.com/api_v2/user/Security/getUserSSHKeysList/', {
              method: 'GET',
              credentials: 'include',
              headers: {
              'Content-Type': 'text/plain',
              'Set-Cookie':  global.csrf_token,
              'Set-Cookie': global.ci_session,
            
              },
              
              
              
              }).then((response) => response.json())
        .then((res) => {
              if(typeof(res.message) != "undefined"){
              Alert.alert("Error", "Error: "+ res.message);
              }
              else{
              var resStr = JSON.stringify(res);
             
              /*
               this.setState({ auth_token: res.auth_token });
               */
              if(res.status == '403'){
              Alert.alert("Forbidden", " 403 for ssh");
              }
              else {
              
              global.sshKeys = res.SSH_KEYS;
              /*
              HomeCreditValue(billingInfo.credit.toFixed(2));
              */
              
              
              }
              }
              }).catch((error) => {
                       console.error(error);
                       });
        
    } catch(err) {
        console.log("Error fetching data-----------", err);
    }
    
}

AutoLogUser = async () => {






                  var username = 'lifeisfun567@yahoo.com';
                  var pass = 'SkySilk543!';
                  /*
await AsyncStorage.getItem('logged_email').then((res) => {
                                                                  console.log('check out res ' + res);
                                                                  username = res;
                                                
                                                                  })
    
await AsyncStorage.getItem('logged_pass').then((res) => {
                                                                 console.log('check out res ' + res);
                                                                 pass = res;
                                               
                                                                 })
                                                                 */


             onSignIn(username, pass, navigator);
    
  
  
  




}

/*
    console.log('still being called');
 
    */
    


