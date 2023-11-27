import peoplesStore from "@/store/peoplesStore";
import { IPeople } from "@/types/people-list";
import { useEffect, useState } from "react";

interface IHomeData {
  loadMore: () => void;
  handleClose: () => void;
  isOpenModal: boolean;
  handleRemoveRequest: (key: string) => void;
  handleRemove: () => void;
  isLoading: boolean;
  totalCount: number | null;
  error: string | null;
  people: IPeople[];
  handleGetData: () => void;
  handleClearList: () => void;
}

export const useHome = (): IHomeData => {
  const {
    getData,
    loadMore,
    removeItem,
    clearPeople,
    people,
    isLoading,
    totalCount,
    error,
  } = peoplesStore;

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [removingItemKey, setRemovingItemKey] = useState("");
  const handleClose = () => {
    setIsOpenModal(false);
    setRemovingItemKey("");
  };

  const handleOpen = () => {
    setIsOpenModal(true);
  };

  const handleRemoveRequest = (key: string) => {
    handleOpen();
    setRemovingItemKey(key);
  };

  const handleRemove = () => {
    if (people.length === 1) {
      clearPeople();
    }

    removeItem(removingItemKey);
    handleClose();
  };

  const handleGetData = () => {
    getData();
  };

  const handleClearList = () => {
    clearPeople();
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isOpenModal && e.key === "Enter") {
        handleRemove();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpenModal, handleRemove]);

  return {
    loadMore,
    handleClose,
    isOpenModal,
    handleRemoveRequest,
    handleRemove,
    isLoading,
    totalCount,
    error,
    people,
    handleGetData,
    handleClearList,
  };
};
