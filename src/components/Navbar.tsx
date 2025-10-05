import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";
import SerachBar from "./SearchBar";
import Navicons from "./NavIcons";
const Navbar = () => {
  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/list" },
    { name: "About", href: "/" },
    { name: "Contact", href: "/" },
  ];

  return (
    <div className=" bg-white dark:text-gray-100 dark:bg-gray-800 transition-background duration-300   h-20 px-4 md:px-8 lg:px-16  xl:px-32 2xl:px-64 fixed top-0 left-0 right-0 z-50 shadow-md ">
      {/*  MOBILE */}
      <div className="flex items-center justify-between h-full md:hidden">
        <Link rel="stylesheet" href="/">
          <div className="text-trendo-green font-medium text-2xl tracking-wider hover:text-green-800 transition-all duration-300  font-poppins ">
            TrendoGo
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

            <div className="text-secound font-medium text-2xl tracking-wider hover:text-green-800 transition-all duration-300  ">
              TrendoGo
            </div>
          </Link>
          <div className="     hidden xl:flex gap-4 transition-all duration-300 ">
            {menuItems.map((item, index) => (
              <Link
                className=" text-gray-700 
              dark:text-gray-300 
                cursor-pointer 
              hover:text-secound 
              dark:hover:text-secound
                font-medium 
                transition-colors 
                duration-300"
                key={index}
                href={item.href}
              >
                {item.name}
              </Link>
            ))}
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
