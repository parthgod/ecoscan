import { OFFERS } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const { points } = await request.json();

    const result = OFFERS.filter((offer) => offer.pointsRequired <= points);

    return NextResponse.json({ success: true, offers: result });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch offers" }, { status: 500 });
  }
};
