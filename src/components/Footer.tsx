import Link from "next/link";
import { SiDiscover, SiPaypal, SiMastercard, SiVisa } from "react-icons/si";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPinterestP,
  FaXTwitter,
} from "react-icons/fa6";

const about = [
  { title: "About Us", url: "/" },
  { title: "Careers", url: "/" },
  { title: "Affiliates", url: "/" },
  { title: "Blog", url: "/" },
  { title: "Contact Us", url: "/" },
];

const shop = [
  { title: "New Arrivals", url: "/" },
  { title: "Accessories", url: "/" },
  { title: "Men", url: "/" },
  { title: "Women", url: "/" },
  { title: "All Products", url: "/" },
];

const help = [
  { title: "Customer Service", url: "/" },
  { title: "My Account", url: "/" },
  { title: "Find a Store", url: "/" },
  { title: "Legal & Privacy", url: "/" },
  { title: "Gift Card", url: "/" },
];

const Footer = () => {
  return (
    <div className="dark:text-gray-100  pt-24 pb-12 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 text-sm min-h-[590px] ringed-t border-t border-gray-300 dark:border-gray-700">
      {/* Top */}
      <div className="flex justify-between flex-col md:flex-row gap-24">
        {/* LEFT */}
        <div className="w-full md:1/2 lg:w-1/4 flex flex-col gap-8">
          <Link href="/">
            <div className="text-TrendoGo-green font-medium text-2xl tracking-wider hover:text-green-800 transition-all duration-300">
              TrendoGo
            </div>
          </Link>
          <p className="dark:text-gray-300">
            3252 Winding Way, Central Plaza, Willowbrook, CA 90210, United
            States
          </p>
          <span className="font-semibold">hello@gmail.dev</span>
          <span className="font-semibold">+1 234 567 890</span>
          <div className="flex gap-6 text-gray-700 text-xl">
            <FaFacebookF className="text-facebook cursor-pointer" />
            <FaInstagram className="text-instagram cursor-pointer" />
            <FaYoutube className="text-youtube cursor-pointer" />
            <FaXTwitter className="text-x cursor-pointer" />
            <FaPinterestP className="text-pinterest cursor-pointer" />
          </div>
        </div>

        {/* CENTER */}
        <div className="hidden lg:flex justify-between w-1/2 h-[350px]">
          {/* COMPANY */}
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">COMPANY</h1>
            <div className="flex flex-col gap-6">
              {about.map((item, index) => (
                <Link
                  key={index}
                  className="hover:text-TrendoGo-green dark:hover:text-TrendoGo-green font-medium transition-all duration-300"
                  href={item.url}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* SHOP */}
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">SHOP</h1>
            <div className="flex flex-col gap-6">
              {shop.map((item, index) => (
                <Link
                  key={index}
                  className="hover:text-TrendoGo-green dark:hover:text-TrendoGo-green font-medium transition-all duration-300"
                  href={item.url}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* HELP */}
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">HELP</h1>
            <div className="flex flex-col gap-6">
              {help.map((item, index) => (
                <Link
                  key={index}
                  className="hover:text-TrendoGo-green dark:hover:text-TrendoGo-green font-medium transition-all duration-300"
                  href={item.url}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:1/2 lg:w-1/4 flex flex-col gap-8">
          <h1 className="font-medium text-lg">SUBSCRIBE</h1>
          <p className="dark:text-gray-300">
            Be the first to get the latest news about trends, promotions, and
            much more!
          </p>
          <div className="flex border border-gray-500 dark:border-gray-700 rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Email address"
              className="p-4 w-3/4 outline-none rounded-l-md bg-transparent"
            />
            <button className="w-1/4  bg-primary hover:bg-blue-600 text-gray-100  transition-all duration-300">
              Join
            </button>
          </div>
          <span className="font-semibold">Secure Payments</span>
          <div className="flex justify-between items-center gap-4 text-gray-700 ">
            <SiDiscover
              className="text-discover-black dark:text-discover-orange cursor-pointer"
              size={45}
            />
            <SiPaypal
              className="dark:text-paypal-dark text-paypal-light cursor-pointer"
              size={32}
            />
            <SiMastercard
              className="text-mastercard-orange cursor-pointer"
              size={32}
            />
            <SiVisa
              className="text-visa-blue dark:text-visa-yellow cursor-pointer"
              size={32}
            />
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-col justify-between md:flex-row gap-8 mt-16">
        <div className="text-center">@ 2024 TrendoGo Shop</div>
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <div>
            <span className="text-gray-500 font-semibold">Language</span>
            <span className="mx-4 font-medium text-base">
              United State | English
            </span>
          </div>
          <div>
            <span className="font-semibold text-gray-500">Currency</span>
            <span className="font-semibold"> $ USD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
