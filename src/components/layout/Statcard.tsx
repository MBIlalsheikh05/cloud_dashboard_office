"use client"
import React from "react";

import { type LucideIcon } from "lucide-react"; // Import the type for the icon

// 1. Define the interface for the props the component accepts
interface StatcardProps {
  name: string;
  icon: LucideIcon; // Correctly types the Lucide icon component
  value: string;
}


// 2. Use the interface when defining the component
export const Statcard: React.FC<StatcardProps> = ({ name, icon: Icon, value }) => {
  return (
    <div className="rounded-lg bg-gray-800 p-4 shadow-md flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-400">{name}</p>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
      </div>
      {/* Icon is passed as a component and rendered here */}
      <Icon className="h-6 w-6 text-indigo-400" />
    </div>
  );
};
// const Statcard = () =>{
//     return <div>Statcard</div>
// }

export default Statcard