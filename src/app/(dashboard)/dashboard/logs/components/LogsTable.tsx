"use client";

import React, { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, Filter, Settings } from "lucide-react";

// 🔵 Updated — All columns from sample data
const DEFAULT_COLUMNS = [
  { key: "@timestamp", label: "Timestamp" },
  { key: "service", label: "Service" },
  { key: "environment", label: "Environment" },
  { key: "request_id", label: "Request ID" },
  { key: "endpoint", label: "Endpoint" },
  { key: "method", label: "Method" },
  { key: "status_code", label: "Status" },
  { key: "status_family", label: "Status Family" },
  { key: "outcome", label: "Outcome" },
  { key: "duration_ms", label: "Duration (ms)" },
  { key: "latency_bucket", label: "Latency Bucket" },
  { key: "customer_name", label: "Customer" },
  { key: "license_key", label: "License Key" },
  { key: "user", label: "User" },
  { key: "ip", label: "IP" },
  { key: "module", label: "Module" },
  { key: "creation_time", label: "Creation Time" },
  { key: "ending_time", label: "Ending Time" },
  { key: "full_request", label: "Full Request" },
  { key: "headers", label: "Headers" },
  { key: "body", label: "Body" },
  { key: "data_found", label: "Data Found" },
  { key: "hits_count", label: "Hits Count" },
  { key: "request_size_bytes", label: "Request Size" },
  { key: "response_size_bytes", label: "Response Size" },
  { key: "error_class", label: "Error Class" },
  { key: "error_message", label: "Error Message" },
  { key: "exception_stack", label: "Exception Stack" },
  { key: "masked", label: "Masked" },
  { key: "request", label: "Request" },
  { key: "cache_event", label: "Cache Event" },
];

// Long fields to truncate
const LONG_COLUMNS = [
  "full_request",
  "headers",
  "error_message",
  "exception_stack",
  "request",
  "body",
];

