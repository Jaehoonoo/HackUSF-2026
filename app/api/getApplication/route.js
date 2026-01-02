import {doc, getDoc} from "firebase/firestore";
import {db} from "@/firebase";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const userId = new URL(req.url, `http://${req.headers.host}`).searchParams.get('userId');
        const docRef = doc(db, "users", userId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          return NextResponse.json({success: true, data: docSnap.data()}, {status: 200})
        } else {
          return NextResponse.json({success: false, error: "Cannot find user"}, {status: 404})
        }

    } catch (error) {
        console.error(error)
        return NextResponse.json({success: false, error: error.message}, {status: 500})
    }
}