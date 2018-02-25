import React from 'react';
import { Dimensions, View, Text, TouchableWithoutFeedback, Image, WebView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import textStyle from '../helpers/styles';


const {height, width} = Dimensions.get('window');


export default function renderNode(node, index, siblings, parent, defaultRenderer) {

  if ((node.name == 'figure') && (node.children.length > 0)) {
    const fig = '';
    const caption = '';
    const children = node.children;
    const figwidth = Math.floor(width);
    const figheight = 300;

    children.map(x=> {
      const item = {};
      item[x.key] = x;

      if(item[x.key].name == 'a') {
        fig = item[x.key].children[0].attribs.src;
      }

      if(item[x.key].name == 'img') {
        fig = item[x.key].attribs.src;
        
      }

      if(item[x.key].name == 'figcaption') {
        caption = item[x.key].children[0].data;
      }
      
    });

    return (
      <View key={index} style={textStyle().featuredcont}>
        <Image key={index} style={textStyle().featuredimage} source={{uri: fig}}/>
        <Text style={textStyle().figcaption}>{caption.replace(/&#8217;/g,"’").replace(/&#8216;/g,"‘").replace(/&#8220;/g,"“").replace(/&#8221;/g,"”")}</Text>
      </View>
    );
  }
  
  if ((node.name == 'ul') && (/soliloquy-slider.*/.test(node.attribs.class))) {
    const li = node.children;
    const sliderobj = [];
    li.map(u=> {
      const listitem = {};
      listitem[u.key] = u;
      if(listitem[u.key].children) {
        listitem[u.key].children.map(i=> {
          const image = {};
          image[i.key] = i;
          if(image[i.key].name == "img") {
            let imgurl = '';
            if(!/.*holder\.gif/.test(image[i.key].attribs.src)) {
              imgurl = image[i.key].attribs.src;
            }else if(image[i.key].attribs["data-soliloquy-src"]){
              imgurl = image[i.key].attribs["data-soliloquy-src"];
            }
            const imgcap = image[i.key].attribs.alt;
            sliderobj.push({caption: imgcap, source: {uri: imgurl}});
          }
        })  
      }
    })
    return (
      <TouchableWithoutFeedback onPress={()=>Actions.galleryView({ images: sliderobj})}>
        <View key={index} style={{marginLeft: -20, marginRight: 0, marginTop: 20, marginBottom: 20}}>
          <Image style={textStyle().featuredimage} source={{uri: sliderobj["0"].source.uri}}/>
          <Text style={textStyle().figcaption}>{sliderobj["0"].caption}</Text>
          <View style={{flex: 1, position: 'absolute', top: 10, alignSelf: 'flex-end'}}>
            <Icon name='filter' size={40} color='#FFF' style={{textAlign: 'right'}}/>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  if ((node.name == 'strong')) {
    return(
      <Text style={textStyle().title}>{node.children["0"].data}</Text>
    );
  }


  if (node.name == 'div' && node.attribs["data-image-src"]) {
    const prlxurl = node.attribs["data-image-src"];
    let cap = '';
    const prlxchildren = node.children;

    prlxchildren.map(a=> {
      const prlx = {};
      prlx[a.key] = a;
      prlxurl = prlx[a.key].parent.attribs["data-image-src"];

      if((prlx[a.key].name == 'div') && (prlx[a.key].children["0"].name == 'span')) {
        cap = prlx[a.key].children["0"].children["0"].data;
      }
    })

    return (
      <View key={index} style={textStyle().featuredcont}>
        <Image style={textStyle().featuredimage} source={{uri: prlxurl}}/>
        <Text style={textStyle().figcaption}>{cap.replace(/&#8217;/g,"’").replace(/&#8216;/g,"‘").replace(/&#8220;/g,"“").replace(/&#8221;/g,"”")}</Text>
      </View>
    );
  }

  if (node.name == 'iframe') {
      const ifrm = node.attribs;
      let frameheight = '';
      const screenwidth = Math.floor(width);
      const source = ifrm.src;
      if(source.startsWith('//html5')) {
        source = 'https:' + source;
        frameheight = 90;
      }else{
        frameheight = 300;
      }
      const iframeHtml = `<iframe src="${source}" width="${screenwidth + 40}" height="${frameheight}" frameborder="0"></iframe>`;
      return (
        <View key={index} style={{width: screenwidth + 40, height: frameheight, marginLeft: -40, marginRight: -40}}>
          <WebView source={{html: iframeHtml}} scalesPageToFit={false} style={{width: screenwidth + 40, height: frameheight}}/>
        </View>

      );
  }
  
}