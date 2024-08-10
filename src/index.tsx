import React, {useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';

const App = () => {
  const {Screen, Navigator} = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Screen name="Home" component={Home} />
      </Navigator>
    </NavigationContainer>
  );
};

export default App;
