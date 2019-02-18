//import applyDecoratedDescriptor from '@babel/runtime/helpers/esm/applyDecoratedDescriptor'
//import initializerDefineProperty from '@babel/runtime/helpers/esm/initializerDefineProperty'

import { AppRegistry } from 'react-native';

//Object.assign(babelHelpers, { applyDecoratedDescriptor, initializerDefineProperty })

//import App from './App';

const App = require('./App').default

AppRegistry.registerComponent('mongabay', () => App);