/**
 * Mongabay News Reader App
 */
import React, { Component } from 'react';
import { Actions, Drawer, Router, Scene } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import { AppState, Linking, StyleSheet } from 'react-native';
import { observer, Provider } from 'mobx-react';
import { action } from 'mobx';
import OneSignal from 'react-native-onesignal';
import Orientation from 'react-native-orientation-locker';

//Import stores
import StoreSettings from './store/StoreSettings';
import StoreSingle from './store/StoreSingle';
import StoreNews from './store/StoreNews';
import StoreTags from './store/StoreTags';
import StoreOffline from './store/StoreOffline';
import StoreMessages from './store/StoreMessages';

//scenes
import ListNews from './scenes/ListNews';
import ListTags from './scenes/ListTags';
import ListOffline from './scenes/ListOffline';
import SingleOffline from './scenes/SingleOffline';
import SingleArticle from './scenes/SingleArticle';
import SingleFetched from './scenes/SingleFetched';
import SliderView from './scenes/SliderView';
import SettingsMain from './scenes/SettingsMain';

//components
import Nav from './components/navMain';
import Navbar from './components/navBar';

console.disableYellowBox = true;
const stores = {StoreNews, StoreTags, StoreSingle, StoreMessages, StoreOffline, StoreSettings};
let passurl = '';
let site = '';

class App extends Component {

  UNSAFE_componentWillMount() {
    //stores.StoreSettings.currentSite();
    //this.onOpened();
    // OneSignal.addEventListener('received', this.onReceived);
    this.checkNotify();
    this.currentSite();
    OneSignal.addEventListener('opened', this.onOpened);
    Linking.addEventListener('url', this.handleLinks);
  }

  componentDidMount() {
    //this.onOpened();
    //this.checkNotify();
    ////OneSignal.addEventListener('received', this.onReceived);
    Orientation.lockToPortrait();
    OneSignal.addEventListener('opened', this.onOpened);
    Linking.addEventListener('url', this.handleLinks);

    OneSignal.inFocusDisplaying(2);

    Linking
      .getInitialURL()
      .then(url => this.handleLinks)
      .catch(console.error);
    Linking
      .addEventListener('url', this.handleLinks);

    // OneSignal.getPermissionSubscriptionState((status) => {
    //     console.log('STATUS: ', status);
    // });
    
  }
  
  componentWillUnmount() {
    ////OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    Linking.removeEventListener('url', this.handleLinks);
  }

  onOpened = (openResult) => {
    console.log('openResult: ', openResult);
      const rawurl = openResult.notification.payload.additionalData.notifyurl.slice(0, openResult.notification.payload.additionalData.notifyurl.length - 1);
      //const rawurl = `https://news.mongabay.com/2018/12/photos-here-are-the-winners-of-the-2018-british-ecological-society-photo-contest/`;
      const choppos = rawurl.lastIndexOf('/');
      passurl = rawurl.substr(choppos + 1);
      stores.StoreSingle.changeURL('slug', passurl);
      stores.StoreSingle.fetchData();
      Actions.singlefetched();
      //console.log('completeURL: ', stores.StoreSingle.completeURL);
  }

  handleLinks = (event) => {
    console.log('URL: ', event.url);
    const url = event.url;
    const domain = this.site;
    console.log('SITE_URL: ', this.site);
    switch(domain) {
      case 'news.mongabay.com':
        if(url.startsWith(`mongabay://article/`)){
          const slug = url.replace('mongabay://article/', '');
          stores.StoreSingle.changeURL('slug', slug);
          stores.StoreSingle.fetchData();
          Actions.singlefetched({type: 'push'});
        }else{
          Linking.openURL.call(Linking, url)
        }
      break;
      case 'es.mongabay.com':
        if(url.startsWith(`mongabay_es://article/`)){
          const slug = url.replace('mongabay_es://article/', '');
          stores.StoreSingle.changeURL('slug', slug);
          stores.StoreSingle.fetchData();
          Actions.singlefetched({ type: 'push'});
        }else{
          Linking.openURL.call(Linking, url)
        }
      break;
      case 'india.mongabay.com':
        if(url.startsWith(`mongabay_in://article/`)){
          const slug = url.replace('mongabay_in://article/', '');
          stores.StoreSingle.changeURL('slug', slug);
          stores.StoreSingle.fetchData();
          Actions.singlefetched({ type: 'push'});
        }else{
          Linking.openURL.call(Linking, url)
        }
      break;
      case 'www.mongabay.co.id':
        if(url.startsWith(`mongabay_id://article/`)){
          const slug = url.replace('mongabay_id://article/', '');
          stores.StoreSingle.changeURL('slug', slug);
          stores.StoreSingle.fetchData();
          Actions.singlefetched({ type: 'push'});
        }else{
          Linking.openURL.call(Linking, url)
        }
      break;
    }
  }

