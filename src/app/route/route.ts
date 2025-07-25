// /app/api/products/route.ts

import { NextResponse } from "next/server";
import { wixClientServer } from "@/lib/WixClientServer"; // نفس العميل اللي بتستخدمه على السيرفر

export async function GET() {
  try {
    const wixClient = await wixClientServer();
    const res = await wixClient.products.queryProducts().find();

    return NextResponse.json(res);
  } catch (err) {
    console.error("Error fetching products", err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
