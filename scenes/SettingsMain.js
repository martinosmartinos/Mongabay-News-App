import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage, Text, ScrollView, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { action, observable } from 'mobx';
import { observer, inject } from 'mobx-react/native';
import { Actions } from 'react-native-router-flux';
import { Icon, List, ListItem, Slider } from 'react-native-elements';


@inject('StoreSingle', 'StoreSettings')
@observer

class SettingsMain extends Component {
  
  @observable appFont;
  @observable appNotify;

  constructor(props) {
    super(props);
    this.appFont = this.props.StoreSettings.mainfontsize;
    this.appNotify = this.props.StoreSettings.notify;

    AsyncStorage.getItem('mainfontsize').then(action((result) => {
      if(result) this.appFont = JSON.parse(result);
    }));

    AsyncStorage.getItem('notify').then(action((result) => {
      if(result) this.appNotify = JSON.parse(result);
    }))
  }

  onChange = e => {
    this.updateFont(e.target.mainfontsize, e.target.value);
  }

  onChange = e => {
    this.updateNotify(e.target.notify, e.target.value);
  }

  @action updateFont = async(value) => {
    this.appFont = value;
    this.props.StoreSettings.mainfontsize = value;
    AsyncStorage.setItem('mainfontsize', JSON.stringify(value));
  }

  @action updateNotify = (value) => {
    this.appNotify = value;
    this.props.StoreSettings.notify = value;
    AsyncStorage.setItem('notify', JSON.stringify(value));
  }

  render() {
    const appver = require('../package.json');
    return (
      <ScrollView
        keyboardShouldPersistTaps='always'
        contentContainerStyle={styles.container}
      >
        <Text style={styles.setheader}>GENERAL</Text>
        <List style={styles.section}>
          <ListItem
            avatar={false}
            title='Receive Notifications'
            switchButton
            hideChevron
            onSwitch = {this.updateNotify}
            switched = {this.appNotify}
            leftIcon={{name: 'notifications-active', style: styles.icons}}
            containerStyle={styles.listitem}
          />
          <ListItem
            avatar={false}
            title='Base Font Size:'
            hideChevron
            leftIcon={{name: 'format-size', style: styles.icons}}
            subtitle='Change the size of a news app text'
            containerStyle={styles.listitem}
          />
          <ListItem
            avatar={false}
            title={
              <Slider
                value={(this.appFont) ? this.appFont : 15}
                maximumValue={20}
                minimumValue={15}
                thumbTintColor='#2196F3'
                minimumTrackTintColor='#2196F3'
                step={1}
                onValueChange={this.updateFont}
              />
            }
            hideChevron
            rightTitle='Mongabay'
            rightTitleNumberOfLines={2}
            rightTitleStyle={[styles.flexfont, {fontSize: this.props.StoreSettings.mainfontsize}]}
            containerStyle={styles.listitem}
          />
        </List>
        <Text style={styles.setheader}>INFORMATION</Text>
        <List style={styles.section}>
          <ListItem
            avatar={false}
            hideChevron
            title='About Mongabay'
            onPress={() => {
              this.props.StoreSingle.changeURL('pages','13473');
              Actions.singleFetched();
            }}
            leftIcon={{name: 'note', style: styles.icons}}
            containerStyle={styles.listitem}
          />
          <ListItem
            avatar={false}
            hideChevron
            title='Terms and Conditions'
            onPress={() => {
              this.props.StoreSingle.changeURL('pages','12718');
              Actions.singleFetched();
            }}
            leftIcon={{name: 'format-list-numbered', style: styles.icons}}
            containerStyle={styles.listitem}
          />
          <ListItem
            avatar={false}
            hideChevron
            title='Privacy Policy'
            onPress={() => {
              this.props.StoreSingle.changeURL('pages','12723');
              Actions.singleFetched();
            }}
            leftIcon={{name: 'fingerprint', style: styles.icons}}
            containerStyle={styles.listitem}
          />
          <ListItem
            avatar={false}
            hideChevron
            title='Contact Us'
            onPress={() => {
              this.props.StoreSingle.changeURL('pages','250');
              Actions.singleFetched();
            }}
            leftIcon={{name: 'email', style: styles.icons}}
            containerStyle={styles.listitem}
          />
          <ListItem
            avatar={false}
            hideChevron
            titleNumberOfLines={1}
            subtitleNumberOfLines={2}
            title={'Mongabay News v' + appver.version}
            subtitle={appver.description + ' ' + appver.author}
            containerStyle={styles.listitem}
          />
        </List>
      </ScrollView>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF'
  },
  flexfont: {
    color: '#000'
  },
  section: {
    marginTop: 0,
    paddingTop: 40,
    paddingBottom: 40,
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  listitem: {
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  setheader: {
    fontSize: 15,
    color: '#DDD'
  },
  icons: {
    color: '#2196F3'
  }
});

export default SettingsMain;