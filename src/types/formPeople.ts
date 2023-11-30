import { IPeople } from "./peopleData";

export type FormPeopleType = Pick<
  IPeople,
  "birth_year" | "eye_color" | "gender" | "name" | "created"
>;
