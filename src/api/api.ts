import ky from "ky";

class Api {
  async getData<T>(url: string): Promise<T> {
    try {
      return await ky.get(url).json();
    } catch (error: unknown) {
      console.error("Error fetching data:", (error as Error).message);
      throw new Error("Failed to fetch data");
    }
  }
}

export const api = new Api();
