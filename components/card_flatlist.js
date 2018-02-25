import React from 'react';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import HTMLView from 'react-native-htmlview';
import format from 'date-fns/format';

class Card extends React.Component {

  constructor(props) {
      super(props);
  }

  shouldComponentUpdate = ()=> {
    return false;
  }

    

  imageURL=(item) => {
    if ((item.props._embedded['wp:featuredmedia'][0].code!=="rest_forbidden") && (item.props._embedded.hasOwnProperty(['wp:featuredmedia'])) && (item.props._embedded['wp:featuredmedia'][0].media_details.sizes.medium)) {
      image_url = item.props._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
    } else {
      image_url = false;
    }
    return image_url;
  }

  bulletPoints=(item) => {
    bullets = [];
    for (i = 0; i <= 3; i++) {
      singlebullet = item.props['mog_bullet_'+i+'_mog_bulletpoint'];
      if(singlebullet.length > 0 ){
        bullets.push(item.props['mog_bullet_'+i+'_mog_bulletpoint']);
      }
    }
    return bullets;
  }


  render() {

    const articleProps = {
      featuredImage: this.imageURL(),
      bulletPoints: this.bulletPoints(),
      bylineName: item.props._embedded['wp:term'][5][0].name,
      bylineSlug: 'filter[byline]=' + item.props._embedded['wp:term'][5][0].slug + '&',
      articleDate: format(item.date, 'D MMMM YYYY'),
      articleTitle: item.props.title.rendered,
      articleContent: item.props.content.rendered,
      articleAuthor: item.props._embedded['author'][0].name,
      articleAuthorSlug: 'filter[author]=' + item._embedded['author'][0].id + '&',
      articleTopics: item.props._embedded['wp:term'][4]
    };

    return (
      <TouchableWithoutFeedback onPress={()=> Actions.singleArticle(articleProps)}>
        <View style={styles.container}>
          {(this.imageURL().length > 0) ?
            <Image
              source={{uri: item.props._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url}}
              style={styles.image}
            /> : null
          }

          <Text style={styles.byline}>{item.props._embedded['wp:term'][5][0].name.toUpperCase()}</Text>

          <HTMLView value={item.props.title.rendered} textComponentProps={{ style: styles.title}}/>

          <HTMLView value={item.props.excerpt.rendered} />

          <View style={styles.bottomContainer}>
            <Text style={styles.date}>{format(item.date, 'D MMMM YYYY')}</Text>
            <Icon
              name="bookmark-outline"
              type='material-community'
              color='#2196F3'
              onPress={()=>Actions.drawerOpen()}
              iconStyle={styles.icons}
            />
            <Icon
              name="share"
              type='evilIcons'
              color='#2196F3'
              onPress={()=>Actions.drawerOpen()}
              iconStyle={styles.icons}
            />
          </View>

        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    marginBottom: 20,
    elevation: 1
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 15
  },
  image: {
    height: 200,
    alignSelf: 'stretch',
    marginRight: -10,
    marginLeft: -10
  },
  title: {
    fontSize: 15,
    alignSelf: 'flex-start', 
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 0
  },
  byline: {
    fontSize: 10,
    flex: 1,
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 10
  },
  date: {
    flex: 1,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 12
  },
  icons: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'flex-end'
  }
});

module.exports = Card;