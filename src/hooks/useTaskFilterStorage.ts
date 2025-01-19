import { useState, useEffect } from "react";

const useTaskFilterStorage = () => {
  const [filter, setFilter] = useState(() => {
    const storedFilter = localStorage.getItem("taskFilter");
    return storedFilter
      ? JSON.parse(storedFilter)
      : {
          text: "",
          priority: { none: true, low: true, medium: true, high: true },
        };
  });

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("taskFilter", JSON.stringify(filter));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [filter]);

  return [filter, setFilter];
};

export default useTaskFilterStorage;
