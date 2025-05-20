
import React from "react";
import { Camera } from "lucide-react";

interface ProfileImageUploaderProps {
  profileImg?: string;
  defaultImage?: string;
}

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({ 
  profileImg, 
  defaultImage = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop" 
}) => {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="relative mb-4">
        <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100">
          <img 
            src={profileImg || defaultImage} 
            alt="Patient profile" 
            className="h-full w-full object-cover" 
          />
        </div>
        <label 
          htmlFor="profileImage" 
          className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer"
        >
          <Camera className="h-4 w-4" />
          <span className="sr-only">Upload image</span>
        </label>
        <input 
          id="profileImage" 
          type="file" 
          accept="image/*"
          className="hidden" 
        />
      </div>
    </div>
  );
};

export default ProfileImageUploader;
