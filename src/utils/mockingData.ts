import {ITodo, ITodoType} from '../interfaces';

export const todos: ITodo[] = [
  {
    id: 1,
    title: 'Learn React',
    completed: true,
    time: new Date(),
  },
  {
    id: 2,
    title: 'Learn TypeScript',
    completed: true,
    time: new Date(),
  },
  {
    id: 3,
    title: 'Learn Redux',
    completed: false,
    time: new Date(),
  },
  {
    id: 4,
    title: 'Learn Next.js',
    completed: false,
    time: new Date(),
  },
];

export const todoTypes: ITodoType[] = [
  {
    id: 1,
    color: null,
    image: null,
    type: 'STUDY',
  },
  {
    id: 2,
    color: null,
    image: null,
    type: 'WORK',
  },
  {
    id: 3,
    color: null,
    image: null,
    type: 'FITNESS',
  },
];
