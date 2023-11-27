import peoplesStore from "@/store/peoplesStore";
import { IPeople } from "@/types/people-list";
import { useState, useEffect } from "react";

export const useTable = () => {
  const { setsortedArrayToLS, people, totalCount } = peoplesStore;
  const [sortedArray, setSortedArray] = useState<IPeople[]>(people);
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
    setsortedArrayToLS(sorted);
  };

  const getArrow = (field: keyof IPeople) => {
    if (field === sortColumn) {
      return sortDirection === "asc" ? "↓" : "↑";
    }
    return "";
  };

  useEffect(() => {
    setSortedArray(people);
  }, [people]);

  return { getArrow, sortByField, sortedArray, totalCount, people };
};
