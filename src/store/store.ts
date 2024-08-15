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
  completeTodo: (id: number | string) => void;
  undoComplete: (id: number | string) => void;
  updateTodo: (todo: ITodo) => void;
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
      completeTodo(id) {
        set(state => ({
          ...state,
          todos: state.todos.map(todo =>
            todo.id === id ? {...todo, completed: true} : todo,
          ),
        }));
      },
      undoComplete(id) {
        set(state => ({
          ...state,
          todos: state.todos.map(todo =>
            todo.id === id ? {...todo, completed: false} : todo,
          ),
        }));
      },
      updateTodo(todo) {
        set(state => ({
          ...state,
          todos: state.todos.map(t => (t.id === todo.id ? {...t, ...todo} : t)),
        }));
      },
    }),
    {
      name: 'todos-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useAppStore;
