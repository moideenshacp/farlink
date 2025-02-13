import axiosInstance from "./axiosInterceptor";

interface IprojectDetails {
  projectName: string;
  projectDescription: string;
  startDate: Date | null;
  endDate: Date | null;
  manager: string | null;
  members: string[];
  organizationId: string | undefined;
}

//CREATE PROJECT API=====================================================================================================

export const createProject = async (projectDetails: IprojectDetails) => {
  try {
    const res = await axiosInstance.post(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/project-service/api/project/create-project`,
      { projectDetails },
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//UPDATE PROJECT API=====================================================================================================

export const updateProject = async (
  projectId: string | undefined,
  projectDetails: IprojectDetails
) => {
  try {
    const res = await axiosInstance.patch(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/project-service/api/project/update-project`,
      { projectDetails, projectId },
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//FETCH PROJECT API=====================================================================================================

export const fetchProjects = async (organizationId: string | undefined) => {
  try {
    const res = await axiosInstance.get(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/project-service/api/project/fetch-projects`,
      {
        params: { organizationId },

        withCredentials: true,
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//FETCH EMPLOYEES PROJEECT API=====================================================================================================

export const fetchEmployeesProject = async (
  organizationId: string | undefined,
  employeeId: string | undefined
) => {
  try {
    const res = await axiosInstance.get(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/project-service/api/project/fetchEmployees-projects`,
      {
        params: { organizationId, employeeId },

        withCredentials: true,
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
