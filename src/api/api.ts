import { BASE_API_URL } from "@/vars/baseApiUrl";
import { IResponse } from "@/types/peopleData";
import ky from "ky";

class Api {
  async getData(page: number | null | undefined = 1): Promise<IResponse> {
    try {
      return await ky.get(`${BASE_API_URL}?page=${page}`).json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to fetch data");
    }
  }
}

export const api = new Api();
