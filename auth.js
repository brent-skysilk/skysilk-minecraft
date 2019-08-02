import { AsyncStorage, Alert } from "react-native";
import './global.js'
import creationManager from './CreationData.js'
import SetCookieParser from "set-cookie-parser";

export const USER_KEY = "true";

var {Platform} = require('react-native');


var thisResponse;
var authNav;
export const onSignIn = (username, password, navigate) => {
    
    
        authNav = navigate;
    
        console.log('global hash for onsign is ' + global.csrf_token_hash + 'crsf token is ' + global.csrf_token + ' and ci session is ' + global.ci_session);
    
    
        var form = new FormData();
        form.append("csrf_skysilk_token", global.csrf_token_hash);
    
        form.append("email", username);
        form.append("password", password);
    
    
    
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
              
             }).then(function(response) {
                thisResponse = response;

                return response.text()
            })
        .then(text => {
    try {
    

        const res = JSON.parse(text);
       
     
        
        
        if(typeof(res.message) != "undefined"){
              
              Alert.alert("Error", "Error: "+ res.message);
              }
              else{
             
             
          
              console.log('res code is ' + res['CODE'] + ' errors are ' + res['ERRORS']);
              if(res.status == '403'){
              Alert.alert("Forbidden", " 403 for login");
              }
              else {
              
              if(res['CODE'] != 'OK'){
                 AsyncStorage.removeItem(USER_KEY);
               UserSignedOut();
               navigate('SignedOut');
              Alert.alert("Error", res['ERRORS']);
              }
              
              else {
              
               console.log('login res is ' + res);
              console.log('wooow lookie savin this username ' + username + 'and stringied ' + JSON.stringify(username));
              /*
              UserHasLogged();
              */
              
              
             
            
              GetUserVMs();
              creationManager.GetCreationData();
             
              
             
              }
              
         
              
              /*
              GetUserVMs();
              GetUserInformation();
               */
              }
              }
              }
              
               catch(err) {
              
              
              console.log('fucking error for body was ' + err);
             
              
              if(Platform.OS == 'android'){
              
             var response = thisResponse;
             var setCookie = require('set-cookie-parser');
              
              
              
              // This is mainly for React Native; Node.js does not combine set-cookie headers.
              var combinedCookieHeader = response.headers.get('Set-Cookie');
          
              var splitCookieHeaders = setCookie.splitCookiesString(combinedCookieHeader)
              var cookies = setCookie.parse(splitCookieHeaders);
              
              
              console.log('behold cookies length ' + cookies.length);
              for(var i = 0; i < cookies.length; i ++){
              var cookie = cookies[i];
              if(cookie.name == 'csrf_skysilk_cookie'){
              
              console.log('behold csrf cookie ' + cookie.value);
              var csrf_str = 'csrf_skysilk_cookie=' + cookie.value + '; expires=' + cookie.expires + '; Max-Age=7200; path=/';
              
             
              
              global.csrf_token = csrf_str;
              global.csrf_token_hash = cookie.value;
            
              
              
              }
              
              if(cookie.name == 'ci_session'){
              
              console.log('behold ci session ' + cookie.value);
              var ci_str = 'ci_session=' + cookie.value + '; expires=' + cookie.expires + '; Max-Age=7200; path=/; HttpOnly';
              
            
              global.ci_session = ci_str;
              
              }
              
              }
              
              onSignIn(username, password, navigate);
              
              }
              
              
                }
              }).catch((error) => {
                       console.error(error);
                       });
     
        
        
        } catch(err) {
        console.log("Error fetching data-----------", err);
    }
    
    
}


function isObject(obj)
{
    return obj !== undefined && obj !== null && obj.constructor == Object;
}


export const onSignOut = (navigate) => {
    
    AsyncStorage.removeItem(USER_KEY);
    AsyncStorage.setItem("touchIdStatus", 'false');
    UserSignedOut();
    navigate('SignedOut');
}

export const isSignedIn = () => {
    return new Promise((resolve, reject) => {
                       AsyncStorage.getItem(USER_KEY)
                       .then(res => {
                             if (res !== null) {
                             resolve(true);
                             } else {
                             resolve(false);
                             }
                             })
                       .catch(err => reject(err));
                       });
};

GetUserInformation = async () => {

console.log('uh trying to get user info');
    
    // Cancel any in-progress requests
    // Load new data and update profileOrError
    
    //Have a try and catch block for catching errors.
    try {
        fetch('https://www.skysilk.com/api_v2/user/Account/getUserPersonalInfo', {
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
              console.log('personal infi in profile is ' + resStr);
              /*
               this.setState({ auth_token: res.auth_token });
               */
              if(res.status == '403'){
              Alert.alert("Forbidden", " 403 for vms");
              }
              else {
              
              personalInfo = res['PERSONAL_INFO'];
              if(personalInfo.IsPaymentMethodSet){
              global.userHasPaymentMethod = true;
              }
              if(personalInfo.PaymentGateway == 'CREDIT_CARD'){
              global.usingCreditCard = true;
              }
              GiveUserInfo(personalInfo);
              global.personalDict = personalInfo;
              SetAccountVars(personalInfo);
               authNav('Profile');
              
              
              console.log('personal info email is ' + personalInfo['Email']);
              
              
              
              }
              }
              }).catch((error) => {
                       console.error(error);
                       });
        
    } catch(err) {
        console.log("Error fetching data-----------", err);
    }
    
}
