import { ButtonHTMLAttributes, ReactNode } from "react";
import classes from "./Button.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";

type VariantButton = "danger" | "primary" | "secondaty";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: VariantButton;
  isLink?: boolean;
  url?: string | undefined;
}

export const Button = ({
  children,
  isLink,
  url = "",
  variant = "primary",
  ...props
}: Props) => {
  if (isLink) {
    return (
      <Link
        to={url}
        className={clsx(
          classes.button,
          variant === "danger" && classes.danger,
          variant === "secondaty" && classes.secondaty
        )}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={clsx(
        classes.button,
        variant === "danger" && classes.danger,
        variant === "secondaty" && classes.secondaty
      )}
      {...props}
    >
      {children}
    </button>
  );
};
