import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ITodo} from './todo';

export type RootStackParamList = {
  Home: undefined;
  CreateTask: undefined | {todo?: ITodo};
  TaskDetails: {id: number};
  NotFound: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
