"use client";

import { useEffect, useState } from "react";
import CameraCaptureModal from "./CameraCaptureModal";
import FileUploadModal from "./FileUploadModal";
import { useClothes } from "@/context/ClothesContext";
import axios from "axios";
import { toast } from "sonner";
import { MultiStepLoader } from "./ui/multi-step-loader";
import { useRouter } from "nextjs-toploader/app";

const ImageAcceptorSection = () => {
  const [loading, setLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState<{ text: string }[]>([]);

  const router = useRouter();
  const { setFootprint, img, setImg } = useClothes();

  useEffect(() => {
    localStorage.removeItem("carbon_footprint");
    localStorage.removeItem("image");
  }, []);

  const handleAnalyzeImage = async () => {
    try {
      if (img) {
        const res = await axios.post("/api/analyze", { image: img });

        if (res.data.success) {
          setFootprint(res.data.result, img);
          console.log("Detected labels:", res.data.result);

          const loadingStates = [
            {
              text: "Analyzing image...",
            },
            {
              text: "Identifying and extracting clothing items",
            },
            {
              text: `Found ${res.data.result.length} clothing items`,
            },
            {
              text: "Fetching carbon footprint for each item",
            },
            {
              text: "Redirecting you to the results page",
            },
          ];

          setLoadingStates(loadingStates);
          setLoading((prev) => !prev);
          setTimeout(() => {
            router.push("/result");
          }, 2000 * (loadingStates.length - 1) + 500);
        } else {
          toast.error("Failed to analyze image");
          console.error("Error response:", res.data.error);
        }
      }
    } catch (error) {
      toast.error("Error analyzing image");
      console.error("Axios error:", error);
    }
  };

  return (
    <>
      <MultiStepLoader
        loadingStates={loadingStates}
        loading={loading}
      />
      <div className="flex justify-center items-center gap-40">
        <FileUploadModal
          handleAnalyzeImage={handleAnalyzeImage}
          setImg={setImg}
          img={img}
        />
        <CameraCaptureModal
          handleAnalyzeImage={handleAnalyzeImage}
          setImg={setImg}
          img={img}
        />
      </div>
    </>
  );
};

export default ImageAcceptorSection;
