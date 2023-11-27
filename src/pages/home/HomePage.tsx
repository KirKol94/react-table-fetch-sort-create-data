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
    handleRemoveRequest,
    handleRemove,
    isLoading,
    totalCount,
    error,
    handleGetData,
    handleClearList,
    people,
    handleClose,
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
        <Button onClick={handleGetData} disabled={Boolean(totalCount)}>
          Request data
        </Button>
        <Button
          disabled={totalCount === 0}
          variant="danger"
          onClick={handleClearList}
        >
          Clear data
        </Button>
        <Button isLink={true} url="create" variant="secondaty">
          Add new person
        </Button>
      </div>

      {people.length === 0 ? (
        <EmptyData />
      ) : (
        <Table loadMore={loadMore} onConfirmDeletion={handleRemoveRequest} />
      )}

      <Modal
        isOpen={isOpenModal}
        onClose={handleClose}
        title="Are you sure you want to delete the entry?"
      >
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="danger" onClick={handleRemove}>
          Delete
        </Button>
      </Modal>
    </div>
  );
});

export default HomePage;
