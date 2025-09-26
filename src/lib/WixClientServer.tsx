import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { members } from "@wix/members";
import { orders } from "@wix/ecom";
import { cookies } from "next/headers";

// يُبقى على force-dynamic لضمان قراءة الكوكيز في وقت التشغيل
export const dynamic = "force-dynamic";

export const wixClientServer = async () => {
  let refreshToken = null;

  try {
    const cookieStore = cookies();
    const raw = cookieStore.get("refreshToken")?.value;

    if (raw) {
      // المنطق الصحيح لتحليل رمز التحديث
      const parsed = JSON.parse(raw);
      if (parsed?.value) refreshToken = parsed;
    }
  } catch (e) {
    // ترك التحذير في حالة عدم العثور على توكن ساري
    console.warn("No valid refreshToken found on server:", e);
  }

  const wixClient = createClient({
    modules: {
      products,
      collections,
      members,
      orders,
    },
    auth: OAuthStrategy({
      // 💡 التعديل الحاسم: استخدام WIX_CLIENT_ID (المتغير الآمن للخادم)
      // هذا يجب أن يحل مشكلة "Authorization header is invalid" على Vercel.
      clientId: process.env.WIX_CLIENT_ID!,
      tokens: {
        refreshToken: refreshToken || undefined,
        accessToken: { value: "", expiresAt: 0 },
      },
    }),
  });

  return wixClient;
};
