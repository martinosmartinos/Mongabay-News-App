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


@inject('StoreTags')
@observer
class ListTags extends Component {
  render() {
    return (
      <FlatList
        data={toJS(this.props.StoreTags.listing)}
        //keyExtractor={(item, index) => item.id}
        keyExtractor={item => item.id}
        //ItemSeparatorComponent={this.renderSeparator}
        //ListHeaderComponent={this.renderHeader}
        //ListFooterComponent={this.renderFooter}
        onRefresh={this.props.StoreTags.handleRefresh}
        refreshing={this.props.StoreTags.refreshing}
        onEndReached={this.props.StoreTags.handleLoadMore}
        onEndReachedThreshold={50}
        renderItem={({ item }) => {

          const articleFull = () => Actions.singleArticle({
            featuredImage: (item._embedded.hasOwnProperty(['wp:featuredmedia'])) && (item._embedded['wp:featuredmedia'][0].code!=="rest_forbidden") ? (item._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url) : null,
            bylineName: item._embedded['wp:term'][5][0].name,
            bylineSlug: 'filter[byline]=' + item._embedded['wp:term'][5][0].slug + '&',
            articleDate: format(item.date, 'D MMMM YYYY'),
            articleTitle: item.title.rendered,
            articleContent: item.content.rendered,
            articleAuthor: item._embedded['author'][0].name,
            articleAuthorSlug: 'filter[author]=' + item._embedded['author'][0].id + '&',
            articleTopics: item._embedded['wp:term'][4]
          });
          
          return(
            <TouchableOpacity onPress={articleFull}>
              <View id={item.id} style={styles.container}>
                <View style={styles.leftContainer}>
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

        }}

      />
    )
  }
}

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#a9a9a9',
    height: 56,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20
  },
  leftContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
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
  },
  listView: {
    paddingTop: 50,
    backgroundColor: '#F5FCFF',
  }
});


export default ListTags;