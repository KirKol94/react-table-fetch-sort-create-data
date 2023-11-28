import { Button } from "@/components/button";
import { EmptyData } from "@/components/emptyData";
import { Modal } from "@/components/modal";
import { Table } from "@/components/table";
import { observer } from "mobx-react-lite";
import classes from "./HomePage.module.scss";
import { useHome } from "./useHome";
import { Input } from "@/components/input";

const HomePage = observer(() => {
  const {
    loadMore,
    isOpenModal,
    handleRemoveRequest,
    handleRemove,
    totalCount,
    error,
    handleGetData,
    handleClearList,
    people,
    handleClose,
    handleSearchChange,
    isLoading,
  } = useHome();

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="home__container">
      <div className={classes.actions}>
        <div className={classes.buttons}>
          <Button
            onClick={handleGetData}
            disabled={Boolean(people.length) || isLoading}
          >
            Request data
          </Button>
          <Button
            disabled={!totalCount || isLoading}
            variant="danger"
            onClick={handleClearList}
          >
            Clear data
          </Button>
          <Button isLink={true} url="create" variant="secondaty">
            Add new person
          </Button>
        </div>

        <Input
          className={classes["search-input"]}
          disabled={!people.length}
          placeholder="Search name"
          onChange={handleSearchChange}
        />
      </div>

      {!people.length && !isLoading ? (
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
