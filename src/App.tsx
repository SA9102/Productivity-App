import { useState, createContext } from "react";
import TodoItemType from "./types/TodoItemType";
import "./styles/App.css";
import TodoList from "./components/TodoList";
import { v4 as uuidv4 } from "uuid";

import Modal from "react-modal";

Modal.defaultStyles.overlay.backgroundColor = "rgb(0, 0, 0, 0.5)";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgb(43, 43, 43)",
    borderRadius: "0.2rem",
    border: "none",
  },
};

Modal.setAppElement("#root");

export const Context = createContext();

const App = () => {
  let subtitle;

  const getEmptyTodoItem = () => {
    return { id: uuidv4(), name: "", category: "", desc: "", priority: 1, isEditing: false, isDone: false };
  };

  const [todoList, setTodoList] = useState<TodoItemType[]>([]);
  const [isCreatingNewTodoItem, setIsCreatingNewTodoItem] = useState(false);
  const [todoItem, setTodoItem] = useState<TodoItemType>(getEmptyTodoItem());
  const [categories, setCategories] = useState(["university", "work", "personal"]);

  const [modalIsOpen, setIsOpen] = useState(false);

  // ---------------------------------
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  // ---------------------------------

  const handleToggleTodoEdit = (id: string, isEditing: boolean) => {
    let todoListCopy = [...todoList];
    todoListCopy = todoListCopy.map((item: TodoItemType) => {
      if (item.id === id) {
        item.isEditing = isEditing;
      }
      return item;
    });
  };

  const handleAddTodoItem = () => {
    setTodoList([...todoList, todoItem]);
    handleResetTodoItem();
    // }
  };

  const handleResetTodoItem = () => {
    setTodoItem(getEmptyTodoItem());
  };

  // Updates a todo item
  const handleUpdateTodoItem = (id: string, todoItem: TodoItemType) => {
    let todoListCopy = [...todoList];
    todoListCopy = todoListCopy.map((item: TodoItemType) => {
      if (item.id === id) {
        return todoItem;
      }
      return item;
    });
    setTodoList(todoListCopy);
  };

  // Deletes a todo item by id
  const handleDeleteTodoItem = (e, id: string) => {
    e.stopPropagation();
    let todoListCopy = [...todoList];
    todoListCopy = todoListCopy.filter((item: TodoItemType) => item.id !== id);
    setTodoList(todoListCopy);
  };

  // Toggles between whether or not an item is done (i.e. completed)
  const handleToggleIsDoneTodoItem = (id: string) => {
    let todoListCopy = todoList.map((item: TodoItemType) => {
      if (item.id === id) {
        item.isDone = !item.isDone;
      }
      return item;
    });
    setTodoList(todoListCopy);
  };

  return (
    <main>
      {/* ------------------------------------ */}
      <div className="toolbar">
        {/* <button className="btn-ghost btn-new-todo" onClick={handleAddTodoItem}> */}
        <button onClick={openModal} className="btn-ghost btn-new-todo">
          NEW TODO
        </button>
      </div>
      <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
        <div className="modal-heading">
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>New Todo</h2>
          <button className="close-modal-btn" onClick={closeModal}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="todo-inputs">
          <input
            className="modal-input"
            type="text"
            placeholder="Name"
            value={todoItem.name}
            onChange={(e) => setTodoItem({ ...todoItem, name: e.target.value })}
          />
          <textarea
            className="modal-input"
            placeholder="Further description"
            value={todoItem.desc}
            onChange={(e) => setTodoItem({ ...todoItem, desc: e.target.value })}
          />
          <div className="priority-section">
            <label>Priority</label>
            <div>
              <button
                className={"btn-ghost low priority-btn " + (todoItem.priority === 1 ? "selected" : "")}
                onClick={() => setTodoItem({ ...todoItem, priority: 1 })}
              >
                Low
              </button>
              <button
                className={"btn-ghost medium priority-btn " + (todoItem.priority === 2 ? "selected" : "")}
                onClick={() => setTodoItem({ ...todoItem, priority: 2 })}
              >
                Medium
              </button>
              <button
                className={"btn-ghost high priority-btn " + (todoItem.priority === 3 ? "selected" : "")}
                onClick={() => setTodoItem({ ...todoItem, priority: 3 })}
              >
                High
              </button>
            </div>
          </div>
          <div className="category-section">
            <label>Category</label>
            <select name="categories" id="categories">
              {categories.map((category) => {
                return <option value={category}>{category}</option>;
              })}
            </select>
          </div>

          <button
            className="btn-ghost btn-add-todo"
            onClick={() => {
              if (todoItem.name.trim() !== "") {
                handleAddTodoItem();
                closeModal();
              }
            }}
          >
            Add
          </button>
        </div>
      </Modal>
      {/* ---------------------------------- */}

      {/* <button onClick={() => setIsCreatingNewTodoItem(!isCreatingNewTodoItem)}>{isCreatingNewTodoItem ? "Cancel" : "New"}</button> */}
      {/* {isCreatingNewTodoItem && (
        
      )} */}
      <Context.Provider value={{ categories, handleUpdateTodoItem, handleDeleteTodoItem, handleToggleIsDoneTodoItem }}>
        <TodoList todoList={todoList} onToggleTodoEdit={handleToggleTodoEdit} />
      </Context.Provider>
    </main>
  );
};

export default App;
