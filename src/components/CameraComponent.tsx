"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "./ui/button";

const CameraComponent = ({
  img,
  setImg,
  handleAnalyzeImage,
}: {
  img: string | null;
  setImg: (img: string | null) => void;
  handleAnalyzeImage: () => void;
}) => {
  const webcamRef = useRef(null);

  const [tempLoading, setTempLoading] = useState(false);

  const videoConstraints = {
    facingMode: "user",
  };

  const capture = useCallback(() => {
    if (!webcamRef.current) {
      console.error("Webcam reference is not set.");
      return;
    }

    // @ts-ignore
    const imageSrc = webcamRef.current.getScreenshot();

    setImg(imageSrc);
  }, [webcamRef, setImg]);

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div>{!img && <Button onClick={capture}>Capture</Button>}</div>

      {!img ? (
        <Webcam
          audio={false}
          mirrored={true}
          //   height={600}
          // width={700}
          ref={webcamRef}
          screenshotFormat="image/png"
          videoConstraints={videoConstraints}
          className="w-auto h-auto"
        />
      ) : (
        <div>
          <Image
            src={img!}
            alt="screenshot"
            width={700}
            height={600}
            className="w-auto h-auto"
          />
        </div>
      )}

      <div>
        {img && (
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
              Take Another Photo
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraComponent;
