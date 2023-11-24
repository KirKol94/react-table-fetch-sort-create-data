import { ReactNode } from "react";
import classes from "./Button.module.scss";

type ButtonType = "button" | "submit";

interface Props {
  children: ReactNode;
  type?: ButtonType;
}

export const Button = ({ children, type = "button" }: Props) => {
  return (
    <button type={type} className={classes.button}>
      {children}
    </button>
  );
};
