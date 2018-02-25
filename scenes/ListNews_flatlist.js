import React, { Component } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import { action, toJS, observable, computed } from 'mobx';
import { observer, inject } from 'mobx-react/native';

//import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import { Actions } from 'react-native-router-flux';
import { SearchBar } from 'react-native-elements';
import HTMLView from 'react-native-htmlview';
import format from 'date-fns/format';


@inject('StoreNews')
@observer

class ListNews extends Component {

  _keyExtractor = (item, index) => item.id;

  // _onPressItem = (item) => {
  //   const articleFull = () => Actions.singleArticle({
  //     featuredImage: (item._embedded.hasOwnProperty(['wp:featuredmedia'])) && (item._embedded['wp:featuredmedia'][0].code!=="rest_forbidden") ? (item._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url) : null,
  //     bylineName: item._embedded['wp:term'][5][0].name,
  //     bylineSlug: 'filter[byline]=' + item._embedded['wp:term'][5][0].slug + '&',
  //     articleDate: format(item.date, 'D MMMM YYYY'),
  //     articleTitle: item.title.rendered,
  //     articleContent: item.content.rendered,
  //     articleAuthor: item._embedded['author'][0].name,
  //     articleAuthorSlug: 'filter[author]=' + item._embedded['author'][0].id + '&',
  //     articleTopics: item._embedded['wp:term'][4]
  //   });
  // };

  _renderItem = ({item}) => (
    <TouchableOpacity onPress={()=>Actions.singleArticle({
      featuredImage: (item._embedded.hasOwnProperty(['wp:featuredmedia'])) && (item._embedded['wp:featuredmedia'][0].code!=="rest_forbidden") ? (item._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url) : null,
      bylineName: item._embedded['wp:term'][5][0].name,
      bylineSlug: 'filter[byline]=' + item._embedded['wp:term'][5][0].slug + '&',
      articleDate: format(item.date, 'D MMMM YYYY'),
      articleTitle: item.title.rendered,
      articleContent: item.content.rendered,
      articleAuthor: item._embedded['author'][0].name,
      articleAuthorSlug: 'filter[author]=' + item._embedded['author'][0].id + '&',
      articleTopics: item._embedded['wp:term'][4]
    })}>
    <View
      id={item.id}
      style={styles.container}
    >
      <View style={styles.leftContainer}>
        <Text style={styles.byline}>{item._embedded['wp:term'][5][0].name.toUpperCase()}</Text>
        <HTMLView value={item.title.rendered} textComponentProps={{ style: styles.title}}/>
        <Text style={styles.date}>
          {format(item.date, 'D MMMM YYYY')}
        </Text>
        <HTMLView value={item.excerpt.rendered} />
      </View>
      {(item._embedded.hasOwnProperty(['wp:featuredmedia'])) && (item._embedded['wp:featuredmedia'][0].code!=="rest_forbidden") ?
      <Image
        source={{uri: item._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url}}
        style={styles.thumbnail}
      /> : null
      }
    </View>
    </TouchableOpacity>
  );


  render() {
    return (
      <FlatList
        data={toJS(this.props.StoreNews.listing)}
        //keyExtractor={(item, index) => item.id}
        keyExtractor={this._keyExtractor}
        //ItemSeparatorComponent={this.renderSeparator}
        //ListHeaderComponent={this.renderHeader}
        //ListFooterComponent={this.renderFooter}
        onRefresh={this.props.StoreNews.handleRefresh}
        refreshing={this.props.StoreNews.refreshing}
        onEndReached={this.props.StoreNews.handleLoadMore}
        onEndReachedThreshold={50}
        renderItem={this._renderItem}
        removeClippedSubviews={true}
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