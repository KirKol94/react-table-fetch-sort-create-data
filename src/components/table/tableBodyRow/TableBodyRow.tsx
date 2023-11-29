import { IPeople } from "@/types/people-list";

interface TableBodyRowProps {
  data: IPeople;
  handleClick: (key: string) => void;
}

export const TableBodyRow = ({ data, handleClick }: TableBodyRowProps) => {
  return (
    <tr onClick={() => handleClick(data.created)}>
      <td>{data.created}</td>
      <td>{data.birth_year}</td>
      <td>{data.eye_color}</td>
      <td>{data.gender}</td>
      <td>{data.name}</td>
    </tr>
  );
};
