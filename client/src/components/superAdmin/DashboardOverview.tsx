import { useEffect, useState } from "react";
import { useCompanies } from "../../shared/hooks/UseCompanies";
import { fetchAllCompanies } from "../../api/companyApi";
import { CompanyStatusChart } from "./CompanyStatusChart";
import StatCard from "../../shared/components/StatsCard";
import { FaBuilding, FaBan } from "react-icons/fa";

const DashboardOverview = () => {
  const { setCompanies } = useCompanies();
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [blockedCompanies, setBlockedCompanies] = useState(0);

  useEffect(() => {
    const fetchCompanies = async () => {
      const res = await fetchAllCompanies();
      if (res?.data.message === "Organizations fetched successfully") {
        setCompanies(res.data.data);
        setTotalCompanies(res.data.data.length);
        setBlockedCompanies(
          res.data.data.filter(
            (company: { admin: { isActive: boolean } }) =>
              company.admin?.isActive === false
          ).length
        );
      }
    };
    fetchCompanies();
  }, [setCompanies]);

  const stats = [
    {
      title: "Total Companies",
      value: totalCompanies,
      icon: <FaBuilding size={20} color="#4361EE" />,
    },
    {
      title: "Blocked Companies",
      value: blockedCompanies,
      icon: <FaBan size={20} color="#FF4C4C" />,
    },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Stats Container */}
      <div className="flex flex-wrap gap-6 justify-center">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="hover:shadow-lg hover:scale-105 transition-transform"
          >
            <StatCard
              title={stat.title}
              value={stat.value}
              color="text-[#4361EE]"
              fontSize="text-xl"
              icon={stat.icon}
            />
          </div>
        ))}
      </div>
  
      {/* Centered Pie Chart */}
      <div className="mt-10 flex justify-center">
        <CompanyStatusChart
          totalCompanies={totalCompanies}
          blockedCompanies={blockedCompanies}
        />
      </div>
    </div>
  );
  
};

export default DashboardOverview;
