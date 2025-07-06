"use client";

import { useClothes } from "@/context/ClothesContext";
import { OFFERS } from "@/lib/constants";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaCoins } from "react-icons/fa";
import DisplayCarbonFootprints from "./DisplayCarbonFootprints";
import DisplayOffers from "./DisplayOffers";
import { Button } from "./ui/button";

const DisplayResults = () => {
  const { carbonFootprint, img } = useClothes();

  const [carbonScore, setCarbonScore] = useState<number>(0);
  const [ecoRewards, setEcoRewards] = useState<number>(0);
  const [offers, setOffers] = useState<typeof OFFERS>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (carbonScore > 0 || ecoRewards > 0 || offers.length > 0) {
      setLoading(false);
      if (elementRef.current) elementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [carbonScore, ecoRewards, offers]);

  const handleCalculateResults = async () => {
    setLoading(true);
    if (carbonFootprint && carbonFootprint.length > 0) {
      try {
        const response = await axios.post("/api/calculateScore", { carbonFootprint });
        if (response.data.success) {
          setCarbonScore(response.data.totalCarbonFootprint);
          setEcoRewards(response.data.totalEcoRewards);

          const offersResponse = await axios.post("/api/offers", { points: response.data.totalEcoRewards });
          console.log(offersResponse.data.offers);
          setOffers(offersResponse.data.offers);
        } else {
          console.error("Error calculating results:", response.data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4 w-full gap-10">
      <h1 className="text-4xl font-bold w-full text-center">
        Your Scan Results
        <hr className="mt-5" />
      </h1>

      <div className="flex flex-col md:flex-row justify-center items-center gap-10 w-full px-10">
        {img && (
          <Image
            src={img!}
            alt="Uploaded or Captured Image"
            width={500}
            height={500}
            className="h-auto w-auto max-w-[40vw] rounded-lg shadow-lg"
          />
        )}

        <div className="flex flex-col items-center justify-center gap-10 w-[50%]">
          <DisplayCarbonFootprints carbonFootprint={carbonFootprint} />

          <Button
            onClick={handleCalculateResults}
            size="lg"
            className="text-xl h-12 bg-emerald-600 hover:bg-emerald-700 active:scale-95"
            disabled={!carbonFootprint || carbonFootprint.length === 0 || loading || offers.length > 0}
          >
            {loading ? "Calculating..." : "Cllick here to calculate Total Carbon Score and Eco-Rewards"}
            {loading && (
              <div className="w-7 h-7 border-4 border-t-gray-600 border-gray-300 rounded-full animate-spin ml-4"></div>
            )}
          </Button>
        </div>
      </div>

      <div ref={elementRef}>
        <hr className="mb-5" />
        {carbonScore > 0 && ecoRewards > 0 && (
          <div className="flex flex-col items-center justify-center gap-5">
            <h3 className="text-2xl font-bold">
              Total Carbon Score: <span className="text-emerald-600 font-semibold">{carbonScore} kg CO2e</span>
            </h3>
            <h3 className="text-2xl font-bold">
              Eco-rewards earned:{" "}
              <span className="text-yellow-600 font-semibold">
                {ecoRewards} points
                <FaCoins className="inline-block ml-2 text-2xl" />
              </span>
            </h3>
          </div>
        )}

        {offers.length > 0 && <DisplayOffers offers={offers} />}
      </div>
    </div>
  );
};

export default DisplayResults;
