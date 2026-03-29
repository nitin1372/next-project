const createProduct = (
  id,
  name,
  price,
  originalPrice,
  discount,
  image,
  rating,
  reviews,
  description,
  extra = {}
) => ({
  id,
  name,
  price,
  originalPrice,
  discount,
  image,
  rating,
  reviews,
  description,
  ...extra,
});

const createVariant = (ram, storage, price, originalPrice, inStock = true) => ({
  ram,
  storage,
  price,
  originalPrice,
  inStock,
});

const brands = [
  {
    slug: "ai-plus",
    label: "AI+",
    image: "/phone brand/AI+.webp",
    products: [
      createProduct(1, "AI+ Nova 5G", 17999, 20999, 14, "/phone brand/AI+.webp", 4.1, 118, [
        "50MP AI dual camera",
        "6.6-inch FHD+ display",
        "5000 mAh battery",
        "128GB storage",
      ]),
      createProduct(2, "AI+ Pulse Pro", 19999, 23999, 16, "/phone brand/AI+.webp", 4.2, 84, [
        "120Hz punch-hole display",
        "8GB RAM",
        "45W fast charging",
        "5G ready chipset",
      ]),
      createProduct(3, "AI+ Neo Max", 22999, 25999, 12, "/phone brand/AI+.webp", 4.3, 72, [
        "AMOLED display",
        "256GB storage",
        "Stereo dual speakers",
        "Fast 5G performance",
      ]),
      createProduct(4, "AI+ Edge Ultra", 27999, 31999, 13, "/phone brand/AI+.webp", 4.4, 63, [
        "Curved premium display",
        "64MP AI camera",
        "5000 mAh battery",
        "67W rapid charging",
      ]),
    ],
  },
  {
    slug: "google",
    label: "Google",
    image: "/phone brand/Google.webp",
    products: [
      createProduct(5, "Google Pixel 10", 76999, 82999, 7, "/Premium Shmartphones/Google Pixel 10.webp", 4.5, 256, [
        "Pixel camera experience",
        "Pure Android software",
        "All-day battery life",
        "Fast AI features",
      ]),
      createProduct(6, "Google Pixel 9a", 42999, 47999, 10, "/phone brand/Google.webp", 4.4, 142, [
        "Compact OLED display",
        "Best-in-class camera",
        "7 years of updates",
        "128GB storage",
      ]),
      createProduct(7, "Google Pixel 10 Pro", 94999, 102999, 8, "/phone brand/Google.webp", 4.6, 189, [
        "LTPO OLED panel",
        "Pro-grade image processing",
        "Fast wireless charging",
        "Google Tensor AI tools",
      ]),
      createProduct(8, "Google Pixel Fold Lite", 109999, 118999, 8, "/phone brand/Google.webp", 4.3, 74, [
        "Foldable AMOLED display",
        "Clean Android multitasking",
        "Excellent low-light camera",
        "Premium hinge design",
      ]),
    ],
  },
  {
    slug: "infinix",
    label: "Infinix",
    image: "/phone brand/Infinix.webp",
    products: [
      createProduct(9, "Infinix Note 50 5G", 16999, 19999, 15, "/phone brand/Infinix.webp", 4.0, 97, [
        "120Hz display",
        "5000 mAh battery",
        "50MP rear camera",
        "Fast charging support",
      ]),
      createProduct(10, "Infinix Zero 40", 24999, 28999, 13, "/phone brand/Infinix.webp", 4.1, 65, [
        "Curved AMOLED display",
        "Gaming-ready processor",
        "Premium finish",
        "256GB storage",
      ]),
      createProduct(11, "Infinix GT 30 Pro", 27999, 31999, 12, "/phone brand/Infinix.webp", 4.2, 81, [
        "Performance gaming mode",
        "Fast AMOLED refresh rate",
        "Large vapor cooling",
        "Strong stereo audio",
      ]),
      createProduct(12, "Infinix Smart 9 HD", 8999, 10999, 18, "/phone brand/Infinix.webp", 3.9, 134, [
        "Affordable big display",
        "Day-long battery backup",
        "AI camera enhancements",
        "Smooth daily performance",
      ]),
    ],
  },
  {
    slug: "apple",
    label: "iPhone",
    image: "/phone brand/iphone.webp",
    products: [
      createProduct(13, "iPhone 17", 89999, 99999, 10, "/Premium Shmartphones/iphone 17.webp", 4.7, 410, [
        "Super Retina display",
        "Apple A-series performance",
        "Premium camera system",
        "Long software support",
      ]),
      createProduct(14, "iPhone 16e", 59999, 64999, 8, "/phone brand/iphone.webp", 4.6, 211, [
        "Compact design",
        "Fast Apple chipset",
        "Brighter OLED screen",
        "Excellent video recording",
      ]),
      createProduct(15, "iPhone 17 Pro", 119999, 129999, 8, "/phone brand/iphone.webp", 4.8, 264, [
        "ProMotion OLED display",
        "Titanium-inspired build",
        "Advanced camera controls",
        "Best-in-class performance",
      ]),
      createProduct(16, "iPhone 17 Air", 99999, 108999, 8, "/phone brand/iphone.webp", 4.5, 143, [
        "Slim lightweight design",
        "Strong battery efficiency",
        "Smooth iOS experience",
        "High-end video features",
      ]),
    ],
  },
  {
    slug: "motorola",
    label: "Moto",
    image: "/phone brand/motorola.webp",
    products: [
      createProduct(17, "Moto G86 Power", 22999, 25999, 11, "/Midrangesmartphone/mot g86 Power.webp", 4.2, 176, [
        "Massive battery life",
        "Clean Android UI",
        "Stereo speakers",
        "Strong everyday performance",
      ]),
      createProduct(18, "Moto Edge 60 Fusion", 27999, 31999, 12, "/Midrangesmartphone/moto edge 60 Fusion.webp", 4.3, 133, [
        "Curved pOLED display",
        "68W TurboPower charging",
        "Premium in-hand feel",
        "50MP OIS camera",
      ]),
      createProduct(19, "Moto G35 5G", 12999, 14999, 13, "/BudgetSmartphone/moto g35.webp", 4.1, 93, [
        "Affordable 5G phone",
        "Near-stock Android",
        "5000 mAh battery",
        "Smooth daily usage",
      ]),
      createProduct(20, "Moto G67 Power", 15999, 18999, 15, "/BudgetSmartphone/moto g67 Power.webp", 4.1, 119, [
        "Big battery setup",
        "120Hz smooth display",
        "Fast side fingerprint unlock",
        "Dependable day-to-day use",
      ]),
      createProduct(21, "Moto G96", 24999, 28999, 13, "/Midrangesmartphone/moto g96.webp", 4.2, 88, [
        "Balanced performance package",
        "Slim premium finish",
        "Fast-charging support",
        "Sharp OLED visuals",
      ]),
    ],
  },
  {
    slug: "nothing",
    label: "Nothing",
    image: "/phone brand/Nothing.webp",
    products: [
      createProduct(22, "Nothing Phone 4a Pro", 34999, 38999, 10, "/Premium Shmartphones/Nothing 4a Pro.webp", 4.4, 148, [
        "Glyph-inspired design",
        "120Hz AMOLED display",
        "Clean Nothing OS",
        "Fast wired charging",
      ]),
      createProduct(23, "Nothing Phone 3a", 26999, 29999, 10, "/phone brand/Nothing.webp", 4.3, 104, [
        "Minimal design language",
        "Reliable camera output",
        "Balanced performance",
        "Good battery backup",
      ]),
      createProduct(24, "Nothing Phone 4a", 29999, 33999, 12, "/phone brand/Nothing.webp", 4.3, 96, [
        "Signature transparent styling",
        "Bright AMOLED display",
        "Responsive Nothing OS",
        "Strong everyday cameras",
      ]),
      createProduct(25, "CMF Phone 2 Pro", 21999, 24999, 12, "/phone brand/Nothing.webp", 4.1, 122, [
        "Colorful modular design",
        "Good value AMOLED panel",
        "Efficient 5G chipset",
        "Clean software feel",
      ]),
    ],
  },
  {
    slug: "oppo",
    label: "Oppo",
    image: "/phone brand/oppo.webp",
    products: [
      createProduct(26, "Oppo K14x 5G", 15999, 18999, 15, "/BudgetSmartphone/OPPO K14x 5G.webp", 4.1, 188, [
        "AI portrait camera",
        "Slim design",
        "45W SUPERVOOC charging",
        "Smooth 120Hz display",
      ]),
      createProduct(27, "Oppo Reno 13", 32999, 37999, 13, "/phone brand/oppo.webp", 4.2, 96, [
        "Premium camera styling",
        "AMOLED panel",
        "Lightweight build",
        "Fast charging support",
      ]),
      createProduct(28, "Oppo A5x 5G", 14999, 17999, 16, "/phone brand/oppo.webp", 4.0, 111, [
        "Large battery life",
        "Bright LCD display",
        "Smooth ColorOS usage",
        "Reliable 5G connectivity",
      ]),
      createProduct(29, "Oppo F29 Pro", 30999, 34999, 11, "/phone brand/oppo.webp", 4.2, 79, [
        "Elegant curved profile",
        "Portrait-focused camera",
        "Fast wired charging",
        "Strong selfie results",
      ]),
    ],
  },
  {
    slug: "poco",
    label: "Poco",
    image: "/phone brand/poco.webp",
    products: [
      createProduct(30, "Poco F3 Ultra", 29999, 34999, 14, "/Midrangesmartphone/p3 Ultra.webp", 4.3, 171, [
        "Performance-first tuning",
        "Large cooling system",
        "Fast AMOLED display",
        "Big battery support",
      ]),
      createProduct(31, "Poco X7 Pro", 24999, 27999, 10, "/phone brand/poco.webp", 4.2, 109, [
        "Gaming-focused chipset",
        "Bright display",
        "64MP camera",
        "67W charging",
      ]),
      createProduct(32, "Poco M7 Pro 5G", 17999, 20999, 14, "/phone brand/poco.webp", 4.1, 137, [
        "Great value 5G phone",
        "5000 mAh battery",
        "Smooth AMOLED viewing",
        "Fast charge support",
      ]),
      createProduct(33, "Poco C75 5G", 10999, 12999, 15, "/phone brand/poco.webp", 4.0, 168, [
        "Budget-friendly 5G setup",
        "Big immersive display",
        "Clean daily performance",
        "Good standby battery",
      ]),
    ],
  },
  {
    slug: "realme",
    label: "Realme",
    image: "/phone brand/realme.webp",
    products: [
      createProduct(34, "Realme 15T", 14999, 17999, 16, "/BudgetSmartphone/realme 15T.webp", 4.1, 167, [
        "Value 5G phone",
        "5000 mAh battery",
        "Stylish back finish",
        "Fast UI experience",
      ]),
      createProduct(35, "Realme 16 Pro", 26999, 30999, 12, "/MoretoExplore/realme 16 Pro.webp", 4.3, 132, [
        "Slim AMOLED design",
        "High-resolution camera",
        "Fast charging",
        "Strong everyday performance",
      ]),
      createProduct(36, "Realme 14 Pro+", 31999, 36999, 13, "/MoretoExplore/realme 14 pro+.webp", 4.4, 144, [
        "Premium curved display",
        "Periscope style camera feel",
        "Fast and smooth UI",
        "Flagship-inspired design",
      ]),
      createProduct(37, "Realme 15 Pro 5G", 28999, 32999, 12, "/MoretoExplore/realme 15 Pro 5G.webp", 4.3, 101, [
        "Pro-grade AMOLED panel",
        "Balanced gaming performance",
        "Quick charging support",
        "Sharp camera tuning",
      ]),
      createProduct(38, "Realme 16 Pro+", 33999, 38999, 13, "/MoretoExplore/realme 16 pro+.webp", 4.4, 94, [
        "Flagship-style curved body",
        "Premium camera setup",
        "Strong battery efficiency",
        "Fast high-refresh display",
      ]),
      createProduct(39, "Realme P4 Lite", 12999, 14999, 13, "/BudgetSmartphone/realme P4 Lite.webp", 4.0, 126, [
        "Affordable 5G experience",
        "Slim in-hand feel",
        "Smooth day-to-day usage",
        "Long battery backup",
      ]),
      createProduct(40, "Realme P4", 15999, 18999, 15, "/BudgetSmartphone/realme P4.webp", 4.1, 118, [
        "Modern flat-edge design",
        "Bright 120Hz display",
        "Reliable camera output",
        "Fast UI response",
      ]),
      createProduct(59, "Realme Narzo 30", 13999, 16999, 18, "/BudgetSmartphone/realme 15T.webp", 4.0, 152, [
        "Narzo gaming-focused tuning",
        "Smooth full-screen display",
        "Long battery backup",
        "Value everyday performance",
      ], {
        searchKeywords: ["narzo 30", "realme narzo 30", "narzo30"],
      }),
        createProduct(59, "Realme 14 pro", 13999, 16999, 18, "/BudgetSmartphone/realme 15T.webp", 4.0, 152, [
        "Narzo gaming-focused tuning",
        "Smooth full-screen display",
        "Long battery backup",
        "Value everyday performance",
      ], {
        searchKeywords: ["Realme 14 pro", "realme", "14 pro"],
      }),
    ],
  },
  {
    slug: "redmi",
    label: "Redmi",
    image: "/phone brand/Redmi.webp",
    products: [
      createProduct(41, "Redmi Note 14 Pro", 23999, 27999, 14, "/phone brand/Redmi.webp", 4.2, 196, [
        "High-megapixel camera",
        "Large AMOLED panel",
        "Turbo charging",
        "Reliable MIUI experience",
      ]),
      createProduct(42, "Redmi A5", 8999, 9999, 10, "/phone brand/Redmi.webp", 4.0, 119, [
        "Budget-friendly smartphone",
        "Long battery backup",
        "Simple daily performance",
        "Big display",
      ]),
      createProduct(43, "Redmi 14C 5G", 10999, 12999, 15, "/phone brand/Redmi.webp", 4.0, 147, [
        "Affordable 5G access",
        "Big screen viewing",
        "Reliable battery life",
        "Good casual performance",
      ]),
      createProduct(44, "Redmi 13 5G", 15999, 18999, 15, "/phone brand/Redmi.webp", 4.1, 134, [
        "Premium glass feel",
        "Smooth refresh panel",
        "Solid camera hardware",
        "Fast charging support",
      ]),
    ],
  },
  {
    slug: "samsung",
    label: "Samsung",
    image: "/phone brand/Samsung.webp",
    products: [
      createProduct(45, "Samsung Galaxy S25 FE", 59999, 69999, 15, "/Premium Shmartphones/Galaxy S25 FE.webp", 4.6, 129, [
        "8 GB RAM | 128 GB ROM",
        "Exynos processor",
        "50MP camera",
        "4500 mAh battery",
      ], {
        images: [
          "/Premium Shmartphones/Galaxy S25 FE.webp",
          "/pd/samsung1.webp",
          "/pd/samsung2.webp",
          "/pd/samsung3.webp",
        ],
        variants: [
          createVariant("8GB", "128GB", 59999, 69999),
          createVariant("12GB", "256GB", 69999, 79999),
        ],
      }),
      createProduct(46, "Samsung Galaxy S26", 79999, 87999, 9, "/Premium Shmartphones/GalaxyS26.webp", 4.7, 162, [
        "Dynamic AMOLED display",
        "Flagship Galaxy cameras",
        "Premium aluminum frame",
        "Fast wireless charging",
      ]),
      createProduct(47, "Samsung Galaxy F36 5G", 23999, 26999, 11, "/Midrangesmartphone/Galaxy F36.webp", 4.3, 159, [
        "Smooth AMOLED display",
        "50MP camera",
        "Long battery life",
        "Fast One UI experience",
      ]),
      createProduct(48, "Samsung Galaxy A17 5G", 18999, 21999, 13, "/MoretoExplore/Galaxy A17 5G.webp", 4.2, 138, [
        "5G connectivity",
        "Stylish Samsung design",
        "Day-long battery",
        "Good camera quality",
      ]),
      createProduct(49, "Samsung Galaxy M36 5G", 22999, 25999, 11, "/phone brand/Samsung.webp", 4.2, 117, [
        "Large battery capacity",
        "Bright AMOLED visuals",
        "Balanced gaming performance",
        "Reliable One UI features",
      ]),
    ],
  },
  {
    slug: "vivo",
    label: "Vivo",
    image: "/phone brand/vivo.webp",
    products: [
      createProduct(50, "Vivo T4 5G", 21999, 24999, 12, "/Midrangesmartphone/vivo T4.webp", 4.2, 154, [
        "Bright AMOLED display",
        "Fast charging support",
        "Slim design",
        "Reliable camera tuning",
      ]),
      createProduct(51, "Vivo T4R 5G", 24999, 28999, 13, "/Midrangesmartphone/vivo T4R.webp", 4.3, 121, [
        "Premium curved feel",
        "Good selfie camera",
        "Smooth performance",
        "Strong battery backup",
      ]),
      createProduct(52, "Vivo V60e", 30999, 34999, 11, "/MoretoExplore/vivo v60e.webp", 4.4, 95, [
        "Portrait camera focus",
        "Elegant design",
        "AMOLED display",
        "Fast charging support",
      ]),
      createProduct(53, "Vivo T4 Lite 5G", 11999, 13999, 14, "/BudgetSmartphone/vivo T4 Lite 5G.webp", 4.0, 163, [
        "Affordable Vivo styling",
        "Long battery life",
        "Smooth everyday use",
        "Clean 5G connectivity",
      ]),
      createProduct(54, "Vivo V50 Pro", 38999, 42999, 9, "/phone brand/vivo.webp", 4.4, 89, [
        "Premium portrait camera",
        "Curved AMOLED panel",
        "Fast wired charging",
        "Elegant slim build",
      ]),
    ],
  },
  {
    slug: "tecno",
    label: "Tecno",
    image: "/phone brand/Tecno.webp",
    products: [
      createProduct(55, "Tecno Pova 7", 18999, 21999, 14, "/phone brand/Tecno.webp", 4.1, 88, [
        "Gaming-ready hardware",
        "Big battery setup",
        "Large immersive screen",
        "Bold design language",
      ]),
      createProduct(56, "Tecno Spark 30", 12999, 14999, 13, "/phone brand/Tecno.webp", 4.0, 73, [
        "Great value pricing",
        "AI camera features",
        "Smooth display",
        "Reliable battery backup",
      ]),
      createProduct(57, "Tecno Camon 40", 20999, 23999, 13, "/phone brand/Tecno.webp", 4.1, 64, [
        "Camera-first experience",
        "Bright AMOLED viewing",
        "Fast charging support",
        "Stylish slim finish",
      ]),
      createProduct(58, "Tecno Pova Neo 3", 15999, 18999, 15, "/phone brand/Tecno.webp", 4.0, 82, [
        "Strong battery endurance",
        "Smooth gaming response",
        "Large display size",
        "Value-focused pricing",
      ]),
    ],
  },
];

export const allProducts = brands.flatMap(({ slug, products = [] }) =>
  products.map((product) => ({
    ...product,
    brand: slug,
  }))
);

export default brands;