  checkNotify = () => {
    let note = '';
    AsyncStorage.getItem('notify').then(action((result) => {
      if(result) {
        note = JSON.parse(result);
        OneSignal.setSubscription(note);
        console.log('Subscribed for notifications: ', note);
      }else{
        note = true;
        OneSignal.setSubscription(note);
        console.log('Subscribed for notifications: ', note);
      }
    }))
  }

  currentSite = () => {
    let oneID = '';
    let currentSite = '';
    let tag_send = '';
    let tag_key_send = '';
    let tag_keys_remove = [];

    AsyncStorage.getItem('site')
      .then(action((result) => {
        if(result) {
          currentSite = JSON.parse(result);
          console.log('Currently on: ', currentSite);
          this.site = currentSite;
          switch(currentSite) {
            case "news.mongabay.com":
              oneID = '3a782913-6b68-46c5-999b-565ead3bc689';
              tag_keys_remove = ['notify_es', 'notify_in', 'notify_id'];
              tag_key_send = 'notify_news';
              tag_send = 'news.mongabay.com';
              break;
            case "es.mongabay.com":
              oneID = '4027895c-2760-4883-9265-df7f57d9a3b7';
              tag_keys_remove = ['notify_news','notify_in', 'notify_id'];
              tag_key_send = 'notify_es';
              tag_send = 'es.mongabay.com';
              break;
            case "india.mongabay.com":
              oneID = '0d07a537-d189-4871-84bf-8f2e96b0ad6a';
              tag_keys_remove = ['notify_news', 'notify_es', 'notify_id'];
              tag_key_send = 'notify_in';
              tag_send = 'india.mongabay.com';
              break;
            case "www.mongabay.co.id":
              ///TODO add proper keys and ID
              oneID = '0d07a537-d189-4871-84bf-8f2e96b0ad6a';
              tag_keys_remove = ['notify_news', 'notify_in', 'notify_es'];
              tag_key_send = 'notify_id';
              tag_send = 'www.mongabay.co.id';
              break;
          }
          OneSignal.init(oneID);
          tag_keys_remove.forEach((el)=> {
            console.log('Delete Tag: ', String(el));
            OneSignal.deleteTag(String(el));
          })
          OneSignal.sendTag(tag_key_send, tag_send);
          OneSignal.getTags((receivedTags) => {
              console.log('receivedTags', receivedTags);
          });
          
        }else{
          AsyncStorage.setItem('site', JSON.stringify('news.mongabay.com'));
          oneID = '3a782913-6b68-46c5-999b-565ead3bc689';
          OneSignal.init(oneID);
          tag_keys_remove = ['notify_es', 'notify_india'];
          tag_keys_remove.forEach((el)=> {
            OneSignal.deleteTag(String(el));
          })
          OneSignal.sendTag("notify_news", 'news.mongabay.com');
          OneSignal.getTags((receivedTags) => {
              console.log('receivedTags', receivedTags);
          });
        }
      }))
  }

  render() {
    return (
      <Provider {...stores}>
        <Router wrapBy={observer}>
          <Scene
            key='root'
            navBar={Navbar}
          >
            <Drawer
              hideNavBar
              key='drawer'
              contentComponent={Nav}
            >
              <Scene
                key='news'
                component={ListNews}
                onEnter={() => {Actions.drawerClose(), Actions.refresh()}}
                title=''
                initial
              />
            </Drawer>
            <Scene
              key='tagsfeed'
              component={ListTags}
              title=''
            />
            <Scene
              key='singlearticle'
              component={SingleArticle}
              title=''
            />
            <Scene
              key='singlefetched'
              component={SingleFetched}
              title=''
            />
            <Scene
              hideNavBar
              key='galleryview'
              component={SliderView}
              title=''
            />
            <Scene
              key='listoffline'
              component={ListOffline}
              title=''
            />
            <Scene
              key='singleoffline'
              component={SingleOffline}
              title=''
            />
            <Scene
              key='settings'
              component={SettingsMain}
              title=''
            />
          </Scene>
        </Router>
      </Provider>
    )
  }

}

export default App;