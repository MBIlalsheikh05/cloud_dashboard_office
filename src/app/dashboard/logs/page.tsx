"use client";

import React from 'react';
import { LogsTable }  from "./components/LogsTable";

export default function LogsPage() {
  return (
    <div className="space-y-8">
<div className="pl-5"> {/* 👈 Added Left Padding (pl-4) */}
  <h1 className="text-3xl font-extrabold text-white">
    {/* 👆 Increased size (text-4xl) and boldness (font-extrabold) */}
    Audit Logs
  </h1>
  <p className="text-md text-zinc-400 mt-2">
    {/* 👆 Adjusted color for dark theme (text-zinc-400) and spacing (mt-2) */}
    View and filter all system activity and security events in real-time.
  </p>
</div>
      <LogsTable />
    </div>
  );
}


