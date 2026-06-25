import React, { useState, useCallback } from 'react';
import { CloudArrowUpIcon } from './icons';

interface ImageUploaderProps {
  onUpload: (url: string) => void;
  initialImageUrl?: string | null;
}

enum UploadState {
  Idle,
  Uploading,
  Success,
  Error,
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload, initialImageUrl }) => {
  const [uploadState, setUploadState] = useState(initialImageUrl ? UploadState.Success : UploadState.Idle);
  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl || null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (file: File | null) => {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("File is too large. Please select an image under 5MB.");
        setUploadState(UploadState.Error);
        return;
    }

    setUploadState(UploadState.Uploading);
    setError(null);

    const reader = new FileReader();
    reader.onload = () => {
        const result = reader.result as string;
        setImageUrl(result);
        onUpload(result);
        setUploadState(UploadState.Success);
    };
    reader.onerror = (err) => {
        console.error("FileReader error:", err);
        setError("Failed to read the file.");
        setUploadState(UploadState.Error);
    };
    reader.readAsDataURL(file);
  };
  
  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
        handleFileChange(event.dataTransfer.files[0]);
    }
  }, []);

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const resetUploader = () => {
    setUploadState(UploadState.Idle);
    setImageUrl(null);
    onUpload('');
  };

  const renderContent = () => {
    switch (uploadState) {
      case UploadState.Uploading:
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
             <svg className="animate-spin h-8 w-8 text-tyga-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <p className="mt-2 text-sm font-semibold">Uploading...</p>
          </div>
        );
      case UploadState.Success:
        return (
            <div className="relative w-full h-full group p-2">
                <img src={imageUrl} alt="Uploaded preview" className="w-full h-full object-contain rounded-md" />
                <button 
                    type="button"
                    onClick={resetUploader}
                    className="absolute top-1 right-1 bg-black/60 text-white font-bold py-1 px-3 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    Change
                </button>
            </div>
        );
      case UploadState.Error:
        return (
             <div className="flex flex-col items-center justify-center h-full text-red-500 p-4">
                <p className="font-semibold">Upload Failed</p>
                <p className="text-xs text-center mt-1">{error}</p>
                <button type="button" onClick={resetUploader} className="mt-2 text-sm text-blue-500 dark:text-blue-400 underline">Try again</button>
            </div>
        );
      case UploadState.Idle:
      default:
        return (
          <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-full cursor-pointer text-center p-4">
            <CloudArrowUpIcon className="w-10 h-10 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold text-tyga-primary">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PNG or JPG (Max 5MB)</p>
            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)} accept="image/png, image/jpeg" />
          </label>
        );
    }
  };

  return (
    <div 
        className="w-full h-48 bg-gray-50 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center transition-colors"
        onDrop={onDrop}
        onDragOver={onDragOver}
    >
        {renderContent()}
    </div>
  );
};

export default ImageUploader;
