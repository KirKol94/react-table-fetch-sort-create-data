import peoplesStore from "@/store/peoplesStore";
import { ChangeEvent } from "react";
import { useLocation } from "react-router-dom";

interface ILink {
  url: string;
  name: string;
}

interface IHeaderData {
  links: ILink[];
  pathname: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const useHeader = (): IHeaderData => {
  const links: ILink[] = [
    { url: "/", name: "Home" },
    { url: "/description", name: "Tasks" },
  ];

  const { pathname } = useLocation();
  const { setSearch } = peoplesStore;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return { links, pathname, handleChange };
};
