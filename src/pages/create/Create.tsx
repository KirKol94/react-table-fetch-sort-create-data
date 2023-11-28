import { Input } from "@/components/input";
import classes from "./Create.module.scss";
import { Button } from "@/components/button";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useCreate } from "./useCreate";

const Create = observer(() => {
  const { formData, handleChange, handleSubmit, isFormCompleted, inputsData } =
    useCreate();

  return (
    <div className={clsx(classes.create, "create__container")}>
      <h1 className={classes.title}>Create new people</h1>

      <form onSubmit={handleSubmit} className={classes.form}>
        {inputsData.map((input) => (
          <Input
            key={input.key}
            name={input.key}
            placeholder={input.placeHolder}
            value={input.value}
            onChange={handleChange}
            autoComplete="off"
          />
        ))}

        <Input placeholder={formData.created} disabled />
        <Button type="submit" disabled={!isFormCompleted}>
          Отправить
        </Button>
      </form>
    </div>
  );
});

export default Create;
