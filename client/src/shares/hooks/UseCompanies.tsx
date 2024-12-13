import { useContext } from "react";
import { CompaniesContext } from "../../context/CompaniesContext";

export const useCompanies = ()=> useContext(CompaniesContext)