import { IResponse, UrlType } from "@/types/people-list";
import ky from "ky";

class Api {
  constructor(url: UrlType) {
    this.url = url;
  }

  url = "";

  async getData(url = this.url): Promise<IResponse> {
    return await ky(url).json();
  }
}

export const api = new Api("https://swapi.dev/api/people/");
