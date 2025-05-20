import { useState } from "react";
import { TodoProvider } from "./context";
import { useEffect } from "react";
import { TodoForm, TodoItem } from "./components";

function App() {
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    setTodos((prevTodos) => [
      {
        id: Date.now(),
        todo,
        completed: false,
        date: new Date()
          .toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
          .toLowerCase(),
      },
      ...prevTodos,
    ]);
  };
  const updateTodo = (id, updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === id ? { ...t, todo: updatedTodo } : t))
    );
  };
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // Load todos from localStorage when the component mounts one time
  useEffect(() => {
    const storedtodos = JSON.parse(localStorage.getItem("todosList"));
    if (storedtodos && storedtodos.length > 0) setTodos(storedtodos);
  }, []);

  // Save todos to localStorage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem("todosList", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleTodo }}
    >
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
            📝 To-Do List
          </h2>
          <TodoForm />
          <div className="mt-4 space-y-4">
            {todos.map((e) => (
              <div key={e.id}>
                <TodoItem item={e} />
              </div>
            ))}
            {todos.length === 0 && (
              <div className="text-center text-gray-500">
                No todos available
              </div>
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
