/* eslint-disable @typescript-eslint/no-explicit-any */
import IattendenceRepo from "../interfaces/IattendenceRepo";
import { IattendenceService } from "../interfaces/IattendenceService";
import IemployeeRepo from "../interfaces/IemployeeRepository";
import IpolicyRepo from "../interfaces/IpolicyRepo";
import { AttendanceRepository } from "../repositories/attendenceRepo";
import { employeeRepository } from "../repositories/employeeRepository";
import { AttendancePolicyRepository } from "../repositories/policyRepository";
import { attendenceService } from "./attendenceService";
import cron from "node-cron";
import nodeMailer from "nodemailer";

class AbsenteeCheckJob {
  async runDailyAbsenteeCheck() {
    try {
      const policyRepository: IpolicyRepo = new AttendancePolicyRepository();
      const attendenceRepository: IattendenceRepo = new AttendanceRepository();
      const EmployeeRepository: IemployeeRepo = new employeeRepository();
      const AttendenceService: IattendenceService = new attendenceService(
        policyRepository,
        attendenceRepository,
        EmployeeRepository
      );
      const organizationIds =
        await EmployeeRepository.getDistinctOrganizationIds();

      for (const orgId of organizationIds) {
        await AttendenceService.markAbsentees(orgId);
      }

      await this.sendAlert(
        "Success",
        "Daily absentee check completed successfully."
      );
    } catch (error: any) {
      console.error("Error during absentee marking:", error);
      await this.sendAlert(
        "Failure",
        `Error in absentee check: ${error.message}`
      );
    }
  }
  private async sendAlert(status: string, message: string) {
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: '"Farlink Alerts" <no-reply@example.com>',
      to: process.env.ADMIN_EMAIL,
      subject: `🚨 Cron Job Alert: ${status}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <div style="text-align: center;">
            <img src="https://imgur.com/4Typ3eP.png" alt="Farlink Logo" style="max-width: 150px; height: auto; margin-bottom: 20px;" />
          </div>
          <h2 style="text-align: center; color: ${
            status === "Success" ? "green" : "red"
          };">Cron Job Status: ${status}</h2>
          <p style="text-align: center;">The scheduled cron job has completed execution.</p>
          <p style="text-align: center;">Details:</p>
          <blockquote style="background: #f9f9f9; padding: 10px; border-left: 5px solid ${
            status === "Success" ? "green" : "red"
          };">
            ${message}
          </blockquote>
          <p style="text-align: center; font-size: 12px; color: #555;">Executed at: ${new Date().toLocaleString(
            "en-IN",
            { timeZone: "Asia/Kolkata" }
          )}</p>
        </div>
      `,
    });
  }
}
export const jobStart = cron.schedule(
  "50 23 * * *",
  async () => {
    try {
      const absenteeCheckJob = new AbsenteeCheckJob();
      await absenteeCheckJob.runDailyAbsenteeCheck();
    } catch (error) {
      console.error("Error in cron job:", error);
    }
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata",
  }
);

export default AbsenteeCheckJob;
