import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { User, ShoppingBag, Heart, Settings, Menu } from "lucide-react";

const ProfileLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Mobile Topbar */}
      <div className="flex md:hidden items-center justify-between bg-gray-100 p-4 border-b">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <button onClick={toggleSidebar}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-1/4 bg-gray-100 p-6 border-r min-h-screen md:min-h-full`}
      >
        <h2 className="text-2xl font-bold mb-6 hidden md:block">Dashboard</h2>
        <nav className="space-y-4">
          <NavLink
            to="/profile"
            end
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded ${
                isActive
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            <User className="w-5 h-5" />
            My Profile
          </NavLink>

          <NavLink
            to="/profile/myorders"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded ${
                isActive
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            <ShoppingBag className="w-5 h-5" />
            My Orders
          </NavLink>

          <NavLink
            to="/profile/wishlist"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded ${
                isActive
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            <Heart className="w-5 h-5" />
            My Wishlist
          </NavLink>

          <NavLink
            to="/profile/setting"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded ${
                isActive
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            <Settings className="w-5 h-5" />
            Setting
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="w-full md:w-3/4 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default ProfileLayout;
