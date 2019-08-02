import React from "react";
import { ScrollView, Text, Linking, View, Image,
    Platform,
    StyleSheet,
    TouchableOpacity,
    Alert, Dimensions} from "react-native";
import { Card, Button } from "react-native-elements";
import '../global.js'
import { LinearGradient, Icon } from 'expo';
import ActionSheet from 'react-native-actionsheet';
var tempImageWidth = Dimensions.get('window').width * 0.12;
var machineOptions = ['Control Panel', 'Change Plan', 'Restart', 'Backups', 'Delete', 'Cancel'];
var scaleOptions = ['Loser Plan - $5/mo', 'Normie Plan - $10/mo', 'Cool Kid Plan - $20/mo', 'Baller Plan - $40/mo', 'Mob Boss Plan - $75/mo', 'Cancel'];
var vmCardId;

var machineNav;

var vmIp;

import { WebView } from 'react-native-webview';



export default class ContainerCard extends React.Component {

showActionSheet = () => {
    this.ActionSheet.show()
    }
    
    showScaleActionSheet = () => {
    this.ScaleActionSheet.show()
    }


state = {
        //Assing a array to your pokeList state
    vmInfo:{},
        //Have a loading state where when data retrieve returns data.
    metricsLoaded: false,
    title: 'Cheese!',
    timeSeries: [],
    cpuDataSeries: [],
    ramDataSeries: [],
    diskDataSeries: [],
    }
    
   
  render() {
  
  
   machineNav = this.props.navigation;
   this.state.vmInfo = this.props.item;
   vmCardId = this.state.vmInfo.Id;
   vmIp = this.state.vmInfo.VMIP;
  
   var optionBut =  <TouchableOpacity style={{backgroundColor:'clear',position:'absolute', width:'100%', height:'100%'}} onPress={this.showActionSheet}>
        </TouchableOpacity>;
   
   
    var statusView;
    var deletedButton;
    
    
     if(this.state.vmInfo.IsRunning == 0){
     statusView = <View style={{position:'absolute', height:110, width:'100%', backgroundColor:'white', marginTop:80, justifyContent:'center'}}>
                    <Text style={{color:'#f2d70c', textAlign:'center', alignSelf:'center', fontSize:16, fontWeight:'600'}}>
                     Off
                    </Text>
                    </View>;
     }
    
    if(this.state.vmInfo.IsDeleted == 0 && !this.state.vmInfo.Status == 'READY'){
    statusView = <View style={{position:'absolute', height:110, width:'100%', backgroundColor:'white', marginTop:80}}>
        
                    </View>;
    }
    
    if(this.state.vmInfo.IsDeleted == 1){
    
    statusView = <View style={{position:'absolute', height:110, width:'100%', backgroundColor:'white', marginTop:80, justifyContent:'center'}}>
                    <Text style={{color:'red', textAlign:'center', alignSelf:'center', fontSize:16, fontWeight:'600'}}>
                     Deleted
                    </Text>
                    </View>;
        
    deletedButton = <TouchableOpacity style={{backgroundColor:'clear',position:'absolute', width:'100%', height:'100%'}} onPress={this.showActionSheet}>
        </TouchableOpacity>;
    
         }
        
        var cardSize = 370;
        var cardPadding = 10;
      
        var planName;
        var planImage;
        var planRam;
        var planPlayers;
        var planPrice;
        if(this.state.vmInfo.PlanName == 'Nano'){
        planName = 'Loser Plan';
        planRam = '2GB';
        planPlayers = '30';
        planPrice = '$4.99';
        planImage = <Image source={require('../images/Wooden_Pickaxe.png')} style={{width:70, height:70, alignSelf:'center', marginTop:15}} />;
        }
      
        if(this.state.vmInfo.PlanName == 'Micro'){
        planName = 'Normie Plan';
        planRam = '4GB';
        planPlayers = '30';
        planPrice = '$9.99';
        planImage = <Image source={require('../images/Stone_Pickaxe.png')} style={{width:70, height:70, alignSelf:'center', marginTop:15}} />;
        }
      
        if(this.state.vmInfo.PlanName == 'Small'){
        planName = 'Cool Kid Plan';
        planRam = '8GB';
        planPlayers = '120';
        planPrice = '$19.99';
        planImage = <Image source={require('../images/Iron_Pickaxe.png')} style={{width:70, height:70, alignSelf:'center', marginTop:15}} />;
        }
      
        if(this.state.vmInfo.PlanName == 'Medium'){
        planName = 'Baller Plan';
        planRam = '12GB';
        planPlayers = '200';
        planPrice = '$39.99';
        planImage = <Image source={require('../images/Golden_Pickaxe.png')} style={{width:70, height:70, alignSelf:'center', marginTop:15}} />;
        }
      
        if(this.state.vmInfo.PlanName == 'Large'){
        planName = 'Mob Boss Plan';
        planRam = '24GB';
        planPlayers = '500';
        planPrice = '$74.99';
        planImage = <Image source={require('../images/Diamond_Pickaxe.png')} style={{width:70, height:70, alignSelf:'center', marginTop:15}} />;
        }
      
    return (
    
    
    
    <View style={{marginTop:cardPadding,  marginLeft:'2%', marginRight:'2%', backgroundColor:'rgba(19,19,19,.75)', height:cardSize}}>
           <Image source={require('../images/mc_texture.png')} style={{width:'100%', height:40, resizeMode:'repeat'}} />
           {planImage}
           <Text style={{fontSize:26, fontWeight:'700', textAlign:'center', alignSelf:'center', width:'100%', color:'white', marginTop:10}}>
           {planName}
           </Text>
           <Text style={{fontSize:30, fontWeight:'700', textAlign:'center', alignSelf:'center', width:'100%', color:'#5ae200', marginTop:15}}>
           {planPrice}
           </Text>
           <Text style={{fontSize:18, fontWeight:'500', textAlign:'center', alignSelf:'center', width:'100%', color:'white', marginTop:10}}>
           Up to {planPlayers} players
           </Text>
           <Text style={{fontSize:18, fontWeight:'500', textAlign:'center', alignSelf:'center', width:'100%', color:'white', marginTop:10}}>
           {planName}
           </Text>
           <View style={{width:'80%', height:40, borderRadius:5, backgroundColor:'#4ec101', alignSelf:'center', top:25, justifyContent:'center', alignItems:'center'}}>
           <Text style={{fontSize:24, fontWeight:'800', textAlign:'center', alignSelf:'center', color:'white'}}>
           {this.state.vmInfo.VMIP}
           </Text>
           </View>
           {optionBut}
                    <ActionSheet
                      ref={o => this.ActionSheet = o}
                      title={'Server Options'}
                      options={machineOptions}
                      cancelButtonIndex={machineOptions.length - 1}
                      destructiveButtonIndex={machineOptions.length - 2}
                      onPress={(index) => { this.MachineMenuAction(index)}}
                    />
                    <ActionSheet
                      ref={o => this.ScaleActionSheet = o}
                      title={'Plans'}
                      options={scaleOptions}
                      cancelButtonIndex={scaleOptions.length - 1}
                      onPress={(index) => { this.ScaleMenuAction(index)}}
                    />
                    </View>
    )
   
  
}



MachineMenuAction = async (option) => {

console.log('this should be option ' + option);

//didn't hit cancel
if(option < machineOptions.length){
var actionName = machineOptions[option];
console.log('action name appears to be ' + actionName);


if(actionName == 'Control Panel'){

GoToControlPanel(this.state.vmInfo.VMIP);

}

if(actionName == 'Restart'){

RestartVM(this.state.vmInfo.VMIP);

}

if(actionName == 'Change Plan'){

this.showScaleActionSheet();

}


if(actionName == 'Backups'){

GoToBackups(this.state.vmInfo.VMIP);

}

if(actionName == 'Delete'){

Alert.alert(
                    'Delete Server',
                    'Are you sure you want to delete this server? This action cannot be undone.',
                    [
                    {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                    },
                    {text: 'Yes', onPress: () => this.DoDeleteMachine()},
                    ],
                    {cancelable: false},
                    );
}


}
}

ScaleMenuAction = async (option) => {

console.log('this should be option ' + option);

//didn't hit cancel
if(option < scaleOptions.length){
var actionName = scaleOptions[option];
console.log('action name appears to be ' + actionName);


if(actionName == 'Control Panel'){

GoToControlPanel(this.state.vmInfo.VMIP);

}

if(actionName == 'Restart'){

RestartVM(this.state.vmInfo.VMIP);

}

if(actionName == 'Backups'){

GoToBackups(this.state.vmInfo.VMIP);

}

if(actionName == 'Delete'){

Alert.alert(
                    'Delete Server',
                    'Are you sure you want to delete this server? This action cannot be undone.',
                    [
                    {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                    },
                    {text: 'Yes', onPress: () => this.DoDeleteMachine()},
                    ],
                    {cancelable: false},
                    );
}


}
}

DoDeleteMachine = async () => {

this.IssueVMCommandFromList('deleteVM', this.state.vmInfo.Id);

}

IssueVMCommandFromList = async (endpoint, parameters) => {
    
    // Cancel any in-progress requests
    // Load new data and update profileOrError
    
    //Have a try and catch block for catching errors.
    var commandURL = 'https://www.skysilk.com/api_v2/user/VM/' + endpoint + '/' + parameters;
    console.log('ooo try this command ' + commandURL);
       try {
       
        var form = new FormData();
        form.append("csrf_skysilk_token", global.csrf_token_hash);
        fetch(commandURL, {
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
              
              console.log('Command ' + endpoint + ' successful');
              
              
            
              
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

}





const styles = StyleSheet.create(
                                 {
                                 MainContainer:
                                 {
                                 flex: 1,
                                 paddingTop: (Platform.OS === 'ios') ? 20 : 0
                                 },
                                 
                                 item_text_style:
                                 {
                                 fontSize: 20,
                                 color: '#000',
                                 padding: 10
                                 },
                                 
                                 item_separator:
                                 {
                                 height: 1,
                                 width: '100%',
                                 backgroundColor: '#263238',
                                 },
                                
                                 graph_box:{
                                 marginLeft:1, marginRight:1, width:'32.6%', height:68, textAlign:'center', justifyContent: 'center', alignItems: 'center', backgroundColor:'white', marginTop:1},
                                 small_line_chart:{ height: '40%', width:'80%' },
                                  graph_color_box:{
                                 marginLeft:1, marginRight:1, width:68, height:20, marginTop:1},
                                 }
                                 
                                 
                                 );




