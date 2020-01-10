import React from 'react';
import {Modal,TouchableHighlight,Alert,Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {homeStyle} from './style/home';
import {fontsStyle} from "./style/fonts";
import {globalStyle} from "./style/global";
import AppHeader from "./components/AppHeader";
import ScanButton from "./components/ScanButton";
import ProductItem from "./components/ProductItem";
import { RNCamera } from 'react-native-camera';
import ProductText from './components/ProductsText';


export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      modalProduct: false,
      modalVisible: false,
      products : [
        {id: 1, name : 'Coca', date: new Date()},
        {id: 2, name : 'Orangina', date: new Date()},
        {id: 3, name : 'Nestea', date: new Date()},
        {id: 4, name : 'Bière sans alcool', date: new Date()}
      ],
      lastproduct: null
    };
    this.title = "Youki"
  }

 

  setModalVisible = (bool) => {
    this.setState ({modalVisible: bool});
  }

  setModalProduct =(bool) => {
    this.setState({modalProduct: bool});
  }
  
  
  handleScanPress = async () => {
    this.setModalVisible(true)
    await this._handleBarCodeRead({type: 'EAN', data: '8000500037560'})
    //alert('Je scan un produit')
  };
 

  handleProductPress = async (id) => {
    this.setModalProduct(true)
    //alert('Je clique sur un produit avec l\'id : ' + id)
  };
 
  async getProductFromApi(barcode) {
    try {
      let response = await fetch(
          'https://fr.openfoodfacts.org/api/v0/produit/' + barcode + '.json'
      );
      let responseJson = await response.json();
      return responseJson.product;
    } catch (error) {
      console.error(error);
    }
  }
  
   /*
  Appelée quand la caméra a détecté un code barre,
  testez vous même !
   */
  async _handleBarCodeRead ({ type, data }) {
    // On récupère le produit scanné
    let scannedProduct = await this.getProductFromApi(data);
 
    // On crée un nouvel obj. produit
    let newProduct = {id: 1, name: scannedProduct.product_name,nutrition: scannedProduct.product_nutrition_grades_tags, date: new Date()};
    let _products = this.state.products; // récupération de la liste actuelle
 
    console.log(scannedProduct);
    console.log(newProduct);
 
    _products.push(newProduct); // ajout du nouveau produit
    this.setState({products : _products}); // on set les nouveau produits dans le state
    this.setState({lastproduct : scannedProduct});
    this.setState({modalScanVisible: true});
  };

  render() {
    return (
      <View style={globalStyle.container}>
        <AppHeader title={this.title}/>

        <ScanButton handlePress={this.handleScanPress}/>

        <ScrollView style={homeStyle.scrollProductView}>
          {
           this.state.products.map(
               (produit) => {
                 return (
                     <ProductItem product={produit} key={produit.id} onPressItem={this.handleProductPress}/>
                 )
               }
           )
          }

        </ScrollView>


        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.al ('Modal has been closed.');
          }}>
          <View style={{flex: 1}}>
            <AppHeader title="Scanner"/> 

            <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={{flex: 1}}
          type={RNCamera.Constants.Type.back}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        
         
        />

            <TouchableOpacity 
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
              style={{
                position: "absolute", 
                backgroundColor: "orange",
                textAlign:"center",
                textAlignVertical:"center",
                width: "100%",
                height: 70,
                left: 0, 
                bottom: 0}}>


                <Text
                style={{
                  position: "absolute", 
                  backgroundColor: "orange",
                  textAlign:"center",
                  textAlignVertical:"center",
                  width: "100%",
                  height: 70,
                  left: 0, 
                  bottom: 0}}>Fermer Modal</Text>
            </TouchableOpacity>
          </View>
        </Modal>


        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalProduct}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{flex: 1}}>
              <AppHeader title="Scanner"/>

              <ProductText data={this.state.lastproduct}/>

              <TouchableOpacity 
                onPress={() => {
                  this.setModalProduct(!this.state.modalProduct);
                }}
                style={{
                  position: "absolute", 
                  backgroundColor: "orange",
                  textAlign:"center",
                  textAlignVertical:"center",
                  width: "100%",
                  height: 70,
                  left: 0, 
                  bottom: 0}}>

                <Text
                 style={{
                  position: "absolute", 
                  backgroundColor: "orange",
                  textAlign:"center",
                  textAlignVertical:"center",
                  width: "100%",
                  height: 70,
                  left: 0, 
                  bottom: 0}}>Fermer</Text>
              </TouchableOpacity>
          </View>
        </Modal>


        
 
        
      </View>
    );
  }
}