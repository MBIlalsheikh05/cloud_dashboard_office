import React from "react";
import { Button } from "@/components/ui/button";

// Props typing
interface ColumnConfigProps {
  open: boolean;
  onClose: () => void;
  allColumns: string[];
  visibleColumns: string[];
  toggleColumn: (column: string) => void;
}

const ColumnConfig: React.FC<ColumnConfigProps> = ({
  open,
  onClose,
  allColumns,
  visibleColumns,
  toggleColumn
}) => {
  if (!open) return null; // simple modal visibility

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#1E2538] text-gray-100 p-6 w-[300px] rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Column Configuration</h2>

        <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
          {allColumns.map((col: string) => (
            <label
              key={col}
              className="flex items-center justify-between bg-[#2A314B] p-2 rounded-md cursor-pointer hover:bg-[#3B425A]"
            >
              <span>{col}</span>
              <input
                type="checkbox"
                checked={visibleColumns.includes(col)}
                onChange={() => toggleColumn(col)}
                className="w-4 h-4 accent-blue-500"
              />
            </label>
          ))}
        </div>

        <Button
          variant="default" // fixed variant error
          onClick={onClose}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default ColumnConfig;
