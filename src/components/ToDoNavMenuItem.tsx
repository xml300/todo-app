import { MouseEventHandler } from "react";
import { deleteTodo, editTodo } from "../helper";

export default function ToDoNavMenuItem({ title, marked, id, onClick }: { title: string, marked: boolean, id: number, onClick: MouseEventHandler }) {
  function clickHandler() {
    deleteTodo(id);
  }

  function completeHandler() {
    console.log(id);
    editTodo(id, { isComplete: true });
  }

  return (
    <div className='nav-row' onClick={onClick}>
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
        <span onClick={clickHandler} className="span-clickable center">
          <img className="invert-img" src="close.svg" alt="" />
        </span>
      </div>
    </div>
  )
}
