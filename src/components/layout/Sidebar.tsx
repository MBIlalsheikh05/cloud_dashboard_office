"use client"
import React, {useEffect, useState} from "react"
import { Home, Settings, FileText, List,Bell, DollarSign, House, Info, Mail, ShoppingBag, ShoppingCart, User } from 'lucide-react'
import { usePathname } from "next/navigation"
import Link from 'next/link';

const ICONS = {
  Home,
  Settings,
  FileText,
  List,
  Bell, 
  DollarSign, 
  House, 
  Info, 
  Mail, 
  ShoppingBag, 
  ShoppingCart, 
  User
}

interface SidebarItem {
  name: string;
  href: string;
  icon: keyof typeof ICONS;
}

const Sidebar = () => {
  // const ICONS = [
  //   Home,
  //   Settings,
  //   FileText,
  //   List
  // ]

  const [SidebarItems, setsidebarItems] = useState<SidebarItem[]>([])
  const pathname = usePathname();

  useEffect(() => {
    // Set default sidebar items
    const defaultItems: SidebarItem[] = [
      { name: "Logs", href: "/dashboard/logs", icon: "FileText" },
      { name: "Audit", href: "/dashboard/audit", icon: "List" },
      
      { name: "Settings", href: "/dashboard/settings", icon: "Settings" },
      // { name: "Info", href: "/dashboard/info", icon: "Info" },
      // { name: "Mail", href: "/dashboard/mail", icon: "Mail" },
      // { name: "User", href: "/dashboard/user", icon: "User" }
    ];
    setsidebarItems(defaultItems);
  }, []);

  // If you want to fetch this data from an API endpoint instead, 
  // just replace "path" with the correct API route (e.g., "/api/sidebar" or similar).
// useEffect(() => {
//     fetch("data/data.json")
//     .then((res) => res.json())
//     .then((data) => setsidebarItems(data.SidebarItems))
return (
  <div className="relative z-10 transition-all duration-300 ease-in-out shrink-0 w-64 min-h-screen">
    <div className="h-full bg-linear-to-b from-gray-900 via-gray-900 to-gray-950 backdrop-blur-md p-6 flex flex-col border-r border-gray-800 shadow-2xl">
      
      {/* Logo/Brand Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">D</span>
          </div>
          <div>
          <Link 
              href="/" 
              className="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded">
              <h1 className="text-xl font-bold text-white tracking-tight hover:text-indigo-400 transition-colors">
                  Dashboard
              </h1>
          </Link>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {SidebarItems.map((item) => {
          const IconComponent = ICONS[item.icon];
          const isActive = pathname === item.href;
          
          return (
            <Link 
              key={item.name} 
              href={item.href} 
              className="
                group relative flex items-center gap-3 px-4 py-3 
                text-sm font-medium rounded-xl transition-all duration-200
               "
              //   ${isActive 
              //     ? "bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50" 
              //     : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              //   }
              // `
            >
              {/* Active Indicator */}
              {isActive && (
                <div className="absolute left-0 w-1 h-8 bg-white rounded-r-full bg-linear-to-r from-blue-600 to-purple-600" />
              )}
              
              {/* Icon */}
              <div className={`
                flex items-center justify-center w-5 h-5
                ${isActive ? "text-white" : "text-gray-400 group-hover:text-blue-400"}
                transition-colors duration-200
              `}>
                {IconComponent ? (
                  <IconComponent size={20} strokeWidth={2.5} />
                ) : (
                  <div className="w-5 h-5" />
                )}
              </div>
              
              {/* Label */}
              <span className="whitespace-nowrap font-medium">
                {item.name}
              </span>
              
              {/* Hover Effect */}
              {!isActive && (
                <div className="absolute inset-0 rounded-xl bg-linear-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/10 group-hover:to-purple-600/10 transition-all duration-200" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section - User Profile */}
      <div className="mt-auto pt-6 border-t border-gray-800">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-colors cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-lg">
            iQ
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">AKSiQ</p>
            <p className="text-xs text-gray-400 truncate">Admin</p>
          </div>
          <div className="text-gray-400 group-hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

    </div>
  </div>
);
}

export default Sidebar


