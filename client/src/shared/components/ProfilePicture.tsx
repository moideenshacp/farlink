import React from "react";

interface ProfilePictureProps {
  image: string;
  isUploading: boolean;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ image, isUploading, onImageChange }) => (
  <div className="flex mb-6">
    <div className="flex-shrink-0">
      <label htmlFor="image" className="cursor-pointer">
        <img src={image} alt="User" className="w-24 h-24 rounded-full" />
        {isUploading && <p className="text-blue-500">Uploading...</p>}
      </label>
      <input
        id="image"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onImageChange}
      />
    </div>
  </div>
);

export default ProfilePicture;
