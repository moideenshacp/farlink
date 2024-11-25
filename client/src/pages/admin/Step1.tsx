import logo from "../../assets/EmailLogo.png";
import Footer from "../../components/Footer";

const Step1 = () => {
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
          <form className="space-y-4">
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
                className="mt-1 block w-full p-3 border border-[#80BDFF] rounded-md shadow-sm focus:outline-none focus:ring-1 shadow-[#6C757D] focus:ring-[#4361EE] focus:border-[#4361EE]"
              />
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
                className="mt-1 block w-full p-3 border border-[#80BDFF] rounded-md shadow-sm focus:outline-none focus:ring-1 shadow-[#6C757D] focus:ring-[#4361EE] focus:border-[#4361EE]"
                rows={3}
              ></textarea>
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
                placeholder="Enter your industry"
                className="mt-1 block w-full p-3 border border-[#80BDFF] rounded-md shadow-sm focus:outline-none focus:ring-1 shadow-[#6C757D] focus:ring-[#4361EE] focus:border-[#4361EE]"
              />
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
