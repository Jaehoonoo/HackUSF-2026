import { NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ status: "" }, { status: 200 });
  }

  try {
    const docRef = doc(db, "applications", userId);
    const snap = await getDoc(docRef);
    const status = snap.exists() ? snap.data().status || "" : "";

    return NextResponse.json({ status }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: "" }, { status: 200 });
  }
}
