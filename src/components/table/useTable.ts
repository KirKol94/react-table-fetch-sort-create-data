import peoplesStore from "@/store/peoplesStore";
import { IPeople } from "@/types/people-list";
import { useState, useEffect } from "react";

enum SortOrder {
  ASC = "asc",
  DESC = "desc",
  NONE = "",
}

enum ArrowDirection {
  NONE = "",
  DOWN = "↓",
  UP = "↑",
}

interface ITableData {
  getArrow: (field: keyof IPeople) => ArrowDirection;
  sortByField: (field: keyof IPeople) => void;
  sortedArray: IPeople[];
  totalCount: number | null;
  people: IPeople[];
  search: string;
}

export const useTable = (): ITableData => {
  const { setsortedArrayToLS, people, totalCount, search } = peoplesStore;
  const [sortedArray, setSortedArray] = useState<IPeople[]>(people);
  const [sortDirection, setSortDirection] = useState<SortOrder>(SortOrder.NONE);
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
    setSortDirection(
      sortDirection === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC
    );
    setSortColumn(field);
    setsortedArrayToLS(sorted);
  };

  const getArrow = (field: keyof IPeople) => {
    if (field === sortColumn) {
      return sortDirection === SortOrder.ASC
        ? ArrowDirection.DOWN
        : ArrowDirection.UP;
    }
    return ArrowDirection.NONE;
  };

  useEffect(() => {
    setSortedArray(people);
  }, [people]);

  return { getArrow, sortByField, sortedArray, totalCount, people, search };
};
