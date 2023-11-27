import { ReactNode } from "react";
import classes from "./EmptyData.module.scss";

interface IEmptyDataProps {
  children?: ReactNode;
}

export const EmptyData = ({
  children = "No data, click the button to load it",
}: IEmptyDataProps) => {
  return <div className={classes.empty}>{children}</div>;
};
