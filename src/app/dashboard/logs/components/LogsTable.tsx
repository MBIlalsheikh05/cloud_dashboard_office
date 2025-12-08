// src/app/components/logs/LogsTable.tsx

"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, ChevronDown, Filter } from "lucide-react";

// Example dummy data - Replace with API call later
const TABLE_DATA = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  status: i % 2 === 0 ? "Active" : "Inactive",
  createdAt: `2025-01-${(i % 30) + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? "Admin" : "Member",
  phone: "0300-1234567",
  address: `Street No ${(i % 10) + 1}, City XYZ`,
  eventType: i % 3 === 0 ? "Login" : i % 2 === 0 ? "Update" : "Delete",
  ipAddress: `192.168.1.${i + 1}`,
  browser: i % 2 === 0 ? "Chrome" : "Firefox",
  device: i % 3 === 0 ? "Mobile" : "Desktop",
  logs: `This is detailed log information for user ${i + 1}`,
}));

export function LogsTable() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);

  const filteredData = useMemo(() => {
    return TABLE_DATA.filter((row) => {
      const matchesSearch = 
        row.name.toLowerCase().includes(search.toLowerCase()) ||
        row.email.toLowerCase().includes(search.toLowerCase()) ||
        row.eventType.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === "all" || row.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const toggleRowExpansion = (rowId: number) => {
    setExpandedRowId(expandedRowId === rowId ? null : rowId);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="shadow-lg border-gray-200">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5">
              <Input
                placeholder="Search by name, email, or event type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="md:col-span-3">
              <Select value={status} onValueChange={(v) => setStatus(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-4 flex gap-2">
              <Button variant="outline" className="flex-1">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
              <Button variant="outline">Export</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <div className="overflow-auto rounded-xl shadow-lg border border-gray-200 bg-white">
        <table className="w-full text-left">
          <thead className="bg-linear-to-r from-gray-100 to-gray-200">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-700">ID</th>
              <th className="p-4 text-sm font-semibold text-gray-700">Name</th>
              <th className="p-4 text-sm font-semibold text-gray-700">Event Type</th>
              <th className="p-4 text-sm font-semibold text-gray-700">Status</th>
              <th className="p-4 text-sm font-semibold text-gray-700">Created At</th>
              <th className="p-4 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <React.Fragment key={row.id}>
                {/* Main Row */}
                <tr 
                  className={`border-t border-gray-200 transition-all ${
                    expandedRowId === row.id 
                      ? "bg-blue-50" 
                      : "hover:bg-gray-50"
                  }`}
                >
                  <td className="p-4 font-medium text-gray-900">{row.id}</td>
                  <td className="p-4 text-gray-700">{row.name}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-700">
                      {row.eventType}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      row.status === "Active" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-red-100 text-red-700"
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600 text-sm">{row.createdAt}</td>
                  <td className="p-4">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => toggleRowExpansion(row.id)}
                      className="hover:bg-blue-100 transition-colors"
                      title={expandedRowId === row.id ? "Hide details" : "View details"}
                    >
                      {expandedRowId === row.id ? (
                        <EyeOff className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-600" />
                      )}
                    </Button>
                  </td>
                </tr>

                {/* Ultra-Compact Expanded Row (Drawer) */}
                {expandedRowId === row.id && (
                  <tr className="bg-blue-50 border-t border-blue-200">
                    <td colSpan={6} className="p-0">
                      <div className="p-4 animate-in slide-in-from-top-2 duration-200">

                        {/* Header */}
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                            <ChevronDown className="h-4 w-4 text-blue-600" />
                            Row Details
                          </h3>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setExpandedRowId(null)}
                            className="h-7 px-2 text-xs"
                          >
                            Close
                          </Button>
                        </div>

                        {/* Field Grid – Super Compact */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                          {Object.entries(row).map(([key, value]) => (
                            <div 
                              key={key} 
                              className="border border-gray-300 rounded-md px-2 py-1 bg-white"
                            >
                              <p className="text-[10px] font-semibold text-gray-500 uppercase">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </p>
                              <p className="text-[11px] text-gray-900 break-all mt-0.5">
                                {typeof value === "object"
                                  ? JSON.stringify(value)
                                  : String(value)}
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




        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center py-12 bg-gray-50">
            <p className="text-gray-500 text-sm">No logs found matching your filters.</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => { setSearch(""); setStatus("all"); }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Results Footer */}
      <div className="flex items-center justify-between text-sm text-gray-600 px-2">
        <span>
          Showing <strong>{filteredData.length}</strong> of <strong>{TABLE_DATA.length}</strong> logs
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
}