import React from "react";
import { FaUpload, FaFileAlt } from "react-icons/fa";
import { Spin } from "antd";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  file: File | string | null;
  loading?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  file,
  loading,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    onFileSelect(selectedFile);
  };

  const getFileName = (file: File | string | null) => {
    if (!file) return "";
    if (file instanceof File) return file.name;
    // For URLs, extract the filename from the path
    return file.split("/").pop() || "Uploaded file";
  };

  return (
    <div>
      <label className="block mb-1 font-semibold text-sm text-[#232360]">
        Attach File <span>(optional)</span>
      </label>
      <div className="relative border border-gray-300 rounded-md p-3 flex items-center justify-center cursor-pointer bg-gray-100 hover:bg-gray-200 transition">
        <input
          type="file"
          accept=".jpg,.png,.pdf,.docx"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={loading}
        />
        <div className="flex items-center gap-2">
          {loading ? (
            <Spin size="small" />
          ) : (
            <>
              <FaUpload className="text-blue-500" />
              <span className="text-sm text-gray-700">
                {loading ? "Uploading..." : "Click to Upload"}
              </span>
            </>
          )}
        </div>
      </div>

      {file && (
        <div className="mt-2 flex items-center gap-2 bg-gray-50 p-2 rounded-md">
          <FaFileAlt className="text-gray-500" />
          <p className="text-sm text-gray-700">{getFileName(file)}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
