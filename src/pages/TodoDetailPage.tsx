import React from 'react';
import { Todo } from '../types';
import { ArrowLeft, Tag, Calendar, Edit, Trash2, CheckSquare, Square } from 'lucide-react';
import { useTodoContext } from '../TodoContext';

interface TodoDetailPageProps {
  todo: Todo;
  navigate: (page: string, todo?: Todo) => void;
}

const TodoDetailPage: React.FC<TodoDetailPageProps> = ({ todo, navigate }) => {
  const { updateTodo, deleteTodo } = useTodoContext();

  const handleToggle = () => {
    updateTodo({ ...todo, completed: !todo.completed, status: todo.completed ? 'pending' : 'completed' });
  };

  const handleEdit = () => {
    navigate('new', todo);
  };

  const handleDelete = () => {
    if (confirm('Delete this todo? This action cannot be undone.')) {
      deleteTodo(todo.id);
      navigate('home');
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
        <div>
          <button
            onClick={() => navigate('home')}
            className="text-blue-600 hover:text-blue-800 flex items-center transition-colors duration-200 mb-3 sm:mb-0"
          >
            <ArrowLeft size={18} className="mr-2" /> Back
          </button>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">{todo.title}</h2>
          <div className="mt-2 text-sm text-gray-600">
            <span className="inline-flex items-center mr-3">
              <Tag size={16} className="mr-2 text-blue-500" />
              <span className="font-medium">{todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}</span>
            </span>
            {todo.dueDate && (
              <span className="inline-flex items-center">
                <Calendar size={16} className="mr-2 text-red-500" />
                <span>{new Date(todo.dueDate).toLocaleDateString()}</span>
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-3 mt-3 sm:mt-0">
          <button
            onClick={handleToggle}
            className="inline-flex items-center px-3 py-2 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50"
            title={todo.completed ? 'Mark as pending' : 'Mark as completed'}
          >
            {todo.completed ? <CheckSquare size={18} className="text-green-500 mr-2" /> : <Square size={18} className="text-gray-500 mr-2" />}
            <span className="text-sm">{todo.completed ? 'Completed' : 'Mark done'}</span>
          </button>

          <button
            onClick={handleEdit}
            className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
            title="Edit todo"
          >
            <Edit size={16} className="mr-2" />
            <span className="text-sm">Edit</span>
          </button>

          <button
            onClick={handleDelete}
            className="inline-flex items-center px-3 py-2 bg-red-50 text-red-600 border border-red-100 rounded-md hover:bg-red-100"
            title="Delete todo"
          >
            <Trash2 size={16} className="mr-2" />
            <span className="text-sm">Delete</span>
          </button>
        </div>
      </div>

      <div className="prose prose-sm sm:prose lg:prose-lg">
        {todo.description ? (
          <>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-800 leading-relaxed">{todo.description}</p>
          </>
        ) : (
          <p className="text-gray-500">No description provided.</p>
        )}
      </div>
    </div>
  );
};

export default TodoDetailPage;
