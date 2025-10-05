import React from 'react';
import { Todo } from '../types';
import { Square, CheckSquare, Edit, Trash2 } from 'lucide-react';

interface TodoCardProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onViewDetails: (todo: Todo) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onToggleComplete, onViewDetails, onEdit, onDelete }) => {
  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-md flex items-center justify-between cursor-pointer ${
        todo.completed ? 'opacity-60' : ''
      }`}
      onClick={() => onViewDetails(todo)}
    >
      <div className="flex items-center">
        {todo.completed ? (
          <CheckSquare
            className="mr-3 text-green-500"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation(); 
              onToggleComplete(todo.id);
            }}
          />
        ) : (
          <Square
            className="mr-3 text-gray-400"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation(); 
              onToggleComplete(todo.id);
            }}
          />
        )}
        <h3 className={`text-lg font-semibold block max-w-xs truncate ${todo.completed ? 'line-through text-gray-500' : ''}`}>
          {todo.title}
        </h3>
      </div>
      <div className="flex items-center space-x-2">
        <Edit
          className="text-blue-500 hover:text-blue-600"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            onEdit(todo.id);
          }}
        />
        <Trash2
          className="text-red-500 hover:text-red-600"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            onDelete(todo.id);
          }}
        />
      </div>
    </div>
  );
};

export default TodoCard;
