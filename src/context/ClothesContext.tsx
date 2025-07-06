"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type ICarbonFootprintClothes = {
  clothItem: string;
  count: number;
  carbonFootprint: number;
};

type IClothesContextType = {
  carbonFootprint: ICarbonFootprintClothes[] | null;
  setFootprint: (data: ICarbonFootprintClothes[], image: string) => void;
  img: string | null;
  setImg: (img: string | null) => void;
};

const ClothesContext = createContext<IClothesContextType | undefined>(undefined);

export const ClothesProvider = ({ children }: { children: React.ReactNode }) => {
  const [carbonFootprint, setCarbonFootprint] = useState<ICarbonFootprintClothes[] | null>(null);
  const [img, setImg] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("carbon_footprint");
    if (saved) setCarbonFootprint(JSON.parse(saved));

    const image = localStorage.getItem("image");
    if (image) setImg(JSON.parse(image));
  }, []);

  const setFootprint = (data: ICarbonFootprintClothes[], image: string) => {
    setCarbonFootprint(data);
    setImg(image);
    localStorage.setItem("carbon_footprint", JSON.stringify(data));
    localStorage.setItem("image", JSON.stringify(image));
  };

  return (
    <ClothesContext.Provider value={{ carbonFootprint, setFootprint, img, setImg }}>{children}</ClothesContext.Provider>
  );
};

export const useClothes = () => {
  const context = useContext(ClothesContext);
  if (!context) throw new Error("useClothes must be used within ClothesProvider");
  return context;
};
