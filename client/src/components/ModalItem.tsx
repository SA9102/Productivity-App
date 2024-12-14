import { useState } from "react";
import Modal from "react-modal";
import { modalStyle } from "../utils";
import TodoItemType from "../types/TodoItemType";

// Config for Modal
Modal.defaultStyles.overlay.backgroundColor = "rgb(0, 0, 0, 0.5)";
Modal.setAppElement("#root");
const customStyles = modalStyle;

type props = {
  type: "add" | "edit";
  modalIsOpen: boolean;
  onCloseModal: () => void;
  item: TodoItemType;
  onConfirm: (item: TodoItemType) => void;
};

const ModalItem = ({
  type,
  modalIsOpen,
  onCloseModal,
  item,
  onConfirm,
}: props) => {
  const [todoItem, setTodoItem] = useState({ ...item });

  let subtitle;

  const getCurrentDate = () => {
    const date = new Date();
    const fulldate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    return fulldate;
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="modal-heading">
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>New Todo</h2>
        <button className="close-modal-btn" onClick={onCloseModal}>
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
              className={"low" + (todoItem.priority === 1 ? " selected" : "")}
              onClick={() => setTodoItem({ ...todoItem, priority: 1 })}
            >
              Low
            </button>
            <button
              className={
                "medium" + (todoItem.priority === 2 ? " selected" : "")
              }
              onClick={() => setTodoItem({ ...todoItem, priority: 2 })}
            >
              Medium
            </button>
            <button
              className={"high" + (todoItem.priority === 3 ? " selected" : "")}
              onClick={() => setTodoItem({ ...todoItem, priority: 3 })}
            >
              High
            </button>
          </div>
        </div>
        <div className="category-section">
          <label>Category</label>
          {/*  
            <div className="category-buttons">
              {!isCreatingNewCategory && (
                <select
                  style={{ color: categories[todoItem.category] }}
                  name="categories"
                  id="categories"
                  defaultValue=""
                  value={todoItem.category}
                  onChange={(e) =>
                    setTodoItem({ ...todoItem, category: e.target.value })
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
              )}

              <button
                onClick={() => setIsCreatingNewCategory(!isCreatingNewCategory)}
                className="btn-new-category-modal"
              >
                {isCreatingNewCategory ? "Cancel" : "New"}
              </button>
            </div>
            */}
          {/* {isCreatingNewCategory && (
              <>
                <div>
                  <input
                    className="modal-input"
                    type="text"
                    placeholder="Name"
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                  />
                  <input
                    type="color"
                    value={categoryColour}
                    onChange={(e) => setCategoryColour(e.target.value)}
                  />
                </div>
                <button
                  className="btn-add-item-modal"
                  onClick={handleAddCategory}
                >
                  Add
                </button>
              </>
            )} */}
        </div>
        <input
          type="date"
          name=""
          className="input"
          min={getCurrentDate()}
          value={todoItem.startDate}
          onChange={(e) =>
            setTodoItem({ ...todoItem, startDate: e.target.value })
          }
        />
        <button
          className="btn-add-item-modal"
          onClick={() => {
            if (todoItem.name.trim() !== "") {
              onConfirm(todoItem);
              onCloseModal();
            }
          }}
        >
          {type === "add" ? "Add" : "Update"}
        </button>
      </div>
    </Modal>
  );
};

export default ModalItem;
