import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="flex justify-between items-center h-[60vh] w-full bg-green-100 overflow-hidden">
      <div className="h-[60vh] w-[50%] gap-10 flex flex-col justify-center items-start px-20">
        <Image
          src="/logo.png"
          alt="EcoScan Logo"
          width={500}
          height={50}
          className="animate-slidedown"
        />
        <p className="text-2xl text-green-700 animate-slideup">
          EcoScan helps users understand the environmental impact of their clothes, promotes sustainable choices, and
          rewards them with eco-reward points.
        </p>
      </div>

      <Image
        src="/footprint.jpg"
        alt="footprint"
        width={600}
        height={600}
        className="aspect-auto animate-slideright object-cover object-center w-[50%]"
      />
    </div>
  );
};

export default HeroSection;
