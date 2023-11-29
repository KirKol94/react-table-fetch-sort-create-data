import { IPeople } from "@/types/peopleData";
import { ArrowDirection } from "../useTable";

interface TableHeadProps {
  getArrow: (field: keyof IPeople) => ArrowDirection;
  sortByField: (field: keyof IPeople) => void;
}

export const TableHead = ({ getArrow, sortByField }: TableHeadProps) => {
  return (
    <thead>
      <tr>
        <th>Created</th>
        <th>Birth year</th>
        <th
          data-sort
          data-arrow={getArrow("eye_color")}
          onClick={() => sortByField("eye_color")}
        >
          Eye color
        </th>
        <th
          data-sort
          data-arrow={getArrow("gender")}
          onClick={() => sortByField("gender")}
        >
          Gender
        </th>
        <th
          data-sort
          data-arrow={getArrow("name")}
          onClick={() => sortByField("name")}
        >
          Name
        </th>
      </tr>
    </thead>
  );
};
