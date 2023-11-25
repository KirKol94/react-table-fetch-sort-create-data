import { ButtonHTMLAttributes, ReactNode } from "react";
import classes from "./Button.module.scss";
import clsx from "clsx";

type VariantButton = "danger" | "primary";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: VariantButton;
}

export const Button = ({ children, variant = "primary", ...props }: Props) => {
  return (
    <button
      className={clsx(classes.button, variant === "danger" && classes.danger)}
      {...props}
    >
      {children}
    </button>
  );
};
