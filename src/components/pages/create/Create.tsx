import { Input } from "@/components/ui/input";
import classes from "./Create.module.scss";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { IPeople } from "@/types/people-list";
import { observer } from "mobx-react-lite";
import PeoplesStore from "@/store/peoplesStore";
import { useNavigate } from "react-router-dom";

const Create = observer(() => {
  const navigate = useNavigate();

  const { addItem } = PeoplesStore;

  const [formData, setFormData] = useState<IPeople>({
    name: "",
    eye_color: "",
    gender: "",
    birth_year: "",
    created: new Date().toString(),
    height: "",
    mass: "",
    hair_color: "",
    skin_color: "",
    homeworld: "",
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    edited: "",
    url: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    addItem(formData);

    navigate("/");
  };

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
        <Button type="submit">Отправить</Button>
      </form>
    </div>
  );
});

export default Create;
