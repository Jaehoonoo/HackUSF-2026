import { auth } from "@clerk/nextjs/server";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

export async function GET(req) {
    try {
        // Authenticate the user and get session claims
        //const userId = new URL(req.url, `http://${req.headers.get('host')}`).searchParams.get(const usersRef);
        
        // if (!userId) {
        //     return new Response(
        //         JSON.stringify({ error: "Unauthorized" }), 
        //         { status: 401 }
        //     );
        // }

        // Check if user has admin role
        // if (sessionClaims?.metadata?.role !== 'admin') {
        //     return new Response(
        //         JSON.stringify({ error: "Forbidden - Admin access required" }), 
        //         { status: 403 }
        //     );
        // }

        const usersRef = collection(db, "users");
        
        // Fetch users in parallel by status (including empty status)
        const [
            acceptedSnapshot,
            rejectedSnapshot,
            pendingSnapshot,
            waitlistedSnapshot
        ] = await Promise.all([
            getDocs(query(usersRef, where("status", "==", "accepted"))),
            getDocs(query(usersRef, where("status", "==", "rejected"))),
            getDocs(query(usersRef, where("status", "==", "pending"))),
            getDocs(query(usersRef, where("status", "==", "waitlisted"))),
        ]);

        // Map Firestore documents to plain objects with IDs
        const acceptedUsers = acceptedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const rejectedUsers = rejectedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const pendingUsers = pendingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const waitlistedUsers = waitlistedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Build response data
        const data = {
            acceptedUsers,
            rejectedUsers,
            pendingUsers,
            waitlistedUsers,

            acceptedUsersCount: acceptedUsers.length,
            rejectedUsersCount: rejectedUsers.length,
            pendingUsersCount: pendingUsers.length,
            waitlistedUsersCount: waitlistedUsers.length,

            totalUsers:
                acceptedUsers.length +
                rejectedUsers.length +
                pendingUsers.length +
                waitlistedUsers.length 
        };

        return new Response(
            JSON.stringify({ 
                success: true, 
                data
            }), 
            { 
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );

    } catch (error) {
        console.error("Error fetching users:", error);
        return new Response(
            JSON.stringify({ 
                success: false, 
                error: error.message 
            }), 
            { status: 500 }
        );
    }
}
