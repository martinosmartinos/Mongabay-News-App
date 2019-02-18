import React, { Component } from 'react';
import { Picker, PickerIOS, Text, ScrollView, View} from 'react-native';
import { AsyncStorage } from 'react-native';
import { action, observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Actions } from 'react-native-router-flux';
import { Button, ListItem, Slider } from 'react-native-elements';
import IconSvg from '../components/icons';
import translationStrings from '../components/translation';
import {getDescendantProp} from '../helpers/functions';
//import RNRestart from 'react-native-restart';
import appStyle from '../helpers/styles';

@inject('StoreNews', 'StoreSingle', 'StoreSettings')
@observer
class SettingsMain extends Component {
  
  @observable site;
  @observable font;
  @observable fontstyle;
  @observable notify;
  @observable donate;
  @observable langcode;
  @observable pageAbout;
  @observable pageContact;
	@observable pageTerms;
	@observable pagePrivacy;

  constructor(props) {
    super(props);
    const settings = this.props.StoreSettings;
    this.site = settings.site;
    this.font = settings.mainfontsize;
    this.fontstyle = settings.fontstyle;
    this.notify = settings.notify;
    this.donate = settings.donate;
    this.langcode = settings.langcode;
    this.pageAbout = settings.pageAbout;
    this.pageContact = settings.pageContact;
    this.pageTerms = settings.pageTerms;
    this.pagePrivacy = settings.pagePrivacy;
  }

  onChange = e => {
    this.updateSite(e.target.site, e.target.value);
  }

  onChange = e => {
    this.updateFont(e.target.mainfontsize, e.target.value);
  }

  onChange = e => {
    this.updateFontstyle(e.target.fontstyle, e.target.value);
  }

  onChange = e => {
    this.updateNotify(e.target.notify, e.target.value);
  }

  onChange = e => {
    this.updateDonate(e.target.donate, e.target.value);
  }

  @action updateSite = (value) => {
    this.props.StoreSettings.langCode(value);
    this.props.StoreSettings.site = value;
    this.props.StoreNews.changeURL(value, '');
    this.props.StoreSingle.site = value;
    //this.props.StoreTags.site = value;
    this.site = value;

    //AsyncStorage.removeItem('site');
    AsyncStorage.setItem('site', JSON.stringify(value));
    console.log('Base domain changed... ', this.props.StoreSingle.site);
    //RNRestart.Restart();

  }

  @action updateFont = (value) => {
    this.font = value;
    this.props.StoreSettings.mainfontsize = value;
    AsyncStorage.setItem('mainfontsize', JSON.stringify(value));
  }

  @action updateFontstyle = (value) => {
    this.fontstyle = value;
    this.props.StoreSettings.fontstyle = value;
    AsyncStorage.setItem('fontstyle', JSON.stringify(value));
  }

  @action updateNotify = (value) => {
    this.notify = value;
    this.props.StoreSettings.notify = value;
    AsyncStorage.setItem('notify', JSON.stringify(value));
  }

  @action updateDonate = (value) => {
    this.donate = value;
    this.props.StoreSettings.donate = value;
    AsyncStorage.setItem('donate', JSON.stringify(value));
  }

