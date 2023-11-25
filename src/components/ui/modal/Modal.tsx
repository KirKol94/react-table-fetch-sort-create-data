import { ReactNode, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal = ({
  isOpen = true,
  onClose,
  title = "Вы уверены, что хотите удалить запись?",
  children = "Да нет наверное",
}: ModalProps) => {
  const modalRoot = document.getElementById("modal-root");
  const modalElement = document.createElement("div");

  const onModalClickHandler = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const handleCloseOnEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      modalRoot?.appendChild(modalElement);
      window.addEventListener("keydown", handleCloseOnEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleCloseOnEsc);
    };
  }, [isOpen, modalElement, modalRoot, handleCloseOnEsc]);

  return isOpen
    ? ReactDOM.createPortal(
        <div className={classes["overlay"]} onClick={onClose}>
          <div className={classes.modal} onClick={onModalClickHandler}>
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
