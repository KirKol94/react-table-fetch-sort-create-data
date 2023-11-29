import { api } from "@/api/api";
import { IPeople } from "@/types/people-list";
import { saveDataToLS } from "@/utils/saveDataToLS";
import { makeAutoObservable, runInAction } from "mobx";

class PeoplesStore {
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
    this.isLoading = true;

    try {
      const data = await api.getData();

      runInAction(() => {
        this.people = data.results;
        saveDataToLS(data.results, "people");
        this.totalCount = data.count;
        saveDataToLS(data.count, "totalCount");
        (this.nextPage = data.next !== null ? +data.next.split("=")[1] : null),
          saveDataToLS(this.nextPage, "nextPage");
      });
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "message" in error) {
        runInAction(() => {
          this.error = (error as Error).message;
        });
      } else {
        runInAction(() => {
          this.error = "Что-то пошло не так при загрузке данных";
        });
      }
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  loadMore = async () => {
    this.isLoading = true;

    if (this.nextPage !== null) {
      try {
        const moreData = await api.getData(this.nextPage);

        runInAction(() => {
          this.people = [...this.people, ...moreData.results];
          saveDataToLS(this.people, "people");
          this.totalCount = moreData.count;
          saveDataToLS(moreData.count, "totalCount");
          (this.nextPage =
            moreData.next !== null ? +moreData.next.split("=")[1] : null),
            saveDataToLS(this.nextPage, "nextPage");
        });
      } catch (error: unknown) {
        if (typeof error === "object" && error !== null && "message" in error) {
          runInAction(() => {
            this.error = (error as Error).message;
          });
        } else {
          runInAction(() => {
            this.error = "Что-то пошло не так при загрузке данных";
          });
        }
      } finally {
        runInAction(() => {
          this.isLoading = false;
        });
      }
    }
  };

  setSearch = (value: string) => {
    this.search = value;
  };

  addItem = (obj: IPeople) => {
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

  clearPeople = () => {
    this.people = [];
    this.nextPage = null;
    this.totalCount = 0;

    localStorage.clear();
  };

  private updateDataFromLS = () => {
    const storedPeople = localStorage.getItem("people");
    const storedTotalCount = localStorage.getItem("totalCount");
    const storedNextPage = localStorage.getItem("nextPage");

    if (storedPeople || storedTotalCount || storedNextPage) {
      try {
        this.people = storedPeople ? JSON.parse(storedPeople) : [];
        this.totalCount = storedTotalCount ? JSON.parse(storedTotalCount) : 0;
        this.nextPage = storedNextPage ? JSON.parse(storedNextPage) : 1;
      } catch (error) {
        console.error("Error parsing people data from localStorage:", error);
      }
    }
  };
}

export default new PeoplesStore();
