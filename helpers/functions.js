import React from 'react';
import { Dimensions } from 'react-native';
import StoreSettings from '../store/StoreSettings';

const {height, width} = Dimensions.get('window');

export default function textStyle(){
    return {
      single: {
        padding: 20,
        backgroundColor: '#FFF'
      },
      header: {
        paddingBottom: 20,
        marginBottom: 20,
        borderBottomWidth: 3,
        borderColor: '#EEE'
      },
      title: {
        fontSize: StoreSettings.mainfontsize,
        alignSelf: 'flex-start', 
        fontWeight: 'bold',
        marginBottom: StoreSettings.mainfontsize,
        marginLeft: 0,
      },
      byline: {
        fontSize: StoreSettings.mainfontsize/1.5,
        flex: 1,
        alignSelf: 'flex-start',
        marginTop: StoreSettings.mainfontsize/1.5,
        marginBottom: StoreSettings.mainfontsize/1.5
      },
      date: {
        flex: 1,
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        fontSize: StoreSettings.mainfontsize - 3
      },
      singlesub: {
        flexDirection: 'row'
      },
      singlesubleft: {
        flex: 1,
        alignSelf: 'flex-start'
      },
      singlesubright: {
        flex: 1,
        alignSelf: 'flex-end'
      },
      body: {
        fontSize: StoreSettings.mainfontsize,
        lineHeight: StoreSettings.mainfontsize * 1.5
      },
      link: {
        fontWeight: '300',
        color: '#45aae8',
        fontSize: StoreSettings.mainfontsize
      },
      strong: {
        fontWeight: 'bold',
        fontSize: StoreSettings.mainfontsize
      },
      authorbox: {
        paddingTop: 20,
        paddingBottom: 20
      },
      badge: {
        backgroundColor: '#45aae8',
        marginTop: 3,
        marginBottom: 3,
        marginRight: 3
      },
      badgetext: {
        fontSize: StoreSettings.mainfontsize
      },
      badgecontainer: {
        flex: 1,
        flexWrap: 'wrap', 
        flexDirection: 'row',
        alignItems: 'flex-start'
      },
      bulletpoints: {
        paddingBottom: 20,
        marginBottom: 20,
        borderBottomWidth: 3,
        borderColor: '#EEE'
      },
      bulletitem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 5,
        marginBottom: 5
      },
      bullet: {
        fontSize: StoreSettings.mainfontsize - 10,
        fontWeight: 'bold' 
      },
      heading: {
        fontSize: StoreSettings.mainfontsize + 1,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 0
      },
      h1: {
        fontSize: StoreSettings.mainfontsize + 1,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 0
      },
      h2: {
        fontSize: StoreSettings.mainfontsize + 1,
        color: '#000',
        fontWeight: 'bold'
      },
      h3: {
        fontSize: StoreSettings.mainfontsize + 1,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 0
      },
      featuredcont: {
        width: width + 40,
        minHeight: 300,
        padding: 0,
        marginLeft: -20,
        marginRight: 0,
        marginTop: 20,
        marginBottom: 20
      },
      featuredimage: {
        width: width + 40,
        minHeight: 300,
        padding: 0
      },
      embedmedia: {
        marginLeft: -40,
        marginRight: -40,
        padding: 0
      },
      singleimage: {
        width: null,
        height: 300,
        margin: 0
      },
      figcaption: {
        fontSize: StoreSettings.mainfontsize - 4,
        fontStyle: 'italic',
        display: 'flex',
        width: width - 10,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: StoreSettings.mainfontsize - 4
      },
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
      icons: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'flex-end'
      },
      loader: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
      }
    }
}
