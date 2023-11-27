import { Input } from "@/components/input";
import classes from "./Create.module.scss";
import { Button } from "@/components/button";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useCreate } from "./useCreate";
import { useState, useEffect } from "react";

const Create = observer(() => {
  const { formData, handleChange, handleSubmit } = useCreate();

  const [formCompleted, setFormCompleted] = useState(false);

  useEffect(() => {
    const isFormCompleted =
      formData.birth_year !== "" &&
      formData.created !== "" &&
      formData.eye_color !== "" &&
      formData.gender !== null &&
      formData.name !== "";
    setFormCompleted(isFormCompleted);
  }, [formData]);

  return (
    <div className={clsx(classes.create, "create__container")}>
      <h1 className={classes.title}>Create new people</h1>

      <form onSubmit={handleSubmit} className={classes.form}>
        <Input
          required
          name="birth_year"
          placeholder="Birth year 1"
          value={formData.birth_year}
          onChange={handleChange}
        />
        <Input
          required
          name="eye_color"
          placeholder="Eye color"
          value={formData.eye_color}
          onChange={handleChange}
        />
        <Input
          required
          name="gender"
          placeholder="Gender"
          value={formData.gender}
          onChange={handleChange}
        />
        <Input
          required
          name="name"
          placeholder="name"
          value={formData.name}
          onChange={handleChange}
        />
        <Input placeholder={new Date().toString()} disabled />
        <Button type="submit" disabled={!formCompleted}>
          Отправить
        </Button>
      </form>
    </div>
  );
});

export default Create;
