import { useNavigate } from "react-router-dom";
import peoplesStore from "@/store/peoplesStore";
import { IPeople } from "@/types/people-list";
import { useState, ChangeEvent, FormEvent } from "react";

interface ICreateDate {
  formData: IPeople;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => void;
}

export const useCreate = (): ICreateDate => {
  const navigate = useNavigate();

  const { addItem } = peoplesStore;

  const [formData, setFormData] = useState<IPeople>({
    name: "",
    eye_color: "",
    gender: "",
    birth_year: "",
    created: new Date().toString(),
    height: "1234",
    mass: "1234",
    hair_color: "",
    skin_color: "1234",
    homeworld: "1234",
    films: ["1234"],
    species: ["1234"],
    vehicles: ["1234"],
    starships: ["1234"],
    edited: "1234",
    url: "i1234",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    addItem(formData);

    navigate("/");
  };

  return { formData, handleChange, handleSubmit };
};
