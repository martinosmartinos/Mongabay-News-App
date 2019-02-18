import React from 'react';
import { Share } from 'react-native';
import { Icon } from 'react-native-elements';
import appStyle from '../helpers/styles';

class SocialShare extends React.PureComponent {
  
  render() {
    return (
      <Icon
        name='share'
        type='evilIcons'
        color='#2196F3'
        onPress={()=>Share.share({
          message: `${this.props.excerpt} ${this.props.link}`,
          url: `${this.props.link}`,
          title: `${this.props.title}`
        }, {
          dialogTitle: 'Share Mongabay Article',
        })}
        iconStyle={appStyle().icons}
      />
    );
  }
}

module.exports = SocialShare;