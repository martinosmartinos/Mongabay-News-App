import React, { Component } from 'react';
import { LayoutAnimation, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import appStyle from '../helpers/styles';
import { Actions } from 'react-native-router-flux';
import HTMLView from 'react-native-htmlview';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import { observer, inject } from 'mobx-react';
import { observable, runInAction } from 'mobx';
import { Badge, Divider } from 'react-native-elements';
import SocialShare from '../components/socialShare';
import Donate from '../components/donate';
import renderNode from '../helpers/htmlrender';
import { introtrim, firstlettercap, htmlConvert } from '../helpers/functions';

@inject('StoreSettings', 'StoreSingle', 'StoreTags')
@observer
class SingleArticle extends Component {

  @observable fcaption;

  state = {
    isActionButtonVisible: true
  }
  
  _listViewOffset = 0

  _onScroll = (event) => {
    const CustomLayoutLinear = {
      duration: 100,
      create: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
      update: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
      delete: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity }
    }

    const currentOffset = event.nativeEvent.contentOffset.y
    const direction = (currentOffset > 0 && currentOffset > this._listViewOffset)
      ? 'down'
      : 'up'
    const isActionButtonVisible = direction === 'up'
    if (isActionButtonVisible !== this.state.isActionButtonVisible) {
      LayoutAnimation.configureNext(CustomLayoutLinear)
      this.setState({ isActionButtonVisible })
    }
    this._listViewOffset = currentOffset
  }

  fetchFeatured = async (site, ID) => {
    let caption = '';
    try {
      const response = await fetch(`https://${site}/wp-json/wp/v2/media/${ID}`);
      const responseJson = await response.json();
      runInAction(() => {
        caption = responseJson.caption.rendered;
        if (caption) {
          this.fcaption = caption;
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    this.fetchFeatured(this.props.StoreSettings.site, this.props.featuredID);
    const sliderobj = [];
    sliderobj.push({ caption: this.fcaption, source: { uri: this.props.featuredImage } });
    return (
      <View style={appStyle().singleArticle}>
        <HeaderImageScrollView
          maxHeight={300}
          minHeight={0}
          maxOverlayOpacity={0.8}
          contentContainerStyle={appStyle().single}
          headerImage={this.props.featuredImage != 0 ? { uri: this.props.featuredImage } : require('../src/mongabay_placeholder.png')}
          onScroll={this._onScroll}
          renderTouchableFixedForeground={() => (
            <View style={{ height: 300, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => Actions.galleryview({ images: sliderobj })}
                style={{ height: 300, width: '100%' }}
              />
            </View>
          )}
        >
          <View style={appStyle().header}>
            <Text style={appStyle().titleSingle} >{htmlConvert(this.props.articleTitle)}</Text>
            <View style={appStyle().singlesub}>
              <View style={appStyle().singlesubleft}>
                {
                  this.props.bylineName ?
                    <Text
                      onPress={() => {
                        this.props.StoreTags.changeURL(this.props.StoreSettings.site, this.props.bylineSlug),
                          Actions.tagsfeed({ title: this.props.bylineName.toUpperCase() })
                      }
                      }
                      style={appStyle().linkName}
                    >
                      {this.props.bylineName.toUpperCase()}
                    </Text> : null
                }
                <Text style={appStyle().date}>{this.props.articleDate}</Text>
              </View>
              <View style={appStyle().singlesubright}>
                <SocialShare
                  excerpt={introtrim(this.props.articleExcerpt)}
                  link={this.props.articleLink}
                  title={htmlConvert(this.props.articleTitle)}
                />
              </View>
            </View>
          </View>
          {this.props.bulletPoints.length > 0 ?
            <View style={appStyle().bulletpoints}>
              {
                this.props.bulletPoints.map((bullet, index) => {
                  return (
                    <View key={index} style={appStyle().bulletitem}>
                      <Text>{`\u2022 `}</Text><HTMLView value={bullet} textComponentProps={{ style: appStyle().singlebullet }} />
                    </View>
                  )
                })
              }
            </View> : null
          }
          <HTMLView
            value={this.props.articleContent}
            renderNode={renderNode}
            stylesheet={StyleSheet.create(appStyle())}
            textComponentProps={{ style: appStyle().body }}
          />
          <Divider style={{ height: 1, width: 50, backgroundColor: '#000', marginTop: 20 }} />
          <View style={appStyle().authorbox}>
            <Text
              onPress={() => {
                this.props.StoreTags.changeURL(this.props.StoreSettings.site, this.props.articleAuthorSlug),
                  Actions.tagsfeed({ title: this.props.articleAuthor.toUpperCase() })
              }}
              style={appStyle().linkName}
            >
              {this.props.articleAuthor}
            </Text>
          </View>

          <View style={appStyle().badgecontainer}>
            {
              this.props.articleTopics.map((item, index) => {
                return (
                  <Badge
                    key={index}
                    badgeStyle={appStyle().badge}
                    appStyle={appStyle().badgetext}
                    onPress={() => {
                      this.props.StoreTags.changeURL(this.props.StoreSettings.site, 'filter[topic]=' + item.slug + '&'),
                        Actions.tagsfeed({ title: item.name })
                    }}
                    value={firstlettercap(item.name)}
                  />
                )
              })
            }
          </View>

        </HeaderImageScrollView>
        {!this.props.StoreSettings.donate && this.state.isActionButtonVisible ? <Donate /> : null}
      </View>
    )
  }

}

export default SingleArticle;