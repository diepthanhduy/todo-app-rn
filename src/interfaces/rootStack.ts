import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  CreateTask: undefined;
  TaskDetails: {id: number};
  NotFound: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
