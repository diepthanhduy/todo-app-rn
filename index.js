/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src';
import notifee, {EventType} from '@notifee/react-native';

notifee.onBackgroundEvent(async ({type, detail}) => {
  console.log('🚀 ~ file: index.js:11 ~ detail:', detail);
});

AppRegistry.registerComponent(appName, () => App);
