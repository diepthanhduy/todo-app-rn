import {create} from 'zustand';
import {ITodo, ITodoType} from '../interfaces';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Images} from '../assets';

type State = {
  todos: ITodo[];
  todoTypes: ITodoType[];
};

type Actions = {
  cacheTodos: (todos: ITodo[]) => void;
  cacheTodoTypes: (todoTypes: ITodoType[]) => void;
  addTodo: (todo: ITodo) => void;
};

const useAppStore = create<State & Actions>()(
  persist(
    set => ({
      todos: [],
      todoTypes: [
        {
          id: 0,
          type: 'Study',
          image: 'fileList',
          color: '#d5c2ec',
        },
        {
          id: 1,
          type: 'Work',
          image: 'cup',
          color: '#FEF5D3',
        },
        {
          id: 2,
          type: 'Fitness',
          image: 'schedule',
          color: '#E7E2F3',
        },
      ],
      cacheTodos(todos) {
        set({todos});
      },
      cacheTodoTypes(todoTypes) {
        set({todoTypes});
      },
      addTodo(todo) {
        set(state => ({...state, todos: [...state.todos, todo]}));
      },
    }),
    {
      name: 'todos-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useAppStore;
