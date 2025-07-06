"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
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
              onClick={handleAnalyzeImage}
              size="lg"
              className="text-lg w-70 h-12"
            >
              Analyze Image
            </Button>

            <Button
              onClick={() => setImg(null)}
              variant="secondary"
              className="text-lg w-70 h-12"
              size="lg"
            >
              Upload Another Image
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraComponent;
