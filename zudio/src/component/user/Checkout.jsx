import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  ChevronRight,
  MapPin,
  CreditCard,
  Truck,
  Check,
  LocateFixed,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import { toast } from "react-toastify";
import { getCart, clearCart } from "../../mongo/cartServices";
import { getMyProfile } from "../../mongo/authServices";
import { placeOrder } from "../../mongo/orderServices";

const PAYMENT_METHODS = [
  { id: "COD", label: "Cash on Delivery", desc: "Pay when your order arrives" },
  { id: "Debit Card", label: "Debit Card", desc: "Visa, Mastercard, RuPay" },
  { id: "Credit Card", label: "Credit Card", desc: "Instant card payment" },
  { id: "PayPal", label: "PayPal", desc: "Pay via PayPal wallet" },
];

const emptyAddress = {
  line: "",
  street: "",
  city: "",
  state: "",
  country: "India",
  zip: "",
};

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const buyNowProduct = location.state?.product;
  const buyNowQty = location.state?.quantity || 1;
  const buyNowSize =
    location.state?.size || buyNowProduct?.size?.[0] || "M";

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressIdx, setSelectedAddressIdx] = useState(-1);
  const [shippingAddress, setShippingAddress] = useState(emptyAddress);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [locatingGps, setLocatingGps] = useState(false);

  useEffect(() => {
    const loadCheckoutData = async () => {
      setLoading(true);
      try {
        const profilePromise = getMyProfile().catch(() => null);

        if (buyNowProduct) {
          setItems([
            {
              product: buyNowProduct,
              quantity: buyNowQty,
              size: buyNowSize,
            },
          ]);
        } else {
          const cartData = await getCart();
          const valid = (cartData?.items || []).filter((i) => i?.product);
          setItems(valid);
        }

        const profileRes = await profilePromise;
        const addrs = profileRes?.user?.addresses || [];
        setSavedAddresses(addrs);
        if (addrs.length > 0) {
          setSelectedAddressIdx(0);
          setShippingAddress({
            line: addrs[0].line || "",
            street: addrs[0].street || "",
            city: addrs[0].city || "",
            state: addrs[0].state || "",
            country: addrs[0].country || "India",
            zip: addrs[0].zip || "",
          });
        }
      } catch {
        toast.error("Could not load checkout details.");
      } finally {
        setLoading(false);
      }
    };
    loadCheckoutData();
  }, [buyNowProduct, buyNowQty, buyNowSize]);

  const handleSelectSavedAddress = (idx) => {
    setSelectedAddressIdx(idx);
    const addr = savedAddresses[idx];
    setShippingAddress({
      line: addr.line || "",
      street: addr.street || "",
      city: addr.city || "",
      state: addr.state || "",
      country: addr.country || "India",
      zip: addr.zip || "",
    });
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

          setSelectedAddressIdx(-1);
          setShippingAddress({
            line:
              lineParts.join(", ") ||
              data.name ||
              `Lat ${latitude.toFixed(4)}, Lon ${longitude.toFixed(4)}`,
            street:
              addr.suburb ||
              addr.neighbourhood ||
              addr.village ||
              addr.town ||
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
          });
          toast.success("Location detected!");
        } catch {
          toast.error("Could not fetch address from GPS.");
        } finally {
          setLocatingGps(false);
        }
      },
      () => {
        setLocatingGps(false);
        toast.error("Location permission denied.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const subtotal = items.reduce(
    (sum, item) => sum + (item.product?.price || 0) * (item.quantity || 1),
    0
  );
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 79;
  const tax = parseFloat((subtotal * 0.08).toFixed(2));
  const totalAmount = parseFloat((subtotal + shipping + tax).toFixed(2));

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your order has no items.");
      return;
    }

    setPlacing(true);
    try {
      const orderItems = items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity || 1,
        size: item.size || item.product?.size?.[0] || "M",
      }));

      await placeOrder({
        orderItems,
        shippingAddress,
        paymentMethod,
        totalAmount,
      });

      if (!buyNowProduct) {
        await clearCart().catch(() => {});
      }

      toast.success("Order placed successfully!");
      navigate("/profile/myorders");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Could not place order. Please try again."
      );
    } finally {
      setPlacing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white max-w-screen-xl mx-auto px-4 py-12">
        <div className="h-64 bg-neutral-100 animate-pulse border border-neutral-200" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="w-14 h-14 bg-neutral-100 border border-neutral-200 flex items-center justify-center mb-4">
          <ShoppingBag className="w-6 h-6 text-neutral-400" />
        </div>
        <h2 className="text-lg font-semibold">Nothing to checkout</h2>
        <p className="text-xs text-neutral-500 mt-1 mb-5">
          Add items to your cart before proceeding to checkout.
        </p>
        <Link
          to="/shop"
          className="bg-black text-white px-6 py-2.5 text-xs uppercase tracking-wider font-semibold"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center space-x-1.5 text-xs uppercase tracking-wider text-neutral-500 mb-2">
            <Link to="/" className="hover:text-black">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/cart" className="hover:text-black">
              Cart
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-black font-medium">Checkout</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Checkout
          </h1>
        </div>
      </div>

      <form
        onSubmit={handlePlaceOrder}
        className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        {/* Left: Address & Payment */}
        <div className="lg:col-span-7 space-y-6">
          {/* Shipping Address */}
          <div className="border border-neutral-200 p-5 sm:p-6 bg-white space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <h2 className="text-sm uppercase tracking-wider font-semibold">
                  Shipping Address
                </h2>
              </div>
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                disabled={locatingGps}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold border border-black px-3 py-1.5 hover:bg-black hover:text-white transition-colors cursor-pointer disabled:opacity-50"
              >
                <LocateFixed
                  className={`w-3.5 h-3.5 ${locatingGps ? "animate-spin" : ""}`}
                />
                {locatingGps ? "Detecting..." : "Use GPS"}
              </button>
            </div>

            {savedAddresses.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {savedAddresses.map((addr, idx) => (
                  <button
                    key={addr._id || idx}
                    type="button"
                    onClick={() => handleSelectSavedAddress(idx)}
                    className={`p-3 border text-left text-xs transition-colors cursor-pointer ${
                      selectedAddressIdx === idx
                        ? "border-black bg-neutral-50"
                        : "border-neutral-200 hover:border-neutral-400"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="uppercase tracking-wider font-semibold text-[10px] bg-neutral-200 px-1.5 py-0.5">
                        {addr.label || "Home"}
                      </span>
                      {selectedAddressIdx === idx && (
                        <Check className="w-3.5 h-3.5 text-black" />
                      )}
                    </div>
                    <p className="font-medium text-neutral-900">{addr.line}</p>
                    <p className="text-neutral-600">
                      {addr.city}, {addr.state} - {addr.zip}
                    </p>
                  </button>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <input
                type="text"
                placeholder="Address Line / House No."
                value={shippingAddress.line}
                onChange={(e) => {
                  setSelectedAddressIdx(-1);
                  setShippingAddress({ ...shippingAddress, line: e.target.value });
                }}
                required
                className="border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-black"
              />
              <input
                type="text"
                placeholder="Street / Locality"
                value={shippingAddress.street}
                onChange={(e) => {
                  setSelectedAddressIdx(-1);
                  setShippingAddress({
                    ...shippingAddress,
                    street: e.target.value,
                  });
                }}
                required
                className="border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-black"
              />
              <input
                type="text"
                placeholder="City"
                value={shippingAddress.city}
                onChange={(e) => {
                  setSelectedAddressIdx(-1);
                  setShippingAddress({ ...shippingAddress, city: e.target.value });
                }}
                required
                className="border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-black"
              />
              <input
                type="text"
                placeholder="State"
                value={shippingAddress.state}
                onChange={(e) => {
                  setSelectedAddressIdx(-1);
                  setShippingAddress({
                    ...shippingAddress,
                    state: e.target.value,
                  });
                }}
                required
                className="border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-black"
              />
              <input
                type="text"
                placeholder="PIN / ZIP Code"
                value={shippingAddress.zip}
                onChange={(e) => {
                  setSelectedAddressIdx(-1);
                  setShippingAddress({ ...shippingAddress, zip: e.target.value });
                }}
                required
                className="border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-black"
              />
              <input
                type="text"
                placeholder="Country"
                value={shippingAddress.country}
                onChange={(e) => {
                  setSelectedAddressIdx(-1);
                  setShippingAddress({
                    ...shippingAddress,
                    country: e.target.value,
                  });
                }}
                required
                className="border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="border border-neutral-200 p-5 sm:p-6 bg-white space-y-4">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <h2 className="text-sm uppercase tracking-wider font-semibold">
                Payment Method
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PAYMENT_METHODS.map((pm) => (
                <button
                  key={pm.id}
                  type="button"
                  onClick={() => setPaymentMethod(pm.id)}
                  className={`p-3.5 border text-left transition-colors cursor-pointer ${
                    paymentMethod === pm.id
                      ? "border-black bg-neutral-50"
                      : "border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{pm.label}</span>
                    {paymentMethod === pm.id && (
                      <Check className="w-4 h-4 text-black" />
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">{pm.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5">
          <div className="border border-neutral-200 p-5 sm:p-6 bg-neutral-50 space-y-5 sticky top-24">
            <h2 className="text-sm uppercase tracking-wider font-semibold">
              Order Summary ({items.length})
            </h2>

            <div className="divide-y divide-neutral-200 max-h-72 overflow-y-auto">
              {items.map((item, idx) => (
                <div key={item._id || idx} className="py-3 flex gap-3">
                  <img
                    src={
                      item.product?.images?.[0] || "/images/prod-hoodie.jpg"
                    }
                    alt={item.product?.name}
                    className="w-14 h-16 object-cover object-top bg-white border border-neutral-200 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {item.product?.name}
                    </p>
                    <p className="text-xs text-neutral-500">
                      Size: {item.size || "M"} • Qty: {item.quantity || 1}
                    </p>
                  </div>
                  <p className="text-sm font-semibold">
                    ₹
                    {Number(
                      (item.product?.price || 0) * (item.quantity || 1)
                    ).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm border-t border-neutral-200 pt-4">
              <div className="flex justify-between">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-medium">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600 flex items-center gap-1">
                  <Truck className="w-4 h-4" />
                  Shipping
                </span>
                <span className="font-medium">
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Tax (8%)</span>
                <span className="font-medium">₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-neutral-300 text-base font-bold">
                <span>Total</span>
                <span>₹{totalAmount.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={placing}
              className="w-full bg-black text-white py-3.5 text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {placing ? "Placing Order..." : "Place Order"}
              {!placing && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
