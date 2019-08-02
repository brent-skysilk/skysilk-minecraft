import React from "react";
import { ScrollView, Text, Linking, View, Image,
    Platform,
    StyleSheet,
    TouchableOpacity,
    Alert, Dimensions} from "react-native";
import { Card, Button } from "react-native-elements";
import '../global.js'
import { LinearGradient, Icon } from 'expo';

import stripe from 'tipsi-stripe';

stripe.setOptions({
  publishableKey: 'pk_live_kBOCkpt6EATEXH7DUQ2tviUb',
  merchantId: 'MERCHANT_ID', // Optional
  androidPayMode: 'test', // Android only
})


import ContainerCard from './ContainerCard';

import * as RNIap from 'react-native-iap';

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

var plansScreenHeight = Dimensions.get('window').height;

const itemSkus = Platform.select({
  ios: [
    'five_dollar_base',
    'ten_dollar_plan',
    'twenty_dollar_plan',
    'forty_dollar_plan',
    'seventy_five_dollar_plan',
  ],
  android: [
    'com.example.coins100'
  ]
});


export default class Plans extends React.Component {
    state = {
        //Assing a array to your pokeList state
    userVmList: [],
        //Have a loading state where when data retrieve returns data.
    loading: true,
    deployingVM:false,
    }
    
    printSomething(){
    console.log('something');
    }
    
    async componentDidMount() {
    
    try {
    const products = await RNIap.getProducts(itemSkus);
    console.log('ayy some products are ' + JSON.stringify(products));
    this.setState({ products });
  } catch(err) {
    console.warn(err); // standardized err.code and err.message available
  }
  
    
    }
    
    componentWillUnmount(){
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
                           this.setState(previousState => (
                                                           { userVmList: [], loading: false}
                                                           ))
                           ), 5000);
    }

