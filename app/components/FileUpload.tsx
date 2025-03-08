"use client";
import React, { useRef, useState } from "react";
import { IKUpload } from "imagekitio-next";
import { Loader2 } from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";



interface FileUploadProps {
    onSuccess: (res: IKUploadResponse) => void
    onProgress? : (progress: number ) => void
    fileType: "image" | "video"
}


export default function FileUpload({
    onSuccess,
    onProgress,
    fileType = "image"
}: FileUploadProps) {
const [uploading, setUploading] = useState(false);
const [error, setError] = useState<string | null>(null)

const ikUploadRef = useRef<HTMLInputElement>(null);

  const onError = (err: {message: string}) => {
  console.log("Error", err);
  setError(err.message)
  setUploading(false)
};

const handleSuccess = (response: IKUploadResponse) => {
  console.log("Success", response);
  setUploading(false)
  setError(null)
  onSuccess(response)
};

const handleProgress = (evt: any) => {
    if(evt.lengthComputable && onProgress){
        const percentComplete = (evt.loaded / evt.total) * 100;
        onProgress(Math.round(percentComplete));
    }
//   setUploading(true)
//   setError(null)
};

const handleStartUpload = (evt: any) => {
  console.log("Start", evt);
};

const validateFile = (file: File) => {
    if(fileType === "video") {
        if(!file.type.startsWith("video/")){
            setError("please upload a video file")
            return false
        }
        if(file.size > 100 * 1024 * 1024) {
            setError("File size is too large it should be less than 100 MB")
            return false
        }
    } else {
        const validTypes = ["image/jpeg", "image/png", "image/webp"]
        if(!validTypes.includes(file.type)){
            setError("please upload a valid file (JPEG, PNG, webP")
            return false
        }
        if(file.size > 5 * 1024 * 1024) {
            setError("Image size is too large it should be less than 5 MB")
            return false
        }
    }
    return true
}

  return (
    <div className="space-y-2">

        <IKUpload
          fileName={fileType === "video" ? "video" : "image"}

          useUniqueFileName={true}

          validateFile={validateFile}
    

          onError={onError}
          onSuccess={handleSuccess}
          onUploadProgress={handleProgress}
          onUploadStart={handleStartUpload}
          folder={fileType === "video" ? "/video" : "/images"}
          transformation={{
            pre: "l-text,i-Imagekit,fs-50,l-end",
            post: [
              {
                type: "transformation",
                value: "w-100",
              },
            ],
          }}
          style={{display: 'none'}} // hide the default input and use the custom upload button
          ref={ikUploadRef}
        />
        {
          uploading && (
            <div className="flex items-center gap-2 text-sm text-green-500">
            <Loader2 className="animate-spin w-4 h-4" />
            <span>Uploading...</span>
            </div>
          )
        }
        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}
    </div>
  )};
