# ☕ One Zero, Coffee — Frontend Application

An ultra-premium, interactive single-origin artisan coffee shop experience built with modern frontend technologies. From buttery-smooth 3D scroll-driven animations to elegant glassmorphism aesthetics, this interface is designed to captivate coffee enthusiasts.

---

## 🛠️ Tech Stack & Badges

To deliver a cutting-edge visual and performance experience, the following frontend technologies and libraries are leveraged:

| Tool / Library | Badges |
| :--- | :--- |
| **Core Framework** | ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62B) |
| **Styling & UI** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-2B2D42?style=for-the-badge&logo=lucide&logoColor=white) ![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radix-ui&logoColor=white) |
| **Animations** | ![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white) |
| **State & Routing** | ![Zustand](https://img.shields.io/badge/Zustand-443322?style=for-the-badge&logo=react&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) |
| **Infrastructure** | ![Vercel Analytics](https://img.shields.io/badge/Vercel_Analytics-000000?style=for-the-badge&logo=vercel&logoColor=white) |

---

## ✨ Key Frontend Features

### 1. 🎞️ Interactive 3D Scroll Canvas
Powered by **GSAP (GreenSock) ScrollTrigger** and **HTML5 Canvas**, this feature renders an adaptive, high-performance, frame-by-frame 3D sequence (192 WebP frames) matching the user's scroll depth.
* **Smart Preloading:** Preloads critical starting frames first to guarantee instantaneous playback once the page is interactive.
* **Responsive Canvas Optimization:** Measures device pixel ratio (`devicePixelRatio`) dynamically to scale resolution, avoiding memory bottlenecks on mobile screens.

### 2. 🎨 Premium Coffee House Aesthetics
The layout follows a curated warm dark-mode palette (`#1b1b1b` base with rich latte, mocha, and cream accents) and features:
* **Glassmorphism Design:** Sophisticated cards using `backdrop-filter: blur(16px)` and translucent borders.
* **Atmospheric Elements:** Floating dust particles, glowing ambient backdrops, and rising CSS steam animations.
* **Typography Hierarchy:** Uses *Playfair Display* for classic editorial headings and *Poppins* for geometric, readable body copy.

### 3. 🍿 Fluid Transitions & Micro-Interactions
* **Framer Motion Integration:** Implements intersection observers to fade, slide, and scale UI elements gracefully as they enter the viewport.
* **Preloader Screen:** An elegant initial entrance screen that plays a smooth logo-loading sequence and yields to the landing layout once the canvas resources are decoded.

### 4. 🏷️ Dynamic Menu & Order Flow
* **Interactive Filtering:** Categorized browsing tabs (Coffee, Frappés, Iced Drinks, Savouries, Desserts, Add-ons) with animated layout transitions.
* **Search Utility:** Fast, client-side, character-matching search filter.
* **Lightweight Shopping Cart State:** Driven by **Zustand**, managing addition, removal, quantity adjustments, and total price calculation seamlessly.

### 5. 🛡️ Client-Side Admin Dashboard
A private administration view `/admin` protected by simple credentials to manage order queues and toggle menu item availability in real-time.

---

## 📂 Project Architecture

```
OneZeroCoffee/
├── public/                 # Static assets, including frame sequences for Canvas
│   ├── frames_webp/        # 192 frames for scroll animation
│   └── logo.png
├── src/
│   ├── assets/             # Images, backgrounds, and hero visuals
│   ├── components/         # Reusable presentation parts
│   │   ├── ui/             # Shadcn-inspired Radix components (Button, Sonner, Toast, Tooltip)
│   │   ├── Navbar.tsx      # Main sticky header
│   │   ├── Footer.tsx      # Multi-column footer
│   │   ├── Preloader.tsx   # Initial loader
│   │   └── ScrollCanvas.tsx # Canvas controller using GSAP
│   ├── hooks/              # Custom hooks (e.g. use-toast)
│   ├── lib/
│   │   ├── menu-data.ts    # Initial mock menu item catalog
│   │   ├── store.ts        # Zustand cart and catalog state store
│   │   └── utils.ts        # CN style class merger helper
│   ├── pages/              # Routing pages
│   │   ├── AboutPage.tsx   # Team, philosophy, and history
│   │   ├── AdminPage.tsx   # Mock dashboard to view orders & update availability
│   │   ├── Index.tsx       # Entry point routing to LandingPage
│   │   ├── LandingPage.tsx # Master home screen with all visual blocks
│   │   └── MenuPage.tsx    # Filterable product catalog
│   ├── App.tsx             # Main routing shell & Providers setup
│   ├── index.css           # Tailwind custom rules, glass utilities & animations
│   └── main.tsx            # React application mount script
├── tailwind.config.ts      # Tailwind layout & custom variables
├── vite.config.ts          # Vite build and resolution configuration
└── tsconfig.json           # TypeScript configuration
```

---

## 🚀 Setup & Execution

Follow these steps to run the project locally.

### Prerequisites
* [Node.js](https://nodejs.org/) (v18.x or higher recommended)
* npm (comes bundled with Node)

### Installation
1. Clone the repository and navigate to the project directory:
   ```bash
   cd OneZeroCoffee
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The local development server should now be running at `http://localhost:5173/`.

### Available Scripts

In the project directory, you can run:

* **`npm run dev`**: Starts the application in local development mode.
* **`npm run build`**: Compiles the TypeScript code and bundles assets into the `/dist` production folder.
* **`npm run preview`**: Serves the compiled production bundle locally for testing.
* **`npm run lint`**: Runs ESLint to check for stylistic errors or code quality issues.
