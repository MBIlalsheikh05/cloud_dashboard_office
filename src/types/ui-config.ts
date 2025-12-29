// types/ui-config.ts

export interface UIConfig {
  visibleColumns: string[];
  filters?: string[];
}

export type RoleUIConfig = {
  [role: string]: {
    [page: string]: UIConfig;
  };
};
