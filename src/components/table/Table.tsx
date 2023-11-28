import classes from "./Table.module.scss";
import { observer } from "mobx-react-lite";
import { useTable } from "./useTable";
import { Loader } from "../loader";

interface TableProps {
  onConfirmDeletion: (key: string) => void;
  loadMore: () => void;
}

export const Table = observer(({ loadMore, onConfirmDeletion }: TableProps) => {
  const {
    getArrow,
    sortByField,
    sortedArray,
    totalCount,
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
        <thead className={classes.thead}>
          <tr className={classes.tr}>
            <th className={classes.th}>Created</th>
            <th className={classes.th}>Birth year</th>
            <th
              className={classes.th}
              data-sort
              data-arrow={getArrow("eye_color")}
              onClick={() => sortByField("eye_color")}
            >
              Eye color
            </th>
            <th
              className={classes.th}
              data-sort
              data-arrow={getArrow("gender")}
              onClick={() => sortByField("gender")}
            >
              Gender
            </th>
            <th
              className={classes.th}
              data-sort
              data-arrow={getArrow("name")}
              onClick={() => sortByField("name")}
            >
              Name
            </th>
          </tr>
        </thead>

        <tbody className={classes.tbody}>
          {sortedArray
            .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
            .map((item) => (
              <tr
                key={item.created}
                className={classes.tr}
                onClick={() => onConfirmDeletion(item.created)}
              >
                <td className={classes.td}>{item.created}</td>
                <td className={classes.td}>{item.birth_year}</td>
                <td className={classes.td}>{item.eye_color}</td>
                <td className={classes.td}>{item.gender}</td>
                <td className={classes.td}>{item.name}</td>
              </tr>
            ))}
        </tbody>

        <tfoot>
          <tr className={classes.tr}>
            <td colSpan={5} className={classes["load-more"]}>
              <button
                onClick={loadMore}
                disabled={
                  isLoading ||
                  nextPage === null ||
                  Boolean(totalCount && totalCount <= people.length)
                }
              >
                Load more
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
});
