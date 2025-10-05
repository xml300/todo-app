import React from 'react';
import { Todo } from '../types';
import { ArrowLeft, Tag, Calendar, AlignLeft } from 'lucide-react';

interface TodoDetailPageProps {
  todo: Todo;
  navigate: (page: string, todo?: Todo) => void;
}

const TodoDetailPage: React.FC<TodoDetailPageProps> = ({ todo, navigate }) => {
  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-lg space-y-6">
      <button
        onClick={() => navigate('home')}
        className="text-blue-600 hover:text-blue-800 flex items-center transition-colors duration-200 mb-6"
      >
        <ArrowLeft size={20} className="mr-2" /> Back to Todos
      </button>

      <h2 className="text-4xl font-extrabold text-gray-900 border-b-2 border-blue-200 pb-4 mb-6">{todo.title}</h2>

      <div className="space-y-5">
        <div className="flex items-center text-lg text-gray-700">
          <Tag size={20} className="mr-3 text-blue-500" />
          <strong className="text-gray-800">Status:</strong>{' '}
          <span
            className={`ml-3 px-3 py-1 rounded-full text-sm font-semibold ${
              todo.status === 'completed'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}
          </span>
        </div>

        {todo.description && (
          <div className="flex items-start text-lg text-gray-700">
            <AlignLeft size={20} className="mr-3 text-purple-500 mt-1" />
            <div>
              <strong className="text-gray-800">Description:</strong>
              <p className="mt-1 text-gray-800 leading-relaxed">{todo.description}</p>
            </div>
          </div>
        )}

        {todo.dueDate && (
          <div className="flex items-center text-lg text-gray-700">
            <Calendar size={20} className="mr-3 text-red-500" />
            <strong className="text-gray-800">Due Date:</strong>{' '}
            <span className="ml-3 text-gray-800">
              {new Date(todo.dueDate).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoDetailPage;
