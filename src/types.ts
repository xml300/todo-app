export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: string; 
  status: 'pending' | 'completed';
}

export interface Route {
  path: string;
  component: React.ComponentType<any>;
}
