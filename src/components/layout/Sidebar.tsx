"use client";

import React, { useEffect, useState } from "react";
import {
  Home,
  Settings,
  FileText,
  List,
  Bell,
  AlertCircle,
  Clipboard,
  DollarSign,
  House,
  Info,
  Mail,
  ShoppingBag,
  ShoppingCart,
  User,
  LogOut,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

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
  User,
  AlertCircle,
  Clipboard,
};

interface SidebarItem {
  name: string;
  href: string;
  icon: keyof typeof ICONS;
  children?: SidebarItem[]; // optional sub-links
}

const Sidebar = () => {
  const [SidebarItems, setsidebarItems] = useState<SidebarItem[]>([]);
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  useEffect(() => {
    const defaultItems: SidebarItem[] = [
      {
        name: "Logs",
        href: "/dashboard/logs",
        icon: "FileText",
        children: [
          {
            name: "Error Logs",
            href: "/dashboard/logs/error",
            icon: "AlertCircle",
          },
          {
            name: "Access Logs",
            href: "/dashboard/logs/access",
            icon: "Clipboard",
          },
        ],
      },
      {
        name: "Files",
        href: "/dashboard/audit",
        icon: "List",
      },
      {
        name: "Settings",
        href: "/dashboard/settings",
        icon: "Settings",
      },
      // { name: "Info", href: "/dashboard/info", icon: "Info" },
      // { name: "Mail", href: "/dashboard/mail", icon: "Mail" },
      // { name: "User", href: "/dashboard/user", icon: "User" }
    ];

    setsidebarItems(defaultItems);
  }, []);

  return (
    <div className="relative z-10 transition-all duration-300 ease-in-out shrink-0 w-64 min-h-screen">
      <div className="h-full bg-linear-to-b from-gray-900 via-gray-900 to-gray-950 backdrop-blur-md p-6 flex flex-col border-r border-gray-800 shadow-2xl">
        
        {/* Logo / Brand */}
        <div className="mb-8">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <div>
              <Link
                href="/dashboard"
                className="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
              >
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
              >
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute left-0 w-1 h-8 rounded-r-full bg-linear-to-r from-blue-600 to-purple-600" />
                )}

                {/* Icon */}
                <div
                  className={`
                    flex items-center justify-center w-5 h-5
                    ${
                      isActive
                        ? "text-white"
                        : "text-gray-400 group-hover:text-blue-400"
                    }
                    transition-colors duration-200
                  `}
                >
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

        {/* Bottom Section */}
        <div className="mt-auto pt-6 border-t border-gray-800">
          {/* User Profile */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-lg">
              iQ
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                AKSiQ
              </p>
              <p className="text-xs text-gray-400 truncate capitalize">
                {session?.user?.role || "User"}
              </p>
            </div>
            <div className="text-gray-400 group-hover:text-white transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full mt-2 flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-800/50 hover:bg-red-600/20 transition-colors text-gray-300 hover:text-red-400 group"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;



// "use client"
// import React, { useEffect, useState } from "react"
// import { 
//   Home, Settings, FileText, List, Bell, AlertCircle, Clipboard, DollarSign, 
//   House, Info, Mail, ShoppingBag, ShoppingCart, User, ChevronDown 
// } from 'lucide-react'
// import { usePathname } from "next/navigation"
// import Link from 'next/link';

// const ICONS = {
//   Home,
//   Settings,
//   FileText,
//   List,
//   Bell, 
//   DollarSign, 
//   House, 
//   Info, 
//   Mail, 
//   ShoppingBag, 
//   ShoppingCart, 
//   User,
//   AlertCircle,
//   Clipboard,
//   ChevronDown
// }

// interface SidebarItem {
//   name: string;
//   href: string;
//   icon: keyof typeof ICONS;
//   children?: SidebarItem[];
// }

// const Sidebar = () => {
//   const [SidebarItems, setSidebarItems] = useState<SidebarItem[]>([])
//   const [openItems, setOpenItems] = useState<Record<string, boolean>>({})
//   const pathname = usePathname();

//   const toggleItem = (name: string) => {
//     setOpenItems((prev) => ({ ...prev, [name]: !prev[name] }))
//   }

//   useEffect(() => {
//     const defaultItems: SidebarItem[] = [
//       { 
//         name: "Logs", 
//         href: "/dashboard/logs", 
//         icon: "FileText",
//         children: [
//           { name: "All Logs", href: "/dashboard/logs", icon: "AlertCircle" },
//           { name: "Access Logs", href: "/dashboard/logs/access", icon: "Clipboard" },
//         ]
//       },
//       { name: "Files", href: "/dashboard/audit", icon: "List" },  
//       { name: "Settings", href: "/dashboard/settings", icon: "Settings" },
//       // other items...
//     ];
//     setSidebarItems(defaultItems);
//   }, []);

//   return (
//     <div className="relative z-10 transition-all duration-300 ease-in-out shrink-0 w-64 min-h-screen">
//       <div className="h-full bg-linear-to-b from-gray-900 via-gray-900 to-gray-950 backdrop-blur-md p-6 flex flex-col border-r border-gray-800 shadow-2xl">
        
//         {/* Logo */}
//         <div className="mb-8">
//           <div className="flex items-center gap-3 px-2">
//             <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
//               <span className="text-white font-bold text-xl">D</span>
//             </div>
//             <div>
//               <Link href="/" className="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded">
//                 <h1 className="text-xl font-bold text-white tracking-tight hover:text-indigo-400 transition-colors">
//                   Dashboard
//                 </h1>
//               </Link>
//               <p className="text-xs text-gray-400">Admin Panel</p>
//             </div>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 space-y-2">
//           {SidebarItems.map((item) => {
//             const IconComponent = ICONS[item.icon];
//             const isActive = pathname === item.href;
//             const hasChildren = item.children && item.children.length > 0;
//             const isOpen = openItems[item.name] || false;

//             return (
//               <div key={item.name}>
//                 {/* Parent Item */}
//                 <div
//                   onClick={() => hasChildren && toggleItem(item.name)}
//                   className={`
//                     flex items-center justify-between p-3 rounded-xl cursor-pointer
//                     transition-all duration-300
//                     ${isActive ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" : "hover:bg-gray-700/50 text-gray-300"}
//                   `}
//                 >
//                   <div className="flex items-center gap-3">
//                     {IconComponent && <IconComponent size={20} />}
//                     <span className="font-medium">{item.name}</span>
//                   </div>
//                   {hasChildren && (
//                     <ChevronDown className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} size={18} />
//                   )}
//                 </div>

//                 {/* Sub-links */}
//                 {hasChildren && isOpen && (
//                   <div className="ml-6 mt-1 space-y-1">
//                     {item.children!.map((child) => {
//                       const ChildIcon = ICONS[child.icon];
//                       const isChildActive = pathname === child.href;

//                       return (
//                         <Link
//                           key={child.name}
//                           href={child.href}
//                           className={`
//                             flex items-center gap-2 px-3 py-2 rounded-lg text-sm
//                             transition-all duration-200
//                             ${isChildActive ? "bg-blue-500 text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white"}
//                           `}
//                         >
//                           {ChildIcon && <ChildIcon size={16} />}
//                           <span>{child.name}</span>
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </nav>

//         {/* Bottom Section - User Profile */}
//         <div className="mt-auto pt-6 border-t border-gray-800">
//           <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-colors cursor-pointer group">
//             <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-lg">
//               iQ
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-medium text-white truncate">AKSiQ</p>
//               <p className="text-xs text-gray-400 truncate">Admin</p>
//             </div>
//             <div className="text-gray-400 group-hover:text-white transition-colors">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Sidebar;
