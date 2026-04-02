export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  emoji: string;
  imageUrl?: string;
  images?: string[];
  isNew?: boolean;
  rating: number;
  reviewCount: number;
  stock: number;
  description?: string;
};

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type TimestampLike =
  | Date
  | {
      seconds: number;
      nanoseconds?: number;
      toDate?: () => Date;
    }
  | null
  | undefined;

export type DeliveryInfo = {
  fullName: string;
  phone: string;
  city: string;
  area?: string;
  details?: string;
  address?: string;
  country?: string;
};

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  emoji: string;
  imageUrl?: string;
  quantity: number;
};

export type Order = {
  id?: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  paymentMethod: "cod";
  delivery: DeliveryInfo;
  shippingAddress?: DeliveryInfo;
  createdAt?: TimestampLike;
  updatedAt?: TimestampLike;
};

export type UserProfile = {
  uid: string;
  email: string;
  displayName: string;
  phone?: string;
  city?: string;
  area?: string;
  address?: string;
  role?: "customer" | "admin";
  createdAt?: Date;
};

export type Category = {
  id: number;
  name: string;
  emoji: string;
  count: number;
};

export type Banner = {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  emoji: string;
  imageUrl?: string;
  gradient: string;
};

export const categories: Category[] = [
  { id: 1, name: "Microcontrollers", emoji: "🤖", count: 48 },
  { id: 2, name: "Sensors", emoji: "📡", count: 95 },
  { id: 3, name: "Displays", emoji: "🖥️", count: 32 },
  { id: 4, name: "Power", emoji: "⚡", count: 27 },
  { id: 5, name: "Modules", emoji: "📦", count: 61 },
  { id: 6, name: "Kits", emoji: "🧰", count: 14 },
  { id: 7, name: "Cables", emoji: "🔌", count: 43 },
  { id: 8, name: "Tools", emoji: "🔧", count: 29 },
];

export const banners: Banner[] = [
  {
    id: 1,
    tag: "New Arrival",
    title: "Arduino Uno R4",
    subtitle: "WiFi Built-in",
    description: "The most powerful Uno yet. Built-in WiFi, faster processor, full compatibility.",
    cta: "Shop Now",
    emoji: "🤖",
    gradient: "linear-gradient(135deg, #3b0764 0%, #6d28d9 50%, #7c3aed 100%)",
  },
  {
    id: 2,
    tag: "Best Seller",
    title: "ESP32 Starter",
    subtitle: "Kit Bundle",
    description: "Everything you need to start building IoT projects. 42 components included.",
    cta: "Grab the Kit",
    emoji: "🧰",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #4338ca 50%, #6d28d9 100%)",
  },
  {
    id: 3,
    tag: "65% Off Today",
    title: "Sensor Mega",
    subtitle: "Pack — 37pcs",
    description: "Ultrasonic, IR, temperature, humidity and 33 more sensors.",
    cta: "View Deal",
    emoji: "📡",
    gradient: "linear-gradient(135deg, #2e1065 0%, #7c3aed 50%, #8b5cf6 100%)",
  },
];

