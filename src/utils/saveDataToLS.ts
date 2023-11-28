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
