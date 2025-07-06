import HeroSection from "@/components/HeroSection";
import ImageAcceptorSection from "@/components/ImageAcceptorSection";
import { GiFootprint } from "react-icons/gi";

export default function Home() {
  return (
    <div className="h-[60vh] relative">
      <HeroSection />

      <div className="flex w-full gap-10 justify-start items-center h-[40vh] px-20">
        <GiFootprint className="text-[15rem] text-emerald-600 animate-slideleft" />

        <div className="flex flex-col w-full items-center justify-center gap-14">
          <h1 className="text-3xl font-semibold text-center text-emerald-700 animate-slidedown">
            EcoScan helps you measure the <span className="underline">total carbon score</span> of your wardrobe.
            <br />
            Make informed choices, track your impact, and earn rewards —{" "}
            <span className="underline">all in one place.</span>
            <br />
            Get started now by choosing how you want to upload your clothes from below!
          </h1>
          <ImageAcceptorSection />
        </div>

        <GiFootprint className="scale-x-[-1] text-[15rem] text-emerald-600 animate-slideleft" />
      </div>
    </div>
  );
}
