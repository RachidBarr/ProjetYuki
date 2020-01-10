import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {homeStyle} from "../style/home";
import {fontsStyle} from "../style/fonts";


export default class ProductText extends React.Component {
  constructor() {
    super();
  }

  render() {

    if(this.props.data == null){
      return null;
    }
    return (
        <View>
          <Text 
          style={{
            position: "relative", 
            backgroundColor: "orange",
            textAlign:"center",
            width: "100%",
            marginBottom:20
            }}> nom :{this.props.data.product_name}</Text>
         
          <Text
          style={{
            fontWeight:"bold",
          }}> code barre: </Text>
          <Text
          style={{
            marginBottom:10
          }}>{this.props.data.code}</Text>
          
          <Text
          style={{
            fontWeight:"bold",
          }}> note nutrition: </Text><Text
          style={{
            marginBottom:10
          }}> {this.props.data.nutrition_grades_tags}</Text>
         
          <Text
          style={{
            fontWeight:"bold",
          }}> Ingrédient: </Text>
          <Text
          style={{
            marginBottom:10
          }}>{this.props.data.ingredients_text_fr}</Text>
          
          <Text
          style={{
            fontWeight:"bold",
          }}> label: </Text><Text
          style={{
            marginBottom:10
          }}>{this.props.data.labels_lc}</Text>
          
          <Text
          style={{
            fontWeight:"bold",
          }}> allergènes: </Text><Text
          style={{
            marginBottom:10
          }}>{this.props.data.allergens_from_ingredients}</Text>

          

        </View>
    );
  }
}