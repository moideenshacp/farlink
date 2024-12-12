import { useEffect, useState } from "react";
import { fetchAllCompanies } from "../../api/companyApi";
import { useNavigate } from "react-router-dom";

const DashboardAllOrg = () => {
  interface Company {
    name: string;
    admin: Admin;
  }
  interface Admin {
    phone: string;
    email: string;
  }
  const navigate = useNavigate()
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const res = await fetchAllCompanies();
      if (res?.data.message === "Organizations fetched successfully") {
        setCompanies(res.data.data);
      }
    };
    fetchCompanies();
  }, []);

  const handleCardClick = (company:Company)=>{
    navigate('/superAdmin/organization-details',{state:{company}})
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 min-h-64 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((org, index) => (
          <div
            onClick={()=>handleCardClick(org)}
            key={index}
            className="bg-white shadow-md rounded-lg p-16 flex flex-col items-center cursor-pointer border border-gray-200 hover:shadow-lg hover:scale-105 transition-transform"
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold ${"bg-gray-500"}`}
            >
              {org.name.charAt(0).toUpperCase()}
            </div>
            <h3 className="text-base font-semibold mt-4">{org.name}</h3>
            <div className="flex flex-col items-center mt-4 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                {org.admin.phone}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                    <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
                  </svg>
                </span>
                {org.admin.email}
              </div>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
};

export default DashboardAllOrg;
