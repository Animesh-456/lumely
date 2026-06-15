export interface Product {
  id: string
  sku: string
  name: string
  description: string
  longDescription: string
  price: number
  category: string
  collection: string
  metal: string
  stoneType: string
  weight: string
  dimensions: string
  images: string[]
  isNew: boolean
  isFeatured: boolean
  inStock: boolean
  minOrder: number
}

export const categories = [
  { id: 'rings', name: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop' },
  { id: 'necklaces', name: 'Necklaces', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop' },
  { id: 'earrings', name: 'Earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop' },
  { id: 'pendants', name: 'Pendants', image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&h=600&fit=crop' },
]

export const collections = [
  { id: 'modern-elegance', name: 'Modern Elegance', description: 'Contemporary pieces for the modern retailer', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=500&fit=crop' },
  { id: 'heritage', name: 'Heritage Collection', description: 'Inspired by traditional British craftsmanship', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=500&fit=crop' },
  { id: 'bridal', name: 'Bridal Collection', description: 'Exquisite pieces for the most special day', image: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&h=500&fit=crop' },
]

export const metalTypes = ['9ct Yellow Gold', '9ct White Gold', '9ct Rose Gold', '18ct Yellow Gold', '18ct White Gold', 'Platinum', 'Sterling Silver']
export const stoneTypes = ['Diamond', 'Sapphire', 'Ruby', 'Emerald', 'Amethyst', 'Pearl', 'Cubic Zirconia', 'None']

const placeholderImages = {
  rings: [
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&h=800&fit=crop',
  ],
  necklaces: [
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1515562141589-67f0d27a20db?w=800&h=800&fit=crop',
  ],
  earrings: [
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=800&h=800&fit=crop',
  ],
  bracelets: [
    'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1602752250015-52934bc45613?w=800&h=800&fit=crop',
  ],
  pendants: [
    'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&h=800&fit=crop',
  ],
  wedding: [
    'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop',
  ],
}

function getImages(category: string): string[] {
  return placeholderImages[category as keyof typeof placeholderImages] || placeholderImages.rings
}

export const products: Product[] = [
  // Rings
  { id: 'prod-001', sku: 'LUM-P004', name: '\'Heavyweight\' Custom Initial H Pendant', description: 'A custom 18ct yellow gold initial \'H\' pendant set with brilliant-cut diamonds.', longDescription: 'Make a bold statement with this custom \'Heavyweight\' initial \'H\' pendant. Intricately crafted in 18ct yellow gold, it features a pavé-set diamond letter \'H\' surrounded by a diamond-accented laurel wreath and a banner inscribed with \'HEAVYWEIGHT\'. Perfect for clients seeking high-impact custom jewellery.', price: 850.00, category: 'pendants', collection: 'eternal-classics', metal: '18ct Yellow Gold', stoneType: 'Diamond', weight: '14.5g', dimensions: '45mm height', images: ['/featured1.jpg'], isNew: false, isFeatured: true, inStock: true, minOrder: 3 },
  { id: 'prod-002', sku: 'LUM-R002', name: 'Diamond Geometric Link Band', description: 'A contemporary geometric link band in 18ct white gold with pavé diamonds.', longDescription: 'This modern geometric link ring features alternating rectangular bars, with select links adorned with delicate pavé-set diamonds. Crafted in high-polish 18ct white gold, its architectural style makes it a standout choice for contemporary bridal sets or statement fashion wear.', price: 295.00, category: 'rings', collection: 'heritage', metal: '18ct White Gold', stoneType: 'Diamond', weight: '4.2g', dimensions: '6mm band width', images: ['/featured2.png'], isNew: false, isFeatured: true, inStock: true, minOrder: 3 },
  { id: 'prod-003', sku: 'LUM-R003', name: 'Rose Gold Twist Band', description: 'Delicate twisted band in 9ct rose gold with diamond accents.', longDescription: 'A beautifully crafted twisted band in 9ct rose gold, featuring subtle diamond accents along the twist. This modern design is perfect for stacking or wearing alone, making it a versatile addition to any retailer\'s display.', price: 95.00, category: 'rings', collection: 'modern-elegance', metal: '9ct Rose Gold', stoneType: 'Diamond', weight: '1.9g', dimensions: '2.5mm band width', images: getImages('rings'), isNew: true, isFeatured: false, inStock: true, minOrder: 5 },
  { id: 'prod-004', sku: 'LUM-P005', name: 'Rose Gold Rearing Horse Pendant', description: 'A detailed rearing horse pendant in 18ct rose gold with a pavé diamond saddle.', longDescription: 'Celebrate strength and freedom with this stunning rearing horse pendant. Cast in warm 18ct rose gold, the intricately detailed horse features a saddle band pavé-set with brilliant diamonds. Suspended from an elegant bail, it\'s a unique statement piece.', price: 480.00, category: 'pendants', collection: 'heritage', metal: '18ct Rose Gold', stoneType: 'Diamond', weight: '6.8g', dimensions: '30mm height', images: ['/featured3.jpg'], isNew: false, isFeatured: true, inStock: true, minOrder: 2 },
  { id: 'prod-005', sku: 'LUM-R005', name: 'Sterling Silver Amethyst Ring', description: 'Cushion-cut amethyst set in sterling silver with filigree detail.', longDescription: 'A gorgeously crafted sterling silver ring featuring a cushion-cut amethyst as the centre stone. The intricate filigree detailing on the band adds vintage charm, while the affordable price point makes it an excellent option for retailers seeking volume sales.', price: 42.00, category: 'rings', collection: 'eternal-classics', metal: 'Sterling Silver', stoneType: 'Amethyst', weight: '3.0g', dimensions: '8mm head width', images: getImages('rings'), isNew: true, isFeatured: false, inStock: true, minOrder: 10 },

  // Necklaces
  { id: 'prod-006', sku: 'LUM-P006', name: 'Custom Shield & Crown Crest Pendant', description: 'A custom heraldic shield pendant in sterling silver with diamonds.', longDescription: 'This bespoke heraldic crest pendant is crafted in high-quality sterling silver and lined with diamonds. The coat of arms features a crown-topped shield divided into four custom quadrants displaying a cheetah, the number \'258\', a map of Africa, and the letters \'DO\'. A truly unique signature piece.', price: 195.00, category: 'pendants', collection: 'eternal-classics', metal: 'Sterling Silver', stoneType: 'Diamond', weight: '9.5g', dimensions: '35mm height', images: ['/featured4.jpg'], isNew: false, isFeatured: true, inStock: true, minOrder: 3 },
  { id: 'prod-007', sku: 'LUM-N002', name: 'Pearl Drop Necklace', description: 'Freshwater pearl drop on 9ct yellow gold chain.', longDescription: 'An elegantly simple freshwater pearl drop pendant on a 9ct yellow gold chain. The lustrous pearl is mounted in a delicate gold cap, creating a clean, sophisticated look that pairs beautifully with both formal and everyday wear.', price: 78.00, category: 'necklaces', collection: 'modern-elegance', metal: '9ct Yellow Gold', stoneType: 'Pearl', weight: '2.5g', dimensions: '16 inch chain', images: getImages('necklaces'), isNew: false, isFeatured: false, inStock: true, minOrder: 5 },
  { id: 'prod-008', sku: 'LUM-R006', name: 'Oval Diamond Twisted Halo Ring', description: 'An oval diamond solitaire ring with a diamond halo and twisted band.', longDescription: 'This breathtaking engagement ring showcases a brilliant oval-cut diamond center stone in a classic halo of smaller diamonds. Set in 18ct yellow gold, the design is completed by an elegant, split-shank twisted band pavé-set with shimmering diamond accents.', price: 1250.00, category: 'rings', collection: 'heritage', metal: '18ct Yellow Gold', stoneType: 'Diamond', weight: '3.8g', dimensions: '7mm halo width', images: ['/featured5.jpg'], isNew: true, isFeatured: true, inStock: true, minOrder: 1 },
  { id: 'prod-009', sku: 'LUM-N004', name: 'Silver Layering Chain Set', description: 'Set of three sterling silver chains in varying lengths.', longDescription: 'A versatile set of three sterling silver chains designed for layering. Includes 16-inch, 18-inch, and 20-inch lengths with different chain styles — trace, curb, and belcher. Sold as a set for maximum retail appeal.', price: 35.00, category: 'necklaces', collection: 'modern-elegance', metal: 'Sterling Silver', stoneType: 'None', weight: '5.2g', dimensions: '16/18/20 inch set', images: getImages('necklaces'), isNew: true, isFeatured: false, inStock: true, minOrder: 10 },

  // Earrings
  { id: 'prod-010', sku: 'LUM-E001', name: 'Diamond Stud Earrings', description: 'Classic brilliant-cut diamond studs in 18ct white gold.', longDescription: 'Timeless brilliant-cut diamond stud earrings set in 18ct white gold with secure butterfly backs. These versatile earrings are a staple for any jewellery retailer, offering enduring style and exceptional quality that customers trust.', price: 220.00, category: 'earrings', collection: 'eternal-classics', metal: '18ct White Gold', stoneType: 'Diamond', weight: '1.8g pair', dimensions: '4mm diameter', images: getImages('earrings'), isNew: false, isFeatured: true, inStock: true, minOrder: 5 },
  { id: 'prod-011', sku: 'LUM-E002', name: 'Gold Hoop Earrings', description: 'Polished 9ct yellow gold hoop earrings with hinged clasp.', longDescription: 'Beautifully polished 9ct yellow gold hoop earrings with a secure hinged clasp closure. The classic 25mm diameter makes them ideal for everyday wear. A retail essential with broad customer appeal.', price: 65.00, category: 'earrings', collection: 'eternal-classics', metal: '9ct Yellow Gold', stoneType: 'None', weight: '2.2g pair', dimensions: '25mm diameter', images: getImages('earrings'), isNew: false, isFeatured: false, inStock: true, minOrder: 10 },
  { id: 'prod-012', sku: 'LUM-E003', name: 'Sapphire Drop Earrings', description: 'Pear-shaped sapphire drops in 9ct white gold.', longDescription: 'Elegant pear-shaped sapphire drop earrings set in 9ct white gold. Each earring features a single deep-blue sapphire suspended from a diamond-set bail, creating a refined look suitable for both evening wear and special occasions.', price: 155.00, category: 'earrings', collection: 'heritage', metal: '9ct White Gold', stoneType: 'Sapphire', weight: '2.6g pair', dimensions: '22mm drop', images: getImages('earrings'), isNew: true, isFeatured: true, inStock: true, minOrder: 3 },
  { id: 'prod-013', sku: 'LUM-E004', name: 'Rose Gold Climber Earrings', description: 'Modern ear climber design in 9ct rose gold with CZ accents.', longDescription: 'Contemporary ear climber earrings in 9ct rose gold, featuring a graduating line of cubic zirconia stones. These on-trend earrings follow the curve of the ear for a modern, eye-catching look that appeals to fashion-forward customers.', price: 72.00, category: 'earrings', collection: 'modern-elegance', metal: '9ct Rose Gold', stoneType: 'Cubic Zirconia', weight: '1.4g pair', dimensions: '18mm length', images: getImages('earrings'), isNew: true, isFeatured: false, inStock: true, minOrder: 5 },

  // Bracelets
  { id: 'prod-014', sku: 'LUM-B001', name: 'Diamond Tennis Bracelet', description: 'Brilliant-cut diamond tennis bracelet in 18ct white gold.', longDescription: 'A classic diamond tennis bracelet featuring a continuous line of brilliant-cut diamonds set in 18ct white gold. The secure box clasp with safety catch ensures peace of mind, while the timeless design guarantees lasting appeal.', price: 680.00, category: 'bracelets', collection: 'eternal-classics', metal: '18ct White Gold', stoneType: 'Diamond', weight: '8.5g', dimensions: '7.5 inch length', images: getImages('bracelets'), isNew: false, isFeatured: true, inStock: true, minOrder: 1 },
  { id: 'prod-015', sku: 'LUM-B002', name: 'Gold Charm Bracelet', description: 'Traditional charm bracelet in 9ct yellow gold with heart padlock.', longDescription: 'A traditional 9ct yellow gold charm bracelet with a heart-shaped padlock clasp. The substantial curb chain provides a perfect base for adding charms, making it a gift-giving favourite. Sold without charms to allow personalisation.', price: 125.00, category: 'bracelets', collection: 'heritage', metal: '9ct Yellow Gold', stoneType: 'None', weight: '6.2g', dimensions: '7 inch length', images: getImages('bracelets'), isNew: false, isFeatured: false, inStock: true, minOrder: 5 },
  { id: 'prod-016', sku: 'LUM-B003', name: 'Silver Bangle with CZ', description: 'Sterling silver bangle with cubic zirconia accent stones.', longDescription: 'A sleek sterling silver bangle accented with a row of sparkling cubic zirconia stones. The hinged design allows for easy wearing, while the affordable price point makes it an attractive option for retailers seeking accessible luxury pieces.', price: 38.00, category: 'bracelets', collection: 'modern-elegance', metal: 'Sterling Silver', stoneType: 'Cubic Zirconia', weight: '12g', dimensions: '65mm internal diameter', images: getImages('bracelets'), isNew: true, isFeatured: false, inStock: true, minOrder: 10 },

  // Pendants
  { id: 'prod-017', sku: 'LUM-P001', name: 'Heart-Shaped Ruby Pendant', description: 'Heart-cut ruby pendant in 9ct rose gold.', longDescription: 'A romantic heart-shaped natural ruby pendant set in warm 9ct rose gold. The rich red of the ruby against the pink gold creates a beautiful colour combination. Supplied on a matching 18-inch rose gold chain.', price: 135.00, category: 'pendants', collection: 'heritage', metal: '9ct Rose Gold', stoneType: 'Ruby', weight: '1.8g', dimensions: '10mm heart', images: getImages('pendants'), isNew: false, isFeatured: true, inStock: true, minOrder: 3 },
  { id: 'prod-018', sku: 'LUM-P002', name: 'Diamond Cross Pendant', description: 'Diamond-set cross pendant in 9ct white gold.', longDescription: 'A delicately crafted cross pendant set with brilliant-cut diamonds in 9ct white gold. This meaningful piece combines spiritual symbolism with fine craftsmanship, making it a popular choice for gifts and special occasions.', price: 165.00, category: 'pendants', collection: 'eternal-classics', metal: '9ct White Gold', stoneType: 'Diamond', weight: '2.0g', dimensions: '18mm x 12mm', images: getImages('pendants'), isNew: false, isFeatured: false, inStock: true, minOrder: 5 },
  { id: 'prod-019', sku: 'LUM-P003', name: 'Emerald Teardrop Pendant', description: 'Pear-shaped emerald pendant with diamond surround in 18ct gold.', longDescription: 'A striking pear-shaped emerald pendant surrounded by a halo of brilliant-cut diamonds, set in 18ct yellow gold. The vibrant green of the emerald makes this piece a true showstopper that will draw customers to your display.', price: 345.00, category: 'pendants', collection: 'modern-elegance', metal: '18ct Yellow Gold', stoneType: 'Emerald', weight: '2.8g', dimensions: '15mm drop', images: getImages('pendants'), isNew: true, isFeatured: true, inStock: true, minOrder: 2 },

  // Wedding Bands
  { id: 'prod-020', sku: 'LUM-W001', name: 'Classic Court Wedding Band', description: 'Traditional court-profile wedding band in 9ct yellow gold.', longDescription: 'A classic court-profile wedding band in 9ct yellow gold, offering a comfortable rounded interior and a smooth polished finish. Available in a full range of sizes, this timeless band is a wedding-season essential for every retailer.', price: 85.00, category: 'wedding', collection: 'bridal', metal: '9ct Yellow Gold', stoneType: 'None', weight: '3.5g', dimensions: '4mm width', images: getImages('wedding'), isNew: false, isFeatured: false, inStock: true, minOrder: 10 },
  { id: 'prod-021', sku: 'LUM-W002', name: 'Platinum Diamond Wedding Ring', description: 'Channel-set diamond wedding ring in platinum.', longDescription: 'A sophisticated platinum wedding ring featuring channel-set brilliant-cut diamonds along the top half of the band. The secure channel setting protects the stones while allowing maximum light entry for exceptional sparkle.', price: 395.00, category: 'wedding', collection: 'bridal', metal: 'Platinum', stoneType: 'Diamond', weight: '5.2g', dimensions: '3.5mm width', images: getImages('wedding'), isNew: false, isFeatured: true, inStock: true, minOrder: 3 },
  { id: 'prod-022', sku: 'LUM-W003', name: 'Rose Gold Milgrain Band', description: 'Vintage-inspired milgrain edge wedding band in 9ct rose gold.', longDescription: 'A vintage-inspired wedding band in 9ct rose gold featuring delicate milgrain edging. The textured border adds character and warmth to this romantic design, perfect for brides seeking something with a heritage feel.', price: 110.00, category: 'wedding', collection: 'bridal', metal: '9ct Rose Gold', stoneType: 'None', weight: '3.0g', dimensions: '3mm width', images: getImages('wedding'), isNew: true, isFeatured: false, inStock: true, minOrder: 5 },
  { id: 'prod-023', sku: 'LUM-W004', name: 'White Gold Eternity Ring', description: 'Full eternity ring with round diamonds in 18ct white gold.', longDescription: 'A stunning full eternity ring featuring a continuous line of round brilliant-cut diamonds set in 18ct white gold. Each diamond is carefully matched for colour and clarity, creating an unbroken circle of light.', price: 520.00, category: 'wedding', collection: 'bridal', metal: '18ct White Gold', stoneType: 'Diamond', weight: '3.8g', dimensions: '2.5mm width', images: getImages('wedding'), isNew: false, isFeatured: true, inStock: true, minOrder: 2 },
  { id: 'prod-024', sku: 'LUM-W005', name: 'Silver CZ Solitaire Ring', description: 'Affordable solitaire engagement-style ring in sterling silver.', longDescription: 'A beautifully crafted solitaire ring in sterling silver featuring a single round cubic zirconia. This affordable alternative to diamond offers the same stunning look at a fraction of the price, ideal for budget-conscious customers.', price: 28.00, category: 'wedding', collection: 'bridal', metal: 'Sterling Silver', stoneType: 'Cubic Zirconia', weight: '2.5g', dimensions: '6mm head width', images: getImages('wedding'), isNew: true, isFeatured: false, inStock: true, minOrder: 20 },
]
