"use client";

import { useState } from "react";
import { uiConfig } from "@/data/ui-config";

const ALL_COLUMNS = [
  "timestamp",
  "level",
  "message",
  "ip",
  "userAgent",
];

export default function ColumnControl() { 
  const [role, setRole] = useState<"admin" | "manager" | "viewer">("admin");

  const config = uiConfig[role].logs;

  const toggleColumn = (column: string) => {
    const exists = config.visibleColumns.includes(column);

    config.visibleColumns = exists
      ? config.visibleColumns.filter((c) => c !== column)
      : [...config.visibleColumns, column];
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-lg font-semibold text-white mb-4">
        Column Visibility Control
      </h2>

      {/* Role Selector */}
      <select
        className="mb-4 bg-slate-800 text-white p-2 rounded"
        value={role}
        onChange={(e) => setRole(e.target.value as any)}
      >
        <option value="admin">Admin</option>
        <option value="manager">Manager</option>
        <option value="viewer">Viewer</option>
      </select>

      {/* Column Toggles */}
      <div className="space-y-2">
        {ALL_COLUMNS.map((column) => (
          <label
            key={column}
            className="flex items-center gap-3 text-gray-300"
          >
            <input
              type="checkbox"
              checked={config.visibleColumns.includes(column)}
              onChange={() => toggleColumn(column)}
            />
            {column}
          </label>
        ))}
      </div>
    </div>
  );
}
