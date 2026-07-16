import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { menuItems } from '@/lib/menu-data';
import type { MenuItem } from '@/lib/store';

const categories = [
  { key: 'all', label: 'All' },
  { key: 'coffee', label: 'Coffee & Hot Chocolate' },
  { key: 'frappe', label: 'Frappé' },
  { key: 'iced-beverages', label: 'Iced Beverages' },
  { key: 'savoury-buds', label: 'Savoury Buds' },
  { key: 'dessert', label: 'Desserts' },
  { key: 'addons', label: 'Add-ons' },
] as const;

function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass rounded-2xl overflow-hidden hover-lift group"
    >
      <div className="aspect-square overflow-hidden relative">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          width={400}
          height={400}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
            <span className="text-sm font-medium text-muted-foreground">Sold Out</span>
          </div>
        )}
      </div>
      <div className="p-3 md:p-5">
        <h3 className="font-semibold text-foreground text-sm md:text-base mb-1 line-clamp-1">{item.name}</h3>
        <p className="text-[10px] md:text-xs text-muted-foreground mb-2 md:mb-3 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-accent font-bold text-sm md:text-lg">₹{item.price}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = menuItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const groupedItems = categories
    .filter((c) => c.key !== 'all')
    .map((cat) => ({
      ...cat,
      items: filtered.filter((item) => item.category === cat.key),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">Our Menu</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Choose Your Brew</h1>
        </motion.div>

        <div className="flex flex-col items-center gap-6 mb-16 w-full max-w-4xl mx-auto">
          <div className="relative w-full max-w-[400px] group">
            <input
              type="text"
              placeholder="Search dishes, coffee, frappé..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass-strong border border-white/10 rounded-full pl-7 pr-14 py-4 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all placeholder:text-muted-foreground/40 shadow-2xl"
            />
            <button 
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-[#D78B5D] to-[#A4532B] text-white flex items-center justify-center hover:shadow-[0_0_20px_rgba(212,107,37,0.5)] active:scale-90 transition-all duration-300"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
                  activeCategory === cat.key
                    ? 'bg-accent text-accent-foreground shadow-[0_0_20px_rgba(212,107,37,0.3)]'
                    : 'glass text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-16">
          {groupedItems.length > 0 ? (
            groupedItems.map((group) => (
              <div key={group.key} className="space-y-8">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold text-foreground whitespace-nowrap">{group.label}</h2>
                  <div className="h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent"></div>
                </div>
                <motion.div layout className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
                  <AnimatePresence mode="popLayout">
                    {group.items.map((item) => (
                      <MenuItemCard key={item.id} item={item} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center py-20 bg-white/5 rounded-3xl border border-white/5"
            >
              {searchQuery ? (
                <div className="space-y-3">
                  <p className="text-xl text-foreground font-medium">No results found</p>
                  <p className="text-muted-foreground">We couldn't find any matches for "<span className="text-accent">{searchQuery}</span>"</p>
                </div>
              ) : (
                <p className="text-muted-foreground italic">No items available in this category.</p>
              )}
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
