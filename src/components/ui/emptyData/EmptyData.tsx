import classes from "./EmptyData.module.scss";

export const EmptyData = () => {
  return (
    <div className={classes.empty}>
      Данные отсутствуют, нажмите кнопку, чтобы загрузить их
    </div>
  );
};
