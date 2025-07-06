"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoCameraOutline } from "react-icons/io5";
import CameraComponent from "./CameraComponent";

const CameraCaptureModal = ({
  handleAnalyzeImage,
  setImg,
  img,
}: {
  handleAnalyzeImage: () => void;
  setImg: (img: string | null) => void;
  img: string | null;
}) => {
  return (
    <div className="animate-slideright">
      <Dialog onOpenChange={() => setImg(null)}>
        <DialogTrigger asChild>
          <button className="p-[3px] relative cursor-pointer active:scale-[1.20] scale-125">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg" />
            <div className="flex justify-center items-center gap-5 px-8 py-2 bg-white rounded-[6px]  relative group transition duration-200 text-black hover:bg-transparent hover:text-white">
              Capture from camera
              <IoCameraOutline className="text-lg" />
            </div>
          </button>
        </DialogTrigger>
        <DialogContent className="min-w-[50vw]">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl">Capture from camera</DialogTitle>
            <hr className="my-3" />
            <DialogDescription
              asChild
              className="flex flex-col justify-center items-center"
            >
              <CameraComponent
                img={img}
                setImg={setImg}
                handleAnalyzeImage={handleAnalyzeImage}
              />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CameraCaptureModal;
