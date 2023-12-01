import { api } from "@/api/api";
import { FormPeopleType } from "@/types/formPeople";
import { IPeople, IResponse } from "@/types/peopleData";
import { getDataFromLS, saveDataToLS } from "@/utils/localStorage";
import { BASE_API_URL } from "@/vars/baseApiUrl";
import { makeAutoObservable, runInAction } from "mobx";

interface IpeopleStore {
  getData: () => void;
  loadMore: () => void;
  setSearch: (value: string) => void;
  addItem: (obj: IPeople) => void;
  removeItem: (key: string) => void;
  setsortedArrayToLS: (arr: IPeople[]) => void;
  clearData: () => void;
  isLoading: boolean;
  people: IPeople[];
  totalCount: number | null;
  error: string | null;
  nextPage: number | null;
  search: string;
}

class PeoplesStore implements IpeopleStore {
  constructor() {
    makeAutoObservable(this);
    this.updateDataFromLS();
  }

  isLoading: boolean = false;
  people: IPeople[] = [];
  totalCount: number | null = 0;
  error: string | null = null;
  nextPage: number | null = 1;
  search: string = "";

  getData = async () => {
    await this.handleDataLoading(api.getData);
  };

  loadMore = async () => {
    if (this.nextPage !== null) {
      await this.handleDataLoading(api.getData, this.nextPage);
    }
  };

  setSearch = (value: string) => {
    this.search = value;
  };

  addItem = (obj: FormPeopleType) => {
    this.people = [...this.people, obj];

    if (this.people.length === 1) {
      this.nextPage = 1;
    }

    saveDataToLS(this.people, "people");
  };

  removeItem = (key: string) => {
    this.people = this.people.filter((item) => item.created !== key);

    saveDataToLS(this.people, "people");
  };

  setsortedArrayToLS = (arr: IPeople[]) => {
    saveDataToLS(arr, "people");
  };

  clearData = () => {
    this.people = [];
    this.nextPage = null;
    this.totalCount = 0;

    localStorage.clear();
  };

  private handleDataLoading = async (
    apiCall: (url: string) => Promise<IResponse>,
    nextPage?: number | null
  ) => {
    this.isLoading = true;
    this.error = null;

    try {
      const data = await apiCall(BASE_API_URL + `?page=${nextPage || 1}`);

      runInAction(() => {
        if (nextPage !== null) {
          this.people = [...this.people, ...data.results];
        } else {
          this.people = data.results;
        }

        saveDataToLS(this.people, "people");

        this.totalCount = data.count;
        saveDataToLS(data.count, "totalCount");

        // делим строку https://data.com/?page=1 по знаку =
        this.nextPage = data.next === null ? null : +data.next.split("=")[1];
        saveDataToLS(this.nextPage, "nextPage");
      });
    } catch (error: unknown) {
      runInAction(() => {
        this.error =
          (error as Error).message || "Что-то пошло не так при загрузке данных";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  private updateDataFromLS = () => {
    const people = getDataFromLS<IPeople[]>("people", []);
    const nextPage = getDataFromLS<number>("nextPage", 1);
    const totalCount = getDataFromLS<number>("totalCount");

    if (people !== undefined) this.people = people;
    if (nextPage !== undefined) this.nextPage = nextPage;
    if (totalCount !== undefined) this.totalCount = totalCount;
  };
}

export default new PeoplesStore();
