import peoplesStore from "@/store/peoplesStore";
import { useState } from "react";

export const useHome = () => {
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
  const onModalClose = () => {
    setIsOpenModal(false);
    setRemovingItemKey("");
  };

  const onModalOpen = () => {
    setIsOpenModal(true);
  };

  const onRemoveItemRequest = (key: string) => {
    onModalOpen();
    setRemovingItemKey(key);
  };

  const onRemoveWithConfirm = () => {
    if (people.length === 1) {
      clearPeople();
    }

    removeItem(removingItemKey);
    onModalClose();
  };

  const buttonHandlerGetData = () => {
    getData();
  };

  const buttonHandlerClearData = () => {
    clearPeople();
  };

  return {
    loadMore,
    onModalClose,
    isOpenModal,
    onRemoveItemRequest,
    onRemoveWithConfirm,
    isLoading,
    totalCount,
    error,
    people,
    buttonHandlerGetData,
    buttonHandlerClearData,
  };
};
