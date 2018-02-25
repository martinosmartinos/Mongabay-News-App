import React, { Component } from 'react';
import { View, Text  } from 'react-native';
import { toJS } from 'mobx';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import Gallery from 'react-native-image-gallery';
import SettingsMain from '../scenes/SettingsMain';
import textStyle from '../helpers/styles';

class SliderView extends Component {
  constructor (props) {
    super(props);
    this.state = {
        index: 0,
        images: this.props.images
    };
    this.onChangeImage = this.onChangeImage.bind(this);
  }

  onChangeImage (index) {
    this.setState({ index });
  }

  render() {
    const counter = this.props.images.length;
    const { images, index } = this.state;
    return (
      <View style={{ backgroundColor: '#000', flex: 1}} >
        <Gallery
          style={{ flex: 1, backgroundColor: '#000' }}
          images={this.props.images}
          onPageSelected={this.onChangeImage}
        />
        <View style={{ flex: 1, flexDirection: 'row', position: 'absolute', top: 20, width: '98%', height: 65, alignItems: 'flex-start'}}>
          <Text style={[textStyle().body, {flex: 2, color: '#FFF', textAlign: 'center', fontStyle: 'italic', alignSelf: 'flex-start'}]}>{index + 1} / {counter}</Text>
          <Icon name='close' size={30} color='#FFF' onPress={()=> Actions.pop()} style={{flex: 2, alignSelf: 'flex-end'}}/>
        </View>
        <View style={{ bottom: 40, height: 65, width: '100%', position: 'absolute', justifyContent: 'center' }}>
          <Text style={[textStyle().figcaption, {color: '#FFF', textAlign: 'center'}]}>{this.state.images[index].caption}</Text>
        </View>
      </View>
    )
  }

}

export default SliderView;