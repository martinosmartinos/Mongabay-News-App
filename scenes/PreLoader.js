import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import appStyle from '../helpers/styles';
import { Actions } from 'react-native-router-flux';
import StoreSingle from '../store/StoreSingle';

class PreLoader extends Component {
  
  static onEnter = () => {
    if(StoreSingle.urlparam.length > 0){
        console.log('Fetching article');
        setTimeout(() => StoreSingle.fetchData(), 1);
        setTimeout(() => Actions.singlefetched(), 3);
    }else{
      console.log('Nothing to fetch...');
      setTimeout(() => Actions.news(), 0);
    }
  }

  static onExit = () => {
    console.log('Exit...');
  }

  render() {
    return (
      <View style={appStyle().loader}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

}

export default PreLoader;