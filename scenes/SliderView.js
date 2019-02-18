import React, { Component } from 'react';
import { View, Text  } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import Gallery from 'react-native-image-gallery';
import Orientation from 'react-native-orientation-locker';

import { Dimensions } from 'react-native';

import appStyle from '../helpers/styles';

const {height, width} = Dimensions.get('window');

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

  componentDidMount() {
    Orientation.unlockAllOrientations();
  }

  componentWillUnmount() {
    Orientation.lockToPortrait();
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
          <Text style={[appStyle().body, {flex: 2, color: '#FFF', textAlign: 'center', fontStyle: 'italic', alignSelf: 'flex-start'}]}>{counter > 1 ? index + 1 : null} {counter > 1 ? "/" : null} {counter > 1 ? counter : null}</Text>
          <Icon name='close' size={30} color='#FFF' onPress={()=> {Orientation.lockToPortrait(); Actions.pop()}} style={{flex: 2, alignSelf: 'flex-end'}}/>
        </View>
        <View style={{ backgroundColor: 'rgba(0,0,0,.6)', bottom: 0, minHeight: 65, width: '100%', position: 'absolute', justifyContent: 'center', padding: 20 }}>
          <Text style={appStyle().figcaptiongallery}>{this.state.images[index].caption}</Text>
        </View>
      </View>
    )
  }

}

export default SliderView;