import { useNavigate } from "react-router-dom";
import peoplesStore from "@/store/peoplesStore";
import { IPeople } from "@/types/peopleData";
import { useState, ChangeEvent, FormEvent } from "react";
import { PATH } from "@/vars/paths";
import { FormPeopleType } from "@/types/formPeople";

interface IInputData {
  key: keyof IPeople;
  value: string;
  placeHolder: string;
}

interface ICreateDate {
  formData: FormPeopleType;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => void;
  isFormCompleted: boolean;
  inputsData: IInputData[];
}

export const useCreate = (): ICreateDate => {
  const navigate = useNavigate();

  const { addItem } = peoplesStore;

  const [formData, setFormData] = useState<FormPeopleType>({
    name: "",
    eye_color: "",
    gender: "",
    birth_year: "",
    created: new Date().toString(),
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

    navigate(PATH.BASE, { state: { from: PATH.CREATE } });
  };

  const inputsData: IInputData[] = [
    {
      key: "birth_year",
      value: formData.birth_year,
      placeHolder: "Birth year",
    },
    { key: "eye_color", value: formData.eye_color, placeHolder: "Eye color" },
    { key: "gender", value: formData.gender, placeHolder: "Gender" },
    { key: "name", value: formData.name, placeHolder: "Name" },
  ];

  const isFormCompleted = !inputsData.some((input) => input.value === "");

  return { formData, handleChange, handleSubmit, isFormCompleted, inputsData };
};
