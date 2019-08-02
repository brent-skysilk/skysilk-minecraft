import React, {Component} from "react";
import { View, ScrollView, Image, Dimensions, TouchableOpacity, Alert } from "react-native";
import { Card, Button, Text } from "react-native-elements";
import { LinearGradient } from 'expo';
import { Icon } from 'expo';

var regionScreenHeight = Dimensions.get('window').height;

import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';


var backupType;
var itemList = [];
var vmId;
var titleStr;

var backupNav;


export default class BackupManager extends React.Component {
    static navigationOptions = {
    title: 'Billing',
    };
    
    state = {
        //Assing a array to your pokeList state
    billingInfo:{},
        //Have a loading state where when data retrieve returns data.
    loading: true,
    title: 'Billing',
    loaded:false,
    }
    
    constructor()
    {
        super();
        
       
    }
    
    componentDidMount() {
        // It's preferable in most cases to wait until after mounting to load data.
        // See below for a bit more context...
       backupType = this.props.navigation.getParam('type', 'NO-ID')
        vmId = this.props.navigation.getParam('vmId', 'NO-ID');
        if(backupType ==  1){
        titleStr = 'Backups';
        this.GetBackups();
        }
        if(backupType ==  2){
        titleStr = 'Snapshots';
        this.GetSnapshots();
        }
        
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (this.state.userInfo === null) {
            // At this point, we're in the "commit" phase, so it's safe to load the new data.
          
        }
    }
    
    render() {
    
    backupNav = this.props.navigation;
    var buttonTitle;
    
    if(backupType ==  1){
    buttonTitle = 'Back Up Now';
    }
    
    if(backupType ==  2){
    buttonTitle = 'Create Snapshot';
    }
    var descripFontSize = 10;
    
    var lineOffsetY = '32%';
    var logoOffset = '14%';
    
    if(regionScreenHeight > 700){
    descripFontSize = 14;
    lineOffsetY = '27.5%';
    logoOffset = '18%';
    }
    
    var NYOpacity = 1;
    if(global.tier == 3){
    NYOpacity = 0.5;
    }
    
        const { navigate } = this.props.navigation;
        console.log('type was ' + this.props.navigation.getParam('type', 'NO-ID'));
       
       
        
        var backupsView;
        
           if(this.state.loaded){
           var backupViewArray = [];
           for(var i = 0; i < itemList.length; i++){
           
           var thisBackup = itemList[i];
           var newBackupView = <View key={i} style={{width:'100%', marginTop:5, alignSelf:'center', height:40}}>
                    <Text numberOfLines={4} style={{height:40, textAlign:'left', fontSize:11, fontWeight:'500', width:'35%', color:'black', position:'absolute'}}>
                    {thisBackup.Name}
                    </Text>
                    <Text style={{height:15, fontSize:11, fontWeight:'500', width:'60%', color:'black', textAlign:'right', position:'absolute', right:0}}>
                    {thisBackup.DateDateTime}
                    </Text>
                    <CellParent title={thisBackup.Id} radioGroup={'1'} onPress={this.ShowBackupOptions} />
                    </View>;
               
                    backupViewArray.push(newBackupView);
           
           }
           
          backupsView =
          <View>
          <View style={{width:'100%', marginTop:5, alignSelf:'center', flexDirection:'row', height:'10%'}}>
                    <Text style={{height:15, textAlign:'left', fontSize:11, fontWeight:'500', flex:0.6, color:'black'}}>
                    Title
                    </Text>
                    <Text style={{height:15, textAlign:'left', fontSize:11, fontWeight:'500', flex:0.3, color:'black', textAlign:'right'}}>
                    Timestamp
                    </Text>
                    </View>
                    <ScrollView style={{width:'100%', marginTop:5, alignSelf:'center', height:'82%',}}>
                    {backupViewArray}
                    </ScrollView>
                    </View>;
           
           
           }
           else {
           backupsView =  <MaterialIndicator color='#006aff' />;
           }
       
            // Render user data
            return (
                    <View style={{ flex:1 }}>
                    <ScrollView contentContainerStyle={{ paddingVertical: 20, flex:1 }}>
                    <View style={{width:'100%', height:'20%', marginTop:-35}}>
                    <View style={{height:'100%', width:'100%', marginTop:0, marginBottom:0, backgroundColor:'red', flex:2, flexDirection:'row', justfifyContent:'center', alignItems:'center',
                    }}>
                    <LinearGradient
                    colors={['#4285f4', '#0052aa']}
                    style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height:'100%',
                    }}
                    />
                    <Icon.Ionicons onPress={ () => { this._onPressBack() } }
                    name='ios-arrow-round-back'
                    size={40}
                    style={{ position:'absolute', left:20, marginTop:35 }}
                    color='white'
                    />
                    <View style={{backgroundColor:'clear',
                    width:'80%',
                    height:'50%',
                    left:'10%',
                    top:'15%',
                    flexDirection:'row',
                    justfifyContent:'center',
                    alignItems:'center',
                    }}>
                    
