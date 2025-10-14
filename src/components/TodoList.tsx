import React from 'react';
import { useTodoContext } from '../TodoContext';
import TodoCard from './TodoCard';
import { List, Grid, Plus, Square, CheckSquare, Edit, Trash2 } from 'lucide-react';
import { Todo } from '../types';

interface TodoListProps {
  navigate: (page: string, todo?: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({ navigate }) => {
  const { todos, viewMode, setViewMode, updateTodo, deleteTodo } = useTodoContext();

  const handleToggleComplete = (id: string) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (todoToUpdate) {
      updateTodo({ ...todoToUpdate, completed: !todoToUpdate.completed, status: todoToUpdate.completed ? 'pending' : 'completed' });
    }
  };

  const handleViewDetails = (todo: Todo) => {
    navigate('detail', todo);
  };

  const handleEdit = (id: string) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      navigate('new', todoToEdit); 
    }
  };

  const handleDelete = (id: string) => {
    deleteTodo(id);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">My Todos</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'}`}
          >
            <List size={20} />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'}`}
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => navigate('new')}
            className="bg-blue-500 text-white p-2 rounded-md shadow-lg hover:bg-blue-600 transition-colors"
            title="Add New Todo"
          >
            <Plus size={24} />
          </button>
        </div>
      </div>

      {todos.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-md">
          <Plus size={48} className="text-gray-400 mb-4" />
          <p className="text-xl text-gray-600 mb-2">No todos yet!</p>
          <p className="text-gray-500">Click the '+' button to get started.</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'overflow-x-auto'}>
          {viewMode === 'grid' ? (
            todos.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onToggleComplete={handleToggleComplete}
                onViewDetails={handleViewDetails}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <>
              <div className="space-y-3 md:hidden">
                {todos.map((todo) => (
                  <TodoCard
                    key={todo.id}
                    todo={todo}
                    onToggleComplete={handleToggleComplete}
                    onViewDetails={handleViewDetails}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
              <div className="hidden md:block">
              <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Title</th>
                  <th className="py-3 px-6 text-left">Due Date</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {todos.map((todo) => (
                  <tr key={todo.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {todo.completed ? (
                        <CheckSquare
                          className="text-green-500 cursor-pointer"
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            handleToggleComplete(todo.id);
                          }}
                        />
                      ) : (
                        <Square
                          className="text-gray-400 cursor-pointer"
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            handleToggleComplete(todo.id);
                          }}
                        />
                      )}
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span
                        className={`font-medium cursor-pointer block max-w-xs truncate ${todo.completed ? 'line-through text-gray-500' : ''}`}
                        onClick={() => handleViewDetails(todo)}
                      >
                        {todo.title}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center space-x-2">
                        <Edit
                          className="text-blue-500 hover:text-blue-600 cursor-pointer"
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            handleEdit(todo.id);
                          }}
                        />
                        <Trash2
                          className="text-red-500 hover:text-red-600 cursor-pointer"
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            handleDelete(todo.id);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TodoList;
