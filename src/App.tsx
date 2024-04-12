import { useEffect, useState } from 'react';

import DisplayTodo from './components/DIsplayTodo';
import { Todo, getTodos } from './helper';

import './App.css';
import NavBar from './components/NavBar';



function App() {
  const [currentTodo, setCurrentTodo] = useState<Todo|null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const todos = getTodos();
      if(currentTodo && todos.length > 0){
        const todo = todos.filter((todo: Todo) => todo.id == currentTodo.id);
        setCurrentTodo(todo.length == 0 ? null : todo[0]);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, [currentTodo]);

  return (
    <main>
      <div className='menu-info'>
        Press Ctrl+M to bring up the menu if it is closed.
      </div>
      <NavBar setCurrentTodo={setCurrentTodo} />
      <div className='content'>
        <h2>ToDo App</h2>
        {currentTodo ? <DisplayTodo todo={currentTodo} /> : ''}
      </div>
    </main>
  )
}

export default App
