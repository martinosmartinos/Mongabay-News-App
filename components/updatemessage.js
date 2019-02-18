import React, { Component } from 'react';
import { Animated, Text, View } from 'react-native';
import { observer, inject } from 'mobx-react';
import appStyle from '../helpers/styles';

@inject ('StoreMessages')
@observer
class UpdateMsg extends Component {
  render() {
    return (
        this.props.StoreMessages.showmessage &&
        <View style={{flex: 1,justifyContent: 'flex-end'}}>
        <Animated.View style={[appStyle().updatemsg, {opacity: this.fade}]}>
          <Text style={{fontSize: 16, fontFamily: 'System', fontWeight: 'bold', color: '#FFF', textAlign: 'center', padding: 20}}>
            { this.props.notification && this.props.notification }
          </Text>
        </Animated.View>
        </View>
      
    )
  }

}

export default UpdateMsg;