import { ICarbonFootprintClothes } from "@/context/ClothesContext";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const { carbonFootprint } = await request.json();
    if (!carbonFootprint || carbonFootprint.length === 0)
      return NextResponse.json({ success: false, error: "No carbon footprint data provided" }, { status: 400 });

    // Calculate total carbon footprint
    let totalCarbonFootprint = 0;
    let totalEcoRewards = 0;

    carbonFootprint.forEach((item: ICarbonFootprintClothes) => {
      if (item.carbonFootprint && item.count) {
        const total = item.carbonFootprint * item.count;
        totalCarbonFootprint += total;
      }
    });
    totalEcoRewards = Math.floor(10000 / totalCarbonFootprint);

    return NextResponse.json({
      success: true,
      totalCarbonFootprint: totalCarbonFootprint,
      totalEcoRewards: totalEcoRewards,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to calculate carbon footprint and eco-rewards" },
      { status: 500 }
    );
  }
};
