import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  MapPin,
  ShoppingBag,
  Heart,
  Plus,
  Trash2,
  Save,
  Pencil,
  X,
  LocateFixed,
  Home,
  Briefcase,
} from "lucide-react";
import { toast } from "react-toastify";
import { getMyProfile, updateMyProfile } from "../../mongo/authServices";
import { getUserOrders } from "../../mongo/orderServices";

const DEFAULT_ADDRESS_LABELS = ["Home", "Office", "Other"];

const emptyAddress = {
  label: "Home",
  line: "",
  street: "",
  city: "",
  state: "",
  country: "India",
  zip: "",
};

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [ordersCount, setOrdersCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [addressLabels, setAddressLabels] = useState(DEFAULT_ADDRESS_LABELS);
  const [customLabelInput, setCustomLabelInput] = useState("");
  const [showCustomLabelInput, setShowCustomLabelInput] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState(emptyAddress);
  const [locatingGps, setLocatingGps] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [profileRes, ordersRes] = await Promise.allSettled([
          getMyProfile(),
          getUserOrders(),
        ]);

        if (profileRes.status === "fulfilled" && profileRes.value?.user) {
          const u = profileRes.value.user;
          setProfile(u);
          setName(u.name || "");
          setPhone(u.phone || "");
          const loadedAddresses = u.addresses || [];
          setAddresses(loadedAddresses);
          const existingLabels = loadedAddresses
            .map((a) => a.label)
            .filter(Boolean);
          setAddressLabels(
            Array.from(new Set([...DEFAULT_ADDRESS_LABELS, ...existingLabels]))
          );
        }

        if (ordersRes.status === "fulfilled") {
          const list = Array.isArray(ordersRes.value)
            ? ordersRes.value
            : ordersRes.value?.orders || [];
          setOrdersCount(list.length);
        }
      } catch {
        toast.error("Failed to load profile details.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await updateMyProfile({ name, phone });
      if (res?.user) setProfile(res.user);
      setIsEditingProfile(false);
      toast.success("Profile updated!");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Could not update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setName(profile?.name || "");
    setPhone(profile?.phone || "");
    setIsEditingProfile(false);
  };

  const handleAddCustomLabel = () => {
    const trimmed = customLabelInput.trim();
    if (!trimmed) return;
    if (!addressLabels.includes(trimmed)) {
      setAddressLabels((prev) => [...prev, trimmed]);
    }
    setNewAddress((prev) => ({ ...prev, label: trimmed }));
    setCustomLabelInput("");
    setShowCustomLabelInput(false);
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    const finalLabel =
      showCustomLabelInput && customLabelInput.trim()
        ? customLabelInput.trim()
        : newAddress.label || "Home";
    const addressToSave = { ...newAddress, label: finalLabel };
    const updated = [...addresses, addressToSave];
    try {
      const res = await updateMyProfile({ addresses: updated });
      setAddresses(res?.user?.addresses || updated);
      if (!addressLabels.includes(finalLabel)) {
        setAddressLabels((prev) => [...prev, finalLabel]);
      }
      setNewAddress(emptyAddress);
      setCustomLabelInput("");
      setShowCustomLabelInput(false);
      setShowAddressForm(false);
      toast.success("Address added!");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Could not save address."
      );
    }
  };

  const handleDeleteAddress = async (index) => {
    const updated = addresses.filter((_, i) => i !== index);
    try {
      const res = await updateMyProfile({ addresses: updated });
      setAddresses(res?.user?.addresses || updated);
      toast.success("Address removed.");
    } catch {
      toast.error("Could not remove address.");
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }

    setLocatingGps(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const addr = data.address || {};

          const lineParts = [
            addr.house_number,
            addr.building,
            addr.road || addr.pedestrian,
          ].filter(Boolean);

          setNewAddress((prev) => ({
            ...prev,
            line:
              lineParts.join(", ") ||
              data.name ||
              `Lat ${latitude.toFixed(4)}, Lon ${longitude.toFixed(4)}`,
            street:
              addr.suburb ||
              addr.neighbourhood ||
              addr.village ||
              addr.town ||
              addr.road ||
              "Local Area",
            city:
              addr.city ||
              addr.town ||
              addr.state_district ||
              addr.county ||
              "",
            state: addr.state || "",
            zip: addr.postcode || "",
            country: addr.country || "India",
          }));
          toast.success("Location detected! Review and save address.");
        } catch {
          toast.error("Could not fetch address from GPS coordinates.");
        } finally {
          setLocatingGps(false);
        }
      },
      (err) => {
        setLocatingGps(false);
        toast.error(
          err.code === 1
            ? "Location permission denied. Please allow GPS access."
            : "Unable to detect your current location."
        );
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-24 bg-neutral-100 animate-pulse border border-neutral-200" />
        <div className="h-64 bg-neutral-100 animate-pulse border border-neutral-200" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
          Account Overview
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mt-1">
          My Profile
        </h1>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border border-neutral-200 p-4 bg-neutral-50">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-neutral-500">
              Account Role
            </span>
            <User className="w-4 h-4 text-neutral-600" />
          </div>
          <p className="text-lg font-semibold mt-2 capitalize">
            {profile?.role || "Customer"}
          </p>
        </div>

        <Link
          to="/profile/myorders"
          className="border border-neutral-200 hover:border-black p-4 bg-white transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-neutral-500">
              Total Orders
            </span>
            <ShoppingBag className="w-4 h-4 text-neutral-600" />
          </div>
          <p className="text-lg font-semibold mt-2">{ordersCount}</p>
        </Link>

        <Link
          to="/profile/wishlist"
          className="border border-neutral-200 hover:border-black p-4 bg-white transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-neutral-500">
              Wishlist Items
            </span>
            <Heart className="w-4 h-4 text-neutral-600" />
          </div>
          <p className="text-lg font-semibold mt-2">
            {profile?.wishlist?.length || 0}
          </p>
        </Link>
      </div>

      {/* Personal Information Form */}
      <div className="border border-neutral-200 p-5 sm:p-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm uppercase tracking-wider font-semibold">
            Personal Information
          </h2>
          {!isEditingProfile && (
            <button
              type="button"
              onClick={() => setIsEditingProfile(true)}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold border border-black px-3 py-1.5 hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              <Pencil className="w-3.5 h-3.5" />
              Edit
            </button>
          )}
        </div>

        {!isEditingProfile ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-neutral-500">
                Full Name
              </p>
              <p className="font-medium text-neutral-900 mt-1">
                {profile?.name || "—"}
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-neutral-500">
                Phone Number
              </p>
              <p className="font-medium text-neutral-900 mt-1">
                {profile?.phone || "—"}
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-neutral-500">
                Email Address
              </p>
              <p className="font-medium text-neutral-900 mt-1 truncate">
                {profile?.email || "—"}
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  minLength={3}
                  className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm rounded-none focus:border-black outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1.5">
                  Phone Number (10 digits)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  pattern="\d{10}"
                  className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm rounded-none focus:border-black outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={profile?.email || ""}
                disabled
                className="w-full border border-neutral-200 bg-neutral-100 text-neutral-500 px-3.5 py-2.5 text-sm rounded-none cursor-not-allowed"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-2.5 text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors rounded-none disabled:opacity-50 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="inline-flex items-center gap-1.5 border border-neutral-300 text-neutral-700 hover:border-black hover:text-black px-5 py-2.5 text-xs uppercase tracking-wider font-semibold transition-colors rounded-none cursor-pointer"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Saved Addresses */}
      <div className="border border-neutral-200 p-5 sm:p-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <h2 className="text-sm uppercase tracking-wider font-semibold">
              Saved Addresses
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setShowAddressForm(!showAddressForm)}
            className="inline-flex items-center gap-1 text-xs uppercase tracking-wider font-semibold border border-black px-3 py-1.5 hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            {showAddressForm ? "Cancel" : "Add Address"}
          </button>
        </div>

        {showAddressForm && (
          <form
            onSubmit={handleAddAddress}
            className="mb-6 p-4 bg-neutral-50 border border-neutral-200 space-y-4"
          >
            {/* Category + GPS Row */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider text-neutral-500 mr-1">
                  Save As:
                </span>
                {addressLabels.map((lbl) => (
                  <button
                    key={lbl}
                    type="button"
                    onClick={() => {
                      setNewAddress((prev) => ({ ...prev, label: lbl }));
                      setShowCustomLabelInput(false);
                    }}
                    className={`px-3 py-1 text-xs uppercase tracking-wider border transition-colors cursor-pointer ${
                      newAddress.label === lbl && !showCustomLabelInput
                        ? "bg-black text-white border-black"
                        : "bg-white text-neutral-700 border-neutral-300 hover:border-black"
                    }`}
                  >
                    {lbl}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setShowCustomLabelInput(!showCustomLabelInput)}
                  className={`inline-flex items-center gap-1 px-3 py-1 text-xs uppercase tracking-wider border transition-colors cursor-pointer ${
                    showCustomLabelInput
                      ? "bg-black text-white border-black"
                      : "bg-white text-neutral-700 border-dashed border-neutral-400 hover:border-black"
                  }`}
                >
                  <Plus className="w-3 h-3" />
                  Custom
                </button>
              </div>

              <button
                type="button"
                onClick={handleUseCurrentLocation}
                disabled={locatingGps}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold bg-white border border-black px-3 py-1.5 hover:bg-black hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
              >
                <LocateFixed
                  className={`w-3.5 h-3.5 ${locatingGps ? "animate-spin" : ""}`}
                />
                {locatingGps ? "Detecting GPS..." : "Use Current Location (GPS)"}
              </button>
            </div>

            {showCustomLabelInput && (
              <div className="flex items-center gap-2 max-w-sm">
                <input
                  type="text"
                  placeholder="Custom category (e.g. Hostel, Parents, Gym)"
                  value={customLabelInput}
                  onChange={(e) => setCustomLabelInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCustomLabel();
                    }
                  }}
                  className="flex-1 border border-neutral-300 px-3 py-1.5 text-xs bg-white outline-none focus:border-black"
                />
                <button
                  type="button"
                  onClick={handleAddCustomLabel}
                  className="bg-black text-white px-3 py-1.5 text-xs uppercase tracking-wider font-semibold cursor-pointer"
                >
                  Add
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Address Line / House No."
                value={newAddress.line}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, line: e.target.value })
                }
                required
                className="border border-neutral-300 px-3 py-2 text-sm bg-white outline-none focus:border-black"
              />
              <input
                type="text"
                placeholder="Street / Locality"
                value={newAddress.street}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, street: e.target.value })
                }
                required
                className="border border-neutral-300 px-3 py-2 text-sm bg-white outline-none focus:border-black"
              />
              <input
                type="text"
                placeholder="City"
                value={newAddress.city}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, city: e.target.value })
                }
                required
                className="border border-neutral-300 px-3 py-2 text-sm bg-white outline-none focus:border-black"
              />
              <input
                type="text"
                placeholder="State"
                value={newAddress.state}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, state: e.target.value })
                }
                required
                className="border border-neutral-300 px-3 py-2 text-sm bg-white outline-none focus:border-black"
              />
              <input
                type="text"
                placeholder="PIN / ZIP Code"
                value={newAddress.zip}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, zip: e.target.value })
                }
                required
                className="border border-neutral-300 px-3 py-2 text-sm bg-white outline-none focus:border-black"
              />
              <input
                type="text"
                placeholder="Country"
                value={newAddress.country}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, country: e.target.value })
                }
                required
                className="border border-neutral-300 px-3 py-2 text-sm bg-white outline-none focus:border-black"
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white px-5 py-2 text-xs uppercase tracking-wider font-semibold cursor-pointer"
            >
              Save Address
            </button>
          </form>
        )}

        {addresses.length === 0 ? (
          <p className="text-xs text-neutral-500">
            No saved addresses yet. Add one for faster checkout.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {addresses.map((addr, idx) => {
              const label = addr.label || "Home";
              const LabelIcon = label === "Office" ? Briefcase : Home;
              return (
                <div
                  key={addr._id || idx}
                  className="border border-neutral-200 p-4 flex justify-between items-start gap-3"
                >
                  <div className="text-xs text-neutral-700 space-y-1">
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold bg-neutral-100 border border-neutral-200 px-2 py-0.5 text-neutral-800 mb-1">
                      <LabelIcon className="w-3 h-3" />
                      {label}
                    </span>
                    <p className="font-semibold text-neutral-900">{addr.line}</p>
                    <p>{addr.street}</p>
                    <p>
                      {addr.city}, {addr.state} - {addr.zip}
                    </p>
                    <p className="text-neutral-500">{addr.country}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteAddress(idx)}
                    aria-label="Delete address"
                    className="text-neutral-400 hover:text-red-600 transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