                    <View style={{width:1, height:'80%', backgroundColor:'white', marginLeft:'4%'}}/>
                    <Text style={{marginLeft:'4%', color:'white', fontSize:20, fontWeight:'bold'}}>
                    {titleStr}
                    </Text>
                    </View>
                    </View>
                    </View>
                    <View style={{marginTop:20, backgroundColor:'#5088f5', marginLeft:10, marginRight:10, height:60, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <Text style={{color:'white', fontSize:20, fontWeight:'bold', textAlign:'center', flex:1, alignSelf:'center'}}>
                    {buttonTitle}
                    </Text>
                     <TouchableOpacity
                    style={{backgroundColor:'clear', width:'100%', height:'100%', position:'absolute'}}
                    onPress={() => this.CreateBackup()}>
                    </TouchableOpacity>
                    </View>
                   <View style={{backgroundColor:"white", marginLeft:10, marginRight:10, borderRadius:0, flex:1, shadowColor:'black', shadowRadius:2, shadowOpacity:0.15, marginTop:20, shadowOffset:{width: 3, height: 3}}}>
                   {backupsView}
                   </View>
                    </ScrollView>
                    </View>
                    );
            
        
    }
    
    ShowBackupOptions (backupId) {
    
   
    
    Alert.alert(
  'Options',
  '',
  [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'Rollback', onPress: () => RollbackWarning(backupId)},
    {text: 'Delete', onPress: () => DeleteWarning(backupId)},
  ],
  {cancelable: false},
);
    
    }
    
  
    
    
    
    CreateBackup () {
    
    var url;
    var dataStr = '';
    if(backupType ==  1){
    url = 'https://www.skysilk.com/api_v2/user/VM/createVMBackup/' + vmId;
    }
    if(backupType ==  2){
    url = 'https://www.skysilk.com/api_v2/user/VM/createVMSnapshot/' + vmId;
    var d = new Date();
    d = formatDate(d);
    dataStr = 'manual_snapshot_'+d;
    console.log('wow look at this data str ' + dataStr);
    }
    
    try {
       
        var form = new FormData();
        form.append("csrf_skysilk_token", global.csrf_token_hash);
        if(backupType ==  2){
        form.append("name", dataStr);
        }
        fetch(url, {
              method: 'POST',
              credentials: 'include',
              headers: {
              'Content-Type': 'text/plain',
              'Set-Cookie':  global.csrf_token,
              'Set-Cookie': global.ci_session,
              },
              body: form
              
              }).then((response) => response.json())
        .then((res) => {
              if(typeof(res.message) != "undefined"){
              Alert.alert("Error", "Error: "+ res.message);
              }
              else{
              var resStr = JSON.stringify(res);
              console.log('command result string: ' + resStr);
              if(res.CODE == 'OK'){
              
              this._onPressBack();
              
              }
              /*
               this.setState({ auth_token: res.auth_token });
               */
              if(res.status == '403'){
              Alert.alert("Forbidden", " 403 for vms");
              }
              else {
              
             
             
              
              }
             
              }
              
              }).catch((error) => {
                       console.error(error);
                       });
        
    } catch(err) {
        console.log("Error issuing vm command-----------", err);
    }
    
    
    }
    
    
    
    GetBackups = async () => {
    
    // Cancel any in-progress requests
    // Load new data and update profileOrError
    
    //Have a try and catch block for catching errors.
    var commandURL = 'https://www.skysilk.com/api_v2/user/VM/getVMBackups/' + vmId;
    console.log('look at backups URL ' + commandURL);
       try {
       
       
        fetch(commandURL, {
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
         
              if(res.CODE == 'OK'){
              
              console.log('got some backups yo ' + res.list.length);
              itemList = res.list;
              this.setState({loaded:true});
              }
             
              if(res.status == '403'){
              Alert.alert("Forbidden", " 403 for vms");
              }
              else {
              
             
             
              
              }
             
              }
              
              }).catch((error) => {
                       console.error(error);
                       });
        
    } catch(err) {
        console.log("Error issuing vm command-----------", err);
    }
    
}

