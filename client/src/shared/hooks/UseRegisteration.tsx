import { useContext } from "react";
import { RegistrationCompanyContext } from "../../context/RegisterationContext";

export const useCompanyBasicData = () => useContext(RegistrationCompanyContext);
