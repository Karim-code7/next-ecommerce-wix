import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { members } from "@wix/members";
import { orders } from "@wix/ecom";
import { cookies } from "next/headers";

export const wixClientServer = async () => {
  let refreshToken = null;

  try {
    const cookieStore = cookies();
    const raw = cookieStore.get("refreshToken")?.value;

    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.value) refreshToken = parsed;
    }
  } catch (e) {
    console.warn("No valid refreshToken found:", e);
  }

  const wixClient = createClient({
    modules: {
      products,
      collections,
      members,
      orders,
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: {
        refreshToken: refreshToken || undefined,
        accessToken: { value: "", expiresAt: 0 },
      },
    }),
  });

  return wixClient;
};
