import { createContext, useContext } from 'react';
import { Todo } from './types';

interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  viewMode: 'list' | 'grid';
  setViewMode: (mode: 'list' | 'grid') => void;
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo | null) => void;
  currentPage: string;
  navigate: (page: string, todo?: Todo) => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};