GetSnapshots = async () => {
    
    // Cancel any in-progress requests
    // Load new data and update profileOrError
    
    //Have a try and catch block for catching errors.
    var commandURL = 'https://www.skysilk.com/api_v2/user/VM/getVMSnapshots/' + vmId;
       try {
       
       
        fetch(commandURL, {
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
         
              if(res.CODE == 'OK'){
              
              itemList = res.list;
              this.setState({loaded:true});
              
              }
             
              if(res.status == '403'){
              Alert.alert("Forbidden", " 403 for vms");
              }
              else {
              
             
             
              
              }
             
              }
              
              }).catch((error) => {
                       console.error(error);
                       });
        
    } catch(err) {
        console.log("Error issuing vm command-----------", err);
    }
    
}
    
    
    _onPressBack() {
  
      this.props.navigation.pop();
  }
}

  function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes;
  return date.getMonth()+1 + "_" + date.getDate() + "_" + date.getFullYear();
}

    

class CellParent extends Component {
  render() {
    return (
      <TouchableOpacity
       style={{backgroundColor:'clear', width:'100%', height:'100%', position:'absolute'}}
        title={this.props.title}
        group={this.props.radioGroup}
        onPress={() => this.props.onPress(this.props.title)}>
      </TouchableOpacity>
    );
  }
}

function  RollbackWarning (backupId) {
    
    
    var typeStr;
    if(backupType ==  1){
    typeStr = 'Restore to this backup?';
    }
    if(backupType ==  2){
    typeStr = 'Rollback to this snapshot?';
    }
    Alert.alert(
  'Please Confirm',
  typeStr,
  [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => Rollback(backupId)},
  ],
  {cancelable: false},
);

    }

     function DeleteWarning (backupId) {
    
    var typeStr;
    if(backupType ==  1){
    typeStr = 'Backup';
    }
    if(backupType ==  2){
    typeStr = 'Snapshot';
    }
    Alert.alert(
  'Please Confirm',
  'Delete this ' + typeStr + '?',
  [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => DeleteBackup(backupId)},
  ],
  {cancelable: false},
);
    }

    function Rollback (backupId) {
    
    var url;
    var dataStr = '';
    if(backupType ==  1){
    url = 'https://www.skysilk.com/api_v2/user/VM/restoreVMfromBackup/' + vmId + '/' + backupId;
    }
    if(backupType ==  2){
    url = 'https://www.skysilk.com/api_v2/user/VM/rollbackVMToSnapshot/' + vmId + '/' + backupId;
    }
    
    try {
       
        var form = new FormData();
        form.append("csrf_skysilk_token", global.csrf_token_hash);
        fetch(url, {
              method: 'POST',
              credentials: 'include',
              headers: {
              'Content-Type': 'text/plain',
              'Set-Cookie':  global.csrf_token,
              'Set-Cookie': global.ci_session,
              },
              body: form
              
              }).then((response) => response.json())
        .then((res) => {
              if(typeof(res.message) != "undefined"){
              Alert.alert("Error", "Error: "+ res.message);
              }
              else{
              var resStr = JSON.stringify(res);
              console.log('command result string: ' + resStr);
              if(res.CODE == 'OK'){
              
              backupNav.pop();
              
              }
              /*
               this.setState({ auth_token: res.auth_token });
               */
              if(res.status == '403'){
              Alert.alert("Forbidden", " 403 for vms");
              }
              else {
              
             
             
              
              }
             
              }
              
              }).catch((error) => {
                       console.error(error);
                       });
        
    } catch(err) {
        console.log("Error issuing vm command-----------", err);
    }
    
    
    }

    function DeleteBackup (backupId) {
    
     var url;
    var dataStr = '';
    if(backupType ==  1){
    url = 'https://www.skysilk.com/api_v2/user/VM/deleteVMBackup/' + vmId + '/' + backupId;
    }
    if(backupType ==  2){
    url = 'https://www.skysilk.com/api_v2/user/VM/deleteVMSnapshot/' + vmId + '/' + backupId;
    }
    
    try {
       
        var form = new FormData();
        form.append("csrf_skysilk_token", global.csrf_token_hash);
        fetch(url, {
              method: 'POST',
              credentials: 'include',
              headers: {
              'Content-Type': 'text/plain',
              'Set-Cookie':  global.csrf_token,
              'Set-Cookie': global.ci_session,
              },
              body: form
              
              }).then((response) => response.json())
        .then((res) => {
              if(typeof(res.message) != "undefined"){
              Alert.alert("Error", "Error: "+ res.message);
              }
              else{
              var resStr = JSON.stringify(res);
              console.log('command result string: ' + resStr);
              if(res.CODE == 'OK'){
              
              backupNav.pop();
              
              }
              /*
               this.setState({ auth_token: res.auth_token });
               */
              if(res.status == '403'){
              Alert.alert("Forbidden", " 403 for vms");
              }
              else {
              
             
             
              
              }
             
              }
              
              }).catch((error) => {
                       console.error(error);
                       });
        
    } catch(err) {
        console.log("Error issuing vm command-----------", err);
    }
    
    
    
    
    }


