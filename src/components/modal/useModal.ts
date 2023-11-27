import { useCallback, useEffect } from "react";

interface IUseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const useModal = ({ onClose, isOpen }: IUseModalProps) => {
  const modalRoot = document.getElementById("modal-root");
  const modalElement = document.createElement("div");

  const onModalClickHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
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

  return { modalElement, onModalClickHandler };
};