export function LogsTable() {
  const [tableData, setTableData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  // 🔵 Column config state
  // const [selectedColumns, setSelectedColumns] = useState<string[]>(
  //   DEFAULT_COLUMNS.map((c) => c.key)
  // );

      // Default 5 columns to show initially
    const INITIAL_COLUMNS = ["@timestamp", "service", "method", "status_code", "customer_name"];

    const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

    useEffect(() => {
      const stored = localStorage.getItem("selectedColumns");
      if (stored) {
        setSelectedColumns(JSON.parse(stored));
      } else {
        setSelectedColumns(INITIAL_COLUMNS);
      }
    }, []);


    // Save changes to localStorage whenever selectedColumns changes
    useEffect(() => {
      localStorage.setItem("selectedColumns", JSON.stringify(selectedColumns));
    }, [selectedColumns]);
  const [showColumnModal, setShowColumnModal] = useState(false);

  // Fetch JSON
  useEffect(() => {
    fetch("/data/logs.json")
      .then((res) => res.json())
      .then((data) => setTableData(data))
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);

  // Filtering logic
  const filteredData = useMemo(() => {
    return tableData.filter((row) =>
      JSON.stringify(row).toLowerCase().includes(search.toLowerCase())
    );
  }, [search, tableData]);

  const toggleRowExpansion = (rowId: number) => {
    setExpandedRowId(expandedRowId === rowId ? null : rowId);
  };

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);
  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));


  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="bg-[#111827] shadow-md mx-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-4">
            <Input
              placeholder="Search logs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm bg-[#1F2937] text-gray-100 placeholder-gray-400 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md"
            />

            {/* Column Config Button */}
            <Button
              variant="default"
              onClick={() => setShowColumnModal(true)}
              className="flex gap-2 bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 rounded-md"
            >
              <Settings size={16} />
              Columns
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      {/* <div className="overflow-auto border border-slate-800 rounded-xl bg-[#0b1120]"> */}
      {/* <div className="overflow-auto border border-slate-800 rounded-xl bg-[#0b1120] px-4"> */}
      <div className="overflow-auto border border-slate-800 rounded-xl bg-[#0b1120] mx-4">

        <table className="w-full text-left">
          <thead className="bg-[#151e33]">
            <tr>
              {DEFAULT_COLUMNS.filter((c) => selectedColumns.includes(c.key)).map(
                (col) => (
                  <th key={col.key} className="p-3 text-white text-sm">
                    {col.label}
                  </th>
                )
              )}
              <th className="p-3 text-white text-sm">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((row, idx) => (
              <React.Fragment key={idx}>
                {/* MAIN ROW */}
                <tr
                  className={`border-b border-slate-800 transition ${
                    expandedRowId === idx
                      ? "bg-[#1e293b]"
                      : "hover:bg-[#1e293b]"
                  }`}
                >
                  {DEFAULT_COLUMNS.filter((c) => selectedColumns.includes(c.key)).map(
                    (col) => (
                      <td
                        key={col.key}
                        className={`p-3 text-gray-300 ${
                          LONG_COLUMNS.includes(col.key)
                            ? "max-w-xs truncate hover:overflow-visible hover:whitespace-normal hover:bg-gray-700 hover:text-white"
                            : ""
                        }`}
                        // title={row[col.key]}
                      >
                        {row[col.key]}
                      </td>
                    )
                  )}
                  <td className="p-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-300 hover:text-white"
                      onClick={() => toggleRowExpansion(idx)}
                    >
                      {expandedRowId === idx ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </td>
                </tr>

                {/* EXPANDED DRAWER */}
                {expandedRowId === idx && (
                  <tr className="bg-[#1e293b]">
                    <td colSpan={selectedColumns.length + 1} className="p-0">
                      <div className="p-4 border-t border-slate-700">
                        <div className="flex justify-between mb-3">
                          <h3 className="text-sm font-semibold text-gray-200">
                            Log Details
                          </h3>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-slate-600 text-gray-300"
                            onClick={() => setExpandedRowId(null)}
                          >
                            Close
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {Object.entries(row).map(([key, value]) => (
                            <div
                              key={key}
                              className="border border-slate-700 bg-[#0f172a] rounded p-2"
                            >
                              <p className="text-[10px] text-slate-400 uppercase">
                                {key}
                              </p>
                              <p className="text-[12px] text-gray-300 break-all">
                                {String(value)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 gap-3 text-gray-400">
        <Button
          onClick={prevPage}
          disabled={currentPage === 1}
          variant="ghost"
          className="px-2 py-1 rounded text-gray-400 hover:bg-gray-700 hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <span className="px-3 py-1 text-sm font-medium rounded-md bg-gray-700 text-white">
          {currentPage} / {totalPages}
        </span>

        <Button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          variant="ghost"
          className="px-2 py-1 rounded text-gray-400 hover:bg-gray-700 hover:text-white"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Count text */}
      <div className="relative w-full">
        <p className="absolute right-6 bottom-8 text-gray-400 text-sm">
          Showing{" "}
          <span className="font-semibold text-white">{paginatedData.length}</span>{" "}
          of{" "}
          <span className="font-semibold text-white">{filteredData.length}</span>{" "}
          filtered logs
        </p>
      </div>

      {/* 🔵 Column Config Modal */}
{/* 🔵 Column Config Modal */}
{showColumnModal && (
  <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
    <div className="bg-[#0f172a] p-6 rounded-lg border border-slate-700 w-96">
      <h2 className="text-white text-lg mb-4">Select Columns (Max 5)</h2>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {DEFAULT_COLUMNS.map((col) => {
          const isChecked = selectedColumns.includes(col.key);
          const isDisabled = !isChecked && selectedColumns.length >= 5;

          return (
            <label
              key={col.key}
              className={`flex items-center gap-2 text-gray-300 ${
                isDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                disabled={isDisabled}
                onChange={() => {
                  setSelectedColumns((prev) =>
                    isChecked
                      ? prev.filter((key) => key !== col.key)
                      : [...prev, col.key]
                  );
                }}
              />
              {col.label}
            </label>
          );
        })}
      </div>

      <div className="flex justify-end mt-5">
        <Button
          variant="outline"
          onClick={() => setShowColumnModal(false)}
          className="border-slate-600 text-gray-300"
        >
          Close
        </Button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
