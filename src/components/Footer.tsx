import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="p-24 px-4 md:px-8 lg:px-16  xl:px-32 2xl:px-64  bg-gray-100 text-sm mt-24">
      {/* Top */}
      <div className=" flex justify-between flex-col md:flex-row gap-24">
        {/* LEFT */}
        <div className="w-full   md:1/2  lg:w-1/4 flex flex-col gap-8">
          <Link href="/">
            {" "}
            <div className="text-lama-green font-medium text-2xl tracking-wider hover:text-green-800 transition-all duration-300">
              LAMA{" "}
            </div>
          </Link>
          <p>
            3252 Winding Way, Central Plaza, Willowbrook, CA 90210, United
            States{" "}
          </p>
          <span className="font-semibold">hello@gmail.dev</span>
          <span className="font-semibold">+1 234 567 890</span>
          <div className="flex  gap-6">
            <Image src="/facebook.png" alt="" width={16} height={16} />
            <Image src="/Instagram.png" alt="" width={16} height={16} />
            <Image src="/youtube.png" alt="" width={16} height={16} />
            <Image src="/pinterest.png" alt="" width={16} height={16} />
            <Image src="/x.png" alt="" width={16} height={16} />
          </div>
        </div>
        {/* CETNTER */}
        <div className="hidden lg:flex justify-between w-1/2">
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">COMPANY</h1>
            <div className="flex flex-col gap-6">
              <Link href="">About Us</Link>
              <Link href="">Careers</Link>
              <Link href="">Affiliates</Link>
              <Link href="">Blog</Link>
              <Link href="">Contact Us</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">SHOP</h1>
            <div className="flex flex-col gap-6">
              <Link href="">New Arrivals</Link>
              <Link href="">Accessories</Link>
              <Link href="">Men</Link>
              <Link href="">Women</Link>
              <Link href="">All Products </Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">HELP</h1>
            <div className="flex flex-col gap-6">
              <Link href="">Customer Service</Link>
              <Link href="">My Account</Link>
              <Link href="">Find a Store</Link>
              <Link href="">Legal & Privacy</Link>
              <Link href="">Gift Card </Link>
            </div>
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full  md:1/2 lg:w-1/4 flex flex-col gap-8">
          <h1 className="font-medium text-lg">SUBSCRIBE</h1>
          <p>
            {" "}
            Be the first to get the latest new about trends, promotions, and
            much more!
          </p>
          <div className="flex">
            <input
              type="text"
              placeholder="Email addrees "
              className="p-4 w-3/4"
            />
            <button className=" w-1/4 bg-lama text-white">Join</button>
          </div>
          <span className="font-semibold">Secure Payments </span>
          <div className=" flex justify-between">
            <Image src="/discover.png" alt="Discover" width={40} height={40} />
            <Image src="/skrill.png" alt="Skrill" width={40} height={40} />
            <Image src="/paypal.png" alt="PayPal" width={40} height={40} />
            <Image
              src="/mastercard.png"
              alt="Mastercard"
              width={40}
              height={40}
            />
            <Image src="/visa.png" alt="Visa" width={40} height={40} />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between md:flex-row gap-8 mt-16">
        <div className="text-center">@ 2024 Lama Shop</div>
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <div>
            <span className="text-gray-500 font-semibold">Language</span>
            <span className="mx-4 font-medium text-base">
              United State | Englich
            </span>
          </div>
          <div>
            {" "}
            <span className="font-semibold  text-gray-500">Currency</span>
            <span className="font-semibold"> $ USD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
