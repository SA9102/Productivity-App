import { useState } from "react";
import Modal from "react-modal";
import { modalStyle } from "../utils";

Modal.defaultStyles.overlay.backgroundColor = "rgb(0, 0, 0, 0.5)";

const customStyles = modalStyle;

const EditCategoriesButton = ({ categories }) => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  // Modal methods
  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={openModal} className="btn-edit-cat">
        EDIT CATEGORIES
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Categories"
      >
        <div className="modal-heading">
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Edit Categories</h2>
          <button className="close-modal-btn" onClick={closeModal}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        {Object.keys(categories).map((categoryName: string) => {
          return <p>{categoryName}</p>;
        })}
      </Modal>
    </>
  );
};

export default EditCategoriesButton;
