import { IResponse, UrlType } from "@/types/people-list";
import ky from "ky";

class Api {
  constructor() {
    this.url = `https://swapi.dev/api/people/`;
  }

  url = "";

  async getData(page = 1): Promise<IResponse> {
    return await ky(`${this.url}?page=${page}`).json();
  }
}

export const api = new Api();
