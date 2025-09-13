export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  location: string;
  description: string;
  color?: string;
  condition?: string;
  size?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { id: 'vehicles', name: 'Vehicles', icon: '🚗' },
  { id: 'property-rentals', name: 'Property Rentals', icon: '🏠' },
  { id: 'apparel', name: 'Apparel', icon: '👕' },
  { id: 'classifieds', name: 'Classifieds', icon: '📄' },
  { id: 'electronics', name: 'Electronics', icon: '💻' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎫' },
  { id: 'family', name: 'Family', icon: '👥' },
  { id: 'free-stuff', name: 'Free Stuff', icon: '🎁' },
  { id: 'garden-outdoor', name: 'Garden & Outdoor', icon: '🌱' },
  { id: 'hobbies', name: 'Hobbies', icon: '🎨' },
  { id: 'home-goods', name: 'Home Goods', icon: '🛋️' },
  { id: 'home-improvement', name: 'Home Improvement Supplies', icon: '🔨' },
  { id: 'home-sales', name: 'Home Sales', icon: '🏡' },
  { id: 'musical-instruments', name: 'Musical Instruments', icon: '🎵' },
  { id: 'office-supplies', name: 'Office Supplies', icon: '📋' },
  { id: 'pet-supplies', name: 'Pet Supplies', icon: '🐾' },
];

export const products: Product[] = [
  {
    id: '1',
    title: '[Broken Pedal] Used Bike, the Huffy Rock Creek Mountain Bike',
    price: 45,
    originalPrice: 60,
    image: 'https://picsum.photos/300/200?random=1',
    location: 'Menlo Park, CA',
    description: 'Purple mountain bike with broken pedal',
    condition: 'Used',
  },
  {
    id: '2',
    title: 'Bike 24inch',
    price: 99,
    image: 'https://picsum.photos/300/200?random=2',
    location: 'Palo Alto, CA',
    description: 'Teal mountain bike',
    condition: 'Good',
  },
  {
    id: '3',
    title: 'Kent terra 2.4 (24") mountain bike/bicycle',
    price: 125,
    image: 'https://picsum.photos/300/200?random=3',
    location: 'Palo Alto, CA',
    description: 'Purple Kent mountain bike',
    condition: 'Excellent',
  },
  {
    id: '4',
    title: 'Specialized Hot Rock 24" Bike for sale',
    price: 120,
    image: 'https://picsum.photos/300/200?random=4',
    location: 'Palo Alto, CA',
    description: 'Pink Specialized mountain bike',
    condition: 'Good',
  },
  {
    id: '5',
    title: 'Bikes for Sale',
    price: 50,
    image: 'https://picsum.photos/300/200?random=5',
    location: 'Palo Alto, CA',
    description: 'Multiple older bicycles',
    condition: 'Used',
  },
  {
    id: '6',
    title: 'Raleigh Superbe',
    price: 50,
    image: 'https://picsum.photos/300/200?random=6',
    location: 'Menlo Park, CA',
    description: 'Olive green vintage-style bicycle',
    condition: 'Vintage',
  },
  {
    id: '7',
    title: 'Hiland Vernier Road Bike',
    price: 180,
    originalPrice: 199,
    image: 'https://picsum.photos/300/200?random=7',
    location: 'Stanford, CA',
    description: 'Black road bike with rear rack',
    condition: 'Excellent',
  },
  {
    id: '8',
    title: '2021 Specialized Sirrus specialized sirrus',
    price: 250,
    image: 'https://picsum.photos/300/200?random=8',
    location: 'Stanford, CA',
    description: 'Dark green/teal road bike',
    condition: 'Like New',
  },
  {
    id: '9',
    title: 'Mountain bike',
    price: 100,
    image: 'https://picsum.photos/300/200?random=9',
    location: 'Palo Alto, CA',
    description: 'Blue and black mountain bike',
    condition: 'Good',
  },
  {
    id: '10',
    title: 'Public V1',
    price: 150,
    originalPrice: 300,
    image: 'https://picsum.photos/300/200?random=10',
    location: 'Palo Alto, CA',
    description: 'Black vintage-style bicycle',
    condition: 'Good',
  },
  {
    id: '11',
    title: 'Finiss road bicycle, no rear wheel',
    price: 170,
    image: 'https://picsum.photos/300/200?random=11',
    location: 'Palo Alto, CA',
    description: 'White and red road bicycle, missing rear wheel',
    condition: 'For Parts',
  },
  {
    id: '12',
    title: 'Retrospec Barron Comfort Hybrid Bike - 21 Speed (Needs Repairs)',
    price: 99,
    image: 'https://picsum.photos/300/200?random=12',
    location: 'Menlo Park, CA',
    description: 'Black comfort hybrid bike in garden setting',
    condition: 'Needs Repair',
  },
  {
    id: '13',
    title: 'Yellow Bike',
    price: 5,
    image: 'https://picsum.photos/300/200?random=13',
    location: 'Palo Alto, CA',
    description: 'Yellow bicycle with highlighter color',
    color: 'Highlighter',
    condition: 'Good',
  },
  {
    id: '14',
    title: 'Grey Mountain Bike',
    price: 120,
    image: 'https://picsum.photos/300/200?random=14',
    location: 'Palo Alto, CA',
    description: 'Grey and black mountain bike',
    condition: 'Good',
  },
  {
    id: '15',
    title: 'Pink Mountain Bike',
    price: 95,
    image: 'https://picsum.photos/300/200?random=15',
    location: 'Palo Alto, CA',
    description: 'Pink and white mountain bike',
    condition: 'Good',
  },
  {
    id: '16',
    title: 'Black Bike Frame',
    price: 75,
    image: 'https://picsum.photos/300/200?random=16',
    location: 'Palo Alto, CA',
    description: 'Black bicycle frame with white bucket',
    condition: 'For Parts',
  },
];

