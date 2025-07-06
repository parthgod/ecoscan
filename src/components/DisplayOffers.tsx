import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { OFFERS } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { FaCoins } from "react-icons/fa";
import { Button } from "./ui/button";

const DisplayOffers = ({ offers }: { offers: typeof OFFERS }) => {
  return (
    <div className="mt-4">
      <h3 className="text-2xl font-bold mb-5">Available Offers ({offers.length}):</h3>
      <div className="flex flex-wrap justify-start items-center gap-5">
        {offers.map((offer, index) => (
          <Card
            key={index}
            className="w-[23vw] h-[40vh] relative shadow-md"
          >
            <CardHeader>
              <div className="h-[14vh] flex justify-center items-center">
                <Image
                  src={offer.brandLogo}
                  alt={offer.brandName}
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              </div>
              <CardTitle>{offer.brandName}</CardTitle>
              <CardDescription>Valid till: {offer.validTill}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{offer.offerMessage}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-emerald-500 text-lg hover:bg-emerald-600 active:scale-90 w-50"
                  >
                    Claim now
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center">Offer claimed</DialogTitle>
                    <DialogDescription>
                      Congratulations! You have successfully claimed the offer from {offer.brandName} which costs{" "}
                      {offer.pointsRequired} points. Your eco-rewards will be deducted accordingly. The offer is valid
                      till {offer.validTill}. An email will be sent to you with a unique coupon code to redeem. Enjoy
                      your shopping!
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button className="w-full">
                      <Link
                        href="/"
                        className="w-full"
                      >
                        Continue to home
                      </Link>
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <p className="flex gap-2 text-3xl items-center text-yellow-600">
                {offer.pointsRequired} <FaCoins />
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DisplayOffers;
