import { PATH } from "./paths";

interface ILink {
  url: PATH;
  name: string;
}

export const HEADER_LINKS: Readonly<ILink[]> = [
  { url: PATH.BASE, name: "Home" },
  { url: PATH.ABOUT, name: "About" },
];
