import { Button } from "@/components/ui/button";
import { EmptyData } from "@/components/ui/emptyData";
import { Loader } from "@/components/ui/loader";
import { Table } from "@/components/ui/table/Table";
import peoplesStore from "@/store/peoplesStore";
import { observer } from "mobx-react-lite";

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

  const buttonHandlerGetData = () => {
    getData();
  };

  const buttonHandlerClearData = () => {
    clearPeople();
  };

  const buttonHandlerLoadMore = () => {
    loadMore();
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="home__container">
      <Button onClick={buttonHandlerGetData}>Запросить данные</Button>
      <Button
        disabled={totalCount === 0}
        variant="danger"
        onClick={buttonHandlerClearData}
      >
        Очистить данные
      </Button>

      {people.length === 0 ? (
        <EmptyData />
      ) : (
        <Table array={people} loadMore={loadMore} totalCount={totalCount} />
      )}
    </div>
  );
});

export default HomePage;
