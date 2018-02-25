import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Button, ListView, FlatList, TouchableHighlight } from 'react-native';
import { Actions, DefaultRenderer, Tabs } from 'react-native-router-flux';
import { TabNavigator } from 'react-navigation';
import { observer, inject } from 'mobx-react/native';
//import { List, ListItem, SearchBar } from "react-native-elements";
import ListArticles from '../scenes/ListArticles';


class TabsNav extends React.Component {
    
  render() {
    const Tabs = TabNavigator({
      Home: {
        screen: ListArticles,
      },
      Rainforests: {
        screen: ListArticles,
        urlparams: 'filter[topic]=agriculture&'
      },
      Oceans: {
        screen: ListArticles,
      },
      Animals: {
        screen: ListArticles,
      },
      Forkids: {
        screen: ListArticles,
      },
      Wildtech: {
        screen: ListArticles,
      }
    }, {
      tabBarPosition: 'top',
      swipeEnabled: true,
      animationEnabled: false,
      tabBarOptions: {
        scrollEnabled: true,
        inactiveBackgroundColor: '#FFF',
        activeTintColor: '#ff0000',
        activeBackgroundColor: '#FFF',
        labelStyle: {color: '#CCC', fontWeight: 'bold'},
        style: {backgroundColor: '#FFF'},
      },
    });
    return(<Tabs/>)
  }
}

export default TabsNav;