import React, { Component } from 'react';
import { toJS } from 'mobx';
import { ActivityIndicator, Button, Dimensions, View, Text, Image, WebView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import format from 'date-fns/format';
import HTMLView from 'react-native-htmlview';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { observer, inject } from 'mobx-react/native';
import { Badge, Divider } from 'react-native-elements';
import SocialShare from '../components/socialshare';
import renderNode from '../helpers/functions';
import textStyle from '../helpers/styles';

const {height, width} = Dimensions.get('window');

@inject('StoreSingle')
@observer
class SingleFetched extends Component {

  render() {
    const fetcheditem = toJS(this.props.StoreSingle);
    return (
      <HeaderImageScrollView
        maxHeight={(fetcheditem.fetchtype == 'pages') ? 0 : 300}
        minHeight={0}
        maxOverlayOpacity={0.8}
        contentContainerStyle={textStyle().single}
        headerImage={{uri: this.props.featuredImage}}
      >
        {(fetcheditem.loaded) ?
        <View>
          {(fetcheditem.fetchtype !== 'pages') ? 
            <View style={textStyle().header}>
              <Text style={textStyle().title} >{fetcheditem.itemsingle.title.rendered.replace(/&#8217;/g,"’").replace(/&#8216;/g,"‘").replace(/&#8220;/g,"“").replace(/&#8221;/g,"”")}</Text>
              <View style={textStyle().singlesub}>
                <View style={textStyle().singlesubleft}>
                  <Text
                    onPress={() => {
                      this.props.StoreTags.changeURL(this.props.bylineSlug);
                      Actions.TagsFeed();
                      Actions.refresh({title: this.props.bylineName.toUpperCase()});
                      }
                    }
                    style={textStyle().link}
                  >
                    {this.props.bylineName.toUpperCase()}
                  </Text>
                  <Text style={textStyle().date}>{format(fetcheditem.itemsingle.date, 'D MMMM YYYY')}</Text>
                </View>
                <View style={textStyle().singlesubright}>
                  <SocialShare excerpt={fetcheditem.itemsingle.excerpt} link={this.props.articleLink} title={fetcheditem.itemsingle.title.rendered.replace(/&#8217;/g,"’").replace(/&#8216;/g,"‘").replace(/&#8220;/g,"“").replace(/&#8221;/g,"”")} />
                </View>
              </View>
            </View> : <View style={textStyle().header}><Text style={textStyle().title} >{fetcheditem.itemsingle.title.rendered.replace(/&#8217;/g,"’").replace(/&#8216;/g,"‘").replace(/&#8220;/g,"“").replace(/&#8221;/g,"”")}</Text></View>
          }

          {(fetcheditem.fetchtype !== 'pages') ?
            <View style={textStyle().bulletpoints}>
              {
                this.props.bulletPoints.map( (bullet, index) => {
                  return(
                    <View key={index} style={textStyle().bulletitem}>
                      <Text>{`\u2022 `}</Text><HTMLView value={bullet} textComponentProps={{ style: textStyle().body }}/>
                    </View>
                  )
                })
              }
            </View> : null
          }

          <HTMLView
            addLineBreaks= {false}
            value={fetcheditem.itemsingle.content.rendered}
            renderNode={renderNode}
            textComponentProps={{ style: textStyle().body }}
          />

          {(fetcheditem.fetchtype !== 'pages') ? <Divider style={{height: 2, width: 50, backgroundColor: '#000'}}/> : null}

          {(fetcheditem.fetchtype !== 'pages') ? 
            <View style={textStyle().authorbox}>
              <Text
                onPress={() => {
                  this.props.StoreTags.changeURL(this.props.articleAuthorSlug);
                  Actions.TagsFeed();
                  Actions.refresh({title: this.props.articleAuthor.toUpperCase()});
                  }
                }
                style={textStyle().link}
              >
                {this.props.articleAuthor}
              </Text>
            </View> : null
          }

          {(fetcheditem.fetchtype !== 'pages') ? 
            <View style={textStyle().badgecontainer}>
              {
                this.props.articleTopics.map((item, index)=> {

                  return (
                    <Badge
                      key={index}
                      containerStyle={textStyle().badge}
                      textStyle={textStyle().badgetext}
                      onPress={() => {
                        this.props.StoreTags.changeURL('filter[topic]=' + item.slug + '&');
                        Actions.TagsFeed();
                        Actions.refresh({title: item.name.toUpperCase()});
                        }
                      }
                      value={item.name}
                    />
                  )

                }
                )
              }
            </View> : null
          }
        </View> : <View style={textStyle().loader}><ActivityIndicator size="large" /></View>
        }
      </HeaderImageScrollView>
    )
  }

}

export default SingleFetched;