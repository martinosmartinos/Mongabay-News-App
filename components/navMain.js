import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { observer, inject } from 'mobx-react/native';
import { ListItem, SearchBar } from 'react-native-elements';
import appStyle from '../helpers/styles';
import IconSvg from './icons';
import translationStrings from './translation';
import { getDescendantProp } from '../helpers/functions';

@inject('StoreSettings', 'StoreTags', 'StoreOffline')

@observer
class Nav extends Component {

  state = {
    search: ''
  }

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { StoreSettings, StoreTags, StoreOffline } = this.props;
    let langcode = this.props.StoreSettings.langcode;
    return (
      <ScrollView style={appStyle().navwrap}>
        <SearchBar
          onChangeText={this.updateSearch}
          value={this.state.search}
          onSubmitEditing={() => {
            StoreTags.changeURL(StoreSettings.site, 'filter[s]=' + this.state.search + '&'); Actions.tagsfeed({ title: this.state.search.toUpperCase() })
          }}
          placeholder={getDescendantProp(translationStrings, 'menu.' + langcode + '.search')}
          lightTheme
          clearIcon
        />

        <Text style={appStyle().sectiontitle}>
          {getDescendantProp(translationStrings, 'menu.' + langcode + '.offlineread')}
        </Text>

        <View style={appStyle().setSection}>
          <ListItem
            avatar={false}
            titleStyle={{ borderBottomWidth: 0 }}
            chevron={false}
            badge={{
              value: StoreOffline.savedamount,
              textStyle: { color: 'white', borderColor: 'transparent' },
              badgeStyle: appStyle().badge
            }}
            title={getDescendantProp(translationStrings, 'menu.' + langcode + '.menuoffline')}
            onPress={() => Actions.listoffline()}
            containerStyle={appStyle().setListitem}
          />
        </View>

        <Text style={appStyle().sectiontitle}>
          {getDescendantProp(translationStrings, 'menu.' + langcode + '.title')}
        </Text>

        <FlatList
          data={getDescendantProp(translationStrings, 'menu.' + langcode + '.menusections')}
          keyExtractor={this.title}
          renderItem={({ item }) => (
            <ListItem
              key={item.title}
              onPress={() => {
                StoreTags.changeURL(StoreSettings.site, item.topic),
                  Actions.tagsfeed({ title: item.title })
              }}
              leftIcon={<IconSvg name={item.icon} height="23" width="23" fill="#000" viewBox="0 0 50 50" style={{ marginLeft: 10 }} />}
              title={item.title}
              titleStyle={appStyle().draweritem}
              containerStyle={{ borderBottomWidth: 0, paddingLeft: 10, paddingRight: 20 }}
              chevron={false}
            />
          )}
        />

        <Text style={appStyle().sectiontitle}>
          {getDescendantProp(translationStrings, 'menu.' + langcode + '.locations')}
        </Text>

        <FlatList
          data={getDescendantProp(translationStrings, 'menu.' + langcode + '.menulocations')}
          keyExtractor={this.title}
          numColumns={1}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => {
                StoreTags.changeURL(StoreSettings.site, item.location),
                  Actions.tagsfeed({ title: item.title })
              }}
              leftIcon={<IconSvg name={item.icon} height="23" width="23" fill="#000" viewBox="0 0 50 50" style={{ marginLeft: 10 }} />}
              title={item.title}
              titleStyle={appStyle().draweritem}
              containerStyle={{ borderBottomWidth: 0, paddingLeft: 10, paddingRight: 20 }}
              hideChevron
            />
          )}
        />
      </ScrollView>
    )
  }
}

export default Nav;