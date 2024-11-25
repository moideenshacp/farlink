import logo from "../../assets/EmailLogo.png";
import Footer from "../../components/Footer";

const Step2 = () => {
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
          <form className="space-y-4">
            <div>
              <input
                type="text"
                id="Street"
                placeholder="Street"
                className="mt-1 block w-full p-3 border border-[#80BDFF] rounded-md shadow-sm focus:outline-none focus:ring-1 shadow-[#6C757D] focus:ring-[#4361EE] focus:border-[#4361EE]"
              />
            </div>

            <div>
              <input
                type="text"
                id="Country"
                placeholder="Country"
                className="mt-1 block w-full p-3 border border-[#80BDFF] rounded-md shadow-sm focus:outline-none focus:ring-1 shadow-[#6C757D] focus:ring-[#4361EE] focus:border-[#4361EE]"
              />
            </div>
            <div>
              <input
                type="text"
                id="State"
                placeholder="State"
                className="mt-1 block w-full p-3 border border-[#80BDFF] rounded-md shadow-sm focus:outline-none focus:ring-1 shadow-[#6C757D] focus:ring-[#4361EE] focus:border-[#4361EE]"
              />
            </div>
            <div>
              <input
                type="text"
                id="City"
                placeholder="City"
                className="mt-1 block w-full p-3 border border-[#80BDFF] rounded-md shadow-sm focus:outline-none focus:ring-1 shadow-[#6C757D] focus:ring-[#4361EE] focus:border-[#4361EE]"
              />
            </div>
            <div>
              <input
                type="text"
                id="Zipcode"
                placeholder="Zipcode"
                className="mt-1 block w-full p-3 border border-[#80BDFF] rounded-md shadow-sm focus:outline-none focus:ring-1 shadow-[#6C757D] focus:ring-[#4361EE] focus:border-[#4361EE]"
              />
            </div>
            <div className="flex justify-between gap-4">
              <button
                type="submit"
                className="w-50% bg-[#6C757D] text-white p-3 rounded-md font-semibold hover:bg-[#6C757D] transition"
              >
                Previous
              </button>
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
