import { useEffect, useState } from "react";
import OverviewCard from "../../../shared/components/OverviewCard";
import { fetchEmployeesCount } from "../../../api/employeeApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const DashboardOverview = () => {
    const { user } = useSelector((state: RootState) => state.user);
    const [activeEmployees,setActiveEmployees] = useState(0)
    const [TerminatedEmployeesCount,SetTerminatedEmployeesCount] = useState(0)

    useEffect(()=>{
        const fetchData = async ()=>{
            const res = await fetchEmployeesCount(user?.organizationId)

            console.log(res?.data.data);
            if(res?.data.data){
                setActiveEmployees(res?.data.data.ActiveEmployeesCount)
                SetTerminatedEmployeesCount(res?.data.data.TerminatedEmployeesCount)
            }
            
        }
        fetchData()
    },[user?.organizationId])

  
  return (
    <div className="flex flex-wrap space-x-0 sm:space-x-28 gap-y-6 justify-center sm:justify-start">
    <OverviewCard
      title="Active Employees"
      number={activeEmployees}
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
            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
          />
        </svg>
      }
      chartColor="#4361EE"
    />
    <OverviewCard
      title="Ex Employees"
      number={TerminatedEmployeesCount}
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
            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
          />
        </svg>
      }
      chartColor="#4361EE"
    />
  </div>
  
  );
};

export default DashboardOverview;
