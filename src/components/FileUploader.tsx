"use client";

import { FileUpload } from "@/components/ui/file-upload";
import { convertFileToBase64 } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { useState } from "react";

const FileUploader = ({
  handleAnalyzeImage,
  setImg,
  img,
}: {
  handleAnalyzeImage: () => void;
  setImg: (img: string | null) => void;
  img: string | null;
}) => {
  const [tempLoading, setTempLoading] = useState(false);

  const handleFileUpload = async (files: File[]) => {
    const image = await convertFileToBase64(files[0]);
    setImg(image);
    console.log(files);
  };

  return (
    <div className="w-[35vw] mx-auto rounded-2xl">
      {img ? (
        <div className="flex flex-col justify-center items-center gap-4">
          <Image
            src={img}
            alt="Uploaded"
            width={500}
            height={600}
            className="w-auto h-auto aspect-auto"
          />
          <div className="flex justify-center w-full items-center gap-4">
            <Button
              onClick={() => {
                setTempLoading((prev) => !prev);
                handleAnalyzeImage();
              }}
              size="lg"
              className="text-lg w-70 h-12"
              disabled={tempLoading}
            >
              {tempLoading ? "Analyzing..." : "Analyze Image"}
              {tempLoading && (
                <div className="w-7 h-7 border-4 border-t-gray-600 border-gray-300 rounded-full animate-spin ml-4"></div>
              )}
            </Button>

            <Button
              onClick={() => setImg(null)}
              variant="secondary"
              className="text-lg w-70 h-12"
              size="lg"
              disabled={tempLoading}
            >
              Upload Another Image
            </Button>
          </div>
        </div>
      ) : (
        <FileUpload onChange={handleFileUpload} />
      )}
    </div>
  );
};

export default FileUploader;
