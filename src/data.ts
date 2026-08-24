import { Product, Artisan, Certification, Office } from './types';

const localImages = import.meta.glob('./assets/images/*', { eager: true, import: 'default' }) as Record<string, string>;
const img = (filename: string): string => {
  const match = Object.entries(localImages).find(([path]) => path.endsWith(`/${filename}`));
  return match ? match[1] : `/src/assets/images/${filename}`;
};

export const products: Product[] = [
  // --- HOME DECOR CATEGORIES ---
  // 1. Rugs
  {
    id: 'rug-braided-round',
    name: 'Artisanal Braided Round Rug',
    collection: 'home-decor',
    subcategory: 'Rugs',
    image: img('Rugs.jpeg'),
    description: 'Masterfully hand-braided round area rug made of organic unbleached cotton and raw Indian jute. Offers a textured, tactile underfoot experience for high-end neutral living rooms.',
    material: '70% Sustainable Jute, 30% Unbleached Cotton',
    dimensions: 'Dia 120cm, Dia 150cm, Dia 180cm, Custom sizes',
    leadTime: '6-8 weeks',
    minOrderQuantity: '100 pcs'
  },
  // 2. Carpets
  {
    id: 'carpet-heritage-flatweave',
    name: 'Heritage Textured Flatweave Carpet',
    collection: 'home-decor',
    subcategory: 'Carpets',
    image: img('Carpet.jpeg'),
    description: 'An elegant flatweave carpet styled with minimal geometric borders and earthy sand pigments. Highly resilient yarn blend, certified AZO-free dyed.',
    material: '80% Recycled Cotton Yarn, 20% Organic Linen',
    dimensions: '160x230 cm, 200x300 cm, Custom',
    leadTime: '7-9 weeks',
    minOrderQuantity: '100 pcs'
  },
  {
    id: 'carpet-classic-runner',
    name: 'Classic Diamond Motif Runner Carpet',
    collection: 'home-decor',
    subcategory: 'Carpets',
    image: img('WhatsApp Image 2026-07-18 at 09.52.14.jpeg'),
    description: 'Intricately patterned runner carpet with a raised diamond motif border, hand-finished for a rich tactile texture. Suited for hallways and entryways.',
    material: '80% Recycled Cotton Yarn, 20% Organic Linen',
    dimensions: '70x150 cm, 90x180 cm, Custom',
    leadTime: '7-9 weeks',
    minOrderQuantity: '100 pcs'
  },
  // 3. Cushions
  {
    id: 'cushion-textured-fringe',
    name: 'Tactile Textured Cushion Covers',
    collection: 'home-decor',
    subcategory: 'Cushions',
    image: img('cushions.jpeg'),
    description: 'Beautifully slubbed hand-spun cotton cushion covers with matching fringe finishes. Heavy duty metal zippers and double-locked seams.',
    material: '100% Cotton Canvas & Slub Yarns',
    dimensions: '45x45 cm, 50x50 cm',
    leadTime: '4-5 weeks',
    minOrderQuantity: '250 pcs'
  },
  // 4. Throws
  {
    id: 'throw-waffle-luxury',
    name: 'Waffle Loom-Woven Throw',
    collection: 'home-decor',
    subcategory: 'Throws',
    image: img('WhatsApp Image 2026-07-17 at 15.35.38.jpeg'),
    description: 'Enormously soft waffle-structure throw blanket designed with breathable linen threads and heavily washed for a lived-in luxurious touch.',
    material: '60% Flax Linen, 40% Long-Staple Cotton',
    dimensions: '130x170 cm',
    leadTime: '5-6 weeks',
    minOrderQuantity: '200 pcs'
  },
  // 5. Baskets
  {
    id: 'basket-laundry-lid',
    name: 'Coiled Rope Laundry Basket with Lid',
    collection: 'home-decor',
    subcategory: 'Pet Baskets',
    image: img('basket_laundry_lid_1783701221640.jpg'),
    description: 'Premium dual-toned coiled rope storage basket complete with a matching lid and durable carry handles. Bottom section features a beautiful brown and dark zig-zag textured knit.',
    material: '100% Organic Braided Cotton & Coiled Hemp Core',
    dimensions: 'Dia 40cm x H 50cm, Dia 45cm x H 55cm',
    leadTime: '4-6 weeks',
    minOrderQuantity: '200 pcs'
  },
  {
    id: 'basket-rope-twotone',
    name: 'Dual-Toned Coiled Storage Basket',
    collection: 'home-decor',
    subcategory: 'Pet Baskets',
    image: img('basket_rope_twotone_1783702315626.jpg'),
    description: 'Heavyweight braided cotton storage basket split into cream white top and slate gray bottom sections. Flexible yet highly rigid structures with rope-loop handles.',
    material: '100% Braided Cotton Yarn',
    dimensions: 'Dia 35cm x H 40cm, Dia 40cm x H 45cm',
    leadTime: '4 weeks',
    minOrderQuantity: '300 pcs'
  },
  // 5b. Baskets (Basket category)
  {
    id: 'planter-macrame-pouch',
    name: 'Woven Plant Cover Sleeve',
    collection: 'home-decor',
    subcategory: 'Basket',
    image: img('WhatsApp Image 2026-07-17 at 17.33.07.jpeg'),
    description: 'Durable, coiled protective covers for plant pots. Adds natural texture to interior gardening setups.',
    material: 'Braided Organic Seagrass & Jute Cord',
    dimensions: 'Dia 15cm x H 15cm, Dia 25cm x H 25cm',
    leadTime: '4 weeks',
    minOrderQuantity: '500 pcs'
  },
  // 6. Planters
  {
    id: 'planter-coiled-rope',
    name: 'Two-Tone Coiled Rope Planter',
    collection: 'home-decor',
    subcategory: 'Planters',
    image: img('WhatsApp Image 2026-07-17 at 17.31.14.jpeg'),
    description: 'Sturdy hand-coiled rope planter cover with a two-tone braided finish, sized to dress up indoor pots for olive trees, ferns, and other statement greenery.',
    material: 'Braided Organic Seagrass & Jute Cord',
    dimensions: 'Dia 20cm x H 20cm, Dia 30cm x H 30cm, Custom sizes',
    leadTime: '4-6 weeks',
    minOrderQuantity: '300 pcs'
  },
  // 7. Bath Mats
  {
    id: 'bath-mat-embossed-bath',
    name: 'Embossed Lettering Bath Mat',
    collection: 'home-decor',
    subcategory: 'Bath Mats',
    image: img('WhatsApp Image 2026-07-17 at 17.33.51.jpeg'),
    description: 'Soft, heavyweight natural sand bath mat with elegant debossed "BATH" sculptural lettering. Framed by a beautiful coiled micro-floral accent border.',
    material: '100% High-Density Tufted Ring-Spun Cotton',
    dimensions: '50x80 cm, 60x90 cm',
    leadTime: '4-5 weeks',
    minOrderQuantity: '300 pcs'
  },
  // 8. Table Linen
  {
    id: 'table-cloth-blue',
    name: 'Fringed Blue Linen Tablecloth',
    collection: 'home-decor',
    subcategory: 'Table Linen',
    image: img('WhatsApp Image 2026-07-21 at 15.38.24.jpeg'),
    description: 'Elegant linen-cotton blend tablecloth block-dyed in soft unbleached powder blue. Complete with delicate off-white fringe edges that drape gracefully.',
    material: '55% Pure Flax Linen, 45% Cotton',
    dimensions: '140x240 cm, 160x320 cm',
    leadTime: '5-6 weeks',
    minOrderQuantity: '200 pcs'
  },
  {
    id: 'table-runner-floral',
    name: 'Blue Floral Fringed Table Runner',
    collection: 'home-decor',
    subcategory: 'Table Linen',
    image: img('WhatsApp Image 2026-07-21 at 15.38.26.jpeg'),
    description: 'Exquisite linen runner decorated with traditional floral woodblock patterns in indigo and cream, finished with thick off-white fringe borders.',
    material: '100% Linen-Cotton Core',
    dimensions: '40x180 cm, 40x220 cm',
    leadTime: '5 weeks',
    minOrderQuantity: '300 pcs'
  },
  {
    id: 'table-placemat-floral',
    name: 'Floral Indigo Fringed Placemat',
    collection: 'home-decor',
    subcategory: 'Table Linen',
    image: img('WhatsApp Image 2026-07-21 at 15.38.26 (1).jpeg'),
    description: 'Heavyweight organic canvas placemat printed with matching floral details and complete fringe frame. Heat-resistant and easy-wash.',
    material: '100% Heavy Canvas Cotton',
    dimensions: '35x50 cm',
    leadTime: '4-5 weeks',
    minOrderQuantity: '500 pcs'
  },
  {
    id: 'table-placemat-greek',
    name: 'Greek-Key Border Woven Placemat',
    collection: 'home-decor',
    subcategory: 'Table Linen',
    image: img('WhatsApp Image 2026-07-21 at 15.38.26 (2).jpeg'),
    description: 'Beige woven linen-blend placemat styled with a classic blue geometric Greek-key/border design. Elegant, clean-cut, and highly structured.',
    material: '70% Cotton, 30% Linen with stiff back-coat',
    dimensions: '35x50 cm',
    leadTime: '4 weeks',
    minOrderQuantity: '500 pcs'
  },
  
  // 9. Kitchen Linen
  {
    id: 'kitchen-towel-set-printed',
    name: 'Printed Kitchen Towel Gift Set',
    collection: 'home-decor',
    subcategory: 'Apron',
    image: img('WhatsApp Image 2026-07-17 at 17.34.06.jpeg'),
    description: 'Coordinated set of hand-block-printed kitchen towels in dot, stripe, trellis and check motifs, styled with a matching quilted apron and pot mitt for a complete counter display.',
    material: '100% Soft-Spun Cotton',
    dimensions: '45x70 cm (Towels), One Size (Apron)',
    leadTime: '4-5 weeks',
    minOrderQuantity: '500 sets'
  },
  // 10. Tote Bags
  {
    id: 'tote-dog-silhouette',
    name: 'Canvas Tote with Dog Silhouette',
    collection: 'home-decor',
    subcategory: 'Tote Bags',
    image: img('WhatsApp Image 2026-07-21 at 15.37.41.jpeg'),
    description: 'Classic heavy canvas shopping tote bag featuring thick black reinforced handles and an elegant printed silhouette of a sitting labrador dog.',
    material: '14 oz. Heavy Organic Cotton Canvas',
    dimensions: '38cm x 40cm x 10cm base',
    leadTime: '4 weeks',
    minOrderQuantity: '500 pcs'
  },
  {
    id: 'tote-cork-bottom',
    name: 'Private Label Cork-Bottom Tote',
    collection: 'home-decor',
    subcategory: 'Tote Bags',
    image: img('WhatsApp Image 2026-07-17 at 17.33.32.jpeg'),
    description: 'Two-material shopper bag featuring a premium natural beige cotton canvas upper and a textured golden-brown bottom band. Perfect for customized corporate designs.',
    material: 'Organic Canvas Upper, Eco-Friendly Cork/Jute Bottom',
    dimensions: '42cm x 45cm x 12cm',
    leadTime: '5 weeks',
    minOrderQuantity: '500 pcs'
  },
  // 11. Wall Décor
  {
    id: 'wall-decor-macrame',
    name: 'Hand-Knotted Fringed Macramé Wall Art',
    collection: 'home-decor',
    subcategory: 'Wall Décor',
    image: img('WhatsApp Image 2026-07-17 at 17.33.18.jpeg'),
    description: 'Breathtaking hand-knotted light blue-gray cotton wall hanging suspended from a natural polished branch rod. Features complex symmetrical braids and elegant flowing tassels.',
    material: 'Premium Long-Staple Cotton Cord, Natural Driftwood Bar',
    dimensions: '90cm width x 110cm drop length',
    leadTime: '6-8 weeks',
    minOrderQuantity: '150 pcs'
  },
  // 12. Seasonal Collections
  {
    id: 'seasonal-fabric-trees',
    name: 'Handmade Fabric Pine Trees',
    collection: 'home-decor',
    subcategory: 'Christmas Collection',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsPlfL1NGV_uz3NLYgrSniRCBhyLaEAY7g4m-VGltPLiYLjKD4zl2GRZIc2sxuxCymftPgZvuWJ9xtoeraur2NZKDV9RkI-1KPUclzGcnTMMpGr0pPNCigL5XthDY_5ETpUSgDVJSGpmtueqy3WyQzZgrn9BxgO5Jt0P99JjZYfR7KRQLGk2XHBsbLW-RvIChkFpJg4wBzE05SeI01PBxh4Ri-JVQPlgzf3yy6MxCdQra39Z2cZ9c3DGXdHFGQ0N8EGbLdWzrSKfs',
    description: 'Quaint Christmas decorations crafted from cotton cuttings and stuffed with organic fibers. An eco-friendly alternative to plastic holiday ornaments.',
    material: 'Linen-Cotton Waste Cuttings, Hypoallergenic stuffing',
    dimensions: 'H 15cm, H 25cm, H 35cm',
    leadTime: '6 weeks',
    minOrderQuantity: '300 sets'
  },

  // --- PET LIVING CATEGORIES ---
  // 1. Pet Beds
  {
    id: 'pet-bed-donut',
    name: 'Luxurious Hand-Woven Pet Bed',
    collection: 'pet-living',
    subcategory: 'Pet Beds',
    image: img('WhatsApp Image 2026-07-17 at 17.31.43.jpeg'),
    description: 'Our award-winning woven donut bed. Formed with a high-resilience memory-foam filling wrapped in heavily-tufted unbleached organic cotton yarn. Breathable, washable, and incredibly cosy.',
    material: 'Tufted Cotton Exterior, Orthopaedic Recycled Polyfill Interior',
    dimensions: 'Small (Dia 60cm), Medium (Dia 80cm), Large (Dia 100cm)',
    leadTime: '6-8 weeks',
    minOrderQuantity: '150 pcs'
  },
  // 2. Pee Mats (Using User image 2 or original)
  {
    id: 'pet-pee-mat',
    name: 'Multi-layered Reusable Pee Mat',
    collection: 'pet-living',
    subcategory: 'Carpet',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9_Hwu0Q5aQaVvv67OAayDwRimgYOvkihi_dTTTlg3OqD__K_4s2yWVDnkBHTlyM5PMSBtVLeORj1v-b0NQ73ijEQyc2dayWosLts9EAtqbKr8p2Tsassi1HUbAO4QcVrgLh0C9ZjR7CJVPfhX0WhnFPRZYjux054grNznE0O_SCLa7f6ZPP96S8yaoHM6IRq4MLogBud4FAVOgN4msxBmQYhhSED6pqg8rh4Pc3p_0FJe-6t2MopredZjqmL9MwUDGXYn97r2YNg',
    description: 'High-performance washable training mats featuring rapid absorption top layer, charcoal carbon odor-guards, and a completely leak-proof anti-skid base.',
    material: 'Organic Cotton Flannel Cover, TPU Waterproof Core, Microfiber Fill',
    dimensions: '60x60 cm, 70x90 cm',
    leadTime: '4-5 weeks',
    minOrderQuantity: '400 pcs'
  },
  // 3. Pet Toy Baskets
  {
    id: 'pet-toy-basket-rope',
    name: 'Braided Toy Basket',
    collection: 'pet-living',
    subcategory: 'Pet Toy Baskets',
    image: img('WhatsApp Image 2026-07-21 at 15.35.42.jpeg'),
    description: 'Thick-walled braided cotton rope basket for organizing pet toys. Designed to be completely claw-proof and safe for curious pets.',
    material: '100% Fine Braided Cotton Cord',
    dimensions: 'Dia 35cm x H 40cm',
    leadTime: '4 weeks',
    minOrderQuantity: '300 pcs'
  },
  {
    id: 'pet-toy-basket-paw-canvas',
    name: 'Paw Print Canvas Toy Bin',
    collection: 'pet-living',
    subcategory: 'Pet Toy Baskets',
    image: img('WhatsApp Image 2026-07-18 at 12.16.40.jpeg'),
    description: 'Sturdy grey canvas storage bin with a bold printed paw motif and durable rope side handles. Collapsible design for easy storage of pet toys and accessories.',
    material: 'Heavy Canvas Fabric with Reinforced Cotton Rope Handles',
    dimensions: '35cm x 35cm x 45cm',
    leadTime: '4 weeks',
    minOrderQuantity: '400 pcs'
  },
  // 4. Pet Accessories
  {
    id: 'pet-towel-coral',
    name: 'Embossed Rabbit Coral Pet Towel',
    collection: 'pet-living',
    subcategory: 'Pet Accessories',
    image: img('WhatsApp Image 2026-07-21 at 15.36.29.jpeg'),
    description: 'Incredibly plush and thick coral-pink dog/cat towel. Styled with an embossed cartoon rabbit face, paw print textures, and highly absorbent borders.',
    material: 'Premium Ultra-Soft Coral Microfiber (450 GSM)',
    dimensions: '60cm x 120cm',
    leadTime: '4 weeks',
    minOrderQuantity: '500 pcs'
  },
  {
    id: 'pet-accessories-tote-towel-set',
    name: 'Pet Silhouette Tote & Towel Set',
    collection: 'pet-living',
    subcategory: 'Pet Accessories',
    image: img('WhatsApp Image 2026-07-18 at 12.18.43.jpeg'),
    description: 'Coordinated gift set featuring two canvas totes with printed cat and dog silhouettes, paired with a rabbit-print and a paw-print plush pet towel.',
    material: '100% Cotton Canvas Totes, Ultra-Soft Microfiber Towels',
    dimensions: 'Totes: 35cm x 40cm, Towels: 50cm x 80cm',
    leadTime: '4-5 weeks',
    minOrderQuantity: '400 sets'
  },
  {
    id: 'pet-jute-mat-woof',
    name: 'WOOF! Braided Jute Pet Mat',
    collection: 'pet-living',
    subcategory: 'Pet Mat',
    image: img('petMate.jpeg'),
    description: 'Charming chat-bubble-shaped braided natural jute mat with black printed "WOOF!", paw graphics, and bone detailing. Ideal as a food bowl backdrop.',
    material: '100% Biodegradable Coarse Jute',
    dimensions: '45cm x 65cm',
    leadTime: '5-6 weeks',
    minOrderQuantity: '500 pcs'
  },
  {
    id: 'pet-jute-mat-bone',
    name: 'Braided Bone-Shaped Jute Pet Mat',
    collection: 'pet-living',
    subcategory: 'Pet Mat',
    image: img('WhatsApp Image 2026-07-17 at 17.32.05.jpeg'),
    description: 'Playful bone-shaped braided jute mat with a contrasting navy and natural tan border weave. Sturdy, non-slip base ideal for placing under food bowls or as an entryway accent.',
    material: '100% Biodegradable Coarse Jute',
    dimensions: '40cm x 65cm',
    leadTime: '5-6 weeks',
    minOrderQuantity: '500 pcs'
  },
  // --- SEASONAL COLLECTIONS ---
  // Christmas Collection
  {
    id: 'christmas-pine-cushion',
    name: 'Handloomed Golden Pine Cushion Cover',
    collection: 'seasonal',
    subcategory: 'Christmas Collection',
    image: img('christmas_collection_hero_1783703878387.jpg'),
    description: 'Deep forest-green hand-spun cotton cushion cover adorned with beautifully woven golden pine tree motifs. Elegant piping edge and heavy cotton canvas back with secure closure.',
    material: '100% Handspun Cotton with Organic Wool Motif Embroidery',
    dimensions: '45x45 cm',
    leadTime: '4-5 weeks',
    minOrderQuantity: '200 pcs'
  },
  {
    id: 'christmas-snowflake-cushion',
    name: 'Rustic Snowflake Embroidered Cushion',
    collection: 'seasonal',
    subcategory: 'Christmas Collection',
    image: img('christmas_collection_hero_1783703878387.jpg'),
    description: 'Rich burgundy-red hand-loomed slub cushion cover featuring intricate, raised snowflake embroidery in cream and gold yarns. Finished with rustic whipstitched borders.',
    material: 'Heavy-gauge Handloomed Cotton & Cotton Slub Yarns',
    dimensions: '50x50 cm',
    leadTime: '4-5 weeks',
    minOrderQuantity: '200 pcs'
  },
  {
    id: 'christmas-pine-tote',
    name: 'Festive Holiday Pine-Tree Tote',
    collection: 'seasonal',
    subcategory: 'Christmas Collection',
    image: img('christmas_collection_hero_1783703878387.jpg'),
    description: 'Sturdy organic pine-green canvas tote bag detailed with repeating hand-stenciled golden Christmas pine patterns and premium stitched handles.',
    material: '100% Recycled Cotton Canvas, Reinforcing Backing',
    dimensions: '40x42 cm',
    leadTime: '4 weeks',
    minOrderQuantity: '250 pcs'
  },
  // Fall Collection
  {
    id: 'fall-leaf-cushion',
    name: 'Terracotta Woven Leaf Cushion Cover',
    collection: 'seasonal',
    subcategory: 'Fall Collection',
    image: img('fall_collection_hero_1783703894398.jpg'),
    description: 'Cozy warm rust-toned hand-spun cotton cushion cover with repeating cream organic leaf vine jacquard structures. Ideal for luxury autumn displays.',
    material: '100% Pure Long-Staple Indian Cotton',
    dimensions: '45x45 cm',
    leadTime: '4 weeks',
    minOrderQuantity: '250 pcs'
  },
  {
    id: 'fall-striped-throw',
    name: 'Forest Sage & Cream Striped Throw',
    collection: 'seasonal',
    subcategory: 'Fall Collection',
    image: img('fall_collection_hero_1783703894398.jpg'),
    description: 'Incredibly thick and luxurious hand-loomed vertical striped throw blanket in deep sage, cream, and warm sandstone. Finished with twisted cream fringe tassels.',
    material: '80% Organic Linen, 20% Recycled Cotton',
    dimensions: '130x180 cm',
    leadTime: '5-6 weeks',
    minOrderQuantity: '150 pcs'
  },
  {
    id: 'fall-botanical-tote',
    name: 'Earthy Botanical Print Canvas Tote',
    collection: 'seasonal',
    subcategory: 'Fall Collection',
    image: img('fall_collection_hero_1783703894398.jpg'),
    description: 'Durable cream canvas tote bag adorned with elegant all-over fall foliage botanical print in terracotta, olive, and ochre hues.',
    material: '100% Organic Cotton Canvas with reinforced straps',
    dimensions: '38x42 cm',
    leadTime: '4 weeks',
    minOrderQuantity: '300 pcs'
  }
];

