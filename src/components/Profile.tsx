// components/Profile.tsx
"use client";
import Image from "next/image";
import { useEffect } from "react";
import { useProfileStore } from "@/hooks/useProfileStore";
import { useWixClient } from "@/hooks/useWixClient";

function ProfileAvatar({ name, email, picture }: any) {
  const seed = name || email || "guest";
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    seed + " "
  )}&background=random`;

  return (
    <div className="border-4 border-blue-600 rounded-full shadow-md ">
      <Image
        src={picture || fallbackAvatar}
        alt={seed || "Guest"}
        width={80}
        height={80}
        className="rounded-full  "
      />
    </div>
  );
}

const Profile = () => {
  const wixClient = useWixClient();
  const { member, email, fetchMember, isLoading } = useProfileStore();

  useEffect(() => {
    if (!member) {
      fetchMember(wixClient);
    }
  }, [member, fetchMember, wixClient]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center gap-3 ">
      <ProfileAvatar
        name={member?.profile?.nickname}
        email={member?.loginEmaill}
        picture={member?.profile?.photo?.url}
      />

      <h2 className="font-bold text-lg font-poppins dark:text-gray-100">
        {member?.profile?.nickname || "Guest"}
      </h2>
      <p className="text-gray-500 mb-4 dark:text-gray-300 font-roboto">
        {email || "No email"}
      </p>
    </div>
  );
};

export default Profile;
