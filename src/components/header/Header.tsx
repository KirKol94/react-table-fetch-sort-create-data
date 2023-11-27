import { Link } from "react-router-dom";
import classes from "./header.module.scss";
import clsx from "clsx";
import { useHeader } from "./useHeader";
import { Input } from "../input";
import { observer } from "mobx-react-lite";

export const Header = observer(() => {
  const { links, pathname, handleChange, peopleLength } = useHeader();

  return (
    <header className={classes.header}>
      <div className={classes.header__container}>
        <Input
          disabled={!peopleLength}
          placeholder="Search name"
          onChange={handleChange}
        />

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
});
