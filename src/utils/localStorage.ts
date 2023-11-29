export const saveDataToLS = <T>(data: T, keyName: string) => {
  JSON.stringify(data);
  try {
    localStorage.setItem(
      keyName,
      typeof data === "string" ? data : JSON.stringify(data)
    );
  } catch (error) {
    console.error(
      "Error saving data to localStorage:",
      (error as Error).message
    );
  }
};

export const getDataFromLS = <T>(
  key: string,
  initialValue?: T
): T | undefined => {
  const data = localStorage.getItem(key);

  if (data) {
    try {
      return JSON.parse(data) as T;
    } catch (error) {
      console.error(
        `Error parsing ${key} data from localStorage:`,
        (error as Error).message
      );
      return initialValue;
    }
  }

  return initialValue;
};
