import { useContext } from "react";
import { Todo, deleteTodo } from "../helper";
import { currentTodoContext } from "../Context";

export default function DisplayTodo() {
  const { currentTodo: todo, setCurrentTodo } = useContext(currentTodoContext);
  
  function clickHandler() {
    setCurrentTodo(null);
    // if(todo) deleteTodo(todo.id);
  }

  return (
    <>
    {todo && (
      <div className='todo-display'>
        <h2>{todo.title}</h2>
        <h4>Description</h4>
        <p>{todo.description}</p>
        <h4>Status</h4>
        <p>{todo.isComplete ? "Completed" : "Ongoing"}</p>
        <button className="todo-display-btn" onClick={clickHandler}>Delete</button>
      </div>
    )}
    </>
  );
}
