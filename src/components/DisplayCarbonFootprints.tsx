import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ICarbonFootprintClothes } from "@/context/ClothesContext";

const DisplayCarbonFootprints = ({ carbonFootprint }: { carbonFootprint: ICarbonFootprintClothes[] | null }) => {
  return (
    <Table className="w-full text-lg">
      <TableCaption className="text-lg">Analysis result of the image</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Sr. No.</TableHead>
          <TableHead>Clothing Items found</TableHead>
          <TableHead>Count of clothing item</TableHead>
          <TableHead>
            Carbon Footprint of <br />
            clothing item (kg CO2e)
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {carbonFootprint && carbonFootprint.length > 0 ? (
          carbonFootprint.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.clothItem}</TableCell>
              <TableCell>{item.count}</TableCell>
              <TableCell>{item.carbonFootprint.toFixed(2)}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3}>No results found.</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DisplayCarbonFootprints;
