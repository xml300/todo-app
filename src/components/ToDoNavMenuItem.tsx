import React, { useContext } from "react";
import { Todo, deleteTodo, editTodo } from "../helper";
import { currentTodoContext } from "../Context";

export default function ToDoNavMenuItem({ todo }: { todo: Todo }) {
  const {title, isComplete: marked, id} = todo;
  const {setCurrentTodo} = useContext(currentTodoContext);

  function deleteHandler(evt: React.MouseEvent<HTMLSpanElement>) {
    evt.stopPropagation();
    setCurrentTodo(null);
    deleteTodo(id);
  }

  function completeHandler() {
    editTodo(id, { isComplete: true });
  }

  function clickHandler() {
    setCurrentTodo(todo);
  }
  
  return (
    <div className='nav-row' onClick={clickHandler}>
      <span>{title}</span>
      <div className="nav-row-right row-right-align">
        {
        marked ? 
        <span className="center">
          <img className="invert-img" src="done.svg" />
        </span>
        : 
        <span className="center span-clickable" onClick={completeHandler}>
          <img className="invert-img" src="box.svg" alt="" />
        </span>
        }
        <span onClick={deleteHandler} className="span-clickable center">
          <img className="invert-img" src="close.svg" alt="" />
        </span>
      </div>
    </div>
  )
}
