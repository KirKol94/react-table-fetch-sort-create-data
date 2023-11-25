import { api } from "@/api/api";
import { IPeople, UrlType } from "@/types/people-list";
import { makeAutoObservable, runInAction } from "mobx";

class PeoplesStore {
  constructor() {
    makeAutoObservable(this);
  }

  isLoading: boolean = false;
  people: IPeople[] = [];
  error: string | null = null;
  nextUrl: UrlType = "";

  getData = async () => {
    this.setLoadingStart();
    try {
      const data = await api.getData();
      this.setPeople(data.results);
      this.nextUrl = data.next;
    } catch (error: any) {
      this.error = error.message || "Что-то пошло не так при загрузке данных";
    } finally {
      this.setLoadingFinished();
    }
  };

  loadMore = async () => {
    if (this.nextUrl !== "") {
      this.setLoadingStart();

      const moreData = await api.getData(this.nextUrl);

      try {
        this.setPeople([...this.people, ...moreData.results]);
        this.nextUrl = moreData.next;
      } catch (error: any | unknown) {
        console.log(error.message);
      } finally {
        this.setLoadingFinished();
      }
    }
  };

  clearPeople = () => {
    this.people = [];
    this.nextUrl = "";
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
  };
}

export default new PeoplesStore();
