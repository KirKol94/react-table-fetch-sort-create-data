import { InputHTMLAttributes } from "react";
import classes from "./Input.module.scss";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
export const Input = ({ className, ...props }: InputProps) => {
  return <input className={clsx(classes.input, className)} {...props} />;
};
