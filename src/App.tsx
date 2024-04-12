import { useState } from 'react';

import DisplayTodo from './components/DIsplayTodo';
import { Todo } from './helper';

import './App.css';
import NavBar from './components/NavBar';
import { CurrentTodoContextProvider } from './Context';



function App() {
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  return (
    <main>
      <div className='menu-info'>
        Press Ctrl+M to bring up the menu if it is closed.
      </div>
      <CurrentTodoContextProvider value={{currentTodo, setCurrentTodo}}>
        <NavBar />
        <div className='content'>
          <h2>ToDo App</h2>
          {currentTodo ? <DisplayTodo /> : ''}
        </div>
      </CurrentTodoContextProvider>
    </main>
  )
}

export default App
