import { action, computed, observable, useStrict, runInAction } from 'mobx';
import apiConfig from '../config/api.settings';

useStrict(true);

export default class Store {
	@observable site;
	@observable urlparam;
	@observable listing;
  @observable title;
  @observable page;
	@observable loading;
	@observable refreshing;
	@observable errorMsg;

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

	@computed get completeURL(): string {
	    return `https://${this.site}.mongabay.com/${apiConfig.mongabay.wp_api}/${apiConfig.mongabay.posts_route}?${this.urlparam}per_page=${apiConfig.mongabay.per_page}&page=${this.page}&_embed`;
	}

  @action changeURL(newurl) {
        this.urlparam = newurl;
        console.log('URL: ', this.completeURL);
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
      const staticURL = 
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

//var list = window.store = new Store;

//const store = new Store();
//export default store;

// autorun(()=>{
// 	console.log('LISTING:', list.listing)
// })
