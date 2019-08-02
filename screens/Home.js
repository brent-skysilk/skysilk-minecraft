import React from "react";
import { ScrollView, Text, Linking, View, Image,
    Platform,
    StyleSheet,
    TouchableOpacity,
    Alert, Dimensions} from "react-native";
import { Card, Button } from "react-native-elements";
import '../global.js'
import { LinearGradient, Icon } from 'expo';
var vmList = [];
var thiz = this;
var listChanged = false;
var shouldGetVms = false;

import ContainerCard from './ContainerCard';

var vmListScreenHeight = Dimensions.get('window').height;

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



var ctNavigate;

var vmListInterval;
var initialLoad = false;

GetUserVMs = async () => {
    
    //Have a try and catch block for catching errors.
    try {
        fetch('https://www.skysilk.com/api_v2/user/VM/getUserVMs/REGISTERED%7CDEPLOYING%7CDEPLOYMENT_FAILED%7CREADY', {
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
              Alert.alert("Forbidden", " 403 for vms");
              }
              else {
              initialLoad = true;
              vmList = [];
              var fullVMList = res['VMS'];
              var totalCurrentCost = 0;
              var totalProjectedCost = 0;
              var totalRunning = 0;
              var totalOff = 0;
              var totalDeleted = 0;
              for(var v = 0; v < fullVMList.length; v++){
              
              var vm = fullVMList[v];
              
              
              
              
              totalProjectedCost += (((vm.PricePerHour * 24 * 28) * (1-(vm.PlanDiscount/100))));
              
              if(vm.IsDeleted == 1){
              totalDeleted += 1;
              }
              
              else {
              
              if(vm.IsRunning == 1){
              totalRunning += 1;
              }
              
              else {
              
              totalOff += 1;
              
              }
              
              }
            
              
              var lastCost;
              
              if(vm._usage.periods[0]){
               lastCost = vm._usage.periods[0].totalOverall;
              }
              
              totalCurrentCost += lastCost;
              
              console.log('this vm is named ' + vm.VMName);
              console.log('as of now current total is ' + totalCurrentCost + ' and projected total will be ' + totalProjectedCost.toFixed(2));
              if(vm.TemplateId == 116){
              vmList.push(vm);
              }
              
              }
              
             
              setTimeout(function() { GetUserVMs(); }, 20000);
              
              listChanged = true;
              
              console.log('vms are  IN LIST VIEW' + fullVMList);
              
              }
              }
              }).catch((error) => {
                       console.error(error);
                       });
        
    } catch(err) {
        console.log("Error fetching data-----------", err);
    }
    
}



export default class Home extends React.Component {
    state = {
        //Assing a array to your pokeList state
    userVmList: [],
        //Have a loading state where when data retrieve returns data.
    loading: true
    }
    
    
    
    printSomething(){
    console.log('something');
    }
    
    componentWillUnmount(){
     console.log('fuckin unmounted');
    clearInterval(vmListInterval);
    }
    
