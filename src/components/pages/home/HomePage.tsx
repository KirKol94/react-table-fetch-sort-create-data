import { Button } from "@/components/ui/button";
import { EmptyData } from "@/components/ui/emptyData";
import { Loader } from "@/components/ui/loader";
import { Modal } from "@/components/ui/modal";
import { Table } from "@/components/ui/table/Table";
import peoplesStore from "@/store/peoplesStore";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import classes from "./HomePage.module.scss";

const HomePage = observer(() => {
  const {
    getData,
    loadMore,
    clearPeople,
    isLoading,
    people,
    totalCount,
    error,
  } = peoplesStore;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const onModalClose = () => {
    setIsOpenModal(false);
  };

  const onModalOpen = () => {
    setIsOpenModal(true);
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
      </div>

      {people.length === 0 ? (
        <EmptyData />
      ) : (
        <Table
          array={people}
          loadMore={loadMore}
          totalCount={totalCount}
          onConfirmDeletion={onModalOpen}
        />
      )}

      <Modal
        isOpen={isOpenModal}
        onClose={onModalClose}
        title="Вы уверены, что хотите удалить запись?"
      >
        <Button onClick={onModalClose}>Отмена</Button>
        <Button variant="danger" onClick={onModalClose}>
          Удалить
        </Button>
      </Modal>
    </div>
  );
});

export default HomePage;
