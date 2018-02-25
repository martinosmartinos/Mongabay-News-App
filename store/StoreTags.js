import { View, Text, Image, ListView } from 'react-native';
import { action, computed, observable, useStrict, runInAction } from 'mobx';
import apiConfig from '../config/api.settings';

useStrict(true);

class StoreTags {
  @observable site;
  @observable urlparam;
  @observable listing;
  @observable title;
  @observable page;
  @observable loading;
  @observable refreshing;
  @observable errorMsg;

  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });

  constructor() {
    this.site = 'news';
    this.urlparam = '';
    this.listing = [];
    this.title = '';
    this.page = 1;
    this.loading = false;
    this.refreshing = false;
    this.errorMsg = '';
    this.fetchData()
  }

  

  @computed get dataSource() {
    return this.ds.cloneWithRows(this.listing.slice());
  }

  @computed get completeURL(): string {
     return `https://${this.site}.mongabay.com/${apiConfig.mongabay.wp_api}/${apiConfig.mongabay.posts_route}?${this.urlparam}per_page=${apiConfig.mongabay.per_page}&page=${this.page}&_embed`;
  }

  @action changeURL(newurl) {
    this.urlparam = newurl;
    this.refreshing = true;
    this.fetchData();
  }


  @action handleRefresh = () => {
    this.page = 1;
    this.refreshing = true;
    this.fetchData();
  }

  @action handleLoadMore = () => {
    this.page = this.page + 1;
    this.fetchData();
  }
    

  @action async fetchData() {

    try {

      if(this.refreshing) this.page = 1;
      const response = await fetch(this.completeURL);
      const responseJson = await response.json();

      runInAction(() => {

        this.refreshing = false;
        this.errorMsg = '';

        if(this.page === 1){

          this.listing.replace(responseJson);
          
        } else {

          this.listing.splice(this.listing.length, 0, ...responseJson);

        }

      })
    } catch(error) {
      console.error(error);
    }

  }
}

;
export default new StoreTags();