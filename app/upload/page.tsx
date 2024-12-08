'use client'
import { useState } from "react";
import { motion } from "framer-motion";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files.length > 0) {
      const uploadedFile = event.dataTransfer.files[0];
      setFile(uploadedFile);
      startUpload();
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const uploadedFile = event.target.files[0];
      setFile(uploadedFile);
      startUpload();
    }
  };

  const startUpload = () => {
    setUploading(true);
    setProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          return 100;
        }
        return prev + 10; // Increment progress
      });
    }, 300); // Update progress every 300ms
  };

  return (
    <div
      style={{ height: "calc(100vh - 4rem)" }}
      className="flex flex-col items-center p-4 justify-center"
    >
      <motion.div
        className={`w-full max-w-lg h-64 border-2 rounded-lg flex items-center justify-center transition-all relative border-dashed ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        initial={{ scale: 1 }}
        animate={{ scale: isDragging ? 1.05 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {file ? (
          <p className="text-sm text-gray-700">{file.name}</p>
        ) : (
          <p className="text-sm text-gray-500">
            Drag & drop a file here, or click to upload
          </p>
        )}
        <input
          type="file"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </motion.div>

      {uploading && (
        <div className="w-full max-w-lg mt-4">
          <motion.div
            className="h-2 bg-blue-500 rounded"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          ></motion.div>
          <p className="mt-2 text-sm text-gray-500">{progress}% uploaded</p>
        </div>
      )}

      {!uploading && file && progress === 100 && (
        <motion.div
          className="mt-4 text-sm text-green-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          File &quot;{file.name}&quot; uploaded successfully!
        </motion.div>
      )}
    </div>
  );
};

export default FileUpload;
