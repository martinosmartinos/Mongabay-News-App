import React from 'react';
import { Share, StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements';

class SocialShare extends React.PureComponent {
  render() {
    return (
      <Icon
        name='share'
        type='evilIcons'
        color='#2196F3'
        onPress={()=>Share.share({
          message: `${this.props.excerpt}`,
          url: `${this.props.link}`,
          title: `${this.props.title}`
        }, {
          dialogTitle: 'Share Mongabay Article',
        })}
        iconStyle={styles.icons}
      />
    );
  }
}

const styles = StyleSheet.create({
  icons: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'flex-end'
  }
});

module.exports = SocialShare;