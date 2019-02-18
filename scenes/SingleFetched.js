import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux';
import {ActivityIndicator, LayoutAnimation, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import appStyle from '../helpers/styles';
import {observable,runInAction,toJS} from 'mobx';
import {observer, inject} from 'mobx-react';
import format from 'date-fns/format';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import { Badge, Divider } from 'react-native-elements';
import SocialShare from '../components/socialShare';
import Donate from '../components/donate';
import renderNode from '../helpers/htmlrender';
import {introtrim, imageURL, bulletPoints, firstlettercap, htmlConvert} from '../helpers/functions';
import HTMLView from 'react-native-htmlview';
import Orientation from 'react-native-orientation-locker';

@inject('StoreSettings', 'StoreSingle', 'StoreTags')
@observer
class SingleFetched extends Component {

  @observable fcaption;

  componentDidMount() {
    Orientation.lockToPortrait();
  }

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
    const direction = (currentOffset > 0 && currentOffset > this._listViewOffset) ? 'down' : 'up'
    const isActionButtonVisible = direction === 'up'
    if (isActionButtonVisible !== this.state.isActionButtonVisible) {
      LayoutAnimation.configureNext(CustomLayoutLinear)
      this.setState({ isActionButtonVisible })
    }
    this._listViewOffset = currentOffset
  }

  loadFeatured = async(site, mediaID) => {
    try {
      const response = await fetch(`https://${site}/wp-json/wp/v2/media/${mediaID}`);
      const responseJson = await response.json();
      runInAction(() => {
        let caption = responseJson.caption.rendered;
        if(caption) {
          this.fcaption = caption;
        }
      })
    } catch(error) {
      console.error(error);
    }
  }

  render() {
    let fetcheditem = toJS(this.props.StoreSingle);
    let single = '';
    const sliderobj = [];
    if(fetcheditem.fetchtype == 'pages') {
      single = fetcheditem.itemsingle;
    }else if(fetcheditem.fetchtype == 'slug'){
      single = fetcheditem.itemsingle["0"];
      if(fetcheditem.loaded) {
        this.loadFeatured(this.props.StoreSettings.site, single.featured_media);
        sliderobj.push({caption: this.fcaption, source: {uri: imageURL(single)}});
      }
    }

    return (
      fetcheditem.loaded == false ? <View style={appStyle().loader}><ActivityIndicator size="large" /></View> :
      <View style={appStyle().singleArticle}>
        <HeaderImageScrollView
          maxHeight={(fetcheditem.fetchtype == 'pages') ? 0 : 300}
          minHeight={0}
          maxOverlayOpacity={0.8}
          contentContainerStyle={appStyle().single}
          headerImage={fetcheditem.fetchtype !== 'pages' && imageURL(single) !=0 ? {uri: imageURL(single)} : require('../src/mongabay_placeholder.png')}
          onScroll={this._onScroll}
          renderTouchableFixedForeground={() => (
            <View style={{ height: 300, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => {
                  Actions.galleryview({images: sliderobj})
                }}
                style={{height: 300, width: '100%'}}
              />
            </View>
          )}
        >
            {
              fetcheditem.fetchtype !== 'pages' ? 
                <View>
                  <View style={appStyle().header}>
                    <Text style={appStyle().titleSingle} >{htmlConvert(single.title.rendered)}</Text>
                    <View style={appStyle().singlesub}>
                      <View style={appStyle().singlesubleft}>
                        {
                          single._embedded["wp:term"][5]["0"].name ?
                            <Text
                              onPress={() => {
                                this.props.StoreTags.changeURL(this.props.StoreSettings.site, 'filter[byline]=' + single._embedded['wp:term'][5][0].slug + '&'),
                                Actions.tagsfeed({title: single._embedded['wp:term'][5][0].name.toUpperCase()})
                                }
                              }
                              style={appStyle().linkName}
                            >
                              {single._embedded["wp:term"][5]["0"].name.toUpperCase()}
                            </Text> : null
                        }
                        <Text style={appStyle().date}>{format(single.date, 'D MMMM YYYY')}</Text>
                      </View>
                      <View style={appStyle().singlesubright}>
                        <SocialShare
                          excerpt={introtrim(single.excerpt.rendered)}
                          link={single.link}
                          title={htmlConvert(single.title.rendered)}
                        />
                      </View>
                    </View>
                  </View>
                  {
                    bulletPoints(single).length > 0 ?
                      <View style={appStyle().bulletpoints}>
                        {
                          bulletPoints(single).map( (bullet, index) => {
                            return(
                              <View key={index} style={appStyle().bulletitem}>
                                <Text>{`\u2022 `}</Text><HTMLView value={bullet} textComponentProps={{ style: appStyle().singlebullet }}/>
                              </View>
                            )
                          })
                        }
                      </View> : null
                  }
                </View> : null
            }
                <HTMLView
                  value={single.content.rendered}
                  renderNode={renderNode}
                  stylesheet={StyleSheet.create(appStyle())}
                  textComponentProps={{ style: appStyle().body }}
                />
            {
                fetcheditem.fetchtype !== 'pages' ?
                  <View>
                    <Divider style={{height: 1, width: 50, backgroundColor: '#000', marginTop: 20}}/>
                    <View style={appStyle().authorbox}>
                      <Text
                        onPress={() => {
                          this.props.StoreTags.changeURL(this.props.StoreSettings.site, 'filter[author]=' + single._embedded['author'][0].id + '&'),
                          Actions.tagsfeed({title: single._embedded['author'][0].name.toUpperCase()})
                          }
                        }
                        style={appStyle().linkName}
                      >
                        {single._embedded['author'][0].name}
                      </Text>
                    </View>
                    <View style={appStyle().badgecontainer}>
                      {
                        single._embedded['wp:term'][4].map((item, index)=> {
                          return (
                            <Badge
                              key={index}
                              badgeStyle={appStyle().badge}
                              appStyle={appStyle().badgetext}
                              onPress={() => {
                                this.props.StoreTags.changeURL(this.props.StoreSettings.site, 'filter[topic]=' + item.slug + '&'),
                                Actions.tagsfeed({title: item.name})
                                }
                              }
                              value={firstlettercap(item.name)}
                            />
                          )
                        })
                      }
                    </View>
                  </View>  : null
            }
            {
              fetcheditem.fetchtype == 'pages' ?
                <View style={{height: 180}}></View> : null
            }
        </HeaderImageScrollView>
        {
          this.props.StoreSettings.donate == false && this.state.isActionButtonVisible && fetcheditem.fetchtype !== 'pages' ? <Donate /> : null
        }
      </View>
    )
  }
}

export default SingleFetched;