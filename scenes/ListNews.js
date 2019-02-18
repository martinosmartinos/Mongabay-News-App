import React, { Component } from 'react';
import { ActivityIndicator, Animated, RefreshControl, View } from 'react-native';
import { action, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import Card from '../components/card';
import UpdateMsg from '../components/updatemessage';
import Loader from '../components/loader';
import SGListView from 'react-native-sglistview';
import StoreMessages from '../store/StoreMessages'


import translationStrings from '../components/translation';
import {getDescendantProp} from '../helpers/functions';


//import appStyle from '../helpers/styles';

const LIST_VIEW = 'sglistview';


@inject('StoreNews', 'StoreSettings')
@observer
class ListNews extends Component {

  @action sendMsgrefresh() {
    StoreMessages.message = this.refreshMessage
  }

  @computed get refreshMessage() {
    //add language reference
    let langcode = this.props.StoreSettings.langcode;
    return getDescendantProp(translationStrings, 'notifications.' + langcode + '.feedupdate')
  }

  renderFooter(loading){
    return (
      <Loader page={this.props.StoreNews.page} loading={this.props.StoreNews.loading}/>
    )
  }

  renderCard(rowData) {
    return (
      <Card item={rowData} key={rowData.id}/>
    )
  }

  render() {
    const settings = this.props.StoreSettings;
    const offline = this.props.StoreOffline;
    const langcode = settings.langcode;
    return (
      <View>
        <SGListView
          ref = {LIST_VIEW}
          dataSource = {this.props.StoreNews.dataSource}
          renderRow = {this.renderCard}
          pageSize = {5}
          onEndReachedThreshold = {0.9}
          enableEmptySections = {true}
          scrollRenderAheadDistance = {999}
          initialListSize = {2}
          premptiveLoading = {2}
          refreshControl = {
            <RefreshControl
              refreshing = {this.props.StoreNews.refreshing}
              onRefresh = {()=>{this.props.StoreNews.handleRefresh(); this.sendMsgrefresh(); StoreMessages.showMsg()}}
              progressViewOffset = {250}
              colors = {['#000', '#FFF']}
              progressBackgroundColor = '#FFF'
              size = {40}
            />
          }
          renderFooter={()=>this.renderFooter(this.props.StoreNews.loading)}
          onEndReached={this.props.StoreNews.handleLoadMore}
          stickyHeaderIndices={[]}
          //contentContainerStyle={appStyle().mainwrap}
        />
        <UpdateMsg
          refreshing={this.props.StoreNews.refreshing}
          visible={StoreMessages.showmessage}
          notification={StoreMessages.message}
        />
      </View>
    )
  }
}

export default ListNews;
