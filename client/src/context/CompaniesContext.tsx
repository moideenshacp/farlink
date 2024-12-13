/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useState } from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const CompaniesContext = createContext<any>(null)


interface Company {
    name: string;
    admin: Admin;
  }
  interface Admin {
    phone: string;
    email: string;
  }
const CompaniesProvider = ({children}:{children:ReactNode})=>{
    const [companies,setCompanies] = useState<Company[]>([])
    return(
        <CompaniesContext.Provider value={{companies,setCompanies}} >
            {children}
        </CompaniesContext.Provider>
    )
}

export default CompaniesProvider