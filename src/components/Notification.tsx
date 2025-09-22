"use client";
import { useUI } from "@/context/UIContext";
const Notification = () => {
  const { gradiant } = useUI();

  return (
    <div className=" absolute  top-12 right-0  w-64  bg-white dark:bg-slate-800 p-4 z-50  rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <p className={`${gradiant} text-xl`}>All notifivations</p>
      <div className="w-full h-[1px] bg-gray-300 mt-3"></div>
      <div className="mt-3">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="mb-3">
            <p className="text-base font-poppins mb-2">Notification {item}</p>
            <p className="text-xs text-gray-600 dark:text-gray-300 font-poppins ">
              This is the detail of notification {item}
            </p>
            <div className="w-full h-[1px] bg-gray-200 mt-3"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
