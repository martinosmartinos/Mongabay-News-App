import React, { Component } from 'react';
import { Linking, View, Text, TouchableWithoutFeedback } from 'react-native';
import { observer, inject } from 'mobx-react';
import { Icon } from 'react-native-elements';
import translationStrings from './translation';
import appStyle from '../helpers/styles';
import {getDescendantProp} from '../helpers/functions';

@inject('StoreSettings')
@observer
class Donate extends Component {
  //TODO add translation for donations
  render() {
    let langcode = this.props.StoreSettings.langcode;
    console.log('langcode: ', getDescendantProp(translationStrings, 'donate.' + langcode + '.text'));
    return (
      <TouchableWithoutFeedback onPress={()=>{Linking.openURL(`https://mongabay.org/donate/conservation-journalism-that-makes-a-difference`)}}>
        <View style={appStyle().donateWrapper}>
          <View style={appStyle().donateLeft}>
            <Text style={appStyle().donateText}>{getDescendantProp(translationStrings, 'donate.' + langcode + '.text')}</Text>
          </View>
          <View style={appStyle().donateRight}>
            <Icon
              name='favorite'
              color='#EF5350'
            />
            <Text style={{textAlign: 'center'}}>{getDescendantProp(translationStrings, 'donate.' + langcode + '.button')}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

}

export default Donate;