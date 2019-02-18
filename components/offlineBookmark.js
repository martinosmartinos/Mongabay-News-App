import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import appStyle from '../helpers/styles';
import { observer } from 'mobx-react';
import { action, computed, observable, toJS } from 'mobx';
import StoreSettings from '../store/StoreSettings';
import StoreOffline from '../store/StoreOffline';
import StoreMessages from '../store/StoreMessages';
import translationStrings from '../components/translation';
import { getDescendantProp } from '../helpers/functions';


@observer
class OfflineBookmark extends Component {
  
  @observable offlineids;
  @observable savestatus;
  @observable showMsg = false;

  constructor(props) {
    super(props);
    this.getSaveditems()
  }

  @action getSaveditems() {
    this.offlineids = toJS(StoreOffline['offlineids_' + StoreSettings.site.replace(/\./g,'')]) || [];
    this.savestatus = this.alreadySaved;
  }

  @computed get checkSaved() {
    return this.savestatus ? true : false;
  }

  @action saveArticle = (articleID, title, byline, date, bullets, content, author) => {
    const articlebody = {id: articleID, title: title, byline: byline, date: date, bullets: bullets, content: content, author: author};
    if(this.savestatus) {
      console.log('I am aready saved!');
    }else if(!this.savestatus && StoreOffline.savedamount >= 20){
      this.showMessage();
    }else{
      StoreOffline.updateList(articlebody);
      this.savestatus = true;
      this.showMessage();
    }
  }

  @computed get alreadySaved() {
    return this.offlineids.includes(this.props.itemID) ? true : false;
  }

  @action showMessage = () => {
    StoreMessages.showMsg();
    StoreMessages.message = this.storeMessage
  }

  @computed get storeMessage() {
    //add language reference
    return (StoreOffline.savedamount == 20) ? getDescendantProp(translationStrings, 'notifications.' + StoreSettings.langcode + '.offlinelimit') : getDescendantProp(translationStrings, 'notifications.' + StoreSettings.langcode + '.offlinesave') + ' ' + StoreOffline.savedamount + '/20'
  }

  render() {
    const item = this.props;
    return (
      <View ref="bookmark">
        <Icon
          name={this.checkSaved ? 'bookmark' : 'bookmark-border'}
          type='material'
          color='#2196F3'
          onPress={()=> {
            this.saveArticle(item.itemID, item.title, item.byline, item.date, item.bullets, item.content, item.author);
          }}
          iconStyle={appStyle().icons}
        />
      </View>
    );
  }
}

export default OfflineBookmark;