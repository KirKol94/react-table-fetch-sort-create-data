import { IPeople, IResponse } from "@/types/people-list";
import ky from "ky";

class Api {
  async getData(): Promise<IResponse> {
    return await ky("https://swapi.dev/api/people/").json();
  }

  async getPeopse(): Promise<IPeople[]> {
    const data: IResponse = await ky("https://swapi.dev/api/people/").json();
    return data.results;
  }
}

export const api = new Api();
