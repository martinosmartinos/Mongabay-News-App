import React, { Component } from 'react';
import { Animated, View, Text, Image } from 'react-native';
import IconSvg from '../components/icons';
import appStyle from '../helpers/styles';

class Loader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      indeterminate: true,
    };
  }

  render() {
    return (
      <View style={this.props.page < 2 ? appStyle().loader : appStyle().loadmore }>
        <IconSvg style={{alignSelf: 'center'}} name='Lizard' height="60" width="60" fill={this.state.fill} viewBox="0 0 60 60" />
      </View>
    )
  }

}

export default Loader;