import { useEffect } from "react";
import OverviewCard from "../../shares/components/OverviewCard";
import { useCompanies } from "../../shares/hooks/UseCompanies";
import { fetchAllCompanies } from "../../api/companyApi";

const DashboardOverview = () => {
  const { companies, setCompanies } = useCompanies();

  const totalCompanies = companies.length;
  console.log(totalCompanies);

  const blockedCompanies = companies.filter(
    (company: { admin: { isActive: boolean } }) =>
      company.admin?.isActive === false
  ).length;
  console.log(blockedCompanies);

  useEffect(() => {
    const fetchCompanies = async () => {
      const res = await fetchAllCompanies();
      if (res?.data.message === "Organizations fetched successfully") {
        setCompanies(res.data.data);
      }
    };
    fetchCompanies();
  }, [setCompanies]);
  console.log("comapnhyyyy",companies);
  
  return (
    <div className="flex space-x-28">
      <OverviewCard
        title="Total Companies"
        number={totalCompanies}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#8C97A8"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
            />
          </svg>
        }
        chartColor="#4361EE"
      />

      <OverviewCard
        title="Blocked Companies"
        number={blockedCompanies}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#8C97A8"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
        }
        chartColor="#4361EE"
      />
    </div>
  );
};

export default DashboardOverview;