export const artisans: Artisan[] = [
  {
    id: 'artisan-sharmila',
    name: 'Master Sharmila Devi',
    role: 'Head Weaver & Dye Master',
    bio: 'Sharmila carries forward a 300-year family tradition of natural pigment dye formulation and intricate cotton loom setting. In her 22 years of work, she has trained more than 80 women weavers in Panipat, Haryana.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6wVhganGTvYKwSpPWDSyqDpk_mwOlvd9bCYZ6jKXXFekUHk20eKvc3j-PdD-GcXcc8yFtM_kVl3PguHFNI8bzOPRo79brX4PZfcMPGMdCvkpVKBk6AsZaHj6E5oIzaZ-Mq7NCYH-sZH41-snt48IrDHH0YZ2mlsa5oD6kepL2P5YCEzbyqUm7y7Lw8il8knzyMoAGJBvQy5V7vEa0z3UM39Q-7oH91JW8EgdwERZgN4LZOuAjyl0jfqfItOsNUmyotT8XVW4nbAo',
    quote: 'Each warp and weft is not just cotton; it is the pulse of our soil and history. When a global home welcomes our craft, they share our breath.'
  }
];

export const certifications: Certification[] = [
  {
    id: 'iso-9001',
    name: 'ISO 9001:2015',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2NFEoTwe51b59QCxCBIoGm42GYpnY6jjfa9Dvn4IegPNqQnT2gfr962nDVz5coKjMlL_IQPmzauvun_2tVDpxFpJLelGAYju9KCWz1ZVD0xZ38OjIY72CdN7X5mL_a33WnRxrXj3VSeeYDaa5js--MGrGNrFuV74_P2V_O_wRg5WBedgkpcgFcs08fLy30SluGQzkzF5APUh558DbfsxbjakTapIArD0fNByfvBqD8kPt0P2eeGCeHzcyUaGDSxlD1_qXZ_N6WWI',
    description: 'Certified Quality Management System proving rigorous, reliable, and consistent manufacturing standards.'
  },
  {
    id: 'iso-14001',
    name: 'ISO 14001:2015',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCB5QZHst0o924iEZNrhbVNiEyTZVyUTuk-6hrrfFt4e1eNbmP1U5vZeebjEy7ynVCSEMt8j7-ln9xB2i59yvFXxm6tDWWvDpW6LKVaFj3R5Vj8-VUYDNDYgSEs84r5hHkAPMuqbAq5STAAyfeITLb7KazlADtyJXFEvltgDxOSquhTQwHFz3q0ETxkOMAEIcQBjZo9tP0aIaufPHEVRA_WYIDoKOSSCu9FCeB8vaMi5ZSNRFDc3ppQjQ4vsZZjnCvIKgLMj83r5h0',
    description: 'Certified Environmental Management System ensuring conscious handling of waste, emissions, and natural resource usage.'
  },
  {
    id: 'sedex',
    name: 'Sedex Member',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD04Cfuj5-nYe9QmOWBod3fs6MI0caFXE2nR-eNn9qNBy394TZfJNHtUdUfEzScxriU19X64yUdg1egqFmPSUdkP-5EXiL_vZPsaQdt2heSKMwVDzi7OMS4muOrtk8vZoCfEEirAb73GO0Me60Dgm1GTpgfRktNq2hXcSUYKL3xkPrlZulOsXLLB7gYjh-omfZQcKHj3-WeD3tZ4gzO-JQ9c7B107hZV6DIfgkOFgpaxOs8nAFR1ujg7QBLSYQ5lY5aLBdrOk9epd8',
    description: 'Audited and verified transparent supply chains with strict compliance in fair labor conditions, health, safety, and business ethics.'
  },
  {
    id: 'grs',
    name: 'GRS Certified',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcJlFPs-Y_91ZuaXzg6dupB9aDFsu58Sq9swEGGEfZVAD0aUq4auCvlBrknU0sVzFCrp4xlZ3sF0iStC5mbWkU5SMiaU408MOVN1PzgDWKN_qngW--jronOm1BmwZc_-kIXiqUy-5VpWOzwRH7QP4W1uk7R7_Q_Ev_x_z5dZcKRxFEFoWO6dvXT9NOsm-3yw8AEuyBM7jPN0kM8cBt8oHsdZEd3_ePsd5ET7UI67DlxHLZ-2hu0W0Qq8mqVpi7ZJ0lXoRO03ERqcE',
    description: 'Global Recycled Standard verifies recycled content, chemical restrictions, and social compliance of recycled cotton and polyester yarns.'
  },
  {
    id: 'gmp',
    name: 'GMP Certified',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzm9Ywcp4zi1X_YlC7_9LQM2pyBPTa2AILUzpQUUiMNUiqqfRUdGjhvIumXsXmhomcpwr3ZLyasZEQ_iu4HInqZoA68jzgByfhLmu0SSHTdpaFJB8Z6Sy63MO19-H1YSknxzImQhWPHpJBYV75CNOFMcp93EudG4OhW9LAABxIxvj4RcPpC1AEtI5zuxfICKPLz37s8yJsrkmWXu7d3rJwSwrcCjQzfCP6HXfKi6jzVSUE2O5c1hr_3bFNXb2tn3OjNg84_KCgBiM',
    description: 'Good Manufacturing Practices audit certifying extreme hygiene, raw material vetting, and product safety protocols across pet-friendly textiles.'
  }
];

