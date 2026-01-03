// import React, { useState } from "react";
// import { NavLink, Outlet } from "react-router-dom";
// import { User, ShoppingBag, Heart, Settings, Menu } from "lucide-react";

// const ProfileLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-white">
//       {/* Mobile Topbar */}
//       <div className="flex md:hidden items-center justify-between bg-gray-100 p-4 border-b">
//         <h2 className="text-xl font-bold">Dashboard</h2>
//         <button onClick={toggleSidebar}>
//           <Menu className="w-6 h-6" />
//         </button>
//       </div>

//       {/* Sidebar */}
//       <aside
//         className={`${
//           sidebarOpen ? "block" : "hidden"
//         } md:block w-full md:w-1/4 bg-gray-100 p-6 border-r min-h-screen md:min-h-full`}
//       >
//         <h2 className="text-2xl font-bold mb-6 hidden md:block">Dashboard</h2>
//         <nav className="space-y-4">
//           <NavLink
//             to="/profile"
//             end
//             onClick={() => setSidebarOpen(false)}
//             className={({ isActive }) =>
//               `flex items-center gap-2 p-2 rounded ${
//                 isActive
//                   ? "bg-black text-white"
//                   : "text-gray-700 hover:bg-gray-200"
//               }`
//             }
//           >
//             <User className="w-5 h-5" />
//             My Profile
//           </NavLink>

//           <NavLink
//             to="/profile/myorders"
//             onClick={() => setSidebarOpen(false)}
//             className={({ isActive }) =>
//               `flex items-center gap-2 p-2 rounded ${
//                 isActive
//                   ? "bg-black text-white"
//                   : "text-gray-700 hover:bg-gray-200"
//               }`
//             }
//           >
//             <ShoppingBag className="w-5 h-5" />
//             My Orders
//           </NavLink>

//           <NavLink
//             to="/profile/wishlist"
//             onClick={() => setSidebarOpen(false)}
//             className={({ isActive }) =>
//               `flex items-center gap-2 p-2 rounded ${
//                 isActive
//                   ? "bg-black text-white"
//                   : "text-gray-700 hover:bg-gray-200"
//               }`
//             }
//           >
//             <Heart className="w-5 h-5" />
//             My Wishlist
//           </NavLink>

//           <NavLink
//             to="/profile/setting"
//             onClick={() => setSidebarOpen(false)}
//             className={({ isActive }) =>
//               `flex items-center gap-2 p-2 rounded ${
//                 isActive
//                   ? "bg-black text-white"
//                   : "text-gray-700 hover:bg-gray-200"
//               }`
//             }
//           >
//             <Settings className="w-5 h-5" />
//             Setting
//           </NavLink>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="w-full md:w-3/4 p-6">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default ProfileLayout;
import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  User,
  ShoppingBag,
  Heart,
  Settings,
  Menu,
  X,
  Home,
  ChevronRight,
} from "lucide-react";

const ProfileLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Get current page name from path
  const getPageName = () => {
    const path = location.pathname;
    if (path.endsWith("/profile")) return "My Profile";
    if (path.includes("/myorders")) return "My Orders";
    if (path.includes("/wishlist")) return "Wishlist";
    if (path.includes("/setting")) return "Settings";
    return "Profile";
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navigationItems = [
    { to: "/profile", icon: <User className="w-4 h-4" />, label: "My Profile" },
    {
      to: "/profile/myorders",
      icon: <ShoppingBag className="w-4 h-4" />,
      label: "My Orders",
    },
    {
      to: "/profile/wishlist",
      icon: <Heart className="w-4 h-4" />,
      label: "Wishlist",
    },
    {
      to: "/profile/setting",
      icon: <Settings className="w-4 h-4" />,
      label: "Settings",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <div className="md:hidden border-b border-gray-100">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSidebar}
              className="p-1.5 hover:bg-gray-100 rounded transition"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm font-semibold">{getPageName()}</h1>
          </div>
          <NavLink
            to="/"
            className="p-1.5 hover:bg-gray-100 rounded transition"
          >
            <Home className="w-5 h-5" />
          </NavLink>
        </div>
      </div>

      {/* Breadcrumb for Desktop */}
      <div className="hidden md:block border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3">
          <nav className="flex items-center space-x-1 text-xs">
            <NavLink
              to="/"
              className="text-gray-500 hover:text-black transition flex items-center"
            >
              {/* <Home className="w-3 h-3 mr-1" /> */}
              Home
            </NavLink>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <span className="text-black font-sm">{getPageName()}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-full lg:w-1/4">
            <div className="border border-gray-100 rounded p-4">
              <div className="mb-6">
                <h2 className="text-sm font-semibold mb-4">Account</h2>
                <nav className="space-y-1">
                  {navigationItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === "/profile"}
                      className={({ isActive }) =>
                        `flex items-center gap-2.5 text-sm py-2.5 px-3 rounded transition ${
                          isActive ? "bg-black text-white" : "hover:bg-gray-100"
                        }`
                      }
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </nav>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-600">
                  Manage your account settings and preferences
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Mobile Sidebar */}
          <div
            className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-out lg:hidden ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold">Account Navigation</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 hover:bg-gray-100 rounded transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="space-y-1">
                {navigationItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/profile"}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 text-sm py-2.5 px-3 rounded transition ${
                        isActive ? "bg-black text-white" : "hover:bg-gray-100"
                      }`
                    }
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <main className="w-full lg:w-3/4">
            {/* Mobile Page Header */}
            <div className="lg:hidden mb-4">
              <h1 className="text-base font-semibold">{getPageName()}</h1>
            </div>

            <div className="bg-white">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
