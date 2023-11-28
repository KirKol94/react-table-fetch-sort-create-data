import { useLocation } from "react-router-dom";

interface IHeaderData {
  pathname: string;
}

export const useHeader = (): IHeaderData => {
  const { pathname } = useLocation();

  return { pathname };
};
