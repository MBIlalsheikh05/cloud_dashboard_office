"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user.role !== "admin") {
      router.replace("/");
    }
  }, [user.role, router]);

  // Optional: prevent flicker
  if (user.role !== "admin") {
    return null;
  }


// useEffect(() => {
//   console.log("ADMIN LAYOUT HIT");
//   console.log("ROLE:", user.role);

//   if (user.role !== "admin") {
//     console.log("REDIRECTING...");
//     router.replace("/dashboard");
//   }
// }, [user.role, router]);


  return <>{children}</>;
}
