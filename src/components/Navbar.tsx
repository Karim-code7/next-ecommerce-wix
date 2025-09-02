import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";
import SerachBar from "./SearchBar";
import dynamic from "next/dynamic";
// import Navicons from "./NavIcons";
const Navbar = () => {
  const Navicons = dynamic(() => import("./NavIcons"), { ssr: false });

  return (
    <div className=" bg-white h-20 px-4 md:px-8 lg:px-16  xl:px-32 2xl:px-64 relative ">
      {/*  MOBILE */}
      <div className="flex items-center justify-between h-full md:hidden">
        <Link rel="stylesheet" href="/">
          <div className="text-lama-green font-medium text-2xl tracking-wider hover:text-green-800 transition-all duration-300">
            LAMA
          </div>
        </Link>
        <Menu />
      </div>
      {/* BIGER SCREEN */}
      <div className="hidden md:flex items-center justify-between gap-8 h-full ">
        {/* LEFT */}
        <div className=" w-1/3 xl:w-1/2 flex items-center justify-center gap-12">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="" width={24} height={24} />

            <div className="text-lama-green font-medium text-2xl tracking-wider hover:text-green-800 transition-all duration-300">
              LAMA
            </div>
          </Link>
          <div className=" hidden xl:flex gap-4">
            <Link href={"/"}>Home</Link>
            <Link href={"/"}>Shop</Link>
            <Link href={"/"}>Deals</Link>
            <Link href={"/"}>About</Link>
            <Link href={"/"}>Contact</Link>
          </div>
        </div>
        {/* RIGHT */}
        <div className="  w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
          <SerachBar />
          <Navicons />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
