import { useEffect, useState } from "react";
import EmployeeCard from "../../shares/components/EmployeeCard";
import { getAllEmployees } from "../../api/employeeApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";


interface Employee {
    image: string;
    firstName: string;
    position: string;
    phone: string;
    email: string;
  }
  

const DashboardAllEmployees = () => {
    const [employeees,setEmployeees] = useState<Employee[]>([])
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


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
      {employeees.map((employee, index) => (
        <EmployeeCard
          key={index}
          image={employee.image}
          name={employee.firstName}
          position={employee.position}
          phone={employee.phone}
          email={employee.email}
        />
      ))}
    </div>
  );
};

export default DashboardAllEmployees;
