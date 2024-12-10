import React, { useState } from "react";
import logo from "../../assets/EmailLogo.png";
import Footer from "../../shares/components/landingPageComponents/Footer";
import { regitserCompany } from "../../api/authApi";
import { useCompanyBasicData } from "../../shares/hooks/UseRegisteration";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useFormValidationStep2 } from "../../shares/hooks/CompanyRegistration";

const Step2 = () => {
  const { registrationData } = useCompanyBasicData();
  const { formErrors, validate, setFormErrors } = useFormValidationStep2();
  const navigate = useNavigate();

  const [street, setStreet] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const userEmail = useSelector((state: RootState) => state.user?.user?.email);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "street") setStreet(value);
    if (name === "country") setCountry(value);
    if (name === "state") setState(value);
    if (name === "city") setCity(value);
    if (name === "zipcode") setZipcode(value);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormErrors((prevErrors: any) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = { street, country, state, city, zipcode };
    const errors = validate(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const organization = {
      name: registrationData.companyName,
      description: registrationData.companyDescription,
      industry: registrationData.industry,
      street,
      country,
      state,
      city,
      zipcode,
      email: userEmail,
    };
    try {
      console.log("registrationData", registrationData);

      const response = await regitserCompany(organization);
      console.log("msggggg", response.data.message);

      if (response.data.message === "organization registered successfully") {
        console.log("come come");
        localStorage.removeItem("registrationData");

        navigate("/step-3");
      }
    } catch (error) {
      console.error("Error submitting Step 2 data:", error);
    }
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
              step 2/3
            </span>{" "}
          </div>
          <h2 className="text-center text-lg font-semibold text-gray-700 mb-6">
            Let's setup your address.
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                id="Street"
                placeholder="Street"
                value={street}
                name="street"
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-[#80BDFF] rounded-md shadow-sm focus:outline-none focus:ring-1 shadow-[#6C757D] focus:ring-[#4361EE] focus:border-[#4361EE]"
              />
              {formErrors.street && (
                <p className="text-red-500 text-sm">{formErrors.street}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                id="Country"
                placeholder="Country"
                value={country}
                name="country"
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-[#80BDFF] rounded-md shadow-sm focus:outline-none focus:ring-1 shadow-[#6C757D] focus:ring-[#4361EE] focus:border-[#4361EE]"
              />
              {formErrors.country && (
                <p className="text-red-500 text-sm">{formErrors.country}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                id="State"
                placeholder="State"
                value={state}
                name="state"
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-[#80BDFF] rounded-md shadow-sm focus:outline-none focus:ring-1 shadow-[#6C757D] focus:ring-[#4361EE] focus:border-[#4361EE]"
              />
              {formErrors.state && (
                <p className="text-red-500 text-sm">{formErrors.state}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                id="City"
                placeholder="City"
                value={city}
                name="city"
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-[#80BDFF] rounded-md shadow-sm focus:outline-none focus:ring-1 shadow-[#6C757D] focus:ring-[#4361EE] focus:border-[#4361EE]"
              />
              {formErrors.city && (
                <p className="text-red-500 text-sm">{formErrors.city}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                id="Zipcode"
                placeholder="Zipcode"
                value={zipcode}
                name="zipcode"
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-[#80BDFF] rounded-md shadow-sm focus:outline-none focus:ring-1 shadow-[#6C757D] focus:ring-[#4361EE] focus:border-[#4361EE]"
              />
              {formErrors.zipcode && (
                <p className="text-red-500 text-sm">{formErrors.zipcode}</p>
              )}
            </div>
            <div className="flex justify-between gap-4">
              <Link to="/step-1">
                <button className="w-50% bg-[#6C757D] text-white p-3 rounded-md font-semibold hover:bg-[#6C757D] transition">
                  Previous
                </button>
              </Link>
              <button
                type="submit"
                className="w-50% bg-[#4361EE] text-white p-3 rounded-md font-semibold hover:bg-[#4361EE] transition"
              >
                Save & Next
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Step2;
