import React, { Component } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import { toJS, observable, computed } from 'mobx';
import { observer, inject } from 'mobx-react/native';

import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import { Actions } from 'react-native-router-flux';
import { SearchBar } from 'react-native-elements';
import HTMLView from 'react-native-htmlview';
import format from 'date-fns/format';
import Store from '../store/Store';

@inject ('store')
@observer
class ListArticles extends Component {

  static navigationOptions = {
    title: Config.mongabay.blog_name,
  };


  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     loading: false,
  //     data: [],
  //     page: 1,
  //     error: null,
  //     refreshing: false,
  //   };
  // }   

  // componentWillMount() {
  //   //const store = Store.props;
  //   Store.fetchData;
  // }

  // componentWillReceiveProps(newProps) {
  //   //const store = Store.props;
  //   Store.fetchData;
  // }

  componentDidMount() {
    Store.fetchData();
  }
  
  //@computed get listingData() {
    //const { store } = Store.props;
  //   return Store.props;
    
  // }
  // fetchData = () => {

  //   const { page } = this.state;
  //   const url = `${Store.completeURL}${page}`;
  //   this.setState({ loading: true });

  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       this.setState({
  //         data: page === 1 ? res : [...this.state.data, ...res],
  //         loading: false,
  //         refreshing: false,
  //       });
  //     })
  //     .catch(error => {
  //       this.setState({ error, loading: false });
  //     });
  // };

  // handleRefresh = () => {
  //   this.setState(
  //     {
  //       page: 1,
  //       refreshing: true
  //     },
  //     () => {
  //       this.fetchData();
  //     }
  //   );
  // };


  // handleLoadMore = () => {
  //   this.setState(
  //     {
  //       page: this.state.page + 1
  //     },
  //     () => {
  //       this.fetchData();
  //     }
  //   );
  // };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Searching for..." lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 10,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    const {store} = this.props;
    console.log('TTTT:', store.refreshing)
    return (
      <OptimizedFlatList
        data={observer(toJS(store.listing))}
        keyExtractor={item => item.id}
        //ItemSeparatorComponent={this.renderSeparator}
        //ListHeaderComponent={this.renderHeader}
        //ListFooterComponent={this.renderFooter}
        onRefresh={observer(store.handleRefresh)}
        refreshing={observer(store.refreshing)}
        onEndReached={observer(store.handleLoadMore)}
        onEndReachedThreshold={50}
        renderItem={({ item }) => {

          const articleFull = () => Actions.singleArticle({
            featuredImage: item._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url,
            bylineName: item._embedded['wp:term'][5][0].name,
            articleDate: format(item.date, 'D MMMM YYYY'),
            articleTitle: item.title.rendered,
            articleContent: item.content.rendered,
            articleAuthor: item._embedded['author'][0].name,
            articleTopics: item._embedded['wp:term'][4][0].name,
          });

          return(
            <TouchableOpacity onPress={articleFull}>
              <View style={styles.container}>
                <View style={styles.leftContainer}>
                  <HTMLView value={item.title.rendered} textComponentProps={{ style: styles.title}}/>
                  <Text style={styles.date}>
                    {format(item.date, 'D MMMM YYYY')}
                  </Text>
                  <HTMLView value={item.excerpt.rendered} />
                </View>
                <Image
                  source={{uri: item._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url}}
                  style={styles.thumbnail}
                />
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
  },
});


export default ListArticles;