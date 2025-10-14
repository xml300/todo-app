import React, { useState, ReactNode, useEffect } from 'react';
import { Todo } from './types';
import TodoList from './components/TodoList';
import TodoDetailPage from './pages/TodoDetailPage';
import NewTodoPage from './pages/NewTodoPage';
import { useTodoContext, TodoContext } from './TodoContext';


interface TodoProviderProps {
  children: ReactNode;
}

const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [currentPage, setCurrentPage] = useState<string>('home'); 

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, { ...todo, id: Date.now().toString() }]);
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const navigate = (page: string, todo?: Todo) => {
    setCurrentPage(page);
    setSelectedTodo(todo || null);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
        viewMode,
        setViewMode,
        selectedTodo,
        setSelectedTodo,
        currentPage,
        navigate,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

function App() {
  return (
    <TodoProvider>
      <AppContent />
    </TodoProvider>
  );
}

const AppContent: React.FC = () => {
  const { currentPage, selectedTodo, navigate } = useTodoContext();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-grow container mx-auto p-4 mt-4">
        {currentPage === 'home' && <TodoList navigate={navigate} />}
        {(currentPage === 'new' || currentPage === 'edit') && <NewTodoPage navigate={navigate} editingTodo={selectedTodo} />}
        {currentPage === 'detail' && selectedTodo && <TodoDetailPage todo={selectedTodo} navigate={navigate} />}
      </main>
    </div>
  );
};

export default App;
