import { useLocation } from "react-router-dom";

interface ILink {
  url: string;
  name: string;
}

interface IHeaderData {
  links: ILink[];
  pathname: string;
}

export const useHeader = (): IHeaderData => {
  const links: ILink[] = [
    { url: "/", name: "Home" },
    { url: "/description", name: "Tasks" },
  ];

  const { pathname } = useLocation();

  return { links, pathname };
};
