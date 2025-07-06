import { CARBON_FOOTPRINTS, RANDOM_CLOTHES_CATEGORIES } from "@/lib/constants";
import { countClothes } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

// const client = new ImageAnnotatorClient({
//   keyFilename: process.env.VISION_API_KEYFILENAME!,
// });

// const apiKey = IMAGGA_API_KEY;
// const apiSecret = IMAGGA_API_SECRET;

// export async function POST(req: NextRequest) {
//   try {
//     const { image } = await req.json();
//     const cleanedBase64 = image.replace(/^data:image\/\w+;base64,/, "");
//     // Convert base64 to buffer
//     const imageBuffer = Buffer.from(cleanedBase64, "base64");

//     // Create form data
//     const form = new FormData();
//     form.append("image", imageBuffer, {
//       filename: "image.jpg",
//       contentType: "image/jpeg",
//     });

//     const response = await got.post("https://api.imagga.com/v2/tags", {
//       body: form,
//       username: apiKey,
//       password: apiSecret,
//     });
//     const result = JSON.parse(response.body);

//     return NextResponse.json({ success: true, result });
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json({ success: false, error: "Failed to analyze image" }, { status: 500 });
//   }
// }

export const POST = async (req: NextRequest) => {
  try {
    const { image } = await req.json();
    const response = RANDOM_CLOTHES_CATEGORIES[Math.floor(Math.random() * RANDOM_CLOTHES_CATEGORIES.length)];
    const totalCLothes = countClothes(response);
    const result = Object.keys(totalCLothes).map((key) => ({
      clothItem: key,
      count: totalCLothes[key],
      carbonFootprint: CARBON_FOOTPRINTS[key],
    }));

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: "Failed to analyze image" }, { status: 500 });
  }
};
