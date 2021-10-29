import { useContext, createContext, useState, useEffect } from "react";

const ArchiveContext = createContext({});

export function useArchive() {
  return useContext(ArchiveContext);
}

export function ArchiveProvider({ archiveData, types, children }) {
  const [filterBy, setFilterBy] = useState("all");
  const [data, setData] = useState(archiveData);

  useEffect(() => {
    if (filterBy === "all") setData(archiveData);
    else {
      const newData = archiveData.filter((el) => el.type === filterBy);
      setData(newData);
    }
    window.scrollTop;
  }, [filterBy]);

  const value = { filterBy, setFilterBy, data, types };

  return (
    <ArchiveContext.Provider value={value}>{children}</ArchiveContext.Provider>
  );
}
