"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded) {
      if (user) {
        router.push("/dashboard");
      } else {
        router.push("/sign-in");
      }
    }
  }, [user, isLoaded, router]);

  return null; // Render nothing as the user is redirected immediately
}
