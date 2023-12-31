import { useReducer, useEffect } from "react";
import "./app.css";
import TodoList from "./components/TodoList";
import TodoAddForm from "./components/TodoAddForm";

const LOCAL_STORAGE_KEY = "todos";

function App() {
  //When an action is dispatched and the todoReducer function processes the action, it returns a new state based on the action's type.
  //todos: This is a variable that will hold the state of your to-do items.
  //dispatch: This is a function that you can use to dispatch actions to modify the todos state.
  const [todos, dispatch] = useReducer(todoReducer, [], (initial) => {
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return localData ? JSON.parse(localData) : initial;
  });
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function todoReducer(todos, action) {
    // In a React application, you typically have various actions
    //  that can be triggered by user interactions or other events.
    // These actions are dispatched using the dispatch function,
    //which is provided by useReducer or useDispatch when working with state management tools like Redux.
    switch (action.type) {
      case "TODO_ADD": {
        return [
          ...todos,
          {
            id: new Date().getTime(),
            text: action.value,
            isDone: false,
            isEdit: false,
          },
        ];
      }

      case "TODO_DELETE": {
        const filtered = todos.filter((t) => t.id != action.value);
        return [...filtered];
      }
      case "TODO_EDIT": {
        const newTodos = [...todos];
        const idx = newTodos.findIndex((nt) => nt.id === action.value);
        if (idx !== -1) {
          newTodos[idx]["isEdit"] = true;
        }

        return newTodos;
      }

      case "TODO_DONE": {
        const newTodos = [...todos];
        const idx = newTodos.findIndex((nt) => nt.id === action.value);
        if (idx !== -1) {
          newTodos[idx]["isDone"] = true;
        }
        return newTodos;
      }
      case "TODO_UNDONE": {
        const newTodos = [...todos];
        const idx = newTodos.findIndex((nt) => nt.id === action.value);
        if (idx !== -1) {
          newTodos[idx]["isDone"] = false;
        }
        return newTodos;
      }
      case "TODO_UPDATE": {
        return action.todos;
      }
      default: {
        throw Error("Unknown action: " + action.type);
      }
    }
  }

  function handleAdd(value) {
    dispatch({
      type: "TODO_ADD",
      value: value,
    });
  }
  function handleDelete(id) {
    dispatch({
      type: "TODO_DELETE",
      value: id,
    });
  }
  function handleEdit(id) {
    dispatch({
      type: "TODO_EDIT",
      value: id,
    });
  }
  function handleDone(id, type) {
    if (type == "done") {
      dispatch({
        type: "TODO_DONE",
        value: id,
      });
    } else {
      dispatch({
        type: "TODO_UNDONE",
        value: id,
      });
    }
  }

  function handleUpdate(id, newText) {
    // Update the todos state to reflect the changes
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: newText, isEdit: false };
      }
      return todo;
    });

    // Dispatch an action to update the todos state
    dispatch({
      type: "TODO_UPDATE",
      todos: updatedTodos,
    });
  }

  return (
    <>
      <h1>My todo</h1>

      <TodoAddForm handleAdd={handleAdd} />
      <TodoList
        todos={todos}
        handleDelete={handleDelete}
        handleDone={handleDone}
        handleEdit={handleEdit}
        handleUpdate={handleUpdate}
      />
    </>
  );
}

export default App;
