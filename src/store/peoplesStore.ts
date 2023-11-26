import { api } from "@/api/api";
import { IPeople, UrlType } from "@/types/people-list";
import { saveDataToLS } from "@/utils/saveDataToLS";
import { makeAutoObservable } from "mobx";

class PeoplesStore {
  constructor() {
    makeAutoObservable(this);
    this.updateDataFromLS();
  }

  isLoading: boolean = false;
  people: IPeople[] = [];
  totalCount: number = 0;
  error: string | null = null;
  nextPage: number | null = 1;

  getData = async () => {
    this.setLoadingStart();
    try {
      const data = await api.getData();
      this.setPeople(data.results);
      this.setTotalCount(data.count);
      this.setNextPage(data.next);
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "message" in error) {
        this.error = (error as Error).message;
      } else {
        this.error = "Что-то пошло не так при загрузке данных";
      }
    } finally {
      this.setLoadingFinished();
    }
  };

  loadMore = async () => {
    if (this.nextPage !== null && this.people.length !== this.totalCount) {
      this.setLoadingStart();
      const moreData = await api.getData(this.nextPage);
      try {
        this.setPeople([...this.people, ...moreData.results]);
        this.setNextPage(moreData.next);

        saveDataToLS(this.nextPage, "nextPage");
      } catch (error: unknown) {
        console.log((error as Error).message);
      } finally {
        this.setLoadingFinished();
      }
    }
  };

  removeItem = (key: string) => {
    debugger;
    this.people = this.people.filter((item) => item.created !== key);

    saveDataToLS(this.people, "people");
  };

  setsortedArrayToLS = (arr: IPeople[]) => {
    saveDataToLS(arr, "people");
  };

  clearPeople = () => {
    this.people = [];
    this.nextPage = null;
    this.totalCount = 0;

    localStorage.clear();
  };

  private setLoadingStart = () => {
    this.isLoading = true;
    this.error = null;
  };

  private setLoadingFinished = () => {
    this.isLoading = false;
  };

  private setPeople = (array: IPeople[]) => {
    this.people = array;
    saveDataToLS(this.people, "people");
  };

  private setTotalCount = (count: number) => {
    this.totalCount = count;
    saveDataToLS(this.totalCount, "totalCount");
  };

  private setNextPage = (url: UrlType) => {
    (this.nextPage = url !== null ? +url.split("=")[1] : null),
      saveDataToLS(this.nextPage, "nextPage");
  };

  private updateDataFromLS = () => {
    const storedPeople = localStorage.getItem("people");
    const storedTotalCount = localStorage.getItem("totalCount");
    const storednextPage = localStorage.getItem("nextPage");

    if (storedPeople && storedTotalCount && storednextPage) {
      try {
        this.people = JSON.parse(storedPeople);
        this.totalCount = JSON.parse(storedTotalCount);
        this.nextPage = JSON.parse(storednextPage);
      } catch (error) {
        console.error("Error parsing people data from localStorage:", error);
      }
    }
  };
}

export default new PeoplesStore();
