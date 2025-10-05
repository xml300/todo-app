import React, { useState, useEffect } from 'react';
import { useTodoContext } from '../App';
import { Todo } from '../types';
import { ArrowLeft } from 'lucide-react';

interface NewTodoPageProps {
  navigate: (page: string, todo?: Todo) => void;
  editingTodo?: Todo | null;
}

const NewTodoPage: React.FC<NewTodoPageProps> = ({ navigate, editingTodo }) => {
  const { addTodo, updateTodo } = useTodoContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState<'pending' | 'completed'>('pending');

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
      setDueDate(editingTodo.dueDate || '');
      setStatus(editingTodo.status);
    }
  }, [editingTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Todo title cannot be empty.');
      return;
    }

    const newOrUpdatedTodo: Todo = {
      id: editingTodo ? editingTodo.id : Date.now().toString(),
      title,
      description,
      completed: status === 'completed',
      dueDate: dueDate || undefined,
      status,
    };

    if (editingTodo) {
      updateTodo(newOrUpdatedTodo);
    } else {
      addTodo(newOrUpdatedTodo);
    }
    navigate('home');
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
        <button
          onClick={() => navigate('home')}
          className="mb-4 text-blue-600 hover:text-blue-800 flex items-center transition-colors duration-200"
        >
          <ArrowLeft size={20} className="mr-2" /> Back to Todos
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{editingTodo ? 'Edit Todo' : 'Create New Todo'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
              Due Date (Optional)
            </label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as 'pending' | 'completed')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {editingTodo ? 'Update Todo' : 'Add Todo'}
          </button>
      </form>
    </div>
  );
};

export default NewTodoPage;
