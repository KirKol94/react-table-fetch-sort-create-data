import { useNavigate } from "react-router-dom";
import peoplesStore from "@/store/peoplesStore";
import { IPeople } from "@/types/people-list";
import { useState, ChangeEvent, FormEvent } from "react";
import { observer } from "mobx-react-lite";

export const useCreate = () => {
  const navigate = useNavigate();

  const { addItem } = peoplesStore;

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

  return { handleChange, handleSubmit };
};
