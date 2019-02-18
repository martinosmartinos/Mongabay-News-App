import React from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import { action, computed, observable } from 'mobx';
import { Actions } from 'react-native-router-flux';
import HTMLView from 'react-native-htmlview';
import format from 'date-fns/format';
import en from 'date-fns/locale/en';
import es from 'date-fns/locale/es';
import id from 'date-fns/locale/id';
import SocialShare from './socialShare';
import OfflineBookmark from './offlineBookmark';
import appStyle from '../helpers/styles';
import { introtrim, imageURL, bulletPoints } from '../helpers/functions';
import ProgressiveImage from 'react-native-progressive-image';


@inject('StoreSettings')
@observer

class Card extends React.Component {

  @observable site = this.props.StoreSettings.site;
  @observable langcode;
  @observable bylinePos = this.props.StoreSettings.bylineRepos;
  @observable topicPos  = this.props.StoreSettings.topicRepos;

  getLocale = () => {
    let langCode = {};
    const siteActive = this.props.StoreSettings.site;
    switch (siteActive) {
      case 'news.mongabay.com':
        langCode = { locale: en };
        break;
      case 'india.mongabay.com':
        langCode = { locale: en };
        break;
      case 'es.mongabay.com':
        langCode = { locale: es };
        break;
      case 'www.mongabay.co.id':
        langCode = { locale: id };
        break;
    }
    return langCode;
  };

  render() {
    let item = this.props.item;
    let bylineRepos = this.bylinePos;
    let topicRepos = this.topicPos;
    let itemByline = item?._embedded['wp:term'][bylineRepos][0]?.name;

    let articleProps = {
        featuredImage: imageURL(item),
        featuredID: item.featured_media,
        bulletPoints: bulletPoints(item),
        bylineName: itemByline ? itemByline : '',
        bylineSlug: itemByline ? ('filter[byline]=' + item._embedded['wp:term'][bylineRepos][0].slug + '&') : '',
        articleID: item.id,
        articleDate: format(item.date, 'D MMMM YYYY', this.getLocale()),
        articleTitle: item.title.rendered,
        articleLink: item.link,
        articleContent: item.content.rendered,
        articleExcerpt: item.excerpt.rendered,
        articleAuthor: item._embedded['author'][0].name,
        articleAuthorSlug: 'filter[author]=' + item._embedded['author'][0].id + '&',
        articleTopics: item._embedded['wp:term'][topicRepos]
    };

    return (
      !articleProps.articleContent.startsWith('<div><h2>This content is for Monthly') ?
        <TouchableWithoutFeedback onPress={() => Actions.singlearticle(articleProps)}>
          <View style={appStyle().cardContainer}>
            {
              (articleProps.featuredImage && articleProps.featuredImage.length > 0) ?
              <ProgressiveImage
                imageFadeDuration={1000}
                thumbnailSource={{ uri: item._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url }}
                imageSource={{ uri: imageURL(item) }}
                style={appStyle().image}
              /> : <Image source={require('../src/mongabay_placeholder.png')} style={appStyle().image} />
            }
            {itemByline ? <Text style={appStyle().byline}>{articleProps.bylineName.toUpperCase()}</Text> : null}
            <HTMLView
              value={item.title.rendered}
              textComponentProps={{ style: appStyle().title }}
            />
            <HTMLView
              value={introtrim(item.excerpt.rendered)}
              textComponentProps={{ style: appStyle().body }}
            />
            <View style={appStyle().bottomContainer}>
              <Text style={appStyle().date}>{format(item.date, 'D MMMM YYYY', this.getLocale())}</Text>
              <OfflineBookmark
                itemID={articleProps.articleID}
                title={item.title.rendered.replace(/&#8217;/g, "’").replace(/&#8216;/g, "‘").replace(/&#8220;/g, "“").replace(/&#8221;/g, "”")}
                byline={articleProps.bylineName}
                date={articleProps.articleDate}
                bullets={articleProps.bulletPoints}
                content={articleProps.articleContent}
                author={articleProps.articleAuthor}
              />
              <SocialShare
                excerpt={introtrim(item.excerpt.rendered)}
                link={item.link}
                title={item.title.rendered.replace(/&#8217;/g, "’").replace(/&#8216;/g, "‘").replace(/&#8220;/g, "“").replace(/&#8221;/g, "”")}
              />
            </View>
          </View>
        </TouchableWithoutFeedback> : null
    );
  }
}

module.exports = Card;