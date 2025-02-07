/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Avatar, Badge, Card, Col, Row, Typography, Progress, Input, Select, Button, DatePicker } from "antd";
import dayjs from "dayjs";
import { useTaskContext } from "../../context/TaskContext";

const { Title, Paragraph } = Typography;
const { Option } = Select;

const priorityOptions = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const SubTaskDetails: React.FC = () => {
  const { selectedSubTask, setSelectedSubTask } = useTaskContext();

  // State to store editable subtask details
  const [subTask, setSubTask] = useState(selectedSubTask || {});

  useEffect(() => {
    if (selectedSubTask) {
      setSubTask(selectedSubTask);
    }
  }, [selectedSubTask]);

  // Handle field updates
  const handleChange = (field: string, value: any) => {
    setSubTask((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <Card
        title={
          <div className="flex justify-between items-center">
            <Title level={4} style={{ color: "#4361EE" }}>
              <Input
                value={subTask.taskName}
                onChange={(e) => handleChange("taskName", e.target.value)}
              />
            </Title>
          </div>
        }
        className="rounded-lg shadow-md p-3"
        style={{ maxWidth: 650, margin: "auto" }}
      >
        {/* Subtask Description */}
        <Paragraph className="text-gray-600 mt-2">
          <Input.TextArea
            value={subTask.taskDescription}
            onChange={(e) => handleChange("taskDescription", e.target.value)}
            rows={3}
          />
        </Paragraph>

        <Row gutter={16} className="mt-3">
          {/* Parent Task */}
          <Col span={12}>
            <Badge
              count="Parent Task"
              style={{
                backgroundColor: "#4361EE",
                color: "#fff",
                fontSize: "12px",
              }}
            />
            <div className="mt-2 text-gray-700 font-semibold">
              Task ID: {subTask.parentTaskId}
            </div>
          </Col>

          {/* Priority */}
          <Col span={12}>
            <Title level={5}>Priority</Title>
            <Select
              value={subTask.priority}
              onChange={(value) => handleChange("priority", value)}
              className="w-full"
            >
              {priorityOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>

        {/* Start & End Date */}
        <Row gutter={16} align="middle" className="mt-4">
          <Col span={12}>
            <Title level={5}>Start Date</Title>
            <DatePicker
              value={subTask.startDate ? dayjs(subTask.startDate) : null}
              onChange={(date) => handleChange("startDate", date?.toISOString())}
              className="w-full"
            />
          </Col>
          <Col span={12}>
            <Title level={5}>End Date</Title>
            <DatePicker
              value={subTask.endDate ? dayjs(subTask.endDate) : null}
              onChange={(date) => handleChange("endDate", date?.toISOString())}
              className="w-full"
            />
          </Col>
        </Row>

        {/* Subtask Status & Progress */}
        <Row gutter={16} align="middle" className="mt-4">
          <Col span={12}>
            <Title level={5}>Status</Title>
            <Select
              value={subTask.status}
              onChange={(value) => handleChange("status", value)}
              className="w-full"
            >
              <Option value="in-progress">In Progress</Option>
              <Option value="completed">Completed</Option>
            </Select>
          </Col>
          <Col span={12}>
            <Title level={5}>Progress</Title>
            <Progress percent={subTask.progress || 0} size="small" status="active" />
          </Col>
        </Row>

        {/* Assigned Members */}
        <Row gutter={16} className="mt-4">
          <Col span={24}>
            <Title level={5}>Assigned Members</Title>
            <Select
              mode="multiple"
              value={subTask.members?.map((m: any) => m._id)}
              onChange={(values) =>
                handleChange(
                  "members",
                  values.map((id:any) => ({ _id: id }))
                )
              }
              className="w-full"
            >
              {subTask.members?.map((member: any) => (
                <Option key={member._id} value={member._id}>
                  <Avatar size={24} src={member.image || "/default-avatar.png"} />
                  {member.firstName} {member.lastName}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>

        {/* File Attachment */}
        {subTask.file && (
          <Row gutter={16} className="mt-4">
            <Col span={24}>
              <Title level={5}>Attached File</Title>
              <a
                href={subTask.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                Download File
              </a>
            </Col>
          </Row>
        )}

        {/* Save & Cancel Buttons */}
        <div className="flex justify-between mt-4">
          <Button type="primary" onClick={() => console.log("Saving changes...", subTask)}>
            Save Changes
          </Button>
          <Button danger onClick={() => setSelectedSubTask(null)}>
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SubTaskDetails;