export const offices: Office[] = [
  {
    id: 'india-factory',
    name: 'Tanshu Vaidik Headquarters',
    country: 'India',
    coords: { top: '45%', left: '55%' },
    address: 'Village Kharak Ramji, Near Samalkha Road, Panipat - 132103, Haryana, India',
    email: 'factory@tanshuvaidik.com',
    phone: '+91 86072 36222',
    highlight: 'Core integrated weaving facility, loom floor, dye lab, and global export packaging.'
  },
  {
    id: 'australia-office',
    name: 'Tanshu Australia Regional Office',
    country: 'Australia',
    coords: { top: '78%', left: '84%' },
    address: 'Tanshu Australia Pty Ltd, Melbourne, Victoria, Australia',
    email: 'au@tanshuvaidik.com',
    phone: '+61 2 9999 9168', // Matches the footer in mockup exactly!
    highlight: 'Dedicated brand managers, ocean freight logistics coord, and southern hemisphere customer support.'
  },
  {
    id: 'usa-office',
    name: 'Tanshu North America Support',
    country: 'USA',
    coords: { top: '30%', left: '22%' },
    address: 'Suite 400, 250 Park Avenue, New York, NY 10177, United States',
    email: 'usa@tanshuvaidik.com',
    phone: '+1 212 550 9000',
    highlight: 'Key account advisory, private label solutions development, and local logistics partnerships.'
  },
  {
    id: 'europe-office',
    name: 'Tanshu European Logistics Hub',
    country: 'Europe',
    coords: { top: '25%', left: '46%' },
    address: 'Am Dornpark 12, 60439 Frankfurt am Main, Germany',
    email: 'eu@tanshuvaidik.com',
    phone: '+49 69 7430 8000',
    highlight: 'EU customs broker compliance assistance, quality control inspectors, and direct client liaison.'
  }
];
