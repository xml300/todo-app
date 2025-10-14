import React, { useState, useEffect } from 'react';
import { useTodoContext } from '../TodoContext';
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
  const [errors, setErrors] = useState<{ title?: string }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
      setDueDate(editingTodo.dueDate || '');
      setStatus(editingTodo.status);
    }
  }, [editingTodo]);

  const validate = () => {
    const next: { title?: string } = {};
    if (!title.trim()) next.title = 'Title is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!validate()) return;

    setLoading(true);
    try {
      const newOrUpdatedTodo: Todo = {
        id: editingTodo ? editingTodo.id : Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        completed: status === 'completed',
        dueDate: dueDate || undefined,
        status,
      };

      await new Promise((r) => setTimeout(r, 300));

      if (editingTodo) {
        updateTodo(newOrUpdatedTodo);
      } else {
        addTodo(newOrUpdatedTodo);
      }
      navigate('home');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md pb-24 md:pb-0">
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
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
              }}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              aria-invalid={errors.title ? 'true' : 'false'}
              aria-describedby={errors.title ? 'title-error' : undefined}
              disabled={loading}
            />
            {errors.title && <p id="title-error" className="text-sm text-red-600 mt-1">{errors.title}</p>}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="md:static fixed bottom-4 left-4 right-4 z-50 md:relative md:bottom-auto md:left-auto md:right-auto md:z-auto">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center space-x-2"
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            ) : null}
            <span>{editingTodo ? 'Update Todo' : 'Add Todo'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewTodoPage;
