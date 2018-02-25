import React, { Component} from 'react';
import { ActivityIndicator, Dimensions, Image, ListView, RefreshControl, Text, TouchableOpacity, Platform, View } from 'react-native';
import { action, toJS, observable, computed } from 'mobx';
import { observer, inject } from 'mobx-react/native';
import { Actions } from 'react-native-router-flux';
import Card from '../components/card';
import SGListView from 'react-native-sglistview';
import progressBar from '../components/progressbar';


const LIST_VIEW = 'sglistview';

@inject('StoreTags')
@observer



class ListTags extends Component {

  _keyExtractor = item => item.id;

  renderFooter = ()=> {
    return this.props.StoreTags.loading ? <View style={styles.loader}><ActivityIndicator size="large" /></View> : null
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
        dataSource={this.props.StoreTags.dataSource}
        renderRow={this.renderCard}
        pageSize={10}
        onEndReachedThreshold={1200}
        enableEmptySections={true}
        scrollRenderAheadDistance={999}
        initialListSize={4}
        premptiveLoading={2}
        refreshControl={
          <RefreshControl
            refreshing={this.props.StoreTags.refreshing}
            onRefresh={this.props.StoreTags.handleRefresh}
          />
        }
        renderFooter={this.renderFooter}
        onEndReached={this.props.StoreTags.handleLoadMore}
        stickyHeaderIndices={[]}
      />
      
    )
  }
}

export default ListTags;