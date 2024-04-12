export interface Todo {
    id: number;
    title: string;
    description: string;
    isComplete: boolean;
}


export function getTodos() {
    const todos = localStorage.getItem('todos') || '[]';
    const todoList = JSON.parse(todos);

    return todoList;
}

export function addTodo(todo: { title: string, desc: string, isComplete: boolean }) {
    const todos = getTodos();
    const id = (todos.length == 0) ? 0 : todos.at(-1).id + 1;
    const data = { id: id, title: todo.title, description: todo.desc, isComplete: todo.isComplete };
    todos.push(data);

    localStorage.setItem('todos', JSON.stringify(todos));
}

export function editTodo(todoId: number, edits: { title?: string, description?: string, isComplete?: boolean }) {
    const todos = getTodos();
    const { title, description, isComplete } = edits;
    const todoIndex = todos.indexOf(todos.filter((todo: Todo) => todo.id == todoId)[0]);


    if (title) {
        todos[todoIndex].title = title;
    };

    if (description) {
        todos[todoIndex].description = description;
    }

    if (isComplete) {
        todos[todoIndex].isComplete = isComplete;
    }

    localStorage.setItem('todos', JSON.stringify(todos));
}

export function deleteTodo(todoId: number) {
    const todos: any[] = getTodos();
    const todoIndex = todos.indexOf(todos.filter(todo => todo.id == todoId)[0]);

    todos.splice(todoIndex, 1);

    localStorage.setItem('todos', JSON.stringify(todos));
}