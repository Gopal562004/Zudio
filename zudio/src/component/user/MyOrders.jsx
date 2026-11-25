import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, ShoppingBag, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import { getUserOrders } from "../../mongo/orderServices";

const statusStyle = {
  Pending: "bg-amber-50 text-amber-800 border-amber-200",
  Processing: "bg-blue-50 text-blue-800 border-blue-200",
  Shipped: "bg-indigo-50 text-indigo-800 border-indigo-200",
  Delivered: "bg-emerald-50 text-emerald-800 border-emerald-200",
  Cancelled: "bg-red-50 text-red-700 border-red-200",
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await getUserOrders();
        const list = Array.isArray(data) ? data : data?.orders || [];
        setOrders(list);
      } catch (error) {
        if (error?.response?.status !== 404) {
          toast.error("Could not load your orders.");
        }
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="space-y-6">
      <div className="border-b border-neutral-200 pb-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
          Order History
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mt-1">
          My Orders
        </h1>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="h-36 bg-neutral-100 animate-pulse border border-neutral-200"
            />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="border border-neutral-200 p-10 text-center bg-neutral-50">
          <div className="w-12 h-12 mx-auto mb-4 bg-white border border-neutral-200 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-neutral-400" />
          </div>
          <h2 className="text-base font-semibold text-neutral-900">
            No orders placed yet
          </h2>
          <p className="text-xs text-neutral-500 mt-1 mb-5">
            When you place an order, you can track its status here.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-2.5 text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition"
          >
            Start Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = order.orderStatus || order.status || "Pending";
            const badge =
              statusStyle[status] ||
              "bg-neutral-100 text-neutral-800 border-neutral-200";
            return (
              <div
                key={order._id}
                className="border border-neutral-200 bg-white p-5 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-neutral-500" />
                    <span className="text-xs font-mono text-neutral-600">
                      #{order._id?.slice(-8).toUpperCase()}
                    </span>
                    <span className="text-xs text-neutral-400">•</span>
                    <span className="text-xs text-neutral-500">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : ""}
                    </span>
                  </div>

                  <span
                    className={`text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 border ${badge}`}
                  >
                    {status}
                  </span>
                </div>

                <div className="divide-y divide-neutral-100">
                  {(order.items || order.orderItems || []).map((item, idx) => {
                    const prod = item.product || {};
                    return (
                      <div
                        key={item._id || idx}
                        className="py-2.5 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {prod.images?.[0] && (
                            <img
                              src={prod.images[0]}
                              alt={prod.name || "Product"}
                              className="w-12 h-14 object-cover object-top bg-neutral-100 border border-neutral-200 flex-shrink-0"
                            />
                          )}
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-neutral-900 truncate">
                              {prod.name || item.name || "Zudio Item"}
                            </p>
                            <p className="text-xs text-neutral-500">
                              Qty: {item.quantity || 1}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-semibold">
                          ₹
                          {Number(
                            (item.price || prod.price || 0) *
                              (item.quantity || 1)
                          ).toLocaleString("en-IN")}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-200 text-sm">
                  <span className="text-xs uppercase tracking-wider text-neutral-500">
                    Order Total
                  </span>
                  <span className="font-bold">
                    ₹
                    {Number(
                      order.totalAmount || order.totalPrice || 0
                    ).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
