import React, { useRef, useState, useEffect, SetStateAction } from "react";

import NewTaskModal from "./NewTaskModal";
import ToDoNavMenuItem from "./ToDoNavMenuItem";

import { Todo } from "../helper";

function areEqual(obj1: Todo, obj2: Todo) {
    if (obj1 == null || obj2 == null) return false;

    return obj1.id == obj2.id &&
        obj1.title == obj2.title &&
        obj1.description == obj2.description &&
        obj1.isComplete == obj2.isComplete;
}

export default function NavBar({ setCurrentTodo }: { setCurrentTodo: React.Dispatch<SetStateAction<Todo | null>> }) {
    const [todos, setTodos] = useState([]);
    const [modal, setModal] = useState(false);
    const navRef = useRef<HTMLDivElement | null>(null);

    function menuCloseHandler() {
        if (navRef.current) {
            const nav = navRef.current;
            nav.classList.remove('open');
            nav.classList.add('close');
        }
    }

    window.onkeydown = (evt) => {
        if (evt.ctrlKey && evt.key == 'm' && navRef.current) {
            const nav = navRef.current;

            nav.classList.remove('close');
            nav.classList.add('open');
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const items = localStorage.getItem('todos') || '[]';
            const todoList = JSON.parse(items);
            if (todos.length !== todoList.length || !todoList.every((todo: Todo, idx: number) => areEqual(todo, todos[idx]))) {
                setTodos(todoList);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [todos]);

    const todoList = todos.map((todo: Todo) => <ToDoNavMenuItem key={todo.id} marked={todo.isComplete} id={todo.id} title={todo.title} onClick={() => setCurrentTodo(todo)} />);

    return (
        <nav ref={navRef}>
            <button className="hamburg-menu" onClick={menuCloseHandler}>
                <div></div>
                <div></div>
                <div></div>
            </button>
            <h2>ToDos</h2>
            {todoList}
            <button type='button' className='button' onClick={() => setModal(true)}><img src="add.svg" alt="add button" /></button>
            {modal ? <NewTaskModal setModal={setModal} /> : <br />}
        </nav>

    );
}