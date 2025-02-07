/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState } from "react";

const TaskContext = createContext<any>(null);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedSubTask, setSelectedSubTask] = useState<any>(null);

  return (
    <TaskContext.Provider value={{ selectedSubTask, setSelectedSubTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
