import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList, Image, TouchableOpacity, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import { action, toJS, observable, computed } from 'mobx';
import { observer, inject } from 'mobx-react/native';

//import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import { Actions } from 'react-native-router-flux';
import { SearchBar } from 'react-native-elements';
import HTMLView from 'react-native-htmlview';
import format from 'date-fns/format';

//import Card from '../components/card_flatlist';

@inject('StoreNews')
@observer

class ListNews extends Component {

  _keyExtractor = (item, index) => item.id;
  //_renderItem = ({item}) => <Card />;


_renderItem = ({item}) => (<View key={item.id}><Text>{item.excerpt.rendered}</Text></View>);

_getItemLayout = (data, index) => (
  {length: 300, offset: 300 * index, index}
);



  render() {
    return (
      <FlatList
        data={toJS(this.props.StoreNews.listing)}
        //keyExtractor={(item, index) => item.id}
        //ItemSeparatorComponent={this.renderSeparator}
        //ListHeaderComponent={this.renderHeader}
        //ListFooterComponent={this.renderFooter}
        onRefresh={this.props.StoreNews.handleRefresh}
        refreshing={this.props.StoreNews.refreshing}
        onEndReached={this.props.StoreNews.handleLoadMore}
        onEndReachedThreshold={10}
        renderItem={this._renderItem}
        removeClippedSubviews={true}
        getItemLayout={this._getItemLayout}
        initialListSize={8}
        initialNumToRender={5}

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