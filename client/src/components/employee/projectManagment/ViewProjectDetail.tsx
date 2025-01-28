import { Dropdown, Space, Avatar } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { IProject } from "../../../interface/IprojectDetails";
import dayjs from "dayjs";

interface ViewProjectDetailProps {
  project: IProject | null;
}

const ViewProjectDetail = ({ project }: ViewProjectDetailProps) => {
  const memberItems = project?.members?.map((member) => ({
    label: (
      <div className="flex items-center space-x-2">
        <Avatar src={member.image} alt={member.firstName} size="small" />
        <span>{`${member.firstName} ${member.lastName}`}</span>
      </div>
    ),
    key: member._id,
  }));

  console.log(project?.startDate, "startdsate");

  return (
    <div className="drawer-side z-30">
      <label
        htmlFor="my-drawer-4"
        className="drawer-overlay"
        aria-label="close sidebar"
      ></label>
      <div className="menu bg-white text-base-content min-h-full w-96 p-3">
        <h1 className="text-center text-[#232360] font-bold">
          {project?.projectName}
        </h1>

        <div className="border-b-2 mt-2"></div>
        <form className="space-y-4 p-3">
          <label className="block -mb-3 font-semibold text-sm text-[#232360]">
            Project Name
          </label>
          <Input
            type="text"
            name="projectName"
            value={project?.projectName}
            className="p-2"
            readOnly
          />
          <div>
            <label className="block mb-1 font-semibold text-sm text-[#232360]">
              Project Description
            </label>
            <textarea
              name="projectDescription"
              value={project?.projectDescription}
              placeholder="Enter Project Description"
              readOnly
              className="w-full border focus:outline-[#1677ff] border-gray-300 rounded-md p-2 h-24"
            ></textarea>
          </div>
          <div className="grid pb-2 grid-cols-2 gap-4">
          <label className=" font-semibold text-sm text-[#232360]">
              Start Date
            </label>
            <Input
              type="text"
              value={
                project?.startDate
                  ? dayjs(project.startDate).format("YYYY-MM-DD")
                  : ""
              }
              readOnly
            />
             <label className="  font-semibold text-sm text-[#232360]">
              End Date
            </label>
            <Input
              type="text"
              value={
                project?.endDate
                  ? dayjs(project.endDate).format("YYYY-MM-DD")
                  : ""
              }
              readOnly
            />
          </div>
          <div>
            <label className="block font-semibold text-sm text-[#232360]">
              Manager
            </label>
            <Input
              type="text"
              value={project?.manager.firstName}
              className="p-2 mt-1"
              readOnly
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-sm text-[#232360]">
              Members
            </label>
            <div className="border border-gray-300 rounded-md p-2 cursor-pointer flex items-center justify-between hover:border-[#1677ff]">
              <Dropdown
                menu={{
                  items: memberItems,
                }}
                trigger={["hover"]}
              >
                <a
                  onClick={(e) => e.preventDefault()}
                  className="w-full text-gray-700"
                >
                  <Space className="justify-between w-full">
                    <span>View Members</span>
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-sm text-[#232360]">
              Priority
            </label>
            <Input
              type="text"
              value={project?.priority}
              className="p-2 mt-1"
              readOnly
            />
          </div>
          <div>
            <label className="block font-semibold text-sm text-[#232360]">
              Status
            </label>
            <Input
              type="text"
              value={project?.status}
              className="p-2 mt-1"
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewProjectDetail;
