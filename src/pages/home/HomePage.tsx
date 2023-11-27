import { Button } from "@/components/button";
import { EmptyData } from "@/components/emptyData";
import { Loader } from "@/components/loader";
import { Modal } from "@/components/modal";
import { Table } from "@/components/table";
import peoplesStore from "@/store/peoplesStore";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import classes from "./HomePage.module.scss";

const HomePage = observer(() => {
  const {
    getData,
    loadMore,
    removeItem,
    clearPeople,
    isLoading,
    people,
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

  if (error) {
    return <div>{error}</div>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="home__container">
      <div className={classes.actions}>
        <Button onClick={buttonHandlerGetData}>Запросить данные</Button>
        <Button
          disabled={totalCount === 0}
          variant="danger"
          onClick={buttonHandlerClearData}
        >
          Очистить данные
        </Button>
        <Button isLink={true} url="create" variant="secondaty">
          Добавить запись
        </Button>
      </div>

      {people.length === 0 ? (
        <EmptyData />
      ) : (
        <Table
          array={people}
          loadMore={loadMore}
          totalCount={totalCount}
          onConfirmDeletion={onRemoveItemRequest}
        />
      )}

      <Modal
        isOpen={isOpenModal}
        onClose={onModalClose}
        title="Вы уверены, что хотите удалить запись?"
      >
        <Button onClick={onModalClose}>Отмена</Button>
        <Button variant="danger" onClick={onRemoveWithConfirm}>
          Удалить
        </Button>
      </Modal>
    </div>
  );
});

export default HomePage;
