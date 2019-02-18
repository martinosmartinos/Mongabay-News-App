import { AsyncStorage } from 'react-native';
import { action, computed, observable, toJS } from 'mobx';
import StoreSettings from '../store/StoreSettings';

class StoreOffline {

  @observable offlinelist_newsmongabaycom = [];
  @observable offlinelist_indiamongabaycom = [];
  @observable offlinelist_esmongabaycom = [];
  @observable offlinelist_wwwmongabaycoid = [];

  @observable offlineids_newsmongabaycom = [];
  @observable offlineids_indiamongabaycom = [];
  @observable offlineids_esmongabaycom = [];
  @observable offlineids_wwwmongabaycoid = [];

  constructor() {
    this.getList();
  }

  @action getList = async() => {
    let listID = StoreSettings.site.replace(/\./g,'');
    await AsyncStorage.getItem('offlineread_' + listID)
      .then(action((data) => {
        if(data){
          this['offlinelist_' + listID] = JSON.parse(data);
          if(this['offlinelist_' + listID] && this['offlinelist_' + listID].length > 0){
            this['offlineids_' + listID].map((item)=>{this['offlineids_' + listID].push(item.id)})
          }
      }
    }))
  }

  @action updateList(newitem) {
    let listID = StoreSettings.site.replace(/\./g,'');
    if(this['offlineids_' + listID] && this['offlineids_' + listID].length > 0 && this['offlineids_' + listID].includes(newitem.id)){
      console.log('No go, already in the list');
    }else{
      this['offlineids_' + listID].push(newitem.id);
      this['offlinelist_' + listID].push(newitem);
      AsyncStorage.setItem('offlineread_' + listID, JSON.stringify(this['offlinelist_' + listID]));
    }
  }

  @action deleteItems(newlist) {
      let listID = StoreSettings.site.replace(/\./g,'');
      this['offlinelist_' + listID] = newlist;
      AsyncStorage.setItem('offlineread_' + listID, JSON.stringify(this['offlinelist_' + listID]));
      this['offlineids_' + listID] = [];
      this.getList();
  }

  @computed get savedamount() {
    let listID = StoreSettings.site.replace(/\./g,'');
    if(this['offlinelist_' + listID]) {
      return Object.keys(toJS(this['offlinelist_' + listID])).length;
    }else{
      return 0;
    }
  }
}

export default new StoreOffline();