import React from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import { Actions } from 'react-native-router-flux';
import HTMLView from 'react-native-htmlview';
import format from 'date-fns/format';
import SocialShare from './socialshare';
import SettingsMain from '../scenes/SettingsMain';
import textStyle from '../helpers/styles';


@inject('StoreSettings')
@observer
class Card extends React.Component {

  imageURL=(item) => {
    let image = '';
    let size = '';
    if((this.props.item._embedded['wp:featuredmedia'][0].code!=="rest_forbidden") && (this.props.item._embedded['wp:featuredmedia'][0].media_details.sizes.medium !== undefined)) {
      this.image = this.props.item._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
      this.size = 'medium'
    }else if((this.props.item._embedded['wp:featuredmedia'][0].code!=="rest_forbidden") && (this.props.item._embedded['wp:featuredmedia'][0].media_details.sizes.full !== undefined)){
      this.image = this.props.item._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url;
      this.size = 'full'
    }else{
      this.image = 0;
    }

    if ((this.props.item._embedded.hasOwnProperty(['wp:featuredmedia'])) && (this.props.item._embedded['wp:featuredmedia'][0].code!=="rest_forbidden") && (this.image)) {
      image_url = this.image;
    } else {
      image_url = 0;
    }
    return image_url;
  }

  bulletPoints=(item) => {
    let bullets = [];
    for (i = 0; i <= 3; i++) {
      const singlebullet = this.props.item['mog_bullet_'+i+'_mog_bulletpoint'];
      if(singlebullet.length > 0 ){
        bullets.push(this.props.item['mog_bullet_'+i+'_mog_bulletpoint']);
      }
    }
    return bullets;
  }



  render() {
    const articleProps = {
      featuredImage: this.imageURL(),
      bulletPoints: this.bulletPoints(),
      bylineName: this.props.item._embedded['wp:term'][5][0].name,
      bylineSlug: 'filter[byline]=' + this.props.item._embedded['wp:term'][5][0].slug + '&',
      articleDate: format(this.props.item.date, 'D MMMM YYYY'),
      articleTitle: this.props.item.title.rendered,
      articleLink: this.props.item.link,
      articleContent: this.props.item.content.rendered,
      articleExcerpt: this.props.item.excerpt.rendered,
      articleAuthor: this.props.item._embedded['author'][0].name,
      articleAuthorSlug: 'filter[author]=' + this.props.item._embedded['author'][0].id + '&',
      articleTopics: this.props.item._embedded['wp:term'][4]
    };

    return (
      <TouchableWithoutFeedback onPress={()=> Actions.singleArticle(articleProps)}>
        <View style={textStyle().container}>
          {(this.imageURL().length > 0) ?
            <Image
              source={{uri: this.imageURL()}}
              style={textStyle().image}
            /> : null
          }

          <Text style={textStyle().byline}>{this.props.item._embedded['wp:term'][5][0].name.toUpperCase()}</Text>

          <HTMLView value={this.props.item.title.rendered} textComponentProps={{ style: textStyle().title }}/>

          <HTMLView value={this.props.item.excerpt.rendered} textComponentProps={{ style: textStyle().body }}/>

          <View style={textStyle().bottomContainer}>
            <Text style={textStyle().date}>{format(this.props.item.date, 'D MMMM YYYY')}</Text>
            <SocialShare
              excerpt={this.props.item.excerpt.rendered}
              link={this.props.item.link}
              title={this.props.item.title.rendered}
            />
          </View>

        </View>
      </TouchableWithoutFeedback>
    );
  }
}

module.exports = Card;
