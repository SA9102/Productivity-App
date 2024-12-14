import TodoItemType from "../types/TodoItemType";

import "../styles/TodoItem.css";

import Modal from "react-modal";
import { useState, useContext } from "react";
import { Context } from "../App";

import ModalItem from "./ModalItem";

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
};

const TodoItem = ({ item }: props) => {
  let subtitle;

  const [todoModalOpen, setTodoModalOpen] = useState(false);

  const [showButtons, setShowButtons] = useState(false);
  // This is the to-be state of the todo item, when the user is editing the item.
  // If these changes are saved, then the actual todoItem will contain these changes.
  const [modalTodoItem, setModalTodoItem] = useState<TodoItemType>({ ...item });
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
    setModalTodoItem(item);
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setModalTodoItem(item);
    setIsOpen(false);
  }
  // ---------------------------------

  // Used generative AI to derive a function to get the luminance of a background colour
  const getConstrastColour = () => {
    let bgColour = categories[item.category].replace("#", "");

    // Parse the color components
    const r = parseInt(bgColour.substring(0, 2), 16);
    const g = parseInt(bgColour.substring(2, 4), 16);
    const b = parseInt(bgColour.substring(4, 6), 16);

    // Calculate the relative luminance
    const luminance =
      0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);

    // Return black for light backgrounds, white for dark backgrounds
    return luminance > 0.5 ? "#000000" : "#FFFFFF";
  };

  // Testing Modal
  const handleCloseModal = () => {
    setModalTodoItem(item);
    setTodoModalOpen(false);
  };

  return (
    <>
      <ModalItem
        type="edit"
        modalIsOpen={todoModalOpen}
        onCloseModal={handleCloseModal}
        item={modalTodoItem}
        onConfirm={handleUpdateTodoItem}
      />
      {/* <Modal
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
            value={modalTodoItem.name}
            onChange={(e) =>
              setModalTodoItem({ ...modalTodoItem, name: e.target.value })
            }
          />
          <textarea
            className="modal-input"
            placeholder="Further description"
            value={modalTodoItem.desc}
            onChange={(e) =>
              setModalTodoItem({ ...modalTodoItem, desc: e.target.value })
            }
          />
          <div className="priority-section">
            <label>Priority</label>
            <div>
              <button
                className={
                  "btn-ghost low priority-btn " +
                  (modalTodoItem.priority === 1 ? "selected" : "")
                }
                onClick={() =>
                  setModalTodoItem({ ...modalTodoItem, priority: 1 })
                }
              >
                Low
              </button>
              <button
                className={
                  "btn-ghost medium priority-btn " +
                  (modalTodoItem.priority === 2 ? "selected" : "")
                }
                onClick={() =>
                  setModalTodoItem({ ...modalTodoItem, priority: 2 })
                }
              >
                Medium
              </button>
              <button
                className={
                  "btn-ghost high priority-btn " +
                  (modalTodoItem.priority === 3 ? "selected" : "")
                }
                onClick={() =>
                  setModalTodoItem({ ...modalTodoItem, priority: 3 })
                }
              >
                High
              </button>
            </div>
          </div>
          <div className="category-section">
            <label>Category</label>
            <select
              style={{ color: categories[modalTodoItem.category] }}
              name="categories"
              id="categories"
              defaultValue={item.category}
              onChange={(e) =>
                setModalTodoItem({ ...modalTodoItem, category: e.target.value })
              }
            >
              <option value="">None</option>
              {Object.keys(categories).map((categoryName: string) => {
                return (
                  <option
                    style={{ color: categories[categoryName] }}
                    value={categoryName}
                  >
                    {categoryName}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            className="btn-update-todo"
            onClick={() => {
              handleUpdateTodoItem(item.id, modalTodoItem);
              closeModal();
            }}
          >
            Update
          </button>
        </div>
      </Modal> */}
      <div
        className="todo-item"
        onClick={() => handleToggleIsDoneTodoItem(item.id)}
        onMouseEnter={() => setShowButtons(true)}
        onMouseLeave={() => setShowButtons(false)}
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
            {item.category !== "" && (
              <div
                style={{
                  backgroundColor: categories[item.category],
                  color: getConstrastColour(),
                }}
                className="cat-badge"
              >
                {item.category}
              </div>
            )}
          </div>
          {showButtons && (
            <div className="buttons">
              <button
                className="btn-edit-todo"
                onClick={() => setTodoModalOpen(true)}
              >
                EDIT
              </button>
              <button
                className="btn-delete-todo"
                onClick={(e) => handleDeleteTodoItem(e, item.id)}
              >
                DELETE
              </button>
            </div>
          )}
        </div>
        {item.isExpanded && (
          <div className="expanded-content">
            <p className="item-desc">{item.desc}</p>
            <p>Start date: {item.startDate}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default TodoItem;

{
  /* <div className="todo-inputs">
        <input type="text" placeholder="Name" value={todoItem.name} onChange={(e) => setModalTodoItem({ ...todoItem, name: e.target.value })} />
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
