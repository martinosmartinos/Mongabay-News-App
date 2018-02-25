import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList, Image, TouchableOpacity, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import { action, toJS, observable, computed } from 'mobx';
import { observer, inject } from 'mobx-react/native';

import { LargeList } from "react-native-largelist";
//import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import { Actions } from 'react-native-router-flux';
import { SearchBar } from 'react-native-elements';
import HTMLView from 'react-native-htmlview';
import format from 'date-fns/format';

import Card from '../components/card';

@inject('StoreNews')
@observer

class ListNews extends Component {
  
  data = toJS(this.props.StoreNews.listing);

  
  //_renderItem = ({item}) => <Card />;


  _renderItem = (section: number, row: number) => {

    return (
      <View>
        <Text>{this.data[row].title.rendered}</Text>
      </View>
    )
  }
    
    


  render() {

    return (
      <LargeList
        style={{ flex: 1 }}
        bounces={true}
        refreshing={this.props.StoreNews.refreshing}
        onRefresh={this.props.StoreNews.handleRefresh}
        safeMargin={600}
        heightForCell={() => 200}
        numberOfRowsInSection={section => this.props.numberOfEachSection}
        numberOfSections={()=>this.props.numberOfSections}
        renderCell={this._renderItem}
        renderSection={section => {
          return (
            <View
              style={{
                flex: 1,
                backgroundColor: "yellow",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 100
              }}
            >
              <Text>
                 I am section {section}
              </Text>
            </View>
          );
        }}
      />
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
    marginBottom: 10,
    elevation: 1
  },
  byline: {
    fontSize: 10,
    flex: 1
  },
  leftContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    textAlign: 'left',
    fontWeight: 'bold'
  },
  date: {
    fontSize: 12
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginLeft: 10,
    alignSelf: 'flex-start'
  }
});

export default ListNews;