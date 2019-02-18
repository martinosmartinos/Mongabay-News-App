import { ListView } from 'react-native';
import { action, computed, observable, runInAction } from 'mobx';
import StoreSettings from '../store/StoreSettings';

class StoreTags {
  @observable site = 'news.mongabay.com';
  @observable urlparam;
  @observable listing;
  @observable title;
  @observable page;
  @observable loading;
  @observable refreshing;
  @observable errorMsg;

  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });

  constructor() {
    this.site = StoreSettings.site;
    this.urlparam = '';
    this.listing = [];
    this.title = '';
    this.page = 1;
    this.loading = false;
    this.refreshing = false;
    this.errorMsg = '';
    //this.currentSite();
  }

  // @action async currentSite() {
  //   await AsyncStorage.getItem('site').then(action((result) => {
  //     if(result) {
  //       this.site = JSON.parse(result);
  //       this.fetchData();
  //     }else{
  //       this.site = 'news.mongabay.com';
  //       AsyncStorage.setItem('site', JSON.stringify('news.mongabay.com'));
  //       this.fetchData();
  //     }
  //   }))
  // }

  @computed get dataSource() {
    return this.ds.cloneWithRows(this.listing.slice());
  }

  @computed get completeURL(): string {
    return `https://${this.site}/wp-json/wp/v2/posts?${this.urlparam}per_page=10&page=${this.page}&_embed`;
  }

  @action changeURL(newsite, newurl) {
    this.site = newsite;
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