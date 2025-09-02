"use client";
import { useWixClient } from "@/hooks/useWixClient";
import Image from "next/image";
import { useEffect, useState } from "react";

type ProfileAvatarProps = {
  name?: string;
  email?: string;
  picture?: string; // صورة جايه من Wix لو موجودة
};

function ProfileAvatar({ name, email, picture }: ProfileAvatarProps) {
  const seed = name || email || "guest";
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    seed + " "
  )}&background=random`;

  return (
    <div className="border-4 border-blue-400 rounded-full shadow-md ">
      <Image
        src={picture || fallbackAvatar}
        alt={seed || "Guest"}
        width={80}
        height={80}
        className="rounded-full border shadow-sm"
      />
    </div>
  );
}

const Profile = () => {
  const wixClient = useWixClient();
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | any>(null);
  useEffect(() => {
    async function fetchMember() {
      try {
        const res = await wixClient.members.getCurrentMember();
        setMember(res.member);
        setEmail(res.member?.profile?.slug?.slice(0, -5));
      } catch (err) {
        console.error("Failed to fetch member:", err);
        setMember(null);
        setEmail(null);
      } finally {
        setLoading(false);
      }
    }
    fetchMember();
  }, [wixClient]);

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="flex flex-col items-center gap-3">
      <ProfileAvatar
        name={member?.profile?.nickname}
        email={member?.contact?.email}
        picture={member?.profile?.photo?.url}
      />

      <h2 className="font-bold text-lg">
        {member?.profile?.nickname || "Guest"}
      </h2>
      <p className="text-gray-500 mb-4  ">{email || "No email"}</p>
    </div>
  );
};

export default Profile;
