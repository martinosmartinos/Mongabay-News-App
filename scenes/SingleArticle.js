import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import HTMLView from 'react-native-htmlview';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { observer, inject } from 'mobx-react/native';
import { Badge, Divider } from 'react-native-elements';
import SocialShare from '../components/socialshare';
import renderNode from '../helpers/functions';
import textStyle from '../helpers/styles';

@inject('StoreTags')
@observer
class SingleArticle extends Component {

  render() {
    Actions.refresh({title: this.props.articleTitle});
    return ( 
      <HeaderImageScrollView
        maxHeight={300}
        minHeight={0}
        maxOverlayOpacity={0.8}
        contentContainerStyle={textStyle().single}
        headerImage={{uri: this.props.featuredImage}}
      >
        <View style={textStyle().header}>
          <Text style={textStyle().title} >{this.props.articleTitle.replace(/&#8217;/g,"’").replace(/&#8216;/g,"‘").replace(/&#8220;/g,"“").replace(/&#8221;/g,"”")}</Text>
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
              <Text style={textStyle().date}>{this.props.articleDate}</Text>
            </View>
            <View style={textStyle().singlesubright}>
              <SocialShare excerpt={this.props.articleExcerpt} link={this.props.articleLink} title={this.props.articleTitle.replace(/&#8217;/g,"’").replace(/&#8216;/g,"‘").replace(/&#8220;/g,"“").replace(/&#8221;/g,"”")} />
            </View>
          </View>
        </View>
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
        </View>
        <HTMLView
          lineBreak=''
          paragraphBreak=''
          value={this.props.articleContent}
          renderNode={renderNode}
          textComponentProps={{ style: textStyle().body }}
        />
        <Divider style={{height: 1, width: 50, backgroundColor: '#000', marginTop: 20}}/>
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
        </View>

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
        </View>
      </HeaderImageScrollView>
    )
  }

}

export default SingleArticle;