  render() {
    const appver = require('../package.json');
    const showlang = true;
    const langcode = this.props.StoreSettings.langcode;
    const pageabout = this.props.StoreSettings.pageAbout;
    const pagecontact = this.props.StoreSettings.pageContact;
    const pageterms = this.props.StoreSettings.pageTerms;
    const pageprivacy = this.props.StoreSettings.pagePrivacy;

    return (
      <ScrollView
        keyboardShouldPersistTaps='always'
        contentContainerStyle={appStyle().setContainer}
      >
        <IconSvg style={{alignSelf: 'center'}} name='Lizard' height="60" width="60" fill="#DDD" viewBox="0 0 60 60" />
        {
          showlang &&
          <Text style={appStyle().setHeader}>{getDescendantProp(translationStrings, 'settings.' + langcode + '.titlesite')}</Text>
        }
        {
          showlang  &&
          <View style={appStyle().setSection}>
            <Picker
              selectedValue={this.site}
              //style={{ height: 50, width: '100%' }}
              onValueChange={this.updateSite}
            >
              <Picker.Item label="English" value="news.mongabay.com"/>
              <Picker.Item label="Español" value="es.mongabay.com"/>
              <Picker.Item label="India" value="india.mongabay.com"/>
              <Picker.Item label="Indonesian" value="www.mongabay.co.id"/>
            </Picker>
          </View>
        }
        
        <Text style={appStyle().setHeader}>{getDescendantProp(translationStrings, 'settings.' + langcode + '.titlegeneral')}</Text>
        <View style={appStyle().setSection}>
          <ListItem
            avatar={false}
            title={getDescendantProp(translationStrings, 'settings.' + langcode + '.notifications')}
            switch={{
              value: this.notify,
              onValueChange: this.updateNotify
            }}
            chevron={false}
            leftIcon={{name: 'notifications-active', style: appStyle().setIcons}}
            containerStyle={appStyle().setListitem}
          />
          <ListItem
            avatar={false}
            title={getDescendantProp(translationStrings, 'settings.' + langcode + '.font')}
            switch={{
              value: this.fontstyle,
              onValueChange: this.updateFontstyle
            }}
            chevron={false}
            leftIcon={{name: 'format-size', style: appStyle().setIcons}}
            containerStyle={appStyle().setListitem}
          />
          <ListItem
            avatar={false}
            title={getDescendantProp(translationStrings, 'settings.' + langcode + '.fontstyle')}
            chevron={false}
            leftIcon={{name: 'format-size', style: appStyle().setIcons}}
            subtitle={getDescendantProp(translationStrings, 'settings.' + langcode + '.fontstylesub')}
            containerStyle={appStyle().setListitem}
          />
          <ListItem
            avatar={false}
            title={
              <Slider
                value={this.font ? this.font : 15}
                maximumValue={22}
                minimumValue={15}
                thumbTintColor='#2196F3'
                minimumTrackTintColor='#2196F3'
                step={1}
                onValueChange={this.updateFont}
              />
            }
            chevron={false}
            rightTitle='Mongabay'
            rightTitleNumberOfLines={2}
            rightTitleStyle={[appStyle().setFlexfont, {fontSize: this.props.StoreSettings.mainfontsize, fontFamily: this.props.StoreSettings.fontstyleName}]}
            containerStyle={appStyle().setListitem}
          />
          <ListItem
            avatar={false}
            title={getDescendantProp(translationStrings, 'settings.' + langcode + '.donate')}
            switch={{
              value: this.donate,
              onValueChange: this.updateDonate
            }}
            chevron={false}
            leftIcon={{name: 'favorite', style: appStyle().setIcons}}
            containerStyle={appStyle().setListitem}
          />
        </View>
        <Text style={appStyle().setHeader}>
          {getDescendantProp(translationStrings, 'settings.' + langcode + '.titleinfo')}
        </Text>
        <View style={appStyle().setSection}>
          
          <ListItem
            avatar={false}
            chevron={false}
            title={getDescendantProp(translationStrings, 'settings.' + langcode + '.about')}
            onPress={() => {
              this.props.StoreSingle.changeURL('pages', pageabout);
              this.props.StoreSingle.fetchData();
              Actions.singlefetched();
            }}
            leftIcon={{name: 'note', style: appStyle().setIcons}}
            containerStyle={appStyle().setListitem}
          />
          
          <ListItem
          //TODO add tems page per language
            avatar={false}
            chevron={false}
            title={getDescendantProp(translationStrings, 'settings.' + langcode + '.terms')}
            onPress={() => {
              this.props.StoreSingle.changeURL('pages', pageterms);
              this.props.StoreSingle.fetchData();
              Actions.singlefetched();
            }}
            leftIcon={{name: 'format-list-numbered', style: appStyle().setIcons}}
            containerStyle={appStyle().setListitem}
          />
          
          <ListItem
          //TODO add privacy page per language
            avatar={false}
            chevron={false}
            title={getDescendantProp(translationStrings, 'settings.' + langcode + '.privacy')}
            onPress={() => {
              this.props.StoreSingle.changeURL('pages', pageprivacy);
              this.props.StoreSingle.fetchData();
              Actions.singlefetched();
            }}
            leftIcon={{name: 'fingerprint', style: appStyle().setIcons}}
            containerStyle={appStyle().setListitem}
          />
          
          <ListItem
            //TODO add contact page per language
            avatar={false}
            chevron={false}
            title={getDescendantProp(translationStrings, 'settings.' + langcode + '.contact')}
            onPress={() => {
              this.props.StoreSingle.changeURL('pages', pagecontact);
              this.props.StoreSingle.fetchData();
              Actions.singlefetched();
            }}
            leftIcon={{name: 'email', style: appStyle().setIcons}}
            containerStyle={appStyle().setListitem}
          />
        </View>
        <Text style={appStyle().setHeader}>
          {getDescendantProp(translationStrings, 'settings.' + langcode + '.titleabout')}
        </Text>
        <View style={appStyle().setSection}>
          <ListItem
            avatar={false}
            chevron={false}
            titleNumberOfLines={2}
            subtitleNumberOfLines={2}
            title={appver.description + ' ' + appver.author}
            subtitle={'v' + appver.version + ' Build Date 12/02/2019'}
            containerStyle={appStyle().setListitem}
          />
        </View>
        <Button
          //TODO removing settings per language
          title={getDescendantProp(translationStrings, 'settings.' + langcode + '.buttondefaults')}
          raised
          backgroundColor='#2196F3'
          containerViewStyle={{marginTop: 40}}
          icon={{name: 'cached'}}
          onPress={()=>{
            AsyncStorage.removeItem('site'),
            this.updateSite('news.mongabay.com'),
            AsyncStorage.removeItem('notify'),
            this.updateNotify(true),
            AsyncStorage.removeItem('mainfontsize'),
            this.updateFont(15),
            AsyncStorage.removeItem('fontstyle'),
            this.updateFontstyle(true)}
          }
        />
      </ScrollView>
    )
  }

}

export default SettingsMain;