export const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Arduino Uno R4 WiFi",
    brand: "Arduino",
    category: "Microcontrollers",
    price: 45,
    originalPrice: 55,
    discount: 18,
    emoji: "🤖",
    isNew: true,
    rating: 4.9,
    reviewCount: 128,
    stock: 25,
    description: "The new Arduino Uno R4 WiFi brings WiFi connectivity to the classic Uno form factor. Features a 48MHz ARM Cortex-M4 processor and built-in WiFi/Bluetooth.",
  },
  {
    id: "2",
    name: "ESP32-WROOM-32D DevKit",
    brand: "Espressif",
    category: "Microcontrollers",
    price: 12,
    originalPrice: 15,
    discount: 20,
    emoji: "🤖",
    rating: 4.8,
    reviewCount: 256,
    stock: 100,
    description: "Dual-core ESP32 development board with WiFi and Bluetooth. 4MB flash memory, 520KB SRAM.",
  },
  {
    id: "3",
    name: "DHT22 Temperature Humidity Sensor",
    brand: "ASAIR",
    category: "Sensors",
    price: 8,
    originalPrice: 10,
    discount: 20,
    emoji: "📡",
    rating: 4.7,
    reviewCount: 89,
    stock: 150,
    description: "High precision digital temperature and humidity sensor. -40 to 80°C range, 0-100% RH.",
  },
  {
    id: "4",
    name: "HC-SR04 Ultrasonic Sensor",
    brand: "Generic",
    category: "Sensors",
    price: 3,
    emoji: "📡",
    rating: 4.5,
    reviewCount: 312,
    stock: 200,
    description: "Ultrasonic distance measuring sensor. Range: 2cm to 400cm. 3mm accuracy.",
  },
  {
    id: "5",
    name: "1.3\" OLED Display I2C",
    brand: "Waveshare",
    category: "Displays",
    price: 9,
    originalPrice: 12,
    discount: 25,
    emoji: "🖥️",
    isNew: true,
    rating: 4.6,
    reviewCount: 78,
    stock: 45,
    description: "128x64 pixel OLED display with I2C interface. White display, SH1106 driver.",
  },
  {
    id: "6",
    name: "2.4\" TFT LCD Touch Screen",
    brand: "ILI9341",
    category: "Displays",
    price: 15,
    emoji: "🖥️",
    rating: 4.4,
    reviewCount: 45,
    stock: 30,
    description: "240x320 color TFT display with resistive touch. SPI interface, SD card slot.",
  },
  {
    id: "7",
    name: "18650 Battery Holder 4-Slot",
    brand: "Generic",
    category: "Power",
    price: 4,
    emoji: "⚡",
    rating: 4.3,
    reviewCount: 67,
    stock: 80,
    description: "4-slot 18650 battery holder with wire leads. Series or parallel configuration.",
  },
  {
    id: "8",
    name: "LM2596 DC-DC Buck Converter",
    brand: "TI",
    category: "Power",
    price: 3,
    emoji: "⚡",
    rating: 4.6,
    reviewCount: 134,
    stock: 120,
    description: "Adjustable step-down voltage regulator. 3A max, 4-40V input, 1.5-35V output.",
  },
  {
    id: "9",
    name: "ESP8266 WiFi Module ESP-01",
    brand: "AI-Thinker",
    category: "Modules",
    price: 4,
    emoji: "📦",
    rating: 4.4,
    reviewCount: 189,
    stock: 90,
    description: "Low-cost WiFi module with built-in TCP/IP stack. 802.11 b/g/n support.",
  },
  {
    id: "10",
    name: "Relay Module 4-Channel 5V",
    brand: "SRD",
    category: "Modules",
    price: 6,
    emoji: "📦",
    rating: 4.5,
    reviewCount: 98,
    stock: 60,
    description: "4-channel relay module with optocoupler isolation. 10A 250VAC / 10A 30VDC.",
  },
  {
    id: "11",
    name: "Arduino Starter Kit Ultimate",
    brand: "Arduino",
    category: "Kits",
    price: 85,
    originalPrice: 120,
    discount: 29,
    emoji: "🧰",
    isNew: true,
    rating: 4.9,
    reviewCount: 67,
    stock: 15,
    description: "Complete starter kit with Arduino Uno, 200+ components, and 15 projects guide.",
  },
  {
    id: "12",
    name: "ESP32 IoT Learning Kit",
    brand: "Freenove",
    category: "Kits",
    price: 55,
    originalPrice: 70,
    discount: 21,
    emoji: "🧰",
    rating: 4.7,
    reviewCount: 45,
    stock: 20,
    description: "IoT development kit with ESP32, sensors, actuators, and web dashboard tutorials.",
  },
  {
    id: "13",
    name: "Dupont Jumper Wires 120pcs",
    brand: "Generic",
    category: "Cables",
    price: 5,
    emoji: "🔌",
    rating: 4.6,
    reviewCount: 234,
    stock: 300,
    description: "Male-Male, Male-Female, Female-Female jumper wires. 20cm length, 40 of each type.",
  },
  {
    id: "14",
    name: "USB Cable Type-C 1m",
    brand: "Anker",
    category: "Cables",
    price: 7,
    emoji: "🔌",
    rating: 4.8,
    reviewCount: 156,
    stock: 100,
    description: "High-quality USB-C cable for ESP32 and modern development boards. 3A fast charging.",
  },
  {
    id: "15",
    name: "Digital Multimeter DT830B",
    brand: "UNI-T",
    category: "Tools",
    price: 15,
    emoji: "🔧",
    rating: 4.4,
    reviewCount: 89,
    stock: 35,
    description: "Basic digital multimeter for voltage, current, and resistance measurement.",
  },
  {
    id: "16",
    name: "Soldering Station 60W",
    brand: "YIHUA",
    category: "Tools",
    price: 45,
    originalPrice: 60,
    discount: 25,
    emoji: "🔧",
    rating: 4.7,
    reviewCount: 67,
    stock: 18,
    description: "Temperature-controlled soldering station. 200-480°C range, ESD safe.",
  },
];

export const iraqCities = [
  "Zakho",
  "Baghdad",
  "Erbil",
  "Basra",
  "Mosul",
  "Sulaymaniyah",
  "Kirkuk",
  "Duhok",
  "Najaf",
  "Karbala",
  "Nasiriyah",
  "Amarah",
  "Ramadi",
  "Tikrit",
];
