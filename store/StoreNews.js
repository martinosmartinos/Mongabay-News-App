import { AsyncStorage } from 'react-native';
import { ListView } from 'react-native';
import { action, computed, observable, runInAction } from 'mobx';

class StoreNews {
  @observable site;
  @observable urlparam;
  @observable listing;
  @observable page;
  @observable loading;
  @observable refreshing;
  @observable errorMsg;

  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  constructor() {
    this.urlparam = '';
    this.listing = [];
    this.page = 1;
    this.loading = false;
    this.refreshing = false;
    this.errorMsg = '';
    this.currentSite();
  }

  @action async currentSite() {
    await AsyncStorage.getItem('site').then(action((result) => {
      if(result) {
        this.site = JSON.parse(result);
        this.fetchData();
      }else{
        this.site = 'news.mongabay.com';
        AsyncStorage.setItem('site', JSON.stringify('news.mongabay.com'));
        this.fetchData();
      }
    }))
  }

  @action changeURL(newsite, newurl) {
    this.site = newsite;
    this.urlparam = newurl;
    this.refreshing = true;
    console.log('URL Changed to: ', this.site);
    this.fetchData();
  }

  @action handleRefresh = () => {
    this.page = 1;
    this.refreshing = true;
    this.fetchData();
  }

  @action handleLoadMore = () => {
    this.page = this.page + 1;
    this.loading = true;
    this.fetchData();
  }
    
  @computed get dataSource() {
    return this.ds.cloneWithRows(this.listing.slice());
  }

  @computed get completeURL(): string {
    return `https://${this.site}/wp-json/wp/v2/posts?${this.urlparam}per_page=10&page=${this.page}&_embed`;
  }

  @action async fetchData() {

    try {
      
      if(this.refreshing) this.page = 1;
      const response = await fetch(this.completeURL);
      const responseJson = await response.json();

      runInAction(() => {

        this.refreshing = false;
        this.loading = true;
        this.errorMsg = '';
        
        if(this.page === 1){
          this.listing.replace(responseJson);
          this.loading = false;
        } else {
          this.listing.splice(this.listing.length, 0, ...responseJson);
          this.loading = false;
        }

      })
    } catch(error) {
      console.error(error);
    }

  }
}

export default new StoreNews();