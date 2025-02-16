const mongoose= require("mongoose");
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "User",
    required: true,
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"],
      },
      size: {
        type: String,
        required: [true, "Size is required"],
        enum: ["XS", "S", "M", "L", "XL", "XXL"],
      },
    },
  ],
  shippingAddress: {
    line: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zip: { type: String, required: true },
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["Credit Card", "Debit Card", "PayPal", "COD"],
  },
  paymentStatus: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Paid", "Failed"],
  },
  orderStatus: {
    type: String,
    default: "Processing",
    enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
  },
  totalAmount: {
    type: Number,
    required: true,
    min: [0, "Total amount cannot be negative"],
  },
},{
  timestamps:true
});

module.exports = mongoose.model('Order',orderSchema);