import DisplayResults from "@/components/DisplayResults";
import Navbar from "@/components/Navbar";

const ResultsPage = () => {
  return (
    <div className="overflow-hidden w-full">
      <Navbar />
      <div className="h-[90vh] w-full overflow-auto">
        <DisplayResults />
      </div>
    </div>
  );
};

export default ResultsPage;
