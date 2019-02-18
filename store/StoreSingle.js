import { action, computed, observable, runInAction } from 'mobx';
import { AsyncStorage } from 'react-native';
import StoreSettings from '../store/StoreSettings';

class StoreSingle {

  @observable site;
  @observable fetchtype;
  @observable urlparam;
  @observable itemsingle;
  @observable mediaID;
  @observable featuredImg;
  @observable fcaption;
  @observable loaded;
  @observable floaded;
  @observable errorMsg;
  @observable errorFeatured;

  constructor() {
    this.site = StoreSettings.site;
    this.fetchtype = '';
    this.urlparam = '';
    this.itemsingle = [];
    this.mediaID = '';
    this.featuredImg = [];
    this.fcaption = [];
    this.loaded = false;
    this.floaded = false;
    this.errorMsg = '';
    this.errorFeatured = '';
    this.currentSite();
    //this.fetchData();
  }

  @action async currentSite() {
    await AsyncStorage.getItem('site')
      .then(action((result) => {
        if(result) {
          this.site = JSON.parse(result);
          //this.fetchData();
        }else{
          this.site = 'news.mongabay.com';
          AsyncStorage.setItem('site', JSON.stringify('news.mongabay.com'));
          //this.fetchData();
      }
    }))
  }

  @computed get completeURL() {
    if(this.fetchtype == 'slug') {
      console.log('SLUG!!!');
      return `https://${this.site}/wp-json/wp/v2/posts?${this.fetchtype}=${this.urlparam}&_embed`;
    } else {
      return `https://${this.site}/wp-json/wp/v2/${this.fetchtype}/${this.urlparam}?_embed`;
    }
  }

  @computed get featuredURL() {
    if(this.fetchtype == 'slug') {
      return `https://${this.site}/wp-json/wp/v2/media/${this.mediaID}`;
    }
  }

  @action changeURL(type, newurl) {
    //console.log('StoreSettings: ', StoreSettings.site);
    this.fetchtype = type;
    this.urlparam = newurl;
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
          console.log('Single responseJson: ', responseJson);
          if(this.fetchtype == 'slug') {
            this.mediaID = responseJson["0"].featured_media;
            console.log('this.mediaID: ', this.mediaID);
          }
          this.loaded = true;
        })

      } catch(error) {
        console.error(error);
      }
  }

  @action async fetchFeatured() {

      this.featuredImg = [];
      this.floaded = false;

      try {
        const response = await fetch(this.featuredURL);
        const responseJson = await response.json();
        runInAction(() => {
          this.errorFeatured = '';
          this.featuredImg = responseJson;
          console.log('Featured Image', responseJson);
          this.floaded = true;
        })

      } catch(error) {
        console.error(error);
      }
  }

}

export default new StoreSingle();