import { Button } from "@/components/button";
import { EmptyData } from "@/components/emptyData";
import { Loader } from "@/components/loader";
import { Modal } from "@/components/modal";
import { Table } from "@/components/table";
import { observer } from "mobx-react-lite";
import classes from "./HomePage.module.scss";
import { useHome } from "./useHome";

const HomePage = observer(() => {
  const {
    loadMore,
    isOpenModal,
    onRemoveItemRequest,
    onRemoveWithConfirm,
    isLoading,
    totalCount,
    error,
    buttonHandlerGetData,
    buttonHandlerClearData,
    people,
    onModalClose,
  } = useHome();

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
        <Table loadMore={loadMore} onConfirmDeletion={onRemoveItemRequest} />
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
