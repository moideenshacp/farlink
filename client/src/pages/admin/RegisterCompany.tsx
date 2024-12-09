import { useState } from "react";
import Step1 from "../../components/admin/Step1"
import Step2 from "../../components/admin/Step2";
import axios from "axios";

const RegisterCompany = () => {
  const [step1Data, setStep1Data] = useState({
    companyName: "",
    companyDescription: "",
    industry: "",
  });

  const handleStep1Submit = (data: typeof step1Data) => {
    setStep1Data(data);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFinalSubmit = async (step2Data: any) => {
    // Combine Step 1 and Step 2 data
    const finalData = { ...step1Data, ...step2Data };

    try {
      // Send combined data to backend
      await axios.post("/api/submit-all", finalData);
      console.log("Data sent successfully");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div>
      {/* Pass step1Data and handleStep1Submit to Step1 */}
      <Step1 onSubmit={handleStep1Submit} />
      
      {/* Pass step1Data and handleFinalSubmit to Step2 */}
      <Step2 step1Data={step1Data} onSubmit={handleFinalSubmit} />
    </div>
  );
};

export default RegisterCompany;
