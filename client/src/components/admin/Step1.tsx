import React from "react";
import logo from "../../assets/EmailLogo.png";
import Footer from "../../shares/components/landingPageComponents/Footer";
import { useCompanyBasicData } from "../../shares/hooks/UseRegisteration";
import { useNavigate } from "react-router-dom";
import { useValidation } from "../../shares/hooks/useCompanyValidations";

const Step1 = () => {
  const navigate = useNavigate();
  const { registrationData, setRegistrationData } = useCompanyBasicData();
  const { errors, validate, setErrors } = useValidation(registrationData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      navigate("/step-2");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setRegistrationData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center mb-6">
          <img src={logo} alt="FarLink Logo" className="mx-auto w-56 mb-1" />
        </div>
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
          <div className="text-sm text-gray-500 text-center mb-4">
            <span className="bg-[#D9D9D9] text-[#FFFFFF] font-inter font-extrabold px-3 py-2 rounded-full">
              step 1/3
            </span>{" "}
          </div>
          <h2 className="text-center text-lg font-semibold text-gray-700 mb-6">
            Welcome to FarLink, let's get you set up in 3 easy steps.
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-gray-700"
              >
                Add your company name
              </label>
              <input
                type="text"
                id="companyName"
                placeholder="Enter your company name"
                value={registrationData.companyName}
                onChange={handleInputChange}
                name="companyName"
                className="mt-1 block w-full p-3 border border-[#80BDFF] rounded-md shadow-sm focus:outline-none focus:ring-1 shadow-[#6C757D] focus:ring-[#4361EE] focus:border-[#4361EE]"
              />
              {errors.companyName && (
                <p className="text-sm text-red-500">{errors.companyName}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="companyDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Add your company description
              </label>
              <textarea
                id="companyDescription"
                placeholder="Enter your company description"
                value={registrationData.companyDescription}
                name="companyDescription"
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-[#80BDFF] rounded-md shadow-sm focus:outline-none focus:ring-1 shadow-[#6C757D] focus:ring-[#4361EE] focus:border-[#4361EE]"
                rows={3}
              ></textarea>
              {errors.companyDescription && (
                <p className="text-sm text-red-500">
                  {errors.companyDescription}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="industry"
                className="block text-sm font-medium text-gray-700"
              >
                Enter your industry
              </label>
              <input
                type="text"
                id="industry"
                value={registrationData.industry}
                name="industry"
                onChange={handleInputChange}
                placeholder="Enter your industry"
                className="mt-1 block w-full p-3 border border-[#80BDFF] rounded-md shadow-sm focus:outline-none focus:ring-1 shadow-[#6C757D] focus:ring-[#4361EE] focus:border-[#4361EE]"
              />
              {errors.industry && (
                <p className="text-sm text-red-500">{errors.industry}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-[#4361EE] text-white py-3 rounded-md font-semibold hover:bg-[#4361EE] transition"
            >
              Save & Next
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Step1;
