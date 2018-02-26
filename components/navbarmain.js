import React, { Component } from 'react';
import { Image, Platform, StatusBar, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';

class MainNavBar extends React.Component {

    _renderLeft() {

        const scenename = Actions.currentScene;

        switch(scenename) {
          case '_News':
            return( 
              <Icon
                type='material-community'
                name='menu'
                color='#000'
                style={styles.navBarMenu}
                onPress={()=>Actions.drawerOpen()}
              />
            );
            break;

          case 'Settings':
            return (
              <Icon
                type='material-community'
                style={[styles.navBarMenu, {marginLeft: 10}]}
                name='arrow-left'
                color='#000'
                onPress={()=> {Actions.News(); Actions.refresh()}}
              />
            );
            break;

          default:
            return (
              <Icon
                type='material-community'
                style={[styles.navBarMenu, {marginLeft: 10}]}
                name='arrow-left'
                color='#000'
                onPress={()=> Actions.pop()}
              />
            );
            break;
        }
    }

    _renderMiddle() {
      if (Actions.currentScene == '_News') {
        return(
          <TouchableWithoutFeedback onPress={ ()=> Actions.News() }>
            <Image
              resizeMode='contain'
              style= {[styles.navBarLogo,{ height: 22, width: 141 }]}
              source={require("../src/mongabay_logo_black.png")}
            />
          </TouchableWithoutFeedback>
        )
      } else {
        return(
          <Text numberOfLines={1} style={[styles.navBarTitle, {fontSize: 14}]}>{this.props.title.toUpperCase()}</Text>
        )
      }
    }

    _renderRight() {
      if (Actions.currentScene != 'Settings') {
        return(
          <Icon
            type='material-community'
            style={styles.navBarSettings}
            name='dots-vertical'
            color='#000'
            onPress={ ()=> Actions.Settings()}
          />
        )
      } else {
        return null;
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
          <View style={styles.container}>
            { this._renderLeft() }
            { this._renderMiddle() }
            { this._renderRight() }
          </View>
        </View>
      )
    }
}


const styles = StyleSheet.create({
  container: {
    height: (Platform.OS === 'ios') ? 84 : 74,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingLeft: 10,
    paddingRight: 10,
    elevation: 4,
    paddingTop: 20
  },
  navBarMenu: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'flex-start'
  },
  navBarLogo: {
    flex: 2,
    alignSelf: 'center',
    alignItems: 'center'
  },
  navBarTitle: {
    flex: 2,
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingRight: 20
  },
  navBarSettings: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'flex-end'
  }
});

export default MainNavBar;
