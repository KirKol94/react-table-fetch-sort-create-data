import { Link, useLocation } from "react-router-dom";
import classes from "./header.module.scss";
import clsx from "clsx";

export const Header = () => {
  const links = [
    { url: "/", name: "Главная" },
    { url: "/description", name: "ТЗ" },
  ];

  const { pathname } = useLocation();

  return (
    <header className={classes.header}>
      <div className={classes.header__container}>
        <nav>
          <ul className={classes.list}>
            {links.map(({ url, name }) => (
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
