import { wixClientServer } from "@/lib/WixClientServer";

const ProfilePage = async () => {
  const wixClient = await wixClientServer();
  const member = await wixClient.members.getCurrentMember();
  console.log(member.member);
  return (
    <div className=" bg-white    flex flex-col md:flex-row gap-24 md:h-[calc(100vh-180px)]  items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className=" w-full md:w-1/2  ">
        {" "}
        {member.member?.profile?.nickname}{" "}
      </div>
      <div className=" w-full md:w-1/2  "> Orders </div>
    </div>
  );
};

export default ProfilePage;
