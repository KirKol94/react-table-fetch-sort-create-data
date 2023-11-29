import classes from "./Table.module.scss";
import { observer } from "mobx-react-lite";
import { useTable } from "./useTable";
import { Loader } from "../loader";
import { TableBody } from "./tableBody";
import { TableFooter } from "./tableFooter";
import { TableHead } from "./tableHead";

interface TableProps {
  onConfirmDeletion: (key: string) => void;
  loadMore: () => void;
}

export const Table = observer(({ loadMore, onConfirmDeletion }: TableProps) => {
  const {
    getArrow,
    sortByField,
    sortedArray,
    people,
    search,
    isLoading,
    nextPage,
  } = useTable();

  if (isLoading && !people.length) {
    return <Loader />;
  }

  return (
    <div className={classes.wrapper}>
      <table className={classes.table}>
        <TableHead getArrow={getArrow} sortByField={sortByField} />

        <TableBody
          array={sortedArray}
          search={search}
          handleRowClick={onConfirmDeletion}
        />

        <TableFooter
          handleClick={loadMore}
          isLoading={isLoading}
          nextPage={nextPage}
        />
      </table>
    </div>
  );
});
