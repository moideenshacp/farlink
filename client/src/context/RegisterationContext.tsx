/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, ReactNode, useEffect } from "react";

interface RegistrationData {
  companyName: string;
  companyDescription: string;
  industry: string;

}

export const RegistrationCompanyContext = createContext<any>(null)

export const RegistrationProvider = ({ children }: { children: ReactNode }) => {
  const [registrationData, setRegistrationData] = useState<RegistrationData>(() => {
    const savedData = localStorage.getItem("registrationData");
    return savedData ? JSON.parse(savedData) : { companyName: "", companyDescription: "", industry: "" };
  });

  useEffect(() => {
    localStorage.setItem("registrationData", JSON.stringify(registrationData));
  }, [registrationData]);

  return (
    <RegistrationCompanyContext.Provider value={{ registrationData,setRegistrationData }}>
      {children}
    </RegistrationCompanyContext.Provider>
  );
};
