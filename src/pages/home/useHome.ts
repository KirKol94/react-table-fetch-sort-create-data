import peoplesStore from "@/store/peoplesStore";
import { IPeople } from "@/types/people-list";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

interface IHomeData {
  loadMore: () => void;
  handleClose: () => void;
  isOpenModal: boolean;
  handleRemoveRequest: (key: string) => void;
  handleRemove: () => void;
  isLoading: boolean;
  error: string | null;
  people: IPeople[];
  handleGetData: () => void;
  handleClearList: () => void;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const useHome = (): IHomeData => {
  const {
    getData,
    setSearch,
    loadMore,
    removeItem,
    clearPeople,
    people,
    isLoading,
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

  const handleRemove = useCallback(() => {
    if (people.length === 1) {
      clearPeople();
    }

    removeItem(removingItemKey);
    handleClose();
  }, [clearPeople, people.length, removeItem, removingItemKey]);

  const handleGetData = () => {
    getData();
  };

  const handleClearList = () => {
    clearPeople();
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
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
    error,
    people,
    handleGetData,
    handleClearList,
    handleSearchChange,
  };
};
