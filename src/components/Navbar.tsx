import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="h-[10vh] bg-emerald-200 flex justify-between items-center overflow-hidden px-10">
      {/* <h1>EcoScan</h1> */}
      <Link href="/">
        <Image
          src="/logo.png"
          alt="EcoScan Logo"
          width={200}
          height={50}
        />
      </Link>

      <div className="flex gap-5 text-xl">
        <Link
          href="/"
          className="text-emerald-700 hover:underline"
        >
          Home
        </Link>

        <Link
          href="/"
          className="text-emerald-700 hover:underline"
        >
          About
        </Link>

        <Link
          href="/"
          className="text-emerald-700 hover:underline"
        >
          Contact
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
