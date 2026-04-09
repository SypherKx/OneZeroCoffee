import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ShoppingCart, X, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCartStore } from '@/lib/store';
import { menuItems } from '@/lib/menu-data';
import type { MenuItem } from '@/lib/store';

const categories = [
  { key: 'all', label: 'All' },
  { key: 'coffee', label: 'Coffee' },
  { key: 'cold-drinks', label: 'Cold Drinks' },
  { key: 'snacks', label: 'Snacks' },
] as const;

function MenuItemCard({ item }: { item: MenuItem }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 600);
  };

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
          <Button
            variant="hero"
            size="sm"
            onClick={handleAdd}
            disabled={!item.isAvailable}
            className="min-w-[80px]"
          >
            {added ? '✓ Added' : 'Add'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function CartPanel() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCartStore();
  const [showCheckout, setShowCheckout] = useState(false);

  if (items.length === 0) {
    return (
      <div className="glass rounded-2xl p-6 text-center">
        <ShoppingCart className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground text-sm">Your cart is empty</p>
        <p className="text-xs text-muted-foreground mt-1">Add items from the menu to get started</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Your Cart</h3>
        <button onClick={clearCart} className="text-xs text-muted-foreground hover:text-destructive transition-colors">
          Clear all
        </button>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
        <AnimatePresence>
          {items.map((cartItem) => (
            <motion.div
              key={cartItem.item.id}
              layout
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center gap-3 bg-muted/30 rounded-xl p-3"
            >
              <img
                src={cartItem.item.image}
                alt={cartItem.item.name}
                className="w-12 h-12 rounded-lg object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{cartItem.item.name}</p>
                <p className="text-xs text-accent">₹{cartItem.item.price}</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                  className="w-6 h-6 rounded-md bg-muted flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-sm font-medium w-6 text-center text-foreground">{cartItem.quantity}</span>
                <button
                  onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                  className="w-6 h-6 rounded-md bg-muted flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <button
                onClick={() => removeItem(cartItem.item.id)}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="border-t border-border mt-4 pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-muted-foreground">Total</span>
          <span className="text-xl font-bold text-accent">₹{total()}</span>
        </div>
        <Button variant="hero" className="w-full" size="lg" onClick={() => setShowCheckout(true)}>
          Proceed to Checkout
        </Button>
      </div>

      <AnimatePresence>
        {showCheckout && (
          <CheckoutModal onClose={() => setShowCheckout(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function CheckoutModal({ onClose }: { onClose: () => void }) {
  const { items, total, clearCart } = useCartStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      clearCart();
      onClose();
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-strong rounded-2xl p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {submitted ? (
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="text-5xl mb-4"
            >
              ☕
            </motion.div>
            <h3 className="text-xl font-bold text-foreground mb-2">Order Confirmed!</h3>
            <p className="text-muted-foreground text-sm">Thank you, {name}! Your order is being prepared.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-foreground">Checkout</h3>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4 p-3 rounded-xl bg-muted/30 text-sm">
              <p className="text-muted-foreground mb-1">{items.length} item(s)</p>
              <p className="text-lg font-bold text-accent">₹{total()}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-muted/30 border border-border rounded-xl px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Phone</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-muted/30 border border-border rounded-xl px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="+91 98765 43210"
                />
              </div>
              <Button variant="hero" className="w-full" size="lg" type="submit">
                Place Order – ₹{total()}
              </Button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

function MobileCart() {
  const [open, setOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  if (cartCount === 0) return null;

  return (
    <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
      <button
        onClick={() => setOpen(!open)}
        className="w-full glass-strong rounded-2xl p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-accent" />
          <span className="font-medium text-foreground">{cartCount} item(s)</span>
        </div>
        <span className="text-accent font-bold">View Cart</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-2"
          >
            <CartPanel />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = activeCategory === 'all'
    ? menuItems
    : menuItems.filter((item) => item.category === activeCategory);

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

        <div className="flex justify-center gap-2 mb-10 flex-wrap">
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

        <div className="flex gap-8">
          <div className="flex-1">
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          <div className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-24">
              <CartPanel />
            </div>
          </div>
        </div>
      </div>

      <MobileCart />
      <Footer />
    </div>
  );
}
