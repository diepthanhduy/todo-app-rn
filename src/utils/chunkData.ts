import {ITodo} from '../interfaces';
import {ISectionTodo} from '../interfaces/sectionTodo';

export const createSectionData = (todos: ITodo[]) => {
  const sectionData: ISectionTodo[] = [
    {title: 'Todo', data: []},
    {title: 'Completed', data: []},
  ];

  for (const todo of todos) {
    if (todo?.completed) {
      sectionData[1].data.push(todo);
    } else {
      sectionData[0].data.push(todo);
    }
  }

  return sectionData;
};
