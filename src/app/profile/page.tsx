import UpdateButton from "@/components/UbdateButton";
import { updateUser } from "@/lib/action";
import { wixClientServer } from "@/lib/WixClientServer";
import { members } from "@wix/members";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

const ProfilePage = async () => {
  const wixClient = await wixClientServer();

  const isLoggedIn = await wixClient.auth.loggedIn();

  if (!isLoggedIn) {
    redirect("/login");
  }

  const user = await wixClient.members.getCurrentMember({
    fieldsets: [members.Set.FULL],
  });

  if (!user.member?.contactId) {
    return <div className="">Not logged in!</div>;
  }

  return (
    <div className="mt-24 flex flex-col md:flex-row gap-24 md:h-[calc(100vh-180px)] items-start px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      {/* Left: Profile Form */}
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl font-semibold dark:text-gray-100">Profile</h1>
        <form action={updateUser} className="mt-12 flex flex-col gap-4">
          <input type="text" hidden name="id" value={user.member.contactId} />
          <label className="text-sm text-gray-700 dark:text-gray-100">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder={user.member?.profile?.nickname || "john"}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          />
          <label className="text-sm text-gray-700 dark:text-gray-100">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            placeholder={user.member?.contact?.firstName || "John"}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          />
          <label className="text-sm text-gray-700 dark:text-gray-100">
            Surname
          </label>
          <input
            type="text"
            name="lastName"
            placeholder={user.member?.contact?.lastName || "Doe"}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          />
          <label className="text-sm text-gray-700 dark:text-gray-100">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            placeholder={
              (user.member?.contact?.phones &&
                user.member?.contact?.phones[0]) ||
              "+1234567"
            }
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          />
          <label className="text-sm dark:text-gray-100">E-mail</label>
          <input
            type="email"
            name="email"
            placeholder={user.member?.loginEmail || "john@gmail.com"}
            disabled
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96 disabled:bg-gray-300 placeholder:text-gray-900 cursor-not-allowed"
          />
          <UpdateButton />
        </form>
      </div>

      {/* Right: Profile Info */}
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl font-semibold dark:text-gray-100">
          Account Info
        </h1>
        <div className="mt-20 grid gap-4">
          <div className="p-4 bg-slate-100 rounded-md shadow-sm">
            <h2 className="text-sm text-gray-500">Member ID</h2>
            <p className="text-lg">{user.member.contactId}</p>
          </div>
          <div className="p-4 bg-slate-100 rounded-md shadow-sm">
            <h2 className="text-sm text-gray-500">Email</h2>
            <p className="text-lg">{user.member.loginEmail}</p>
          </div>
          <div className="p-4 bg-slate-100 rounded-md shadow-sm">
            <h2 className="text-sm text-gray-500">Joined</h2>
            <p className="text-lg">
              {user.member.lastLoginDate
                ? new Date(user.member.lastLoginDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
          <div className="p-4 bg-slate-100 rounded-md shadow-sm">
            <h2 className="text-sm text-gray-500">Last Update</h2>
            <p className="text-lg">
              {user.member._updatedDate
                ? new Date(user.member._updatedDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
