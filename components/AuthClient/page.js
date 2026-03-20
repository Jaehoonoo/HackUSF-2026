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

    const createProfile = async () => {
      try {
        const response = await fetch("/api/createProfile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            email: user.primaryEmailAddress?.emailAddress || "",
          }),
        });

        if (!response.ok) {
          throw new Error(`Profile creation failed with status ${response.status}`);
        }

        localStorage.setItem(createdKey, "true");
      } catch (error) {
        console.error("Failed to create profile:", error);
        localStorage.removeItem(createdKey);
      }
    };

    createProfile();
  }, [isSignedIn, user?.id]);

  return null;
}
