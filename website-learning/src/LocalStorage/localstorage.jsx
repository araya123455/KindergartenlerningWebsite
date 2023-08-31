// Save data to localStorage
export const saveToLocalStorage = (key, data) => {
  // console.log("keyy: ", key);
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

// Retrive data from local storage
export const getFromLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
};
