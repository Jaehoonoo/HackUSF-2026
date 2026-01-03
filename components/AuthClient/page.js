"use client";

import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";

export default function CreateProfileOnSignIn() {
  const { isSignedIn, user } = useUser();
  const hasCreatedRef = useRef(false);

  useEffect(() => {
    if (!isSignedIn || !user?.id || hasCreatedRef.current) {
      return;
    }

    hasCreatedRef.current = true;

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
      }
    };

    createProfile();
  }, [isSignedIn, user]);

  return null;
}
