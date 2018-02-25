/**
 * Mongabay News Reader App
 */
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'mobx-react';
import { observer } from 'mobx-react/native';
import { Actions, Drawer, Modal, Router, Scene } from 'react-native-router-flux';
import StoreSingle from './store/StoreSingle';
import StoreSettings from './store/StoreSettings';
import StoreNews from './store/StoreNews';
import StoreTags from './store/StoreTags';
import ListNews from './scenes/ListNews';
import ListTags from './scenes/ListTags';
import SingleArticle from './scenes/SingleArticle';
import SingleFetched from './scenes/SingleFetched';
import SliderView from './scenes/SliderView';
import SettingsMain from './scenes/SettingsMain';
import MainNav from './components/navmain';
import MainNavBar from './components/navbarmain';

const stores = { StoreNews, StoreTags, StoreSingle, StoreSettings };

class App extends Component {
  render() {
    return (
      <Provider {...stores}>

        <Router wrapBy={observer} >
        
          <Scene
            key="root"
            navBar={MainNavBar}
          >
          
            <Drawer
              hideNavBar
              key="drawer"
              contentComponent={MainNav}
            >
              <Scene
                key="News"
                component={ListNews}
                title=""
              />
            </Drawer>
            
            <Scene
              key="TagsFeed"
              component={ListTags}
              title=""
            />
            <Scene
              key="singleArticle"
              component={SingleArticle}
              title=""
            />
            <Scene
              key="singleFetched"
              component={SingleFetched}
              title=""
            />
            <Scene
              hideNavBar
              key="galleryView"
              component={SliderView}
              title=""
            />
            <Scene
              key="Settings"
              component={SettingsMain}
              title="Settings"
            />

          </Scene>
          
        </Router>
       
      </Provider>
    )
  }

}

export default App;