import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import CreateTask from './screens/CreateTask';
import {RootStackParamList} from './interfaces/rootStack';
import notifee, {AndroidImportance} from '@notifee/react-native';
import Toast from 'react-native-toast-message';

const NavigatorContainer = () => {
  const {Screen, Navigator} = createNativeStackNavigator<RootStackParamList>();

  useEffect(() => {
    // Lắng nghe sự kiện foreground
    const unsubscribe = notifee.onForegroundEvent(({type, detail}) => {});

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    handleRegisterNoti();
  }, []);

  const handleRegisterNoti = async () => {
    console.log('===>>>> run app');
    const result = await notifee.requestPermission();
    console.log('🚀 ~ file: index.tsx:22 ~ result:', result);
    notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    notifee
      .getTriggerNotificationIds()
      .then(ids => console.log('All trigger notifications: ', ids));
  };

  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Screen name="Home" component={Home} />
        <Screen name="CreateTask" component={CreateTask} />
      </Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <>
      <NavigatorContainer />
      <Toast />
    </>
  );
};

export default App;
