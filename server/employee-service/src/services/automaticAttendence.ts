import IattendenceRepo from "../interfaces/IattendenceRepo";
import { IattendenceService } from "../interfaces/IattendenceService";
import IemployeeRepo from "../interfaces/IemployeeRepository";
import IpolicyRepo from "../interfaces/IpolicyRepo";
import { AttendanceRepository } from "../repositories/attendenceRepo";
import { employeeRepository } from "../repositories/employeeRepository";
import { AttendancePolicyRepository } from "../repositories/policyRepository";
import { attendenceService } from "./attendenceService";
import cron from "node-cron"


class AbsenteeCheckJob {
  async runDailyAbsenteeCheck() {
    console.log("Running daily absentee check...");

    try {
        
      const policyRepository :IpolicyRepo = new AttendancePolicyRepository()
      const attendenceRepository:IattendenceRepo = new AttendanceRepository()
      const EmployeeRepository:IemployeeRepo = new employeeRepository()
      const AttendenceService :IattendenceService = new attendenceService(policyRepository,attendenceRepository,EmployeeRepository)
      const organizationIds = await EmployeeRepository.getDistinctOrganizationIds();
      
      for (const orgId of organizationIds) {
        await AttendenceService.markAbsentees(orgId)
      }
      
      console.log("Daily absentee check completed.");
    } catch (error) {
      console.error("Error during absentee marking:", error);
    }
  }
}
export const jobStart = cron.schedule("16 22 * * *", async () => {  
    try {
        console.log("Cron job running at:", new Date().toISOString());
        const absenteeCheckJob = new AbsenteeCheckJob();
        await absenteeCheckJob.runDailyAbsenteeCheck();
    } catch (error) {
        console.error("Error in cron job:", error);
    }
}, {
    scheduled: true,
    timezone: 'Asia/Kolkata',  
});



export default AbsenteeCheckJob;
