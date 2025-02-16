const asyncHandler = require("express-async-handler");
const Order = require("../models/order.model");
const Product = require("../models/product.model");

// @desc    Place a new order
// @route   POST /api/orders
// @access  Private
const placeOrder = asyncHandler(async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, totalAmount } =
      req.body;

    // Ensure all required fields are provided
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No products in the order" });
    }

    if (!shippingAddress || !paymentMethod || !totalAmount) {
      return res
        .status(400)
        .json({ message: "Please provide all necessary order details" });
    }

    // Check if products are available in stock
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${item.product} not found` });
      }
      if (product.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Insufficient stock for product ${product.name}` });
      }
    }

    // Create a new order document
    const newOrder = new Order({
      user: req.user.id, // Get user ID from the request, set by the 'protect' middleware
      orderItems: orderItems,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      totalAmount: totalAmount,
      paymentStatus: "Pending", // Set payment status as "Pending"
      orderStatus: "Processing", // Set order status as "Processing"
    });

    // Save the order in the database
    const savedOrder = await newOrder.save();

    // Reduce the stock of the products ordered
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      product.stock -= item.quantity;
      await product.save();
    }

    res.status(201).json({
      message: "Order placed successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
});

// @desc    Get orders of the logged-in user
// @route   GET /api/orders/my-orders
// @access  Private
const getUserOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
});

// @desc    Get order details by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate("user", "name email")
      .populate("orderItems.product", "name price");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Ensure that the order belongs to the logged-in user or the user is an admin
    if (
      order.user.id.toString() !== req.user.id.toString() &&
      !req.user.isAdmin
    ) {
      return res
        .status(401)
        .json({ message: "Unauthorized access to this order" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
});

// @desc    Update order status (Admin only)
// @route   PUT /api/orders/:id/status
// @access  Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Only an admin can update order status

    order.orderStatus = orderStatus;

    // If the order is delivered, mark payment as "Paid"
    if (orderStatus === "Delivered") {
      order.paymentStatus = "Paid";
    }

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder); // Return updated order details
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
});

// @desc    Delete an order (Admin only)
// @route   DELETE /api/orders/:id
// @access  Admin
const deleteOrder = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Find the order by ID
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Only an admin can delete order

    // Delete the order using findByIdAndDelete
    await Order.findByIdAndDelete(id); // Or you can use order.deleteOne()

    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error, please try again later", error });
  }
});


module.exports = {
  placeOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
