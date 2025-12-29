// data/ui-config.ts

import { RoleUIConfig } from "@/types/ui-config";

export const uiConfig: RoleUIConfig = {
  admin: {
    logs: {
      visibleColumns: [
        "timestamp",
        "level",
        "message",
        "ip",
        "userAgent",
      ],
    },
  },

  manager: {
    logs: {
      visibleColumns: [
        "timestamp",
        "level",
        "message",
      ],
    },
  },

  viewer: {
    logs: {
      visibleColumns: [
        "timestamp",
        "message",
      ],
    },
  },
};
