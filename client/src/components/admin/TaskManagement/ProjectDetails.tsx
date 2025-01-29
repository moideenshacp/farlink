import React, { useState } from "react";
import { IProject } from "../../../interface/IprojectDetails";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Dropdown,
  Progress,
  Row,
  Space,
  Tabs,
  Typography,
} from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { FaFileCirclePlus } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import AssignTaskDrawer from "./AssignTaskDrawer"; 

interface ProjectDetailsProps {
  project: IProject;
}

const { Title, Paragraph } = Typography;

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const items = [
    {
      key: "All Tasks",
      label: (
        <span className="flex items-center gap-2">
          <FaTasks className="text-[#4361EE]" />
          All Tasks
        </span>
      ),
      children: <>alllll</>,
    },
    {
      key: "Completed Tasks",
      label: (
        <span className="flex items-center gap-2">
          <FaTasks className="text-green-500" />
          Completed Tasks
        </span>
      ),
      children: <>hiii</>,
    },
    {
      key: "Pending Tasks",
      label: (
        <span className="flex items-center gap-2">
          <FaTasks className="text-red-500" />
          Pending Tasks
        </span>
      ),
      children: <>biiii</>,
    },
  ];

  const memberItems = project?.members?.map((member) => ({
    label: (
      <div className="flex items-center space-x-2">
        <Avatar src={member.image} alt={member.firstName} size="small" />
        <span>{`${member.firstName} ${member.lastName}`}</span>
      </div>
    ),
    key: member._id,
  }));

  return (
    <div>
      <Card
        title={
          <div className="flex justify-between items-center">
            <Title level={4} style={{ color: "#4361EE" }}>
              {project.projectName}
            </Title>
            <Button
              type="primary"
              className="bg-[#4361EE] p-4 hover:bg-[#3b59d7]"
              onClick={showDrawer}
            >
              <FaFileCirclePlus />
              Assign Task
            </Button>
          </div>
        }
        className="rounded-lg p-3"
        style={{ maxWidth: 650, margin: "auto" }}
      >
        <Paragraph className="text-gray-600 mt-2">
          {project.projectDescription || "No description provided."}
        </Paragraph>

        <Row gutter={16} className="">
          {/* Manager Section */}
          <Col span={12}>
            <Badge
              count="Manager"
              style={{
                backgroundColor: "#4361EE",
                color: "#fff",
                fontSize: "12px",
              }}
            />
            <div className="flexitems-center mt-2">
              <Avatar
                size={54}
                icon={<UserOutlined />}
                src={project.manager.image || "/default-avatar.png"}
                className="mr-4"
              />
              <div>
                <div className="font-semibold text-gray-700">
                  {project.manager?.firstName || "Unknown"}
                </div>
                <div className="text-gray-500">
                  {project.manager?.email || "No email"}
                </div>
              </div>
            </div>
          </Col>

          {/* Members Section */}
          <Col span={12} className="pl-20">
            <label className="block font-semibold mb-1 text-sm text-[#232360]">
              Members
            </label>
            <div className="border border-gray-300 rounded-md p-2.5 cursor-pointer flex items-center justify-between hover:border-[#1677ff]">
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
                    <span className="text-[#1677ff]">View Members</span>
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
          </Col>
        </Row>

        {/* Project Status and Progress */}
        <Row gutter={16} align="middle" className="mt-4">
          <Col span={12}>
            <Title level={5}>Project Status</Title>
            <Badge
              count={project.status?.toUpperCase()}
              style={{
                backgroundColor:
                  project.status === "completed" ? "#52c41a" : "#1890ff",
                color: "#fff",
                fontSize: "14px",
              }}
            />
          </Col>

          <Col span={12}>
            <Title level={5}>Progress</Title>
            <Progress
              percent={10}
              percentPosition={{ align: "center", type: "inner" }}
              size={[300, 20]}
            />
          </Col>
        </Row>
      </Card>
      <div className="container ml-8 p-6">
        <Tabs
          defaultActiveKey="All Tasks"
          items={items}
          className="antd-tabs"
        />
      </div>

      {/* Use the AssignTaskDrawer component */}
      <AssignTaskDrawer open={open}  project={project} onClose={onClose} />
    </div>
  );
};

export default ProjectDetails;