    constructor()
    {
        super();
        
        this.Array_Items = [
                            'January',
                            'February',
                            'March',
                            'April',
                            'May',
                            'June',
                            'July',
                            'August',
                            'September',
                            'October',
                            'November',
                            'December'
                            ];
        
        
        vmListInterval = setInterval(() => (
                           this.setState({userVmList:vmList})
                           ), 5000);
    }

render()
{

console.log('look at me i am rendering ' + vmList.length);
    const { userVmList, loading } = this.state;
    //Destruct navigation from props
    ctNavigate = this.props.navigation;
    
    
    var listTopMargin = 0;
    
    var floatingButton;
    
    if(vmList.length < 1){
    
    floatingButton = <View style={{marginTop:20,  marginLeft:'2%', marginRight:'2%', backgroundColor:'rgba(19,19,19,.75)', height:100, justifyContent:'center'}}>
            <Image source={require('../images/mc_block.png')} style={{width:60, height:60, position:'absolute', marginLeft:40}} />
            <Text style={{fontSize:24, fontWeight:'800', textAlign:'left', alignSelf:'center', width:'60%', color:'white', marginLeft:75}}>
           Add New Server
           </Text>
           <TouchableOpacity style={{backgroundColor:'clear',position:'absolute', width:'100%', height:'100%'}} onPress={() => this.props.navigation.navigate('Plans')}>
        </TouchableOpacity>
           </View>;
    
    }
    
    else {
    
    floatingButton = <View style={{marginTop:10,  marginLeft:'2%', marginRight:'2%', backgroundColor:'rgba(19,19,19,.75)', height:100, justifyContent:'center'}}>
            <Image source={require('../images/mc_block.png')} style={{width:60, height:60, position:'absolute', marginLeft:40}} />
            <Text style={{fontSize:18, fontWeight:'800', textAlign:'left', alignSelf:'center', width:'60%', color:'white', marginLeft:85}}>
           Need More Servers?
           </Text>
           <TouchableOpacity style={{backgroundColor:'clear',position:'absolute', width:'100%', height:'100%'}} onPress={() => this.props.navigation.navigate('Plans')}>
        </TouchableOpacity>
           </View>;
    
    }
   
    if(vmListScreenHeight == 896){
    listTopMargin = 25;
    
    }
    
    if(initialLoad) {
    const data = [
            {
                month: new Date(2015, 0, 1),
                bananas: 1920,
                cherries: 960,
                dates: 3840,
            },
            {
                month: new Date(2015, 1, 1),
                bananas: 1440,
                cherries: 960,
                dates: 1600,
            },
            {
                month: new Date(2015, 2, 1),
                bananas: 960,
                cherries: 3640,
                dates: 640,
            },
            {
                month: new Date(2015, 3, 1),
                bananas: 480,
                cherries: 640,
                dates: 3320,
            }]
        
        const colors = [ '#7eb3fc', '#4291ff', '#006aff' ]
        const keys   = [ 'bananas', 'cherries', 'dates' ]
        const svgs = [
                    { onPress: () => console.log('bananas') },
                    { onPress: () => console.log('cherries') },
                    { onPress: () => console.log('dates') },
                ]


    return(
           <View style={{ flex: 1, backgroundColor:'red' }}>
           <Image source={require('../images/mc_image.png')} style={{width:'100%', height:'100%', resizeMode:'cover', position:'absolute'}} />
           <View style={{width:'100%', height:'100%', position:'absolute', backgroundColor:'black', opacity:0.05}}/>
           <View style={{marginTop:0,  width:'100%', backgroundColor:'rgba(19,19,19,.75)', height:160, justifyContent:'center'}}>
           <Text style={{fontSize:18, fontWeight:'800', textAlign:'center', alignSelf:'center', width:'60%', color:'white'}}>
           brent@skysilk.com
           </Text>
           
           <View style={{width:'80%', height:40, borderRadius:5, backgroundColor:'#4ec101', alignSelf:'center', top:25, justifyContent:'center', alignItems:'center'}}>
           <Text style={{fontSize:18, fontWeight:'500', textAlign:'center', alignSelf:'center', color:'white'}}>
           MANAGE ACCOUNT
           </Text>
           </View>
           <TouchableOpacity style={{backgroundColor:'clear',position:'absolute', width:'100%', height:'100%'}} onPress={() => this.props.navigation.navigate('Account')}>
        </TouchableOpacity>
           </View>
           <ScrollView contentContainerStyle={{ paddingVertical: 1 }} style={{backgroundColor:'clear', width:'100%', height:'100%', marginTop:8}}>
           
         
           {vmList.map(( item, key ) => (
                    <ContainerCard key={key} item={item}/>
                    ))}
           
            {floatingButton}
           
           </ScrollView>
           </View>
           /*
  <View style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        
          
        
      {images.map(({ name, image, url, key }) => (
        <Card title={`CARD ${key}`} image={image} key={key}>
          <Text style={{ marginBottom: 10 }}>
            Photo by {name}.
          </Text>
          <Button
            backgroundColor="#03A9F4"
            title="VIEW NOW"
            onPress={() => Linking.openURL(url)}
          />
        </Card>
      ))}
           
    </ScrollView>
  </View>
            */
           )
    }
    else {
        return (<View style={{ flex: 1, backgroundColor:'blue' }}>
        <Image source={require('../images/mc_image.png')} style={{width:'100%', height:'100%', resizeMode:'cover', position:'absolute'}} />
           <View style={{width:'100%', height:'100%', position:'absolute', backgroundColor:'black', opacity:0.4}}/>
           <View style={{position:'absolute', backgroundColor:'rgba(52, 52, 52, 0.7)', width:'100%', height:'100%', justifyContent:'center'}}>
                    <View style={{backgroundColor:'clear', borderRadius:5, width:250, height:250, alignSelf:'center', position:'absolute'}}>
                    <BallIndicator color='white' size={40}
                    style={{marginTop:-100, marginBottom:-5, width:60, height:60, alignSelf:'center'}} />
                    <Text style={{width:220, marginTop:5, position:'absolute', marginTop:120, alignSelf:'center', height:45, textAlign:'center', fontSize:18, color:'white'}}>
                    Getting your servers....
                    </Text>
                    </View>
                    </View>
           </View>)
    }
}
}

openLink = async (link) => {
   
    Linking.canOpenURL(link).then(supported => {
      if (supported) {
        Linking.openURL(link);
      } else {
        console.log("Don't know how to open URI:");
      }
    });
  };

GoToControlPanel = async (vm) => {

var vmUrl = 'http://' + vm + ':8080';
openLink(vmUrl);

}

UserSignedOut = async () => {
    
    
}

GoToBackups = async (type) => {

 ctNavigate.navigate('BackupManager', {type:type, vmId:vmId});

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

                                 
