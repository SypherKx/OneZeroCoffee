import heroCoffee from '@/assets/hero-coffee.jpg';
import espresso from '@/assets/espresso.jpg';
import cappuccino from '@/assets/cappuccino.jpg';
import icedCoffee from '@/assets/iced-coffee.jpg';
import croissant from '@/assets/croissant.jpg';
import { MenuItem } from './store';

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Classic Espresso',
    price: 149,
    category: 'coffee',
    image: espresso,
    description: 'Rich, bold single-origin espresso shot with golden crema',
    isAvailable: true,
  },
  {
    id: '2',
    name: 'Signature Latte',
    price: 249,
    category: 'coffee',
    image: heroCoffee,
    description: 'Silky steamed milk with our house espresso blend',
    isAvailable: true,
  },
  {
    id: '3',
    name: 'Cappuccino',
    price: 229,
    category: 'coffee',
    image: cappuccino,
    description: 'Perfect balance of espresso, steamed milk and velvety foam',
    isAvailable: true,
  },
  {
    id: '4',
    name: 'Iced Mocha',
    price: 279,
    category: 'cold-drinks',
    image: icedCoffee,
    description: 'Chilled espresso with chocolate and cold milk over ice',
    isAvailable: true,
  },
  {
    id: '5',
    name: 'Cold Brew',
    price: 259,
    category: 'cold-drinks',
    image: icedCoffee,
    description: '24-hour steeped cold brew, smooth and refreshing',
    isAvailable: true,
  },
  {
    id: '6',
    name: 'Iced Latte',
    price: 269,
    category: 'cold-drinks',
    image: icedCoffee,
    description: 'Espresso poured over cold milk and ice',
    isAvailable: true,
  },
  {
    id: '7',
    name: 'Chocolate Croissant',
    price: 179,
    category: 'snacks',
    image: croissant,
    description: 'Buttery, flaky croissant filled with rich dark chocolate',
    isAvailable: true,
  },
  {
    id: '8',
    name: 'Almond Croissant',
    price: 189,
    category: 'snacks',
    image: croissant,
    description: 'Classic croissant with almond cream and toasted almonds',
    isAvailable: true,
  },
];
