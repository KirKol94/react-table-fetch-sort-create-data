import { api } from "@/api/api";
import { IPeople } from "@/types/people-list";
import ky from "ky";
import { makeAutoObservable } from "mobx";

class PeoplesStore {
  people: IPeople[] = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async getPeople() {
    const people = await api.getPeopse();
    console.log(people);
  }
}

export default new PeoplesStore();
