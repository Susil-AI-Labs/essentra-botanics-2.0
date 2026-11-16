/* =========================================================
   ESSENTRA BOTANICS — EASY EDIT FILE  ✏️
   ---------------------------------------------------------
   NON-TECHNICAL GUIDE:
   You can update your whole website from THIS ONE FILE.
   - Change any text inside the "quotes".
   - Keep the quotes, commas and curly braces exactly as they are.
   - To add a product/testimonial, copy a block between { ... },
     paste it, and edit the text. Don't forget the comma between blocks.
   - Save the file, then refresh the website.
   ========================================================= */

window.SITE_CONFIG = {

  /* ---------- COMPANY & CONTACT ---------- */
  company: {
    name: "Essentra Botanics",
    website: "https://essentrabotanics.com/",
    phone: "9776684999",          // Call Now number
    whatsapp: "919776682999",     // WhatsApp number WITH country code (91 = India)
    instagram: "https://www.instagram.com/essentrabotanics",
    instagramHandle: "@essentrabotanics",
    facebook: "https://www.facebook.com/essentrabotanics",
    facebookName: "Essentra Botanics",
    // Address shown on Google Map. Put your full address or a place name.
    mapQuery: "India"
  },

  /* ---------- HERO (top banner) ---------- */
  hero: {
    eyebrow: "",
    titleLine1: "Nature's Harvest,",
    titleLine2: "Thoughtfully Crafted",
    subtitle: "Transforming Natural Agricultural Produce into Premium Value-Added Products.",
    primaryBtn: "Explore Products",
    secondaryBtn: "Contact Us"
  },

  /* ---------- PRODUCTS ---------- */
  /* Add as many as you like. "badge" can be "Coming Soon" or "" (empty to hide). */
  products: [
    { name: "Healthy Functional Drinks", desc: "Color-rich blue, red and herbal tea beverages crafted for wellness-focused lifestyles.", image: "assets/images/products/product-1-drinks.jfif", badge: "Coming Soon" },
    { name: "Dried Flower Essentials", desc: "A curated line from dried flowers: essential oils, flower petals and aromatic wellness blends.", image: "assets/images/products/product-2-dried-flower.jfif", badge: "Coming Soon" },
    { name: "Instant Foods", desc: "Quick-prep favorites including instant poha, khichdi, chutney mixes and practical meal blends.", image: "assets/images/products/product-3-instant-food.jfif", badge: "Coming Soon" },
    { name: "Everyday Natural Snacks", desc: "Real snack formats like chips and soup, inspired by clean ingredients.", image: "assets/images/products/product-4-snacks.jfif", badge: "Coming Soon" },
    { name: "Fruit Candy & Floral Wellness", desc: "Fruit candies and flower-based wellness offerings, made for freshness, aroma and mindful daily routines.", image: "assets/images/products/product-5-flowers.jfif", badge: "Coming Soon" },
    { name: "Herbal Beauty & Agarbatti", desc: "Flower-based herbal beauty products and incense essentials made with responsible processing.", image: "assets/images/products/product-6-herbal-beauty.jfif", badge: "Coming Soon" }
  ],

  /* ---------- TESTIMONIALS ---------- */
  testimonials: [
    { quote: "The commitment to quality and natural ingredients is truly refreshing. A brand you can trust.", name: "Ananya R.", role: "Wellness Enthusiast" },
    { quote: "Supporting local farmers while delivering premium products — exactly what the industry needs.", name: "Vikram S.", role: "Retail Partner" },
    { quote: "Sustainable, ethical and genuinely high quality. Essentra Botanics sets a new standard.", name: "Meera K.", role: "Nutritionist" },
    { quote: "Impressed by their transparent processing and eco-friendly packaging. Highly recommended.", name: "Rohan D.", role: "Conscious Consumer" }
  ]
};
