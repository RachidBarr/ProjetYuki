import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {homeStyle} from "../style/home";
import {fontsStyle} from "../style/fonts";

export default class ProductItem extends React.Component {
  constructor() {
    super();
  }

  render() {

    console.log(this.props.product);
    return (
        <TouchableOpacity onPress={() => this.props.onPressItem(this.props.product.id)} style={homeStyle.productContainer}>
          <Text style={fontsStyle.productName}>
            {this.props.product.name}
            </Text>
          <Text style={fontsStyle.productScanDate}>
            {this.props.product.date.toDateString()}
          </Text>
        </TouchableOpacity>
    );
  }
}