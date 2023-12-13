import React, { useState, useEffect } from "react";

const Main = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (input.trim() !== "") {
      setTodos((prevTodos) => {
        const newTodos = [...prevTodos, input];
        setInput("");
        return newTodos;
      });
    }
  };

  const handleRemoveTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  return (
    <div className="main w-full min-h-screen bg-[url('./img/bg.jpg')] bg-center bg-cover bg-no-repeat flex justify-center items-center flex-col overflow-hidden">
      <h1 className="heading text-7xl text-white">To-Do List</h1>
      <div className="toDo w-1/2 flex mt-[50px] rounded-3xl bg-white overflow-hidden py-[20px] px-[10px]">
        <input
          type="text"
          id="toDoInput"
          value={input}
          placeholder="Add a new task"
          className="w-full p-[10px] border-none outline-none"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button
          id="addToDoBtn"
          className="rounded-[10px] py-[15px] px-[40px] bg-[#B0D9B1]"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </div>
      <div className="list w-1/2">
        <ul id="toDoList">
          {todos.map((todo, index) => (
            <li key={index} className="text-black bg-white flex justify-between my-3 rounded-[10px] p-3 items-center">
              {todo}
              <button
                className="rounded-[10px] py-[15px] px-[40px] bg-[#B0D9B1]"
                onClick={() => handleRemoveTodo(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Main;
