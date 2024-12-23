import { useEffect, useState } from "react";
import EmployeeCard from "../../../shared/components/EmployeeCard";
import { getAllEmployees } from "../../../api/employeeApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";


interface Employee {
  _id:string;
  userName:string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  gender: string;
  role:string;
  image: string;
  dateOfJoining?: string; 
  dateOfBirth?: string; 
  highestQualification?: string; 
  institution?: string; 
  qualificationYear?: string; 
  fatherName?: string; 
  fatherProfession?: string; 
  motherName?: string; 
  motherProfession?: string; 
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 ">
      {employeees.map((employee, index) => (
        <EmployeeCard
          key={index}
          employee ={employee}
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
