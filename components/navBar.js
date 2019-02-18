import React, { Component } from 'react';
import { StatusBar, Text, TouchableWithoutFeedback, View } from 'react-native';
import { observer, inject } from 'mobx-react';
import appStyle from '../helpers/styles';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import IconSvg from './icons';
import translationStrings from '../components/translation';
import { getDescendantProp } from '../helpers/functions';

@inject('StoreSettings')
@observer
class Navbar extends Component {

    _sceneName() {
      return Actions.currentScene;
    }

    _renderLeft() {
        switch(this._sceneName()) {
          case '_news':
            return( 
              <Icon
                type='material-community'
                name='menu'
                color='#000'
                containerStyle={appStyle().navBarMenu}
                onPress={() => Actions.drawerOpen()}
              />
            );
            break;

          case 'singlefetched':
            return( 
              <Icon
                type='material-community'
                containerStyle={[appStyle().navBarMenu]}
                name='chevron-left'
                color='#000'
                onPress={() => {
                  setTimeout(() => Actions.news(), 0),
                  setTimeout(() => Actions.refresh(), 1)
                }}
              />
            );
            break;

          case 'settings':
            return (
              <Icon
                type='material-community'
                containerStyle={appStyle().navBarMenu}
                name='chevron-left'
                color='#000'
                onPress={() => {
                  setTimeout(() => Actions.news(), 0),
                  //setTimeout(() => Actions.drawerClose(),1)
                  setTimeout(() => Actions.reset('drawer'), 1)
                }}
              />
            );
            break;

          default:
            return (
              <Icon
                type='material-community'
                containerStyle={[appStyle().navBarMenu]}
                name='chevron-left'
                color='#000'
                onPress={() => {Actions.pop(), Actions.refresh()}}
              />
            );
            break;
        }
    }

    _renderMiddle() {
      let langcode = this.props.StoreSettings.langcode;
      switch(this._sceneName()) {
          case '_news':
            return(
              <TouchableWithoutFeedback onPress={() => {
                setTimeout(() => Actions.news(), 0),
                setTimeout(() => Actions.refresh(), 1)
              }}>
                <View style= {[appStyle().navBarLogo,{ height: 44, width: 144 }]}>
                  <IconSvg name='Mongabay' height="44" width="144" fill="#000" viewBox="0 0 144 44" />
                </View>
              </TouchableWithoutFeedback>
            );
            break;

          case 'settings':
            return(
              <Text numberOfLines={1} style={[appStyle().navBarTitle, {fontSize: 14, flex: 2, alignSelf: 'center', alignItems: 'center'}]}>
                {getDescendantProp(translationStrings, 'settings.' + langcode + '.screentitle')}
              </Text>
            );
            break;

          case 'tagsfeed':
            return(
              <View style={{flex: 2, alignSelf: 'center', alignItems: 'center' }}>
                <View style={{flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                  <IconSvg name={this.props.title.replace(/\s/g,'')} height="23" width="23" fill="#000" viewBox="0 0 50 50"/>
                  <Text numberOfLines={1} style={[appStyle().navBarTitle, {fontSize: 14}]}>{this.props.title.toUpperCase()}</Text>
                </View>
              </View>
            );
            break;

          default:
            return(
              <TouchableWithoutFeedback onPress={() => {
                setTimeout(() => Actions.news(), 0),
                setTimeout(() => Actions.refresh(), 1)
              }}>
                <View style= {[appStyle().navBarLogo,{ height: 44, width: 144 }]}>
                  <IconSvg name='Mongabay' height="44" width="144" fill="#000" viewBox="0 0 144 44" />
                </View>
              </TouchableWithoutFeedback>
            );
            break;
        }
    }

    _renderRight() {
      if (this._sceneName() != 'settings') {
        return(
          <Icon
            type='material-community'
            containerStyle={appStyle().navBarSettings}
            name='dots-vertical'
            color='#000'
            onPress={()=> setTimeout(() => Actions.settings(), 0)}
          />
        )
      } else {
        return(
          <Icon
            type='material-community'
            containerStyle={appStyle().navBarSettings}
            name='dots-vertical'
            color='#FFF'
          />
        );
      }
    }

    render() {
      return(
        <View>
          <StatusBar
            translucent
            backgroundColor="rgba(0, 0, 0, 0.24)"
            animated
          />
          <View style={appStyle().navContainer}>
            {this._renderLeft()}
            {this._renderMiddle()}
            {this._renderRight()}
          </View>
        </View>
      )
    }
}

export default Navbar;