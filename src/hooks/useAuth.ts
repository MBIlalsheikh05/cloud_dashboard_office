// hooks/useAuth.ts
import { useState } from "react";

export const useAuth = () => {
  // TEMP: fake logged-in user
  const [user] = useState({
    id: 1,
    name: "Bilal",
    role: "admin", // try changing to "viewer"
  });

  return { user };
};
