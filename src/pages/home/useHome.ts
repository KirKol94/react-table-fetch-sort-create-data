import peoplesStore from "@/store/peoplesStore";
import { IPeople } from "@/types/people-list";
import { useState } from "react";

interface IHomeData {
  loadMore: () => void;
  onModalClose: () => void;
  isOpenModal: boolean;
  onRemoveItemRequest: (key: string) => void;
  onRemoveWithConfirm: () => void;
  isLoading: boolean;
  totalCount: number | null;
  error: string | null;
  people: IPeople[];
  buttonHandlerGetData: () => void;
  buttonHandlerClearData: () => void;
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
