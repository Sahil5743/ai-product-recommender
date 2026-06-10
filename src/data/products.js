/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {string} category
 * @property {string} brand
 * @property {number} price
 * @property {string[]} tags
 * @property {string} description
 */

/** @type {Product[]} */
export const PRODUCTS = [
  {
    id: 1,
    name: "Samsung Galaxy A54",
    category: "Phone",
    brand: "Samsung",
    price: 449,
    tags: ["5G", "AMOLED", "128GB", "50MP camera"],
    description: "Balanced mid-range Android with 50MP camera and long battery life.",
  },
  {
    id: 2,
    name: "iPhone 15",
    category: "Phone",
    brand: "Apple",
    price: 799,
    tags: ["iOS", "A16 chip", "USB-C", "Dynamic Island"],
    description: "Apple's latest with Dynamic Island, great cameras, and USB-C charging.",
  },
  {
    id: 3,
    name: "Google Pixel 7a",
    category: "Phone",
    brand: "Google",
    price: 499,
    tags: ["Android", "AI camera", "5G", "90Hz"],
    description: "Excellent computational photography with stock Android experience.",
  },
  {
    id: 4,
    name: "OnePlus Nord CE 3",
    category: "Phone",
    brand: "OnePlus",
    price: 299,
    tags: ["AMOLED", "67W charging", "5G", "budget"],
    description: "Fast-charging budget phone with a bright AMOLED display.",
  },
  {
    id: 5,
    name: "MacBook Air M2",
    category: "Laptop",
    brand: "Apple",
    price: 1099,
    tags: ["M2 chip", "18hr battery", "fanless", "13.6in"],
    description: "Fanless ultrabook with exceptional performance and all-day battery.",
  },
  {
    id: 6,
    name: "Dell XPS 13",
    category: "Laptop",
    brand: "Dell",
    price: 849,
    tags: ["Intel i7", "OLED option", "compact", "Windows"],
    description: "Premium ultrabook with a sharp display and refined slim design.",
  },
  {
    id: 7,
    name: "Acer Aspire 5",
    category: "Laptop",
    brand: "Acer",
    price: 549,
    tags: ["AMD Ryzen 7", "15.6in", "budget", "Full HD"],
    description: "Reliable everyday laptop with solid specs at an affordable price.",
  },
  {
    id: 8,
    name: "Lenovo IdeaPad Slim 5",
    category: "Laptop",
    brand: "Lenovo",
    price: 699,
    tags: ["AMD Ryzen 5", "14in", "fingerprint reader", "Windows 11"],
    description: "Well-rounded mid-range laptop with good build quality and battery.",
  },
  {
    id: 9,
    name: "Sony WH-1000XM5",
    category: "Headphones",
    brand: "Sony",
    price: 349,
    tags: ["ANC", "30hr battery", "Hi-Res", "over-ear"],
    description: "Industry-leading noise cancellation with a warm, detailed sound.",
  },
  {
    id: 10,
    name: "Bose QuietComfort 45",
    category: "Headphones",
    brand: "Bose",
    price: 279,
    tags: ["ANC", "over-ear", "USB-C", "balanced audio"],
    description: "Comfortable all-day wear with balanced audio and excellent ANC.",
  },
  {
    id: 11,
    name: "Apple AirPods Pro 2",
    category: "Headphones",
    brand: "Apple",
    price: 249,
    tags: ["ANC", "spatial audio", "MagSafe", "in-ear"],
    description: "Best-in-class ANC earbuds deeply integrated with the Apple ecosystem.",
  },
  {
    id: 12,
    name: "Apple Watch Series 9",
    category: "Smartwatch",
    brand: "Apple",
    price: 399,
    tags: ["watchOS", "health sensors", "always-on", "Double Tap"],
    description: "The most capable Apple Watch with the S9 chip and double-tap gesture.",
  },
  {
    id: 13,
    name: "Samsung Galaxy Watch 6",
    category: "Smartwatch",
    brand: "Samsung",
    price: 299,
    tags: ["Android", "sleep tracking", "ECG", "BIA sensor"],
    description: "Advanced health monitoring for Android users with a sleek design.",
  },
  {
    id: 14,
    name: "Garmin Fenix 7",
    category: "Smartwatch",
    brand: "Garmin",
    price: 649,
    tags: ["GPS", "18-day battery", "rugged", "multi-sport"],
    description: "Premium rugged GPS watch built for serious outdoor athletes.",
  },
];

export const CATEGORIES = ["All", ...new Set(PRODUCTS.map((p) => p.category))];

export const QUICK_PROMPTS = [
  "Best laptop under $800",
  "Wireless headphones with noise cancellation",
  "Budget smartphone with a great camera",
  "Premium fitness smartwatch",
  "Apple products under $500",
  "Best value for money phone",
];
