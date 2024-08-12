import {create} from 'zustand';
import {ITodo, ITodoType} from '../interfaces';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      todoTypes: [],
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
