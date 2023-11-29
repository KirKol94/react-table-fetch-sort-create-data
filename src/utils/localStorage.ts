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
//
//
//

// function useLocalStorage<T>(key: string, initialValue?: T) {
//   const [storedValue, setStoredValue] = useState<T>(() => {
//     if (typeof window === "undefined") {
//       return initialValue;
//     }
//     try {
//       const item = window.localStorage.getItem(key);

//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       console.error(error);

//       return initialValue;
//     }
//   });
//   const setValue = (value: T | ((val: T) => T)) => {
//     try {
//       const valueToStore =
//         value instanceof Function ? value(storedValue) : value;
//       setStoredValue(valueToStore);
//       if (typeof window !== "undefined") {
//         if (valueToStore !== null) {
//           window.localStorage.setItem(key, JSON.stringify(valueToStore));
//         } else {
//           window.localStorage.removeItem(key);
//         }
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getAllValues = () => {
//     return localStorage;
//   };

//   useEffect(() => {
//     setStoredValue(() => {
//       if (typeof window === "undefined") {
//         return initialValue;
//       }
//       try {
//         const item = window.localStorage.getItem(key);

//         return item ? JSON.parse(item) : initialValue;
//       } catch (error) {
//         console.error(error);

//         return initialValue;
//       }
//     });
//   }, [key]);

//   return [storedValue, setValue, getAllValues] as const;
// }

// export default useLocalStorage;
