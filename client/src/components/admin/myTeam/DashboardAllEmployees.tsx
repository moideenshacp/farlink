import React, { useEffect, useState } from "react";
import EmployeeCard from "../../../shared/components/EmployeeCard";
import { getAllEmployees } from "../../../api/employeeApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { IEmployee } from "../../../interface/IemployeeDetails";

interface DashboardAllEmployeesProps {
  selectedPosition: string;
}

const DashboardAllEmployees: React.FC<DashboardAllEmployeesProps> = ({ selectedPosition }) => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(2); 
  const [loading, setLoading] = useState(false);

  const organizationId = useSelector(
    (state: RootState) => state.user?.user?.organizationId
  );

  const fetchEmployees = async (page: number) => {
    setLoading(true);
    try {
      const res = await getAllEmployees(organizationId, page, pageSize);
      setEmployees(res?.data.employees);
      setTotalEmployees(res?.data.totalEmployees);
    } catch (error) {
      console.error("Failed to fetch employees", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees(currentPage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationId, currentPage]);

  console.log(employees, "res from employee");

  const filteredEmployees = selectedPosition
    ? employees.filter((employee: IEmployee) => employee.position === selectedPosition)
    : employees;

  const totalPages = Math.ceil(totalEmployees / pageSize);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
        </div>
      ) : (
        <>
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
              <p className="text-gray-500 text-sm col-span-full text-center">
                No Employees Found...
              </p>
            )}
          </div>

          {filteredEmployees.length > 0 && totalPages > 1 && (
            <div className="flex justify-center mt-36">
              <div className="join">
                {/* Previous Page Button */}
                <button
                  className="join-item btn bg-[#4361EE]  text-white hover:bg-blue-700"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  «
                </button>

                {/* Page Number Display */}
                <button className="join-item p-3 text-xs font-medium cursor-default">
                  Page {currentPage} of {totalPages}
                </button>

                {/* Next Page Button */}
                <button
                  className="join-item btn bg-[#4361EE]  text-white hover:bg-blue-700"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  »
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardAllEmployees;
