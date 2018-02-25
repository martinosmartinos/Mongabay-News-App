import { ListView } from 'react-native';
import { action, computed, observable, useStrict, runInAction } from 'mobx';
import apiConfig from '../config/api.settings';

useStrict(true);

class StoreSingle {
  @observable site;
  @observable fetchtype;
  @observable urlparam;
  @observable itemsingle;
  @observable loaded;
  @observable errorMsg;

  constructor() {
    this.site = 'news';
    this.fetchtype = '';
    this.urlparam = '';
    this.itemsingle = [];
    this.loaded = false;
    this.errorMsg = '';
    this.fetchData();
  }


  @computed get completeURL(): string {
    return `https://${this.site}.mongabay.com/${apiConfig.mongabay.wp_api}/${this.fetchtype}/${this.urlparam}?_embed`;
  }

  @action changeURL(type, newurl) {
    this.fetchtype = type;
    this.urlparam = newurl;
    this.fetchData();
  }
    

  @action async fetchData() {
    this.itemsingle = [];
    this.loaded = false;
    try {
      const response = await fetch(this.completeURL);
      const responseJson = await response.json();

      runInAction(() => {
        this.errorMsg = '';
        this.itemsingle = responseJson;
        this.loaded = true;
      })

    } catch(error) {
      console.error(error);
    }
  }
}

export default new StoreSingle();