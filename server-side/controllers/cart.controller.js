const Cart = require("../models/cart.model");
const Product = require("../models/product.model"); // Assuming the Product model is already set up

// Add an item to the cart
const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validate the incoming data
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid product or quantity" });
    }

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find or create the cart for the logged-in user
    let cart = await Cart.findOne({ user: req.user.id });

    // If cart does not exist, create a new one
    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        items: [],
        totalPrice: 0,
      });
    }

    // Check if the product already exists in the cart
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity; // Increase quantity if already exists
    } else {
      // Add new product to cart
      cart.items.push({ product: productId, quantity });
    }

    // Recalculate total price
    cart.totalPrice = cart.items.reduce((total, item) => {
      const itemProduct = product;
      return total + item.quantity * itemProduct.price;
    }, 0);

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({
      message: "Failed to add item to cart",
      error: error.message,
    });
  }
};

// Get the cart for the logged-in user
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({
      message: "Failed to get cart",
      error: error.message,
    });
  }
};

// Update the quantity of an item in the cart
const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    // Find the cart and populate product details
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Update item quantity
    item.quantity = quantity;

    // Recalculate total price
    let totalPrice = 0;
    cart.items.forEach((item) => {
      const price = item.product?.price;
      const itemQuantity = item.quantity;

      // Log values for debugging
      console.log(
        `Product: ${item.product?.name}, Price: ${price}, Quantity: ${itemQuantity}`
      );

      if (price && typeof price === "number" && price > 0 && itemQuantity > 0) {
        totalPrice += itemQuantity * price;
      } else {
        console.log(`Skipping invalid item. Product: ${item.product?.name}`);
      }
    });

    // Log the calculated total price for debugging
    console.log(`Calculated Total Price: ${totalPrice}`);

    // Check if totalPrice is valid
    if (isNaN(totalPrice) || totalPrice <= 0) {
      return res.status(400).json({ message: "Invalid total price" });
    }

    // Update the total price in the cart
    cart.totalPrice = totalPrice;

    // Save the updated cart
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.log("Error:", error); // Log the error
    res.status(400).json({
      message: "Failed to update cart item",
      error: error.message,
    });
  }
};


// Remove an item from the cart
const removeItemFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    // Find the cart associated with the logged-in user and populate the product details
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the item to remove and filter it out
    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Remove the item from the cart array
    cart.items.splice(itemIndex, 1);

    // Recalculate the total price after item removal
    let totalPrice = 0;
    cart.items.forEach((item) => {
      const price = item.product?.price;
      const itemQuantity = item.quantity;

      // Ensure price and quantity are valid before adding to the total price
      if (price && typeof price === "number" && price > 0 && itemQuantity > 0) {
        totalPrice += itemQuantity * price;
      }
    });

    // If total price is invalid, return an error
    if (isNaN(totalPrice) || totalPrice <= 0) {
      return res.status(400).json({ message: "Invalid total price" });
    }

    // Update the total price in the cart and save it
    cart.totalPrice = totalPrice;
    await cart.save();

    // Send the updated cart back as a response
    res.status(200).json(cart);
  } catch (error) {
    console.log("Error:", error); // Log the error for debugging
    res.status(400).json({
      message: "Failed to remove item from cart",
      error: error.message,
    });
  }
};




// Clear the entire cart
const clearCart = async (req, res) => {
  try {
    // Find the cart for the logged-in user
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Clear the items in the cart
    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({
      message: "Failed to clear cart",
      error: error.message,
    });
  }
};

module.exports = {
  addItemToCart,
  getCart,
  updateCartItem,
  removeItemFromCart,
  clearCart,
};
