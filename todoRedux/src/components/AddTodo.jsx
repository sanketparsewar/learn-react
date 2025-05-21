import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";

function AddTodo() {
  // This component is responsible for adding a new todo item
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const handleAddTodo = () => {
    if (input && input.trim() !== "") {
      dispatch(addTodo(input));  //here the input is passed to the action as the payload
      setInput(""); // Clear the input field after adding the todo
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new todo"
        className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleAddTodo}
        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
      >
        Add
      </button>
    </div>
  );
}

export default AddTodo;
