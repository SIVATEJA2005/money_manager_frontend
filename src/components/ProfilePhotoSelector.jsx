import React, { useRef, useState, useEffect } from "react";
import { User, X } from "lucide-react";

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const removePhoto = (e) => {
        e.stopPropagation();
        setImage(null);
        setPreviewUrl(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    useEffect(() => {
        return () => previewUrl && URL.revokeObjectURL(previewUrl);
    }, [previewUrl]);

    return (
        <div className="flex justify-center mb-6">
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                className="hidden"
                onChange={handleFileChange}
            />

            <div
                onClick={() => inputRef.current.click()}
                className="relative w-24 h-24 rounded-full
                   border-2 border-dashed border-purple-500
                   flex items-center justify-center cursor-pointer"
            >
                {previewUrl ? (
                    <>
                        {/* Profile Image */}
                        <img
                            src={previewUrl}
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover"
                        />

                        {/* ✅ Bottom-Left Remove Button */}
                        <button
                            type="button"
                            onClick={removePhoto}
                            className="absolute bottom-1 left-1 z-20
                         w-6 h-6 rounded-full
                         bg-black/80 text-white
                         flex items-center justify-center
                         hover:bg-red-600 transition shadow"
                        >
                            <X size={14} />
                        </button>
                    </>
                ) : (
                    <div className="flex flex-col items-center text-purple-500">
                        <User size={24} />
                        <span className="text-xs mt-1 font-medium">Upload</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePhotoSelector;
