import React, { Component } from 'react';
import { ActivityIndicator, RefreshControl, StyleSheet, View } from 'react-native';
import { toJS, observable, computed } from 'mobx';
import { observer, inject } from 'mobx-react/native';
import { Actions } from 'react-native-router-flux';
import Card from '../components/card';
import SGListView from 'react-native-sglistview';

const LIST_VIEW = 'sglistview';


@inject('StoreNews')
@observer

class ListNews extends Component {

  _keyExtractor = (item, index) => item.id;

  renderFooter = ()=> {
    return this.props.StoreNews.loading ? <View style={styles.loader}><ActivityIndicator size="large" /></View> : null
  }

  renderCard(rowData, sectionID, rowID) {
    return (
      <Card item={rowData} key={rowID}/>
    );
  }


  render() {
    return (
      <SGListView
        ref={LIST_VIEW}
        dataSource={this.props.StoreNews.dataSource}
        renderRow={this.renderCard}
        pageSize={5}
        onEndReachedThreshold={0.9}
        enableEmptySections={true}
        scrollRenderAheadDistance={999}
        initialListSize={2}
        premptiveLoading={2}
        refreshControl={
          <RefreshControl
            refreshing={this.props.StoreNews.refreshing}
            onRefresh={this.props.StoreNews.handleRefresh}
          />
        }
        renderFooter={this.renderFooter}
        onEndReached={this.props.StoreNews.handleLoadMore}
        stickyHeaderIndices={[]}
      />
    )
  }
}


const styles = StyleSheet.create({
  loader: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  }
});


export default ListNews;