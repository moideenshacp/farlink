import React, { useEffect, useState } from "react";
import EmployeeCard from "../../../shared/components/EmployeeCard";
import { getAllEmployees } from "../../../api/employeeApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { IEmployee } from "../../../interface/IemployeeDetails";

interface DashboardAllEmployeesProps {
  selectedPosition:string
}
  

const DashboardAllEmployees:React.FC<DashboardAllEmployeesProps> = ({ selectedPosition }) => {
    const [employeees,setEmployeees] = useState<IEmployee[]>([])
      const organizationId = useSelector(
        (state: RootState) => state.user?.user?.organizationId
      );
    useEffect(()=>{
        const fetchEmployees = async()=>{
            const res = await getAllEmployees(organizationId)
            setEmployeees(res?.data.employees)
            
        }
        fetchEmployees()
    },[organizationId])
    console.log(employeees,'res from employee');
    
    const filteredEmployees = selectedPosition
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? employeees.filter((employee:any) => employee.position === selectedPosition)
    : employeees;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-7">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee, index) => (
            <EmployeeCard
              key={index}
              employee={employee}
              image={employee.image}
              name={employee.firstName}
              position={employee.position}
              phone={employee.phone}
              email={employee.email}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No Employees Found...</p>
        )}
      </div>
    );
  };

export default DashboardAllEmployees;
