import { ButtonHTMLAttributes, ReactNode } from "react";
import classes from "./Button.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button = ({ children, ...props }: Props) => {
  return (
    <button className={classes.button} {...props}>
      {children}
    </button>
  );
};
