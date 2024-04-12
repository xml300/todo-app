import { SetStateAction, createContext, Dispatch } from "react";
import { Todo } from "./helper";


interface TodoObject {
    currentTodo: Todo|null;
    setCurrentTodo: Dispatch<SetStateAction<Todo|null>>
}

export const currentTodoContext = createContext<TodoObject>({} as TodoObject);
export const CurrentTodoContextProvider = currentTodoContext.Provider
