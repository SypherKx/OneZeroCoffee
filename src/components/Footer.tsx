import { MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="One Zero, Coffee Logo" className="w-8 h-8 rounded-full" />
              <span className="text-lg font-bold text-foreground mt-1">
                One Zero, <span className="text-accent">Coffee</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Crafting exceptional coffee experiences since 2020. Every cup tells a story.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Visit Us</h3>
            <div className="flex items-start gap-2 text-sm text-muted-foreground mb-2">
              <MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" />
              <span>3/12, Patrakar Puram, Vinay Khand 3, Gomti Nagar, Lucknow, Uttar Pradesh 226010</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Hours</h3>
            <div className="flex items-start gap-2 text-sm text-muted-foreground mb-2">
              <Clock className="w-4 h-4 mt-0.5 text-accent shrink-0" />
              <div>
                <p>Mon – Fri: 7:00 AM – 9:00 PM</p>
                <p>Sat – Sun: 8:00 AM – 10:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} One Zero, Coffee. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
