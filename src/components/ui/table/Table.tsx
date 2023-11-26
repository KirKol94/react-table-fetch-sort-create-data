import { IPeople } from "@/types/people-list";
import classes from "./Table.module.scss";

interface TableProps {
  array: IPeople[];
  totalCount: number;
  onConfirmDeletion: (key: string) => void;
  loadMore: () => void;
}

export const Table = ({
  array,
  totalCount,
  loadMore,
  onConfirmDeletion,
}: TableProps) => {
  return (
    <div className={classes.wrapper}>
      <table className={classes.table}>
        <thead className={classes.thead}>
          <tr className={classes.tr}>
            <th className={classes.th}>Created</th>
            <th className={classes.th}>Birth year</th>
            <th className={classes.th}>Eye color</th>
            <th className={classes.th}>Gender</th>
            <th className={classes.th}>Name</th>
          </tr>
        </thead>

        <tbody className={classes.tbody}>
          {array.map((item) => (
            <tr
              data-title="Нажать для удаления"
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
              <button onClick={loadMore} disabled={totalCount === array.length}>
                {totalCount === array.length
                  ? "Это все данные"
                  : "Загрузить ещё"}
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
