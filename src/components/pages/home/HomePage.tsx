import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import peoplesStore from "@/store/peoplesStore";
import { observer } from "mobx-react-lite";

const HomePage = observer(() => {
  const { getData, loadMore, clearPeople, isLoading, people, error } =
    peoplesStore;

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
      <Button variant="danger" onClick={buttonHandlerClearData}>
        Очистить данные
      </Button>

      {people.length !== 0 && (
        <table>
          <thead>
            <tr>
              <th>Created</th>
              <th>Birth year</th>
              <th>Eye color</th>
              <th>Gender</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {people.map((item) => (
              <tr key={item.created}>
                <td>{item.created}</td>
                <td>{item.birth_year}</td>
                <td>{item.eye_color}</td>
                <td>{item.gender}</td>
                <td>{item.name}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={5} onClick={loadMore}>
                Загрузить ещё
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
});

export default HomePage;
