import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import appStyle from '../helpers/styles';
import HTMLView from 'react-native-htmlview';

import { observer } from 'mobx-react';
import { Divider } from 'react-native-elements';

import renderNode from '../helpers/htmlrender';
import {htmlConvert} from '../helpers/functions';

@observer
class SingleOffline extends Component {

  render() {
    console.log(this.props);
    return (
      <ScrollView style={appStyle().single}>
        <View style={appStyle().header}>
          <Text style={appStyle().titleSingle} >
            {htmlConvert(this.props.title)}
          </Text>
          <Text style={appStyle().linkName}>
            {this.props.byline.toUpperCase()}
          </Text>
          <Text style={appStyle().date}>
            {this.props.date}
          </Text>
        </View>
        {
          this.props.bullets.length > 0 &&
            <View style={appStyle().bulletpoints}>
              {
                this.props.bullets.map( (bullet, index) => {
                  return(
                    <View key={index} style={appStyle().bulletitem}>
                      <Text>{`\u2022 `}</Text><HTMLView value={bullet} textComponentProps={{ style: appStyle().singlebullet }}/>
                    </View>
                  )
                })
              }
            </View>
        }
        <HTMLView
          value={this.props.content}
          renderNode={renderNode}
          stylesheet={StyleSheet.create(appStyle())}
          textComponentProps={{ style: appStyle().body }}
        />
        <Divider style={{height: 1, width: 50, backgroundColor: '#000', marginTop: 20}}/>
        <View style={appStyle().authorbox}>
          <Text style={appStyle().linkName}>
            {this.props.author}
          </Text>
        </View>
        <View style={appStyle().badgecontainer}></View>
      </ScrollView>
    )
  }

}

export default SingleOffline;