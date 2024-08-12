import React, {useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import CreateTask from './screens/CreateTask';
import {RootStackParamList} from './interfaces/rootStack';

const App = () => {
  const {Screen, Navigator} = createNativeStackNavigator<RootStackParamList>();

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

export default App;
