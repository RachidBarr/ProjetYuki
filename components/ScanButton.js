import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {homeStyle} from "../style/home";
import {fontsStyle} from "../style/fonts";

export default class ScanButton extends React.Component {
  constructor() {
    super();
  }

  

  render() {

    return (
        <View style={homeStyle.scanButtonView}>
          <TouchableOpacity style={homeStyle.scanButton} onPress={this.props.handlePress}>
            <Text style={fontsStyle.scanButtonText}>Scanner</Text>
          </TouchableOpacity>
        </View>
    );
  }
}