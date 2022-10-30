import React, { createContext, useCallback, useContext, useState } from "react";

const ToDoContext = createContext();

const ToDoProvider = ({ children }) => {
    const [todoList, setTodoList] = useState(null);
    const getNumberofTodo = () => todoList.length;
    const addTodo = (newTodoItem) => {
        setTodoList([...todoList, newTodoItem]);
    };
    const contextValue = {
        todoList,
        getNumberofTodo,
        addTodo,
    };
    return (
        <ToDoContext.Provider
            value={{
                contextValue,
            }}
        >
            {children}
        </ToDoContext.Provider>
    );
};
export const useTodoConText = () => useContext(ToDoContext);
export default ToDoProvider;
