/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { Alert, TimePicker, Button, Space } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

interface User {
  role?: string;
  position?: string;
}

interface EditableAttendanceRowProps {
  attendance: any;
  index: number;
  currentPage: number;
  pageSize: number;
  onSave: (attendance: any) => void;
  user: User | null;
}

const EditableAttendanceRow: React.FC<EditableAttendanceRowProps> = ({ 
  attendance, 
  index, 
  currentPage, 
  pageSize,
  onSave,
  user
}) => {

    console.log("aattendence---------------------",attendance);
    
  const [isEditing, setIsEditing] = useState(false);
  const [editedTimes, setEditedTimes] = useState({
    checkIn: attendance.checkIn === 'N/A' ? null : dayjs(attendance.checkIn, 'HH:mm'),
    checkOut: attendance.checkOut === 'N/A' ? null : dayjs(attendance.checkOut, 'HH:mm')
  });
  const [error, setError] = useState('');

  const canEdit = user?.role === 'admin' || user?.position === 'HR';

  const handleTimeChange = (time: Dayjs | null, type: 'checkIn' | 'checkOut') => {
    setEditedTimes(prev => ({
      ...prev,
      [type]: time
    }));
    setError('');
  };

  const handleSave = (id:string) => {
    if (!canEdit) return;
    console.log(id,"id-----------------------");
    

    if (editedTimes.checkIn && editedTimes.checkOut) {
      if (editedTimes.checkOut.isBefore(editedTimes.checkIn)) {
        setError('Check-out time must be after check-in time');
        return;
      }
    }

    setError('');
    onSave({
      ...attendance,
      checkIn: editedTimes.checkIn ? editedTimes.checkIn.format('HH:mm') : 'N/A',
      checkOut: editedTimes.checkOut ? editedTimes.checkOut.format('HH:mm') : 'N/A'
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (!canEdit) return;
    
    setEditedTimes({
      checkIn: attendance.checkIn === 'N/A' ? null : dayjs(attendance.checkIn, 'HH:mm'),
      checkOut: attendance.checkOut === 'N/A' ? null : dayjs(attendance.checkOut, 'HH:mm')
    });
    setError('');
    setIsEditing(false);
  };

  return (
    <>
      <tr className="border-b hover:bg-gray-50">
        <td className="px-4 py-2">
          {(currentPage - 1) * pageSize + index + 1}
        </td>
        <td className="px-4 py-2">{attendance.date || "N/A"}</td>
        <td className="px-4 py-2">
          {isEditing && canEdit ? (
            <div className="flex items-center gap-2">
              <TimePicker
                value={editedTimes.checkIn}
                onChange={(time) => handleTimeChange(time, 'checkIn')}
                format="HH:mm"
                placeholder="Select time"
                className="w-32"
                allowClear
              />
              <Clock className="w-4 h-4 text-gray-400" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>{attendance.checkIn || "N/A"}</span>
            </div>
          )}
        </td>
        <td className="px-4 py-2">
          {isEditing && canEdit ? (
            <div className="flex items-center gap-2">
              <TimePicker
                value={editedTimes.checkOut}
                onChange={(time) => handleTimeChange(time, 'checkOut')}
                format="HH:mm"
                placeholder="Select time"
                className="w-32"
                allowClear
              />
              <Clock className="w-4 h-4 text-gray-400" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>{attendance.checkOut || "N/A"}</span>
            </div>
          )}
        </td>
        <td className="px-4 py-2">
          <span className={`px-2 py-1 text-xs font-medium rounded ${
            attendance.status === "present"
              ? "bg-green-100 text-green-600"
              : attendance.status === "absent"
              ? "bg-red-100 text-red-600"
              : "bg-yellow-100 text-yellow-600"
          }`}>
            {attendance.status}
          </span>
        </td>
        <td className="px-4 py-2">
          {canEdit && (
            isEditing ? (
              <Space>
                <Button
                  type="primary"
                  size="small"
                  onClick={()=>handleSave(attendance.id)}
                  className="bg-green-500"
                >
                  Save
                </Button>
                <Button
                  size="small"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Space>
            ) : (
              <Button
                type="primary"
                size="small"
                onClick={() => setIsEditing(true)}
                className="bg-blue-500"
              >
                Edit
              </Button>
            )
          )}
        </td>
      </tr>
      {error && isEditing && canEdit && (
        <tr>
          <td colSpan={6} className="px-4 py-2">
            <Alert
              message={error}
              type="error"
              showIcon
            />
          </td>
        </tr>
      )}
    </>
  );
};

export default EditableAttendanceRow;