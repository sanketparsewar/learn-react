import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, toggleTodo, updateTodo } from "../features/todo/todoSlice";

function Todos() {
  // This component is responsible for displaying the list of todo items
  // we can get the todos from the Redux store using useSelector
  // useSelector is a hook that allows you to extract data from the Redux store state
  const todos = useSelector((state) => state.todos);

  const [updateTodoText, setUpdateTodoText] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);

  const dispatch = useDispatch();

  const handleToggleTodo=(id)=>{
    dispatch(toggleTodo(id))
  }

  const handleUpdateTodo = (e) => {
    dispatch(updateTodo({ id: e.id, text: updateTodoText })); //here the input is passed to the action as the payload
    setEditingTodo(null);
    setUpdateTodoText("");
  };

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  console.log(todos);
  return (
    <div className="flex flex-col items-center p-4 rounded ">
      <ul className="w-full max-w-md">
        {todos.map((e) => (
          <li
            key={e.id}
            className={`${e.completed? ' bg-gray-300' :""} bg-gray-200 flex justify-between items-center p-3 mb-2 rounded transition-shadow`}
          >
            <input type="checkbox" checked={e.completed} onChange={()=>handleToggleTodo(e.id)} />
            <input
              className={`w-70 text-gray-800 px-2 py-1 rounded-sm border-gray-300 focus:outline-0 ${
                editingTodo == e.id ? "outline-1 focus:outline-1" : "border-0"
              ,e.completed? 'line-through' :""} `}
              value={editingTodo === e.id ? updateTodoText : e.text}
              onChange={(e) => setUpdateTodoText(e.target.value)}
              readOnly={!updateTodoText}
            />
            <button
              onClick={() => {
                if (updateTodoText) {
                  handleUpdateTodo(e);
                } else {
                  setEditingTodo(e.id);
                  setUpdateTodoText(e.text);
                }
              }}
              className="text-blue-500 rounded-md mx-2 px-2 cursor-pointer hover:text-blue-700 font-semibold"
            >
              {editingTodo == e.id ? "💾" : "📝"}
            </button>
            <button
              onClick={() => handleRemoveTodo(e.id)}
              className="text-red-500  rounded-md mx-2 px-2 cursor-pointer hover:text-red-700 font-semibold"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
