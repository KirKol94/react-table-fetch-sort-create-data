export const saveDataToLS = <T>(data: T, keyName: string) => {
  try {
    localStorage.setItem(
      keyName,
      typeof data === "string" ? data : JSON.stringify(data)
    );
    console.log(`${keyName} data saved to localStorage.`);
  } catch (error) {
    console.error("Error saving data to localStorage:", error.message);
  }
};
