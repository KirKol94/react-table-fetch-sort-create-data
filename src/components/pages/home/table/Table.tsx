import { IPeople } from "@/types/people-list";
import { useState } from "react";
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
  const [sortedArray, setSortedArray] = useState<IPeople[]>(array);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null
  );
  const [sortColumn, setSortColumn] = useState<keyof IPeople | null>(null);

  const sortByField = (field: keyof IPeople) => {
    const sorted = sortedArray.slice().sort((a, b) => {
      const aValue = (a[field] as string).toString();
      const bValue = (b[field] as string).toString();

      if (sortDirection === "asc") {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      } else {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      }
    });

    setSortedArray(sorted);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    setSortColumn(field);
  };

  const getArrow = (field: keyof IPeople) => {
    if (field === sortColumn) {
      return sortDirection === "asc" ? "↓" : "↑";
    }
    return "";
  };

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
          {sortedArray.map((item) => (
            <tr
              key={item.created}
              className={classes.tr}
              data-title="&times;"
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
