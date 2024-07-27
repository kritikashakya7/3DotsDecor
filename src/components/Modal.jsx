import { X } from "lucide-react";
import Modal from "react-modal";

const CModal = ({ children, isOpen, closeModal, title, maxWidth = "500" }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "100%",
      maxWidth: `${maxWidth}px`,
      overflowY: "auto",
      maxHeight: "95vh",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      style={customStyles}
    >
      <div className="w-full flex justify-between items-center">
        <h1 className="font-bold text-xl my-5">{title}</h1>
        <button
          onClick={closeModal}
          className="hover:bg-hover rounded-full p-1 transition-all duration-150 hover:scale-105 active:scale-95"
        >
          <X />
        </button>
      </div>

      {children}
    </Modal>
  );
};

export default CModal;
