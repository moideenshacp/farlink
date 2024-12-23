export interface EmployeeProfileProps {
  employee: {
    _id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    position: string;
    gender: string;
    role: string;
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
  };
}

export interface updateEmployeeFormErrors {
    userName?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    position?: string;
    gender?: string;
    image?: string;
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