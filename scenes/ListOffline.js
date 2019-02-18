import React, { Component } from 'react';
import { Dimensions, Platform, Text, ScrollView, View } from 'react-native';
import { Icon, Button, Divider} from 'react-native-elements';
import { observer } from 'mobx-react';
import { action, observable, toJS } from 'mobx';
import StoreSettings from '../store/StoreSettings';
import StoreOffline from '../store/StoreOffline';
import { SwipeableFlatList } from 'react-native-swipeable-flat-list';
import OfflineItem from '../components/offlineItem';
import { htmlConvert } from '../helpers/functions';
import appStyle from '../helpers/styles';
import strings from '../components/translation';
import { getDescendantProp } from '../helpers/functions';

@observer
class ListOffline extends Component {
  
  @observable offlinelist = StoreOffline['offlinelist_' + StoreSettings.site.replace(/\./g,'')];

  @action renderItem = ({item}) => (
    <OfflineItem key={item.id} title={htmlConvert(item.title)} date={item.date} content={item} style={{height: 54}}/>
  );

  @action deleteItem(id) {
    this.offlinelist.splice(this.offlinelist.findIndex(i => i.id === id), 1);
    StoreOffline.deleteItems(toJS(this.offlinelist));
  }

  renderSeparator = () => {
    return (
      <Divider style={{height: 1, flex: 1, backgroundColor: '#DDD'}}/>
    );
  }

  render() {
    const {height, width} = Dimensions.get('window');
    const offset = (Platform.OS === 'ios') ? 84 : 74;
    const langcode = StoreSettings.langcode;
    console.log('-----: ', StoreOffline['offlinelist_' + StoreSettings.site.replace(/\./g,'')]);
    return (
      <ScrollView style={appStyle().offlinelist}>
        <SwipeableFlatList
          data={toJS(this.offlinelist)}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
          renderRight={({item}) => (
            <Button
              style={{width: 60}}
              title=''
              onPress={()=>{this.deleteItem(item.id)}}
              buttonStyle={{
                backgroundColor: '#F50057',
                borderColor: 'transparent',
                marginTop: 0,
                height: 57,
                borderWidth: 0,
                borderRadius: 0,
                alignItems: 'center'
              }}
              icon={{
                name: 'delete',
                size: 22,
                color: 'white'
              }}
            />
          )}
          ListEmptyComponent={
            <View style={{height: height - offset, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
              <View style={{height: 80}}>
                <Text style={{fontSize: 22}}>{getDescendantProp(strings, 'offline.' + langcode + '.empty')}</Text>
                <Icon
                  name='bookmark-border'
                  color='#DDD'
                  size={30}
                />
              </View>
            </View>
          }
        />
        
      </ScrollView>
    )
  }
}

export default ListOffline;