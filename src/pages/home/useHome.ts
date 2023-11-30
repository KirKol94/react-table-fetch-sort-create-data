import { PATH } from "@/vars/paths";
import peoplesStore from "@/store/peoplesStore";
import { IPeople } from "@/types/peopleData";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface IHomeData {
  loadMore: () => void;
  handleCloseRemoveModal: () => void;
  isOpenRemoveModal: boolean;
  handleRemoveRequest: (key: string) => void;
  handleRemove: () => void;
  isLoading: boolean;
  error: string | null;
  people: IPeople[];
  handleGetData: () => void;
  handleClearList: () => void;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isEntryCreated: boolean;
  handleCloseCreatedModal: () => void;
}

export const useHome = (): IHomeData => {
  const {
    getData,
    setSearch,
    loadMore,
    removeItem,
    clearData,
    people,
    isLoading,
    error,
  } = peoplesStore;
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpenRemoveModal, setIsOpenRemoveModal] = useState(false);
  const [isEntryCreated, setIsEntryCreated] = useState(false);
  const [removingItemKey, setRemovingItemKey] = useState("");

  const handleCloseRemoveModal = () => {
    setIsOpenRemoveModal(false);
    setRemovingItemKey("");
  };

  const handleCloseCreatedModal = useCallback(() => {
    setIsEntryCreated(false);
  }, []);

  const handleOpen = () => {
    setIsOpenRemoveModal(true);
  };

  const handleRemoveRequest = (key: string) => {
    handleOpen();
    setRemovingItemKey(key);
  };

  const handleRemove = useCallback(() => {
    if (people.length === 1) {
      clearData();
    }

    removeItem(removingItemKey);
    handleCloseRemoveModal();
  }, [clearData, people.length, removeItem, removingItemKey]);

  const handleGetData = () => {
    getData();
  };

  const handleClearList = () => {
    clearData();
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isOpenRemoveModal && e.key === "Enter") {
        handleRemove();
      }
      if (isEntryCreated && e.key === "Enter") {
        handleCloseCreatedModal();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [
    isOpenRemoveModal,
    handleRemove,
    isEntryCreated,
    handleCloseCreatedModal,
  ]);

  useEffect(() => {
    if (location?.state?.from === PATH.CREATE) {
      setIsEntryCreated(true);
      navigate("/", {});
    }
  }, [location, navigate]);

  return {
    loadMore,
    handleCloseRemoveModal,
    isOpenRemoveModal,
    handleRemoveRequest,
    handleRemove,
    isLoading,
    error,
    people,
    handleGetData,
    handleClearList,
    handleSearchChange,
    isEntryCreated,
    handleCloseCreatedModal,
  };
};
