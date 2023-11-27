import { IResponse } from "@/types/people-list";
import ky from "ky";

class Api {
  baseUrl = "https://swapi.dev/api/people/";

  async getData(page = 1): Promise<IResponse> {
    try {
      return await ky.get(`${this.baseUrl}?page=${page}`).json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to fetch data");
    }
  }
}

export const api = new Api();
