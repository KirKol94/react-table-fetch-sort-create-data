import { Link } from "react-router-dom";
import classes from "./header.module.scss";
import clsx from "clsx";
import { useHeader } from "./useHeader";
import { HEADER_LINKS } from "@/vars/links";

export const Header = () => {
  const { pathname } = useHeader();

  return (
    <header className={classes.header}>
      <div className={classes.header__container}>
        <nav>
          <ul className={classes.list}>
            {HEADER_LINKS.map(({ url, name }) => (
              <li key={url} className={classes.item}>
                <Link
                  to={url}
                  className={clsx(
                    classes.link,
                    pathname === url && classes.active
                  )}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};
