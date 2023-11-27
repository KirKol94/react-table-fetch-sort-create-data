import { ReactNode } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.scss";
import { useModal } from "./useModal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const { handleModalClick, modalElement, handleModalKeyDown } = useModal({
    onClose,
    isOpen,
  });

  return isOpen
    ? ReactDOM.createPortal(
        <div className={classes.overlay} onClick={onClose}>
          <div
            className={classes.modal}
            onClick={handleModalClick}
            onKeyDown={handleModalKeyDown}
            tabIndex={1}
          >
            <div className={classes.header}>
              <h2>{title}</h2>
              <button className={classes.close} onClick={onClose}>
                &times;
              </button>
            </div>
            <div className={classes.content}>{children}</div>
          </div>
        </div>,
        modalElement
      )
    : null;
};
