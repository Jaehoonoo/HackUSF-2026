"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function CreateProfileOnSignIn() {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (!isSignedIn || !user?.id) {
      return;
    }

    // Check if we've already created a profile for this user (persisted across refreshes)
    const createdKey = `profile_created_${user.id}`;
    if (localStorage.getItem(createdKey)) {
      return;
    }

    // Mark as created before making the API call
    localStorage.setItem(createdKey, "true");

    const createProfile = async () => {
      try {
        await fetch("/api/createProfile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            email: user.primaryEmailAddress?.emailAddress || "",
          }),
        });
      } catch (error) {
        console.error("Failed to create profile:", error);
        // Remove the flag if the API call fails so it retries next time
        localStorage.removeItem(createdKey);
      }
    };

    createProfile();
  }, [isSignedIn, user?.id]);

  return null;
}
