import { useLocation } from "react-router-dom";

export const useHeader = () => {
  const links = [
    { url: "/", name: "Главная" },
    { url: "/description", name: "ТЗ" },
  ];

  const { pathname } = useLocation();

  return { links, pathname };
};
