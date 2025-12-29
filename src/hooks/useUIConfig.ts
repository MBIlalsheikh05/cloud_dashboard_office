// hooks/useUIConfig.ts

import { uiConfig } from "@/data/ui-config";
import { useAuth } from "@/hooks/useAuth";

export const useUIConfig = (page: string) => {
  const { user } = useAuth();

  const role = user.role;

  return (
    uiConfig[role]?.[page] ?? {
      visibleColumns: [],
    }
  );
};
