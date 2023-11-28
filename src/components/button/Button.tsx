import { ButtonHTMLAttributes, ReactNode } from "react";
import classes from "./Button.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { PATH } from "@/consts/paths";

type VariantButton = "danger" | "primary" | "secondaty";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: VariantButton;
  isLink?: boolean;
  url?: PATH;
}

export const Button = ({
  children,
  isLink,
  url = PATH.BASE,
  variant = "primary",
  ...props
}: Props) => {
  const classNameList = clsx(
    classes.button,
    variant === "primary" && classes.primary,
    variant === "secondaty" && classes.secondary,
    variant === "danger" && classes.danger
  );

  return (
    <>
      {isLink ? (
        <Link to={url} className={classNameList}>
          {children}
        </Link>
      ) : (
        <button className={classNameList} {...props}>
          {children}
        </button>
      )}
    </>
  );
};
