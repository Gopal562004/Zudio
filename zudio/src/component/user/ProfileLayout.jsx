import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Sidebar */}
      <aside className="w-1/4 bg-gray-100 p-6 border-r min-h-screen">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-4">
          <NavLink
            to="/profile"
            end
            className={({ isActive }) =>
              `block p-2 rounded ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            My Profile
          </NavLink>
          <NavLink
            to="/profile/myorders"
            className={({ isActive }) =>
              `block p-2 rounded ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            My Orders
          </NavLink>
          <NavLink
            to="/profile/wishlist"
            className={({ isActive }) =>
              `block p-2 rounded ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            My Wishlist
          </NavLink>
          <NavLink
            to="/profile/recently-viewed"
            className={({ isActive }) =>
              `block p-2 rounded ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            Recently Viewed
          </NavLink>
          <NavLink
            to="/profile/store-credits"
            className={({ isActive }) =>
              `block p-2 rounded ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            Store Credits
          </NavLink>
        </nav>
      </aside>

      {/* Right Side - Dynamic Content */}
      <main className="w-3/4 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default ProfileLayout;
