import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { menuItems } from '@/lib/menu-data';
import type { MenuItem } from '@/lib/store';

const categories = [
  { key: 'all', label: 'All' },
  { key: 'coffee', label: 'Coffee' },
  { key: 'cold-drinks', label: 'Cold Drinks' },
  { key: 'snacks', label: 'Snacks' },
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
      <div className="p-5">
        <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-accent font-bold text-lg">₹{item.price}</span>
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

        <div className="flex flex-col items-center gap-6 mb-10 w-full max-w-4xl mx-auto">
          <div className="relative w-full max-w-[340px] group">
            <input
              type="text"
              placeholder="Search dishes, coffee..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass-strong border border-white/10 rounded-full pl-7 pr-14 py-3.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all placeholder:text-muted-foreground/40 shadow-xl"
            />
            <button 
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-gradient-to-br from-[#D78B5D] to-[#A4532B] text-white flex items-center justify-center hover:shadow-[0_0_15px_rgba(212,107,37,0.4)] active:scale-90 transition-all duration-300"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          <div className="flex justify-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.key
                    ? 'bg-accent text-accent-foreground'
                    : 'glass text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-8">
          <div className="flex-1">
            {filtered.length > 0 ? (
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                  {filtered.map((item) => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-center py-20 text-muted-foreground"
              >
                {searchQuery ? (
                  <p>No results found for "<span className="text-foreground">{searchQuery}</span>"</p>
                ) : (
                  <p>No items in this category.</p>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
