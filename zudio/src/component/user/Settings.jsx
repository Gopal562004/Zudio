import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, Bell, LogOut, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";
import { changeMyPassword } from "../../mongo/authServices";
import { useAuth } from "../auth/AuthContext";

const PREFS_KEY = "zudio_user_prefs";

const Settings = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const [prefs, setPrefs] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem(PREFS_KEY)) || {
          orderUpdates: true,
          newDrops: true,
          newsletter: false,
        }
      );
    } catch {
      return { orderUpdates: true, newDrops: true, newsletter: false };
    }
  });

  const handleTogglePref = (key) => {
    const updated = { ...prefs, [key]: !prefs[key] };
    setPrefs(updated);
    localStorage.setItem(PREFS_KEY, JSON.stringify(updated));
    toast.success("Preference updated.");
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      toast.error(
        "Password must be 8+ chars with uppercase, lowercase, number, and special character."
      );
      return;
    }

    setSavingPassword(true);
    try {
      const res = await changeMyPassword({ currentPassword, newPassword });
      toast.success(res?.message || "Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Could not update password."
      );
    } finally {
      setSavingPassword(false);
    }
  };

  const handleSignOut = () => {
    logout();
    toast.info("You have been signed out.");
    navigate("/");
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-neutral-200 pb-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
          Preferences & Security
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mt-1">
          Settings
        </h1>
      </div>

      {/* Change Password */}
      <div className="border border-neutral-200 p-5 sm:p-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <h2 className="text-sm uppercase tracking-wider font-semibold">
              Change Password
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setShowPasswords(!showPasswords)}
            className="text-xs text-neutral-500 hover:text-black inline-flex items-center gap-1 cursor-pointer"
          >
            {showPasswords ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {showPasswords ? "Hide" : "Show"}
          </button>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1.5">
              Current Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPasswords ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-neutral-300 focus:border-black outline-none rounded-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1.5">
              New Password
            </label>
            <input
              type={showPasswords ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-3 py-2.5 text-sm border border-neutral-300 focus:border-black outline-none rounded-none"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1.5">
              Confirm New Password
            </label>
            <input
              type={showPasswords ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2.5 text-sm border border-neutral-300 focus:border-black outline-none rounded-none"
            />
          </div>

          <button
            type="submit"
            disabled={savingPassword}
            className="bg-black text-white px-6 py-2.5 text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition rounded-none disabled:opacity-50 cursor-pointer"
          >
            {savingPassword ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="border border-neutral-200 p-5 sm:p-6 bg-white">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-4 h-4" />
          <h2 className="text-sm uppercase tracking-wider font-semibold">
            Notification Preferences
          </h2>
        </div>

        <div className="divide-y divide-neutral-100">
          {[
            {
              key: "orderUpdates",
              title: "Order & Delivery Updates",
              desc: "Receive status alerts when your order ships or arrives.",
            },
            {
              key: "newDrops",
              title: "New Arrivals & Drops",
              desc: "Get notified about fresh Zudio Studio collections.",
            },
            {
              key: "newsletter",
              title: "Weekly Style Edit",
              desc: "Curated lookbooks and seasonal offers.",
            },
          ].map((item) => (
            <div
              key={item.key}
              className="py-3.5 flex items-center justify-between gap-4"
            >
              <div>
                <p className="text-sm font-medium text-neutral-900">
                  {item.title}
                </p>
                <p className="text-xs text-neutral-500">{item.desc}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={prefs[item.key]}
                onClick={() => handleTogglePref(item.key)}
                className={`w-11 h-6 flex items-center p-0.5 transition-colors cursor-pointer ${
                  prefs[item.key] ? "bg-black justify-end" : "bg-neutral-300 justify-start"
                }`}
              >
                <span className="w-5 h-5 bg-white block" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sign Out */}
      <div className="border border-neutral-200 p-5 sm:p-6 bg-neutral-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-neutral-900">Sign Out</h3>
          <p className="text-xs text-neutral-500">
            End your current session on this device.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="inline-flex items-center justify-center gap-2 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-5 py-2.5 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
