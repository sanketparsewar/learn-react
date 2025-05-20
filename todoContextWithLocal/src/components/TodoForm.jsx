import React from "react";
import { useState } from "react";
import { useTodo } from "../context";

function TodoForm() {
  const [todo, setTodo] = useState("");

  const { addTodo } = useTodo();
  const add = (e) => {
    e.preventDefault;
    if (todo && todo.trim() !== "") {
      // Add the new todo to the list
      addTodo(todo);
      setTodo(""); // and reset the input field
    }
  };

  return (
    <div className="flex flex-col items-center  p-4 bg-gray-100 rounded shadow-md">
      <div className="flex w-full max-w-md">
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Enter your todo"
          className="flex-grow p-2 border focus:outline-0 border-gray-300 rounded-l"
        />
        <button
          type="button"
          onClick={add}
          className="cursor-pointer px-4 py-2 bg-blue-500 text-white font-semibold rounded-r hover:bg-blue-600"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default TodoForm;
