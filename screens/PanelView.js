import React from "react";
import { ScrollView, Text, Linking, View, Image,
    Platform,
    StyleSheet,
    TouchableOpacity,
    Alert, Dimensions} from "react-native";
import { Card, Button } from "react-native-elements";
import '../global.js'
import { LinearGradient, Icon } from 'expo';


import ContainerCard from './ContainerCard';

import * as RNIap from 'react-native-iap';

var plansScreenHeight = Dimensions.get('window').height;

import WebView  from 'react-native-webview';


var ipAddress;


export default class PanelView extends React.Component {
    state = {
        //Assing a array to your pokeList state
    userVmList: [],
        //Have a loading state where when data retrieve returns data.
    loading: true
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

    ipAddress = this.props.item;
    var webviewUrl = ipAddress + ':8080';
    var arrowTop = 10;
    if(plansScreenHeight == 896){
    arrowTop = 30;
    }
    var planPadding = 35;
    var planSize = 395;
    return(
           <View style={{ flex: 1, backgroundColor:'red' }}>
           
           
                    <Icon.Ionicons onPress={ () => { this._onPressBack() } }
                    name='ios-arrow-round-back'
                    size={50}
                    style={{ position:'absolute', left:20, marginTop:arrowTop }}
                    color='white'
                    />
          <WebView source={{ uri: 'https://facebook.github.io/react-native/' }} />
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

                                 