render()
{
    var arrowTop = 10;
    if(plansScreenHeight == 896){
    arrowTop = 30;
    }
    var planPadding = 35;
    var planSize = 395;
    
    var creatingView;
    if(this.state.deployingVM){
    console.log('Hey look at us deploying');
    creatingView =<View style={{ flex: 1, backgroundColor:'clear', position:'absolute', width:'100%', height:'100%' }}>
     <View style={{width:'100%', height:'100%', position:'absolute', backgroundColor:'black', opacity:0.4}}/>
           <View style={{position:'absolute', backgroundColor:'rgba(52, 52, 52, 0.7)', width:'100%', height:'100%', justifyContent:'center'}}>
                    <View style={{backgroundColor:'clear', borderRadius:5, width:250, height:250, alignSelf:'center', position:'absolute'}}>
                    <BallIndicator color='white' size={40}
                    style={{marginTop:-100, marginBottom:-5, width:60, height:60, alignSelf:'center'}} />
                    <Text style={{width:220, marginTop:5, position:'absolute', marginTop:120, alignSelf:'center', height:45, textAlign:'center', fontSize:18, color:'white'}}>
                    Creating your server...
                    </Text>
                    </View>
                    </View>
                    </View>;
    }
    return(
           <View style={{ flex: 1, backgroundColor:'red' }}>
           
           <Image source={require('../images/mc_image.png')} style={{width:'100%', height:'100%', resizeMode:'cover', position:'absolute'}} />
           <View style={{width:'100%', height:'100%', position:'absolute', backgroundColor:'black', opacity:0.1}}/>
                    <Icon.Ionicons onPress={ () => { this._onPressBack() } }
                    name='ios-arrow-round-back'
                    size={50}
                    style={{ position:'absolute', left:20, marginTop:arrowTop }}
                    color='white'
                    />
           <ScrollView contentContainerStyle={{ paddingVertical: 0 }} style={{backgrondColor:'red', bottom:15, height:'90%', position:'absolute', width:'100%'}}>
           
           <View style={{marginTop:10,  marginLeft:'2%', marginRight:'2%', backgroundColor:'rgba(19,19,19,.92)', height:planSize}}>
           <Image source={require('../images/mc_texture.png')} style={{width:'100%', height:40, resizeMode:'repeat'}} />
           <Image source={require('../images/Wooden_Pickaxe.png')} style={{width:70, height:70, alignSelf:'center', marginTop:15}} />
           <Text style={{fontSize:26, fontWeight:'700', textAlign:'center', alignSelf:'center', width:'100%', color:'white', marginTop:10}}>
           Loser Plan
           </Text>
           <Text style={{fontSize:30, fontWeight:'700', textAlign:'center', alignSelf:'center', width:'100%', color:'#5ae200', marginTop:15}}>
           $4.99/mo
           </Text>
           <Text style={{fontSize:18, fontWeight:'500', textAlign:'center', alignSelf:'center', width:'100%', color:'white', marginTop:10}}>
           Up to 30 players
           </Text>
           <Text style={{fontSize:18, fontWeight:'500', textAlign:'center', alignSelf:'center', width:'100%', color:'white', marginTop:10}}>
           2GB of RAM
           </Text>
           <Text style={{fontSize:18, fontWeight:'500', textAlign:'center', alignSelf:'center', width:'100%', color:'white', marginTop:10}}>
           Control Panel Ready
           </Text>
           <View style={{width:'80%', height:40, borderRadius:5, backgroundColor:'#4ec101', alignSelf:'center', top:25, justifyContent:'center', alignItems:'center'}}>
           <Text style={{fontSize:24, fontWeight:'800', textAlign:'center', alignSelf:'center', color:'white'}}>
           SET UP NOW
           </Text>
           </View>
           <TouchableOpacity style={{backgroundColor:'clear',position:'absolute', width:'100%', height:'100%'}} onPress={() => this.BuyServer('Loser Plan', 4.99)}>
            </TouchableOpacity>
           </View>
           <View style={{marginTop:planPadding,  marginLeft:'2%', marginRight:'2%', backgroundColor:'rgba(19,19,19,.92)', height:planSize}}>
           <Image source={require('../images/mc_texture.png')} style={{width:'100%', height:40, resizeMode:'repeat'}} />
           <Image source={require('../images/Stone_Pickaxe.png')} style={{width:70, height:70, alignSelf:'center', marginTop:15}} />
           <Text style={{fontSize:26, fontWeight:'700', textAlign:'center', alignSelf:'center', width:'100%', color:'white', marginTop:10}}>
           Normie Plan
           </Text>
           <Text style={{fontSize:30, fontWeight:'700', textAlign:'center', alignSelf:'center', width:'100%', color:'#5ae200', marginTop:15}}>
           $9.99/mo
           </Text>
           <Text style={{fontSize:18, fontWeight:'500', textAlign:'center', alignSelf:'center', width:'100%', color:'white', marginTop:10}}>
           Up to 75 players
           </Text>
           <Text style={{fontSize:18, fontWeight:'500', textAlign:'center', alignSelf:'center', width:'100%', color:'white', marginTop:10}}>
           4GB of RAM
           </Text>
           <Text style={{fontSize:18, fontWeight:'500', textAlign:'center', alignSelf:'center', width:'100%', color:'white', marginTop:10}}>
           Control Panel Ready
           </Text>
           <View style={{width:'80%', height:40, borderRadius:5, backgroundColor:'#4ec101', alignSelf:'center', top:25, justifyContent:'center', alignItems:'center'}}>
           <Text style={{fontSize:24, fontWeight:'800', textAlign:'center', alignSelf:'center', color:'white'}}>
           SET UP NOW
           </Text>
           </View>
           <TouchableOpacity style={{backgroundColor:'clear',position:'absolute', width:'100%', height:'100%'}} onPress={() => this.BuyServer('Normie Plan', 9.99)}>
            </TouchableOpacity>
           </View>
           <View style={{marginTop:planPadding,  marginLeft:'2%', marginRight:'2%', backgroundColor:'rgba(19,19,19,.92)', height:planSize}}>
           <Image source={require('../images/mc_texture.png')} style={{width:'100%', height:40, resizeMode:'repeat'}} />
           <Image source={require('../images/Iron_Pickaxe.png')} style={{width:70, height:70, alignSelf:'center', marginTop:15}} />
           <Text style={{fontSize:26, fontWeight:'700', textAlign:'center', alignSelf:'center', width:'100%', color:'white', marginTop:10}}>
           Cool Kid Plan
           </Text>
           <Text style={{fontSize:30, fontWeight:'700', textAlign:'center', alignSelf:'center', width:'100%', color:'#5ae200', marginTop:15}}>
           $19.99/mo
           </Text>
           <Text style={{fontSize:18, fontWeight:'500', textAlign:'center', alignSelf:'center', width:'100%', color:'white', marginTop:10}}>
           Up to 120 players
           </Text>
           <Text style={{fontSize:18, fontWeight:'500', textAlign:'center', alignSelf:'center', width:'100%', color:'white', marginTop:10}}>
           8GB of RAM
           </Text>
           <Text style={{fontSize:18, fontWeight:'500', textAlign:'center', alignSelf:'center', width:'100%', color:'white', marginTop:10}}>
           Control Panel Ready
           </Text>
           <View style={{width:'80%', height:40, borderRadius:5, backgroundColor:'#4ec101', alignSelf:'center', top:25, justifyContent:'center', alignItems:'center'}}>
           <Text style={{fontSize:24, fontWeight:'800', textAlign:'center', alignSelf:'center', color:'white'}}>
           SET UP NOW
           </Text>
           </View>
           <TouchableOpacity style={{backgroundColor:'clear',position:'absolute', width:'100%', height:'100%'}} onPress={() => this.BuyServer('Cool Kid Plan', 19.99)}>
            </TouchableOpacity>
           </View>
           <View style={{marginTop:planPadding,  marginLeft:'2%', marginRight:'2%', backgroundColor:'rgba(19,19,19,.92)', height:planSize}}>
           <Image source={require('../images/mc_texture.png')} style={{width:'100%', height:40, resizeMode:'repeat'}} />
           <Image source={require('../images/Golden_Pickaxe.png')} style={{width:70, height:70, alignSelf:'center', marginTop:15}} />
           <Text style={{fontSize:26, fontWeight:'700', textAlign:'center', alignSelf:'center', width:'100%', color:'white', marginTop:10}}>
           Baller Plan
           </Text>
           <Text style={{fontSize:30, fontWeight:'700', textAlign:'center', alignSelf:'center', width:'100%', color:'#5ae200', marginTop:15}}>
           $39.99/mo
           </Text>
           <Text style={{fontSize:18, fontWeight:'500', textAlign:'center', alignSelf:'center', width:'100%', color:'white', marginTop:10}}>
           Up to 200 players
           </Text>
           <Text style={{fontSize:18, fontWeight:'500', textAlign:'center', alignSelf:'center', width:'100%', color:'white', marginTop:10}}>
           12GB of RAM
           </Text>
           <Text style={{fontSize:18, fontWeight:'500', textAlign:'center', alignSelf:'center', width:'100%', color:'white', marginTop:10}}>
           Control Panel Ready
           </Text>
           <View style={{width:'80%', height:40, borderRadius:5, backgroundColor:'#4ec101', alignSelf:'center', top:25, justifyContent:'center', alignItems:'center'}}>
           <Text style={{fontSize:24, fontWeight:'800', textAlign:'center', alignSelf:'center', color:'white'}}>
           SET UP NOW
           </Text>
           </View>
           <TouchableOpacity style={{backgroundColor:'clear',position:'absolute', width:'100%', height:'100%'}} onPress={() => this.BuyServer('Baller Plan', 39.99)}>
            </TouchableOpacity>
           </View>
           <View style={{marginTop:planPadding,  marginLeft:'2%', marginRight:'2%', backgroundColor:'rgba(19,19,19,.92)', height:planSize}}>
           <Image source={require('../images/mc_texture.png')} style={{width:'100%', height:40, resizeMode:'repeat'}} />
           <Image source={require('../images/Diamond_Pickaxe.png')} style={{width:70, height:70, alignSelf:'center', marginTop:15}} />
           <Text style={{fontSize:26, fontWeight:'700', textAlign:'center', alignSelf:'center', width:'100%', color:'white', marginTop:10}}>
           Mob Boss Plan
           </Text>
           <Text style={{fontSize:30, fontWeight:'700', textAlign:'center', alignSelf:'center', width:'100%', color:'#5ae200', marginTop:15}}>
           $74.99/mo
           </Text>
           <Text style={{fontSize:18, fontWeight:'500', textAlign:'center', alignSelf:'center', width:'100%', color:'white', marginTop:10}}>
           Up to 500 players
           </Text>
           <Text style={{fontSize:18, fontWeight:'500', textAlign:'center', alignSelf:'center', width:'100%', color:'white', marginTop:10}}>
           24GB of RAM
           </Text>
           <Text style={{fontSize:18, fontWeight:'500', textAlign:'center', alignSelf:'center', width:'100%', color:'white', marginTop:10}}>
           Control Panel Ready
           </Text>
           <View style={{width:'80%', height:40, borderRadius:5, backgroundColor:'#4ec101', alignSelf:'center', top:25, justifyContent:'center', alignItems:'center'}}>
           <Text style={{fontSize:24, fontWeight:'800', textAlign:'center', alignSelf:'center', color:'white'}}>
           SET UP NOW
           </Text>
           </View>
           <TouchableOpacity style={{backgroundColor:'clear',position:'absolute', width:'100%', height:'100%'}} onPress={() => this.BuyServer('Mob Boss Plan', 74.99)}>
            </TouchableOpacity>
           </View>
           
           
           </ScrollView>
           
           {creatingView}
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

 _onPressBack() {
  
      this.props.navigation.pop();
  }
  
  BuyServer = async (tierName, price) => {
  
  if(Platform.OS == 'ios'){
  var sku = '';
  if(price == '4.99'){
  sku = 'five_dollar_plan';
  }
  if(price == '9.99'){
  sku = 'ten_dollar_plan';
  }
  if(price == '19.99'){
  sku = 'twenty_dollar_plan';
  }
  if(price == '39.99'){
  sku = 'forty_dollar_plan';
  }
  if(price == '74.99'){
  sku = 'seventy_five_dollar_plan';
  }

try {
    // Will return a purchase object with a receipt which can be used to validate on your server.
    const purchase = await RNIap.buyProduct(sku);
    console.log('we made a purchase ! : ' + purchase.transactionReceipt);
    this.setState({
      receipt: purchase.transactionReceipt, // save the receipt if you need it
      deployingVM:true,
    });
    this.CreateVM(tierName);
  } catch(err) {
    // standardized err.code and err.message available
    console.warn(err.code, err.message);
    /*
    const subscription = RNIap.addAdditionalSuccessPurchaseListenerIOS(async (purchase) => {
      this.setState({ receipt: purchase.transactionReceipt }, () => this.goToNext());
      subscription.remove();
    });
    */
  }
/*
Alert.alert(
                    'Start $'+price+' per month subscription?',
                    'You will receive a ' +tierName + ' Minecraft server and will retain access as long as your subscription remains active.',
                    [
                    {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                    },
                    {text: 'Yes', onPress: () => CreateVM(tierName)},
                    ],
                    {cancelable: false},
                    );
                    */

}

if(Platform.OS == 'android'){

console.log('use a credit card bitch');
this.CreateVM(tierName);
}
}


   
    

CreateVM = async (tierName) => {

var form1 = new FormData();
        form1.append("csrf_skysilk_token", global.csrf_token_hash);

    var agreeUrl = 'https://www.skysilk.com/api_v2/user/VM/agreeForVPSAuthorization/';
    
    
    try {
    
    
        fetch(agreeUrl, {
              method: 'POST',
              credentials: 'include',
              headers: {
              'Content-Type': 'multipart/form-data',
              'Set-Cookie':  global.csrf_token,
              'Set-Cookie': global.ci_session,
              },
              body: form1
              
              }).then((response) => response.text())
        .then(text => {
    try {
        const res = JSON.parse(text);
        if(typeof(res.message) != "undefined"){
              Alert.alert("Error", "Error: "+ res.message);
              }
              else{
             
             
          
           
              if(res.status == '403'){
              Alert.alert("Forbidden", " 403 for login");
              }
              else {
              
              if(res['CODE'] != 'OK'){
              
              Alert.alert("Error", res['ERRORS']);
              }
              
              else {
              
              var planId;
    
    if(tierName == 'Loser Plan') {
    planId = global.planTierOne;
    console.log('setting plan id as ' + global.planTierOne);
    }
    if(tierName == 'Normie Plan') {
    planId = global.planTierTwo;
    }
    if(tierName == 'Cool Kid Plan') {
    planId = global.planTierThree;
    }
    if(tierName == 'Baller Plan') {
    planId = global.planTierFour;
    }
    if(tierName == 'Mob Boss Plan') {
    planId = global.planTierFive;
    }
    
    var cpuModel;
    var cpuType;
    
    var passwordAllowed = 'PASSWORD_AUTH_ALLOWED';
    
    
    cpuType = 'intel';
    cpuModel = 'Intel\u00ae Xeon\u00ae';
    
    
    var form = new FormData();
        form.append("csrf_skysilk_token", global.csrf_token_hash);
        form.append("name", "MinecraftiOS");
        form.append("password", 'AnX!Fo89Adn5');
        form.append("cpuType", cpuType);
        form.append("cpuModel", cpuModel);
        form.append("ipsAmount", 1);
    
    
    console.log('trying to create, template id is ' + global.templateId);
    
    try {
    
    console.log('plan id is ' + planId);
    var createURL = 'https://www.skysilk.com/api_v2/user/VM/createVM/' + '116' + '/' + planId + '/' + '0' + '/' + '0' + '/' + '0' + '/' + '2'+ '/' + passwordAllowed + '/' + '1';
    console.log('look at my fucking create url ' + createURL);
        fetch(createURL, {
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
              Alert.alert("Error", "Error: "+ res.message);
              }
              else{
             
             
          
              console.log('res code is ' + res['CODE'] + ' errors are ' + res['ERRORS']);
              if(res.status == '403'){
              Alert.alert("Forbidden", " 403 for login");
              }
              else {
              
              if(res['CODE'] != 'OK'){
              
              Alert.alert("Error", res['ERRORS']);
              }
              
              else {
              this.setState({deployingVM:false});
              Alert.alert("Server Created", "Your server is being created and will be displayed in your server list soon.");
              console.log('we did make a vm! result: ' + JSON.stringify(res));
              this.setState({machineDeployed:true});
              }
              
              }
              }
              } catch(err) {
              console.log('failed to make a VM  ' + text);
       
              
              
                }
              }).catch((error) => {
                       console.error(error);
                       });
     
        
        
        } catch(err) {
        console.log("Error fetching data-----------", err);
    }
             
              }
              
              }
              }
              } catch(err) {
              console.log('failed to agree  ' + text);
       
              
              
                }
              }).catch((error) => {
                       console.error(error);
                       });
     
        
        
        } catch(err) {
        console.log("Error fetching data-----------", err);
    }
    
    console.log(' err creating vm tier name ' + tierName);
    
    
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

                                 
