import { IPeople } from "@/types/people-list";
import { TableBodyRow } from "../tableBodyRow";

interface TableBodyProps {
  array: IPeople[];
  search: string;
  handleRowClick: (key: string) => void;
}

export const TableBody = ({
  array,
  search,
  handleRowClick,
}: TableBodyProps) => {
  return (
    <tbody>
      {array
        .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
        .map((item) => (
          <TableBodyRow
            key={item.created}
            data={item}
            handleClick={handleRowClick}
          />
        ))}
    </tbody>
  );
};
