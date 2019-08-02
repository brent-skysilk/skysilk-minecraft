import React from "react";
import { ScrollView, Text, Linking, View, Image,
    Platform,
    StyleSheet,
    TouchableOpacity,
    Alert, Dimensions} from "react-native";
import { Card, Button } from "react-native-elements";
import '../global.js'
import { LinearGradient, Icon } from 'expo';
import { TextField } from 'react-native-material-textfield';

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
    cardNum:'',
    cardYear:'',
    cardCVC:'',
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
    
    var creditCardView;
    
    creditCardView = <View style={{width:'92%', height:250, alignSelf:'center', marginTop:0, backgroundColor:'clear'}}>
                                  <TextField id="card"
                                  label='Card Number'
                                  value={this.state.vmName}
                                  onChangeText={ (text) => this.setState({
                                  cardNum:text
                                  })}
                                  baseColor='rgba(255, 255, 255, .95)'
                                  textColor='white'
                                  tintColor='white'
                                  />
                                  <View style={{width:'100%', height:50, flexDirection:'row', justifyContent:'space-between'}}>
                                  <View style={{width:'45%', height:50}}>
                                  <TextField id="exp"
                                  label='Expires'
                                  value={this.state.vmName}
                                  onChangeText={ (text) => this.setState({
                                  cardYear:text
                                  })}
                                  baseColor='rgba(255, 255, 255, .95)'
                                  textColor='white'
                                  tintColor='white'
                                  />
                                  </View>
                                  <View style={{width:'45%', height:50}}>
                                  <TextField id="exp"
                                  label='CVC'
                                  value={this.state.vmName}
                                  onChangeText={ (text) => this.setState({
                                  cardCVC:text
                                  })}
                                  baseColor='rgba(255, 255, 255, .95)'
                                  textColor='white'
                                  tintColor='white'
                                  />
                                  </View>
                                  </View>
                                  <View style={{backgroundColor:'blue', width:'92%', alignSelf:'center', height:40, borderRadius:5, marginTop:40}}>
                                  <TouchableOpacity style={{backgroundColor:'clear',position:'absolute', width:'100%', height:'100%'}} onPress={() => this.AddCard()}>
                                  </TouchableOpacity>
                                  </View>
                                  </View>;
    
    
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
           <View style={{width:'100%', height:'100%', position:'absolute', backgroundColor:'black', opacity:0.7}}/>
                    <Icon.Ionicons onPress={ () => { this._onPressBack() } }
                    name='ios-arrow-round-back'
                    size={50}
                    style={{ position:'absolute', left:20, marginTop:arrowTop }}
                    color='white'
                    />
           <ScrollView contentContainerStyle={{ paddingVertical: 0 }} style={{backgrondColor:'red', bottom:15, height:'90%', position:'absolute', width:'100%'}}>
           <View style={{width:'92%', height:50, alignSelf:'center', marginTop:15, backgroundColor:'clear', justifyContent:'center'}}>
           <Icon.Ionicons
                    name='ios-mail'
                    size={50}
                    style={{ position:'absolute'}}
                    color='white'
                    />
                    <Text style={{fontSize:18, fontWeight:'500', textAlign:'left', marginLeft:60, color:'white'}}>
                    Account Email
                    </Text>
                    </View>
          <View style={{width:'92%', height:120, alignSelf:'center', marginTop:0, backgroundColor:'clear'}}>
          <TextField id="email"
                                  label='Email'
                                  value='lifeisfun567@yahoo.com'
                                  baseColor='rgba(255, 255, 255, .95)'
                                  textColor='white'
                                  tintColor='white'
                                  fontSize={26}
                                  editable={false}
                                  />
                                  </View>
            <View style={{width:'92%', height:50, alignSelf:'center', marginTop:15, backgroundColor:'clear', justifyContent:'center'}}>
           <Icon.Ionicons
                    name='ios-card'
                    size={50}
                    style={{ position:'absolute' }}
                    color='white'
                    />
                    <Text style={{fontSize:18, fontWeight:'500', textAlign:'left', marginLeft:60, color:'white'}}>
                    Billing
                    </Text>
                    </View>
           {creditCardView}
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

AddCard = async () => {
const params = {
  // mandatory
  number: '4465400291917419',
  expMonth: 11,
  expYear: 20,
  cvc: '632',
  // optional
  name: 'Brent J. Faragher',
  addressLine1: '28522 Haskell Cyn. Rd.',
  addressCity: 'Santa Clarita',
  addressState: 'CA',
  addressCountry: 'United States',
  addressZip: '91390',
 
}
 const token = await stripe.createTokenWithCard(params);
 console.log('got a token: ' + JSON.stringify(token));
 if(token.tokenId){
 this.SendCardToBackend(token.tokenId);
 }
    
}

SendCardToBackend = async (token) => {

console.log('trying to send card with token: ' + token);

var form = new FormData();
        form.append("csrf_skysilk_token", global.csrf_token_hash);
        form.append("tokenId", token);
    
    // Cancel any in-progress requests
    // Load new data and update profileOrError
    
    //Have a try and catch block for catching errors.
    try {
        fetch('https://www.skysilk.com/api_v2/user/_billing/CreditCard/add', {
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
              var resStr = JSON.stringify(res);
              console.log('res str for add card was' + resStr);
              /*
               this.setState({ auth_token: res.auth_token });
               */
              if(res.status == '403'){
              Alert.alert("Forbidden", " 403 for vms");
              }
              else {
              
             
              
              
              
              
              
              
              }
              }
              } catch(err) {
              console.log('failed to add card here ' + text);
       
              
              
                }
              }).catch((error) => {
                       console.error(error);
                       });
        
    } catch(err) {
        console.log("Error fetching data-----------", err);
    }
    
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

                                 
