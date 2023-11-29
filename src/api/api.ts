import { IResponse } from "@/types/people-list";
import ky from "ky";

class Api {
  async getData(page: number | null | undefined = 1): Promise<IResponse> {
    try {
      return await ky.get(`https://swapi.dev/api/people/?page=${page}`).json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to fetch data");
    }
  }
}

export const api = new Api();
