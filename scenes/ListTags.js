import React, { Component} from 'react';
import { ActivityIndicator, RefreshControl, View } from 'react-native';
import { observer, inject } from 'mobx-react';
import Card from '../components/card';
import SGListView from 'react-native-sglistview';
//import Orientation from 'react-native-orientation-locker';

const LIST_VIEW = 'sglistview';

@inject('StoreTags')
@observer
class ListTags extends Component {

  componentDidMount() {
    //Orientation.lockToPortrait();
  }
  
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
    console.log('TagsNews: ', this.props);
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