export type UrlType = string | null;

export interface IPeople {
  name: string;
  height?: string;
  mass?: string;
  hair_color?: string;
  skin_color?: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld?: UrlType;
  films?: UrlType[];
  species?: UrlType[];
  vehicles?: UrlType[];
  starships?: UrlType[];
  created: string;
  edited?: string;
  url?: UrlType;
}

export interface IResponse {
  count: number;
  next: UrlType;
  previous: null | UrlType;
  results: IPeople[];
}
