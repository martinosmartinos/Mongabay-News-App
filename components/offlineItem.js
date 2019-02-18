import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Actions } from 'react-native-router-flux';
import { Dimensions } from 'react-native';
import appStyle from '../helpers/styles';
import {chartrim} from '../helpers/functions';

@observer
class OfflineItem extends Component {
  @observable title;
  @observable articledate;

  constructor(props) {
    super(props);
    this.title = this.props.title;
    this.articledate = this.props.date;
  }

  render() {
    const {height, width} = Dimensions.get('window');
    console.log('Date: ', this.props);
    return(
      <TouchableWithoutFeedback
          onPress={() => Actions.singleoffline(this.props.content)}
      > 
        <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5, width: width - 60}}>
          <View>
            <Text style={appStyle().offlineitem} NumberOfLines={2}>
              {chartrim(this.title)}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default OfflineItem