const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/product.model");

dotenv.config();

// Every product has a 100% unique image (no repeated images across any product)
const zudioProducts = [
  {
    name: "Beige Ribbed Knit Sweater",
    description:
      "Soft heavyweight ribbed crewneck sweater crafted for everyday Zudio layering with a relaxed silhouette.",
    price: 899,
    brand: "Zudio Studio",
    category: "Sweatshirts",
    size: ["S", "M", "L", "XL"],
    color: ["Yellow", "Gray"],
    tags: ["Popular", "New"],
    stock: 28,
    images: ["/images/prod-knit-sweater.jpg"],
    avgRating: 4.7,
    numReviews: 18,
  },
  {
    name: "Charcoal Oversized Hoodie",
    description:
      "Drop-shoulder fleece hoodie in brushed cotton blend with structured hood and kangaroo pocket.",
    price: 999,
    brand: "Zudio Street",
    category: "Hoodies",
    size: ["S", "M", "L", "XL"],
    color: ["Gray"],
    tags: ["Popular"],
    stock: 34,
    images: ["/images/prod-hoodie.jpg"],
    avgRating: 4.8,
    numReviews: 24,
  },
  {
    name: "Matte Black Technical Windbreaker",
    description:
      "Lightweight water-resistant zip windbreaker with high collar and clean utilitarian pockets.",
    price: 1299,
    brand: "Zudio Urban",
    category: "Jackets",
    size: ["M", "L", "XL"],
    color: ["Gray", "Blue"],
    tags: ["Popular", "Limited"],
    stock: 15,
    images: ["/images/prod-windbreaker.jpg"],
    avgRating: 4.6,
    numReviews: 14,
  },
  {
    name: "Classic Washed Denim Jacket",
    description:
      "Timeless medium-wash indigo trucker jacket with contrast stitching and metal shank buttons.",
    price: 1499,
    brand: "Zudio Denim",
    category: "Jackets",
    size: ["S", "M", "L", "XL"],
    color: ["Blue"],
    tags: ["Popular", "New"],
    stock: 19,
    images: ["/images/prod-denim-jacket.jpg"],
    avgRating: 4.9,
    numReviews: 31,
  },
  {
    name: "Striped Relaxed Poplin Shirt",
    description:
      "Crisp breathable cotton poplin shirt in yarn-dyed stripes with a chest patch pocket.",
    price: 699,
    brand: "Zudio Essentials",
    category: "Men",
    size: ["S", "M", "L", "XL"],
    color: ["Blue"],
    tags: ["New"],
    stock: 22,
    images: ["/images/prod-striped-shirt.jpg"],
    avgRating: 4.5,
    numReviews: 11,
  },
  {
    name: "Minimalist Geometric Boxy Tee",
    description:
      "240 GSM combed cotton boxy t-shirt featuring subtle tonal geometric artwork.",
    price: 399,
    brand: "Zudio Street",
    category: "Tshirts",
    size: ["S", "M", "L", "XL"],
    color: ["Gray", "Yellow"],
    tags: ["New", "Popular"],
    stock: 45,
    images: ["/images/prod-graphic-tee.jpg"],
    avgRating: 4.6,
    numReviews: 29,
  },
  {
    name: "Structured Buckle Crossbody Bag",
    description:
      "Compact faux-leather shoulder and crossbody bag with matte metal buckle and adjustable strap.",
    price: 799,
    brand: "Zudio Accessories",
    category: "Bags",
    size: ["S", "M"],
    color: ["Gray"],
    tags: ["New", "Limited"],
    stock: 12,
    images: ["/images/prod-crossbody-bag.jpg"],
    avgRating: 4.8,
    numReviews: 16,
  },
  {
    name: "Tailored Ivory Linen Overshirt",
    description:
      "Relaxed women's linen-blend overshirt designed for effortless desk-to-weekend styling.",
    price: 999,
    brand: "Zudio Woman",
    category: "Women",
    size: ["S", "M", "L"],
    color: ["Yellow", "Gray"],
    tags: ["New", "Popular"],
    stock: 17,
    images: ["/images/col-women.jpg"],
    avgRating: 4.9,
    numReviews: 27,
  },
  {
    name: "Urban Utility Charcoal Jacket",
    description:
      "Structured twill jacket layered for clean everyday menswear with concealed snap placket.",
    price: 1199,
    brand: "Zudio Urban",
    category: "Men",
    size: ["M", "L", "XL"],
    color: ["Gray", "Green"],
    tags: ["New"],
    stock: 25,
    images: ["/images/col-men.jpg"],
    avgRating: 4.5,
    numReviews: 9,
  },
  {
    name: "Pastel Fleece Pullover Hoodie",
    description:
      "Ultra-soft brushed fleece hoodie for youth and casual everyday wear with ribbed cuffs.",
    price: 599,
    brand: "Zudio Youth",
    category: "Hoodies",
    size: ["S", "M", "L"],
    color: ["Red", "Blue", "Yellow"],
    tags: ["Popular"],
    stock: 40,
    images: ["/images/col-kids.jpg"],
    avgRating: 4.6,
    numReviews: 19,
  },
  {
    name: "Essential Heavyweight Crewneck",
    description:
      "320 GSM French terry crewneck sweatshirt built for structured comfort and clean drape.",
    price: 799,
    brand: "Zudio Essentials",
    category: "Sweatshirts",
    size: ["S", "M", "L", "XL"],
    color: ["Green", "Blue"],
    tags: ["Popular"],
    stock: 30,
    images: ["/images/col-sale.jpg"],
    avgRating: 4.4,
    numReviews: 15,
  },
  {
    name: "Studio Relaxed Knit & Denim Set",
    description:
      "Minimalist knitwear paired with relaxed-fit denim for effortless studio-to-street styling.",
    price: 1399,
    brand: "Zudio Studio",
    category: "Women",
    size: ["S", "M", "L"],
    color: ["Yellow", "Blue"],
    tags: ["Limited", "New"],
    stock: 9,
    images: ["/images/hero-1.jpg"],
    avgRating: 4.8,
    numReviews: 12,
  },
  {
    name: "Olive Utility Overshirt & Cargo Drop",
    description:
      "Street-ready layered overshirt and wide-leg cargo silhouette built for everyday movement.",
    price: 1199,
    brand: "Zudio Street",
    category: "Tshirts",
    size: ["S", "M", "L", "XL"],
    color: ["Green", "Gray"],
    tags: ["Limited", "New"],
    stock: 18,
    images: ["/images/hero-2.jpg"],
    avgRating: 4.7,
    numReviews: 20,
  },
];

async function seedProducts() {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is not set in server-side/.env");
    }
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB for replacing inventory...");

    // Replace all existing products so every item in DB is Zudio-themed with a unique image
    const deleted = await Product.deleteMany({});
    const inserted = await Product.insertMany(zudioProducts);

    console.log(
      `Inventory replaced: removed ${deleted.deletedCount} old items, inserted ${inserted.length} unique Zudio products.`
    );
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exit(1);
  }
}

seedProducts();
