import { Todo, deleteTodo } from "../helper";

export default function DisplayTodo({todo}:{todo:Todo}){
  function clickHandler(){
    deleteTodo(todo.id);
  }

    return (
    <div className='todo-display'>
      <h2>{todo.title}</h2>
      <h4>Description</h4>
      <p>{todo.description}</p>
      <h4>Status</h4>
      <p>{todo.isComplete ? "Completed" : "Ongoing"}</p>
      <button className="todo-display-btn" onClick={clickHandler}>Delete</button>
    </div>
    );
  }
  