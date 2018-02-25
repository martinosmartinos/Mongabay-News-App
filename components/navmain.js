import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet, ScrollView, ListView, FlatList } from 'react-native';
import { Actions, DefaultRenderer } from 'react-native-router-flux';
import { DrawerNavigator } from 'react-navigation';
import { observer, inject } from 'mobx-react/native';
import { List, ListItem, SearchBar, Icon } from 'react-native-elements';

@inject('StoreTags')
@observer

class MainNav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  renderHeader = () => {
    return ;
  };

  render() {
    return (
      <ScrollView>
        <SearchBar
          onChangeText={(text) => this.setState({text})}
          onSubmitEditing={()=>{
            this.props.StoreTags.changeURL('filter[s]=' + this.state.text + '&');
            Actions.drawerClose();
            Actions.TagsFeed();
            Actions.refresh({title: this.state.text.toUpperCase()});
          }}
          placeholder="search..."
          lightTheme
          clearIcon
        />

      <Text style={styles.sectiontitle}>NEWS SECTIONS</Text>

      <FlatList
        data={[{title: 'Agriculture', topic: 'filter[topic]=agriculture&'}, {title: 'Animals', topic: 'filter[topic]=animals&'}, {title: 'Birds', topic: 'filter[topic]=birds&'},{title: 'Climate Change', topic: 'filter[topic]=climate-change&'},{title: 'Conservation', topic: 'filter[topic]=conservation&'},{title: 'Deforestation', topic: 'filter[topic]=deforestation&'},{title: 'Energy', topic: 'filter[topic]=energy&'},{title: 'Featured', topic: 'filter[topic]=featured&'},{title: 'Forests', topic: 'filter[topic]=forests&'},{title: 'Happy-upbeat Environmental', topic: 'filter[topic]=happy-upbeat-environmental&'},{title: 'Herps', topic: 'filter[topic]=herps&'},{title: 'Indigenous Peoples', topic: 'filter[topic]=indigenous-peoples&'},{title: 'Interviews', topic: 'filter[topic]=interviews&'},{title: 'Mammals', topic: 'filter[topic]=mammals&'},{title: 'New Species', topic: 'filter[topic]=new-species&'},{title: 'Oceans', topic: 'filter[topic]=oceans&'},{title: 'Palm Oil', topic: 'filter[topic]=palm-oil&'},{title: 'Rainforests', topic: 'filter[topic]=rainforests&'},{title: 'Technology', topic: 'filter[topic]=technology&'},{title: 'Wildlife', topic: 'filter[topic]=wildlife&'}]}
        keyExtractor={this.title}
        renderItem={({item, separators}) => (
          <ListItem
              key={item.title}
              onPress={() => {
                this.props.StoreTags.changeURL(item.topic);
                Actions.drawerClose();
                Actions.TagsFeed();
                Actions.refresh({title: item.title.toUpperCase()});
              }}

              title={item.title}
              titleStyle={{ fontSize: 14 }}
              containerStyle={{ borderBottomWidth: 0 }}
              hideChevron
          />
        )}
      />

      <Text style={styles.sectiontitle}>LOCATIONS</Text>

      <FlatList
        data={[{title: 'Africa', location: 'filter[location]=africa&'}, {title: 'Asia', location: 'filter[location]=asia&'}, {title: 'Borneo', location: 'filter[location]=borneo&'},{title: 'Cameroon', location: 'filter[location]=cameroone&'},{title: 'China', location: 'filter[location]=china&'},{title: 'Congo', location: 'filter[location]=congo&'},{title: 'Indonesia', location: 'filter[location]=indonesia&'},{title: 'Madagascar', location: 'filter[location]=madagascar&'},{title: 'New Guinea', location: 'filter[location]=new-guine&'},{title: 'Sumatra', location: 'filter[location]=sumatra&'},{title: 'Amazon', location: 'filter[location]=amazon&'},{title: 'Australia', location: 'filter[location]=australia&'},{title: 'Brazil', location: 'filter[location]=brazil&'},{title: 'Central America', location: 'filter[location]=central-america&'},{title: 'Colombia', location: 'filter[location]=colombia&'},{title: 'India', location: 'filter[location]=india&'},{title: 'Latin America', location: 'filter[location]=latin-america&'},{title: 'Malaysia', location: 'filter[location]=malaysia&'},{title: 'Peru', location: 'filter[location]=peru&'},{title: 'United States', location: 'filter[location]=united-states&'}]}
        keyExtractor={this.title}
        numColumns={1}
        renderItem={({item, separators}) => (
          <ListItem
            
              onPress={() => {
                this.props.StoreTags.changeURL(item.location);
                Actions.drawerClose();
                Actions.TagsFeed();
                Actions.refresh({title: item.title.toUpperCase()});
              }}

              title={item.title}
              titleStyle={{ fontSize: 14 }}
              containerStyle={{ borderBottomWidth: 0 }}
              hideChevron
          />
        )}
      />
      </ScrollView>
    ) 
  }
}



const styles = StyleSheet.create({
  navwrap: {
    paddingTop: 40
  },
  sectiontitle: {
    fontSize: 15,
    color: '#DDD',
    marginLeft: 20,
    paddingTop: 20
  },
  icon: {
    width: 20,
    height: 24,
  },
});


export default MainNav;