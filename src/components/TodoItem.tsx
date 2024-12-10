import TodoItemType from "../types/TodoItemType";

import "../styles/TodoItem.css";

import Modal from "react-modal";
import { useState, useContext } from "react";
import { Context } from "../App";

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

type props = {
  item: TodoItemType;
  onToggleTodoEdit: (arg1: string, arg2: boolean) => void;
};

const TodoItem = ({ item }: props) => {
  let subtitle;

  const [todoItem, setTodoItem] = useState<TodoItemType>({ ...item });
  const {
    categories,
    handleUpdateTodoItem,
    handleDeleteTodoItem,
    handleToggleIsDoneTodoItem,
    handleToggleExpandItem,
    handleNextPriorityItem,
  } = useContext(Context);
  const [modalIsOpen, setIsOpen] = useState(false);

  // ---------------------------------
  function openModal(e) {
    e.stopPropagation();
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
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
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
                className={
                  "btn-ghost low priority-btn " +
                  (todoItem.priority === 1 ? "selected" : "")
                }
                onClick={() => setTodoItem({ ...todoItem, priority: 1 })}
              >
                Low
              </button>
              <button
                className={
                  "btn-ghost medium priority-btn " +
                  (todoItem.priority === 2 ? "selected" : "")
                }
                onClick={() => setTodoItem({ ...todoItem, priority: 2 })}
              >
                Medium
              </button>
              <button
                className={
                  "btn-ghost high priority-btn " +
                  (todoItem.priority === 3 ? "selected" : "")
                }
                onClick={() => setTodoItem({ ...todoItem, priority: 3 })}
              >
                High
              </button>
            </div>
          </div>
          <div className="category-section">
            <label>Category</label>
            <select name="categories" id="categories">
              {categories.map((category: string) => {
                return <option value={category}>{category}</option>;
              })}
            </select>
          </div>

          <button
            className="btn-ghost btn-update-todo"
            onClick={() => {
              handleUpdateTodoItem(item.id, todoItem);
              closeModal();
            }}
          >
            Update
          </button>
        </div>
      </Modal>
      <div
        className="todo-item"
        onClick={() => handleToggleIsDoneTodoItem(item.id)}
      >
        <div className="main">
          <div className="arrow-and-name">
            <i
              onClick={(e) => {
                handleToggleExpandItem(item.id);
                e.stopPropagation();
              }}
              className={
                "show-hide-details " +
                (item.isExpanded
                  ? "fa-solid fa-chevron-down"
                  : "fa-solid fa-chevron-right")
              }
            ></i>

            <p className={item.isDone ? "done" : ""}>{item.name}</p>
            <div
              onClick={(e) => {
                handleNextPriorityItem(item.id);
                e.stopPropagation();
              }}
              className={
                "priority " +
                (item.priority === 1
                  ? "low-priority"
                  : item.priority === 2
                  ? "medium-priority"
                  : "high-priority")
              }
            />
            {/* <div className="cat-badge">Travel</div> */}
          </div>
          <div className="buttons">
            <button className="btn-edit-todo" onClick={(e) => openModal(e)}>
              EDIT
            </button>
            <button
              className="btn-delete-todo"
              onClick={(e) => handleDeleteTodoItem(e, item.id)}
            >
              DELETE
            </button>
          </div>
        </div>
        {item.isExpanded && (
          <div className="expanded-content">
            <p className="item-desc">{item.desc}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default TodoItem;

{
  /* <div className="todo-inputs">
        <input type="text" placeholder="Name" value={todoItem.name} onChange={(e) => setTodoItem({ ...todoItem, name: e.target.value })} />
        <textarea placeholder="Further descriptions" value={todoItem.desc} onChange={(e) => setTodoItem({ ...todoItem, desc: e.target.value })} />
        <div className="priority-buttons">
          <button className={"priority-btn " + (todoItem.priority === 1 ? "selected" : "")} onClick={() => setTodoItem({ ...todoItem, priority: 1 })}>
            Low
          </button>
          <button className={"priority-btn " + (todoItem.priority === 2 ? "selected" : "")} onClick={() => setTodoItem({ ...todoItem, priority: 2 })}>
            Medium
          </button>
          <button className={"priority-btn " + (todoItem.priority === 3 ? "selected" : "")} onClick={() => setTodoItem({ ...todoItem, priority: 3 })}>
            High
          </button>
        </div>
        <select name="categories" id="categories">
          {categories.map((category) => {
            return <option value={category}>{category}</option>;
          })}
        </select>
        <button
          onClick={() => {
            handleAddTodoItem();
            setIsCreatingNewTodoItem(false);
          }}
        >
          Add
        </button>
      </div> */
}
