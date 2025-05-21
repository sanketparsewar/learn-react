import { Provider } from "react-redux";
import AddTodo from "./components/AddTodo.jsx";
import { store } from "./app/store.js";
import Todos from "./components/Todos.jsx";

function App() {
  return (
    <Provider store={store}>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Todo App</h1>
        <AddTodo />
        <div className="mt-4">
          <Todos/>
        </div>
      </div>
    </Provider>
  );
}

export default App;
