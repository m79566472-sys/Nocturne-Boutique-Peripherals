import React, { useState, useEffect, useRef } from 'react';
import heroImg from './assets/images/hero_peripherals_minimal_1791439039302.jpg';

// 8 Distinct Keyboard Images
import kbCompact60 from './assets/images/kb_compact_60_1791443009261.jpg';
import kbTkl from './assets/images/kb_tkl_tenkeyless_1791443027290.jpg';
import kbAlice from './assets/images/kb_alice_ergonomic_1791443045145.jpg';
import kbFullsize from './assets/images/kb_fullsize_heavy_1791443057709.jpg';
import kbExploded75 from './assets/images/kb_exploded_75_1791444253095.jpg';
import kbOrthoSplit from './assets/images/kb_ortho_split_1791444267007.jpg';
import kbLumina65 from './assets/images/keyboard_lumina_65_1791439075461.jpg';
import kbObsidian75 from './assets/images/keyboard_obsidian_75_1791439057904.jpg';

// 8 Distinct Mouse Images
import mouseHoneycomb from './assets/images/mouse_honeycomb_light_1791443074177.jpg';
import mouseErgo from './assets/images/mouse_ergo_productivity_1791443089746.jpg';
import mouseTravel from './assets/images/mouse_travel_minimal_1791443103830.jpg';
import mouseVertical from './assets/images/mouse_vertical_ergo_1791443119904.jpg';
import mouseFingertip from './assets/images/mouse_fingertip_mini_1791444276971.jpg';
import mouseCarbonMmo from './assets/images/mouse_carbon_mmo_1791444287867.jpg';
import mouseStratum from './assets/images/mouse_stratum_ergonomic_1791439106085.jpg';
import mouseAeroxSolid from './assets/images/mouse_aerox_magnesium_1791439090582.jpg';

interface Product {
  id: string;
  name: string;
  layoutType: string;
  price: number;
  image: string;
  specs: string[];
  tag: string;
  category: 'keyboard' | 'mouse';
  subType: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export default function App() {
  // Theme State: 'gold' (Champagne Gold), 'crimson' (Red & Black), or 'mono' (Pure Monochrome)
  const [theme, setTheme] = useState<'gold' | 'crimson' | 'mono'>('crimson');

  // Navigation & UI States
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [userSession, setUserSession] = useState<{ email: string; name: string } | null>(null);

  // Filter States
  const [kbFilter, setKbFilter] = useState<'all' | 'compact' | 'tkl-75' | 'ergo' | 'full'>('all');
  const [mouseFilter, setMouseFilter] = useState<'all' | 'ultralight' | 'ergo' | 'specialty'>('all');

  // Form States
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authMessage, setAuthMessage] = useState<string | null>(null);

  // Support Form State
  const [supportName, setSupportName] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [supportTopic, setSupportTopic] = useState('Order & Shipping Status');
  const [supportOrderNum, setSupportOrderNum] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSubmitted, setSupportSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');

  // Checkout notice
  const [checkoutNotice, setCheckoutNotice] = useState(false);

  // Canvas Ref for Floating Sand-Grain Dust
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sync Theme to HTML data-theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'crimson') return 'gold';
      if (prev === 'gold') return 'mono';
      return 'crimson';
    });
  };

  const getActiveThemeColor = () => {
    if (theme === 'crimson') return '#ff334b';
    if (theme === 'gold') return '#dfb877';
    return '#ffffff';
  };

  // Floating Micro-Sand Particles Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create 48 fine sand grains
    const particleCount = 48;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.1 + 0.6, // very small, 0.6px to 1.7px like sand grains
      speedX: (Math.random() - 0.5) * 0.18,
      speedY: -Math.random() * 0.22 - 0.06, // gentle upward floating drift
      opacity: Math.random() * 0.45 + 0.25,
      glow: Math.random() > 0.45 // higher proportion of glowing grains
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around boundaries
        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        if (p.glow) {
          if (theme === 'crimson') {
            ctx.fillStyle = `rgba(255, 51, 75, ${p.opacity * 1.2})`;
          } else if (theme === 'gold') {
            ctx.fillStyle = `rgba(223, 184, 119, ${p.opacity * 1.15})`;
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 1.1})`;
          }
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.7})`;
        }
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  // 16 DISTINCT HARDWARE PRODUCTS (8 Keyboards & 8 Mice)
  const products: Product[] = [
    // --- KEYBOARDS: 8 Models ---
    {
      id: 'kb-60',
      name: 'Nocturne 60% Minimalist Compact',
      layoutType: '60% Ultra-Compact Form Factor',
      subType: 'compact',
      price: 285,
      image: kbCompact60,
      specs: ['60-Key Layout', 'Milled 6063 Aluminum', 'Hotswap PCB', 'Under 850g'],
      tag: '60% Compact',
      category: 'keyboard',
      description: 'Streamlined desk footprint omitting function rows and arrow clusters. Fully programmable VIA layers and isolated poron gasket mount.'
    },
    {
      id: 'kb-tkl',
      name: 'Apex Tenkeyless (TKL) Edition',
      layoutType: '80% Tenkeyless Tournament Layout',
      subType: 'tkl-75',
      price: 360,
      image: kbTkl,
      specs: ['Dedicated F-Row', 'Arrow Navigation Cluster', 'Brushed Dark Alloy', '8000Hz Polling'],
      tag: 'TKL Tournament',
      category: 'keyboard',
      description: 'The esports standard with dedicated cursor keys and function row without the bulk of a number pad. High-frequency 8000Hz USB controller.'
    },
    {
      id: 'kb-alice',
      name: 'Aether Alice Ergonomic Split',
      layoutType: 'Ergonomic Angled Split Wings',
      subType: 'ergo',
      price: 410,
      image: kbAlice,
      specs: ['Split Angled Matrix', 'Dual Spacebars', 'Rotary Encoder Knob', 'Integrated Wrist Pitch'],
      tag: 'Alice Split Ergo',
      category: 'keyboard',
      description: 'Curved split alphanumeric clusters positioned to align naturally with your wrists and forearms, drastically reducing ulnar deviation.'
    },
    {
      id: 'kb-fullsize',
      name: 'Titan Monolith 100% Full-Size',
      layoutType: '100% Heavy Machined Workstation',
      subType: 'full',
      price: 465,
      image: kbFullsize,
      specs: ['104-Key Numpad', '4.2kg Solid Billet Alloy', 'Knurled Volume Dial', 'Internal Brass Slab'],
      tag: 'Full-Size 100%',
      category: 'keyboard',
      description: 'Monumental 4.2kg full-size aluminum chassis designed for financial analysts, CAD modelers, and purists needing an integrated tactile numpad.'
    },
    {
      id: 'kb-75-rotary',
      name: 'Zenith 75% Exploded Rotary',
      layoutType: '75% Exploded Layout with Media Dial',
      subType: 'tkl-75',
      price: 375,
      image: kbExploded75,
      specs: ['Exploded Arrow Keys', 'Solid Brass Dial', 'Gasket Suspension', 'Polycarbonate Plate'],
      tag: '75% Rotary',
      category: 'keyboard',
      description: 'The sweet spot between compact desk economy and functional navigation. Separated arrow cluster prevents accidental keystrokes.'
    },
    {
      id: 'kb-ortho',
      name: 'Matrix Columnar Split Ortho',
      layoutType: 'Independent Column-Staggered Halves',
      subType: 'ergo',
      price: 435,
      image: kbOrthoSplit,
      specs: ['True Split Halves', 'Columnar Alignment', 'TRRS High-Speed Link', 'Tent Stand Kit'],
      tag: 'Split Ortho',
      category: 'keyboard',
      description: 'Ortholinear columnar alignment matches the natural length differences of human fingers. Two completely detached halves allow shoulder-width posture.'
    },
    {
      id: 'kb-lumina-65',
      name: 'Lumina 65% Frosted Polycarbonate',
      layoutType: '65% Compact Semi-Translucent Case',
      subType: 'compact',
      price: 320,
      image: kbLumina65,
      specs: ['Frosted Polycarbonate', 'FR4 Flex Plate', 'Holy Panda Tactiles', 'Warm Underglow'],
      tag: '65% Polycarbonate',
      category: 'keyboard',
      description: 'Silky frosted semi-translucent case providing a softer acoustic clack and gentle diffuse underglow with dedicated arrow keys.'
    },
    {
      id: 'kb-obsidian-75',
      name: 'Obsidian 75% Polished Brass',
      layoutType: '75% Compact Gasket Enthusiast Run',
      subType: 'tkl-75',
      price: 395,
      image: kbObsidian75,
      specs: ['Mirror Brass Weight', 'IXPE Acoustic Foam', 'Krytox Hand-Lubed', 'Tri-Mode Wireless'],
      tag: 'Signature 75%',
      category: 'keyboard',
      description: 'Our benchmark acoustic board with an external mirror-polished brass weight strip and custom silicone gasket socks for a deep marble thock.'
    },

    // --- MICE: 8 Models ---
    {
      id: 'ms-honeycomb',
      name: 'Aerox Honeycomb Ultralight',
      layoutType: 'Perforated Esports Skeleton',
      subType: 'ultralight',
      price: 155,
      image: mouseHoneycomb,
      specs: ['34 Grams Total', 'Hexagonal Exoskeleton', 'PAW3950 Optical', 'PTFE Skates'],
      tag: 'Honeycomb Gaming',
      category: 'mouse',
      description: 'Structural honeycomb lattice eliminating every superfluous milligram for maximum flick speed and sweat-free airflow in competition.'
    },
    {
      id: 'ms-ergo',
      name: 'Master Sculpt Ergonomic Pro',
      layoutType: 'Right-Hand Sculpted Thumb Rest',
      subType: 'ergo',
      price: 195,
      image: mouseErgo,
      specs: ['Thumb Support Shelf', 'Dual Machined Wheels', 'MagSpeed Scroll', '3-Device Multi-Pair'],
      tag: 'Ergonomic Productivity',
      category: 'mouse',
      description: 'Anatomically contoured palm cradle featuring a secondary horizontal thumb dial for timeline navigation and multi-monitor productivity.'
    },
    {
      id: 'ms-travel',
      name: 'Pebble Slim Travel Ultralight',
      layoutType: 'Ultra-Low Profile Pocket Mouse',
      subType: 'specialty',
      price: 125,
      image: mouseTravel,
      specs: ['18mm Ultra-Thin', 'Silent Optical Switches', 'Magnetic Battery Lid', 'Bluetooth 5.3 Low Energy'],
      tag: 'Minimalist Travel',
      category: 'mouse',
      description: 'Sleek, symmetric pebble unibody engineered to slide flat into laptop sleeves. Features silent optical microswitches for quiet coffee shop work.'
    },
    {
      id: 'ms-vertical',
      name: 'Orthos Vertical 57° Posture',
      layoutType: 'Natural Handshake Ergonomic Mouse',
      subType: 'ergo',
      price: 175,
      image: mouseVertical,
      specs: ['57-Degree Natural Angle', 'Forearm Strain Relief', 'OLED DPI Display', 'Textured Grip Shell'],
      tag: 'Vertical Posture',
      category: 'mouse',
      description: 'Places your hand into the neutral anatomical handshake posture, eliminating forearm twisting (pronation) and wrist compression during long sessions.'
    },
    {
      id: 'ms-fingertip',
      name: 'Strife 28g Magnesium Fingertip',
      layoutType: 'Truncated Zero-Hump Fingertip Mouse',
      subType: 'ultralight',
      price: 185,
      image: mouseFingertip,
      specs: ['28 Grams Featherweight', 'Cast Magnesium Frame', 'Zero Palm Interference', '8000Hz Wireless'],
      tag: 'Fingertip Grip 28g',
      category: 'mouse',
      description: 'Designed exclusively for pure fingertip aimers. Truncated chassis removes palm contact entirely for unrestricted micro-vertical vertical adjustments.'
    },
    {
      id: 'ms-mmo',
      name: 'Vector Carbon 12-Button MMO',
      layoutType: '12-Key Thumb Matrix Macro Hub',
      subType: 'specialty',
      price: 165,
      image: mouseCarbonMmo,
      specs: ['12 Mechanical Thumb Keys', 'Forged Carbon Top', 'Onboard Flash Memory', 'Free-Spin Wheel'],
      tag: '12-Key MMO Grid',
      category: 'mouse',
      description: 'High-density ergonomic thumb cluster with mechanical tactile feedback. Bind complete IDE shortcuts, CAD commands, and complex game macros.'
    },
    {
      id: 'ms-stratum',
      name: 'Stratum Forged Titanium Edition',
      layoutType: 'Contoured Luxury Workstation Mouse',
      subType: 'ergo',
      price: 215,
      image: mouseStratum,
      specs: ['Titanium Scroll Encoder', 'Hand-Laid Carbon Fiber', 'PAW3950 Flagship Sensor', 'Silent Omron Switches'],
      tag: 'Forged Titanium',
      category: 'mouse',
      description: 'Luxury studio peripheral dressed in authentic forged carbon weave with an aircraft-grade knurled aluminum center wheel.'
    },
    {
      id: 'ms-aerox-solid',
      name: 'Aerox Solid Unibody Magnesium',
      layoutType: 'Non-Perforated 38g Magnesium Shell',
      subType: 'ultralight',
      price: 170,
      image: mouseAeroxSolid,
      specs: ['38g Solid Shell (No Holes)', 'Cast Magnesium Alloy', 'Dust & Sweat Proof', 'Optical Microswitches'],
      tag: 'Solid Magnesium',
      category: 'mouse',
      description: 'Ultralight agility without exposed honeycomb holes. Cast from thin-wall magnesium alloy to provide rigid structural integrity at only 38 grams.'
    }
  ];

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([
    { ...products[0], quantity: 1 }
  ]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Filtered lists
  const filteredKeyboards = products
    .filter(p => p.category === 'keyboard')
    .filter(p => {
      if (kbFilter === 'all') return true;
      if (kbFilter === 'compact') return p.subType === 'compact';
      if (kbFilter === 'tkl-75') return p.subType === 'tkl-75';
      if (kbFilter === 'ergo') return p.subType === 'ergo';
      if (kbFilter === 'full') return p.subType === 'full';
      return true;
    });

  const filteredMice = products
    .filter(p => p.category === 'mouse')
    .filter(p => {
      if (mouseFilter === 'all') return true;
      if (mouseFilter === 'ultralight') return p.subType === 'ultralight';
      if (mouseFilter === 'ergo') return p.subType === 'ergo';
      if (mouseFilter === 'specialty') return p.subType === 'specialty';
      return true;
    });

  // FAQ Content
  const faqs: FaqItem[] = [
    {
      id: 'faq-1',
      question: 'Are Nocturne mechanical keyboards hot-swappable or do they require soldering?',
      answer: 'Every Nocturne keyboard features Kailh hot-swap sockets rated for over 100 switch swaps. You can effortlessly pop out any 3-pin or 5-pin MX mechanical switch using the included CNC switch puller without touching a soldering iron.'
    },
    {
      id: 'faq-2',
      question: 'How does 8,000Hz (0.125ms) hyper-polling work on macOS and Windows?',
      answer: 'Our boards and mice utilize high-bandwidth 32-bit ARM Cortex-M4 microcontrollers. On Windows 11 and macOS Sonoma+, 8000Hz polling transmits reports every 0.125ms directly via USB-C or our 4K wireless dongle, delivering 8x faster responsiveness than standard 1000Hz peripherals.'
    },
    {
      id: 'faq-3',
      question: 'Can I customize keymaps, rotary dials, and lighting using VIA or QMK?',
      answer: 'Yes. All Nocturne boards come pre-flashed with open-source QMK firmware and out-of-the-box VIA support. Simply visit usevia.app in any Chromium browser to remap keys, define multi-action macros, and calibrate the rotary encoder dial instantly without installing invasive bloatware.'
    },
    {
      id: 'faq-4',
      question: 'What switch lubricants and stabilizers are applied in the atelier?',
      answer: 'We hand-lubricate all switch stems and housing rails with genuine Krytox 205g0. Springs are bag-lubed with Krytox 105 high-viscosity oil. Screw-in PCB stabilizers are hand-balanced on jewelers blocks with XHT-BDZ lubricant applied to the wire bends to eradicate rattle.'
    },
    {
      id: 'faq-5',
      question: 'What optical sensors power the precision mice?',
      answer: 'Our mice are equipped with the flagship PixArt PAW3950 optical sensor capable of 30,000 native DPI, 750 IPS tracking speed, and 50G acceleration with zero hardware acceleration or smoothing.'
    },
    {
      id: 'faq-6',
      question: 'Do you offer international plug types and localized layout options?',
      answer: 'We ship with universal braided custom USB-C to USB-C cables with gold-plated USB-A adapters included. For keycaps, both ANSI and ISO layout PCBs and keycap sets are available on request during checkout.'
    }
  ];

  // Auth Submit Handler
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail || !authPassword) return;

    if (authMode === 'signup') {
      setUserSession({
        email: authEmail,
        name: authName.trim() || authEmail.split('@')[0]
      });
      setAuthMessage('Account created successfully! Welcome to Nocturne Atelier.');
    } else {
      setUserSession({
        email: authEmail,
        name: authEmail.split('@')[0]
      });
      setAuthMessage('Welcome back! You are now logged in.');
    }

    setTimeout(() => {
      setAuthModalOpen(false);
      setAuthMessage(null);
    }, 1200);
  };

  // Support Form Submit Handler
  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportName || !supportEmail || !supportMessage) return;
    setSupportSubmitted(true);
    setTimeout(() => {
      setSupportName('');
      setSupportEmail('');
      setSupportOrderNum('');
      setSupportMessage('');
    }, 500);
  };

  return (
    <div className="landing-app">
      {/* Background Floating Sand-Grains Particles */}
      <canvas ref={canvasRef} className="sand-particles-canvas" aria-hidden="true" />

      {/* =====================================================================
          1. FLOATING PILL NAVBAR
          ===================================================================== */}
      <header className="navbar-wrapper">
        <nav className="pill-navbar" aria-label="Primary Navigation">
          
          {/* Left: Circular White Logo Container */}
          <a
            href="#hero"
            className="navbar-logo-circle"
            title="Nocturne Peripherals Home"
            aria-label="Nocturne Peripherals Home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <ellipse
                cx="12"
                cy="12"
                rx="9.5"
                ry="3.8"
                transform="rotate(-28 12 12)"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <circle cx="12" cy="12" r="4.8" fill="currentColor" stroke="none" />
            </svg>
          </a>

          {/* Center: Navigation Links */}
          <ul className={`navbar-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <li>
              <a
                href="#keyboards"
                className="navbar-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Keyboards ({products.filter(p => p.category === 'keyboard').length})
              </a>
            </li>
            <li>
              <a
                href="#mice"
                className="navbar-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Mice ({products.filter(p => p.category === 'mouse').length})
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="navbar-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#support"
                className="navbar-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Support
              </a>
            </li>
            <li>
              <a
                href="#faq"
                className="navbar-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>
            </li>
            <li>
              <a
                href="#policies"
                className="navbar-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Policies
              </a>
            </li>
          </ul>

          {/* Right: Theme Switcher, Auth & Cart Buttons */}
          <div className="navbar-right-cluster">
            {/* Theme Change Button */}
            <button
              type="button"
              className="theme-switch-btn"
              onClick={toggleTheme}
              title="Switch Theme (Crimson Red, Champagne Gold, Pure Monochrome)"
            >
              <span>
                {theme === 'crimson'
                  ? '◆ Crimson Red'
                  : theme === 'gold'
                  ? '✦ Champagne'
                  : '○ Monochrome'}
              </span>
            </button>

            {userSession ? (
              <button
                type="button"
                className="navbar-auth-btn"
                onClick={() => setUserSession(null)}
                title="Click to sign out"
              >
                Hi, {userSession.name}
              </button>
            ) : (
              <button
                type="button"
                className="navbar-auth-btn"
                onClick={() => {
                  setAuthMode('login');
                  setAuthModalOpen(true);
                }}
              >
                Log In
              </button>
            )}

            <button
              type="button"
              className="navbar-action-pill"
              onClick={() => setCartOpen(true)}
              aria-label={`Open Cart with ${totalCartCount} items`}
            >
              <span>Cart</span>
              <span className="cart-count-badge">({totalCartCount})</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            type="button"
            className="navbar-mobile-toggle"
            aria-label="Toggle Navigation Menu"
            onClick={() => setMobileMenuOpen(prev => !prev)}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>

        </nav>
      </header>

      {/* Main Content Area */}
      <main id="main-content">

        {/* =====================================================================
            2. HERO SECTION - SIMPLIFIED HEADLINE ("Crafted for Pure Feel.")
            ===================================================================== */}
        <section id="hero" className="hero-section container">
          <div className="hero-glow" aria-hidden="true" />

          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge-tag">
                <span className="hero-badge-dot" />
                <span>EXPANDED ATELIER CATALOG · 16 BESPOKE PERIPHERALS</span>
              </div>

              {/* Simplified & Punchy Hero Headline */}
              <h1 className="hero-headline">
                Crafted for <span className="accent">Pure Feel.</span>
              </h1>

              <p className="hero-subtext">
                Boutique mechanical keyboards and ultralight precision mice. Milled from 6063 aerospace alloys and featherlight magnesium skeletons with 8000Hz polling.
              </p>

              <div className="hero-cta-group">
                <a href="#keyboards" className="btn-primary">
                  <span>Explore Keyboards (8)</span>
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.2" fill="none">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>

                <a href="#mice" className="btn-secondary">
                  <span>Explore Mice (8)</span>
                </a>
              </div>

              <div className="hero-specs">
                <div className="hero-spec-item">
                  <span className="hero-spec-value">16</span>
                  <span className="hero-spec-label">Total Designs</span>
                </div>
                <div className="hero-spec-item">
                  <span className="hero-spec-value">28g–4.2kg</span>
                  <span className="hero-spec-label">Weight Scale</span>
                </div>
                <div className="hero-spec-item">
                  <span className="hero-spec-value">8,000Hz</span>
                  <span className="hero-spec-label">Hyper-Polling</span>
                </div>
                <div className="hero-spec-item">
                  <span className="hero-spec-value">Krytox</span>
                  <span className="hero-spec-label">Hand-Lubed</span>
                </div>
              </div>
            </div>

            <div className="hero-visual-frame">
              <img
                src={heroImg}
                alt="Nocturne Luxury Keyboard and Magnesium Mouse Peripherals on Dark Slate"
                className="hero-visual-img"
                loading="eager"
              />
              <div className="hero-floating-tag">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <circle cx="12" cy="12" r="6" />
                </svg>
                <span>
                  {theme === 'crimson'
                    ? 'Curated Atelier · Crimson Noir Red Edition'
                    : theme === 'gold'
                    ? 'Curated Atelier · Champagne Gold Edition'
                    : 'Curated Atelier · Pure Monochrome Edition'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            3. PRODUCT GRID 1: MECHANICAL KEYBOARDS (8 MODELS)
            ===================================================================== */}
        <section id="keyboards" className="section container">
          <div className="section-header" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p className="section-kicker">Milled Chassis · Gasket Acoustics</p>
            <h2 className="section-title">Mechanical Keyboards ({products.filter(p => p.category === 'keyboard').length})</h2>
            <p className="section-description">
              From minimalist 60% desk savers to tournament TKLs, exploded rotary dials, ergonomic Alice wings, columnar split halves, and heavy 4.2kg full-size aluminum monoliths.
            </p>

            {/* Layout Filter Pill Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <button
                type="button"
                onClick={() => setKbFilter('all')}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: kbFilter === 'all' ? 600 : 500,
                  backgroundColor: kbFilter === 'all' ? getActiveThemeColor() : 'rgba(255, 255, 255, 0.08)',
                  color: kbFilter === 'all' ? '#000000' : '#ffffff',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                All Keyboards (8)
              </button>
              <button
                type="button"
                onClick={() => setKbFilter('compact')}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: kbFilter === 'compact' ? 600 : 500,
                  backgroundColor: kbFilter === 'compact' ? getActiveThemeColor() : 'rgba(255, 255, 255, 0.08)',
                  color: kbFilter === 'compact' ? '#000000' : '#ffffff',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                Compact 60% / 65% (2)
              </button>
              <button
                type="button"
                onClick={() => setKbFilter('tkl-75')}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: kbFilter === 'tkl-75' ? 600 : 500,
                  backgroundColor: kbFilter === 'tkl-75' ? getActiveThemeColor() : 'rgba(255, 255, 255, 0.08)',
                  color: kbFilter === 'tkl-75' ? '#000000' : '#ffffff',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                TKL & 75% Series (3)
              </button>
              <button
                type="button"
                onClick={() => setKbFilter('ergo')}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: kbFilter === 'ergo' ? 600 : 500,
                  backgroundColor: kbFilter === 'ergo' ? getActiveThemeColor() : 'rgba(255, 255, 255, 0.08)',
                  color: kbFilter === 'ergo' ? '#000000' : '#ffffff',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                Ergonomic & Split (2)
              </button>
              <button
                type="button"
                onClick={() => setKbFilter('full')}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: kbFilter === 'full' ? 600 : 500,
                  backgroundColor: kbFilter === 'full' ? getActiveThemeColor() : 'rgba(255, 255, 255, 0.08)',
                  color: kbFilter === 'full' ? '#000000' : '#ffffff',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                Full-Size 100% (1)
              </button>
            </div>
          </div>

          <div className="product-grid">
            {filteredKeyboards.map((product, index) => (
              <article
                key={product.id}
                className="product-card"
                style={{ '--item-index': index } as React.CSSProperties}
              >
                <div className="product-card-media">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-card-image"
                    loading="lazy"
                  />
                  <span className="product-tag">{product.tag}</span>
                </div>

                <div className="product-card-body">
                  <span className="product-series">{product.layoutType}</span>
                  <h3 className="product-name">{product.name}</h3>

                  <div className="product-specs-list">
                    {product.specs.map((spec, idx) => (
                      <span key={spec}>
                        {spec}
                        {idx < product.specs.length - 1 && <span className="spec-divider">&nbsp;·&nbsp;</span>}
                      </span>
                    ))}
                  </div>

                  <div className="product-footer">
                    <span className="product-price">${product.price}</span>
                    <button
                      type="button"
                      className="product-add-btn"
                      onClick={() => addToCart(product)}
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =====================================================================
            4. PRODUCT GRID 2: PRECISION MICE (8 MODELS)
            ===================================================================== */}
        <section id="mice" className="section container">
          <div className="section-header" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p className="section-kicker">Structural Alloys · Sub-Millimeter Optical</p>
            <h2 className="section-title">Precision Mice ({products.filter(p => p.category === 'mouse').length})</h2>
            <p className="section-description">
              Curated for competitive esports, timeline editing, travel minimalism, and ergonomic joint health: honeycomb skeletons, solid magnesium, dual-wheel CAD sculpts, 28g fingertip minis, and vertical handshake mice.
            </p>

            {/* Mouse Filter Pill Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <button
                type="button"
                onClick={() => setMouseFilter('all')}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: mouseFilter === 'all' ? 600 : 500,
                  backgroundColor: mouseFilter === 'all' ? getActiveThemeColor() : 'rgba(255, 255, 255, 0.08)',
                  color: mouseFilter === 'all' ? '#000000' : '#ffffff',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                All Mice (8)
              </button>
              <button
                type="button"
                onClick={() => setMouseFilter('ultralight')}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: mouseFilter === 'ultralight' ? 600 : 500,
                  backgroundColor: mouseFilter === 'ultralight' ? getActiveThemeColor() : 'rgba(255, 255, 255, 0.08)',
                  color: mouseFilter === 'ultralight' ? '#000000' : '#ffffff',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                Ultralight Esports 28g–38g (3)
              </button>
              <button
                type="button"
                onClick={() => setMouseFilter('ergo')}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: mouseFilter === 'ergo' ? 600 : 500,
                  backgroundColor: mouseFilter === 'ergo' ? getActiveThemeColor() : 'rgba(255, 255, 255, 0.08)',
                  color: mouseFilter === 'ergo' ? '#000000' : '#ffffff',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                Ergonomic & Vertical (3)
              </button>
              <button
                type="button"
                onClick={() => setMouseFilter('specialty')}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: mouseFilter === 'specialty' ? 600 : 500,
                  backgroundColor: mouseFilter === 'specialty' ? getActiveThemeColor() : 'rgba(255, 255, 255, 0.08)',
                  color: mouseFilter === 'specialty' ? '#000000' : '#ffffff',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                Travel & MMO (2)
              </button>
            </div>
          </div>

          <div className="product-grid">
            {filteredMice.map((product, index) => (
              <article
                key={product.id}
                className="product-card"
                style={{ '--item-index': index } as React.CSSProperties}
              >
                <div className="product-card-media">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-card-image"
                    loading="lazy"
                  />
                  <span className="product-tag">{product.tag}</span>
                </div>

                <div className="product-card-body">
                  <span className="product-series">{product.layoutType}</span>
                  <h3 className="product-name">{product.name}</h3>

                  <div className="product-specs-list">
                    {product.specs.map((spec, idx) => (
                      <span key={spec}>
                        {spec}
                        {idx < product.specs.length - 1 && <span className="spec-divider">&nbsp;·&nbsp;</span>}
                      </span>
                    ))}
                  </div>

                  <div className="product-footer">
                    <span className="product-price">${product.price}</span>
                    <button
                      type="button"
                      className="product-add-btn"
                      onClick={() => addToCart(product)}
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =====================================================================
            5. ABOUT US / OUR MISSION SECTION
            ===================================================================== */}
        <section id="about" className="section container">
          <div className="about-mission-grid">
            <div>
              <p className="section-kicker">Atelier Philosophy</p>
              <h2 className="section-title">Our Mission: Banishing Hollow Plastics</h2>
              <p className="section-description" style={{ marginBottom: '1.5rem' }}>
                Nocturne was founded with a singular conviction: the tools you touch for thousands of hours each year should possess the permanence, acoustic dignity, and precision of a Swiss mechanical movement.
              </p>
              <p className="section-description">
                We mill solid 6063 aerospace aluminum, suspend PCB assemblies with isolated silicone gasket dampers, and hand-balance stainless stabilizer wires. We engineer peripherals meant to outlive your desktop workstation.
              </p>
            </div>

            <div className="mission-pillars">
              <div className="pillar-card">
                <h3 className="pillar-title">
                  <span>01.</span>
                  <span>Acoustic Integrity</span>
                </h3>
                <p className="pillar-desc">
                  Every chassis cavity is mathematically measured to eliminate hollowness. Custom poron foams and solid brass bottom plates tune each keystroke into a satisfying, low-frequency marble maraca signature.
                </p>
              </div>

              <div className="pillar-card">
                <h3 className="pillar-title">
                  <span>02.</span>
                  <span>Zero-Compromise Latency</span>
                </h3>
                <p className="pillar-desc">
                  We don't settle for standard 1000Hz polling. Our peripheral firmware is tuned for true 8000Hz hyper-polling (0.125ms input intervals) with zero hardware smoothing or artificial debounce delay.
                </p>
              </div>

              <div className="pillar-card">
                <h3 className="pillar-title">
                  <span>03.</span>
                  <span>Lifetime Repairability & Open VIA</span>
                </h3>
                <p className="pillar-desc">
                  Zero disposable glue, zero proprietary bloatware. Standard MX switch sockets, open-source QMK firmware, and hex screw assemblies ensure your gear remains fully repairable and customizable forever.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            6. SUPPORT SECTION (PROPER CONCIERGE & TICKET FORM)
            ===================================================================== */}
        <section id="support" className="section container">
          <div className="section-header">
            <p className="section-kicker">Dedicated Atelier Concierge</p>
            <h2 className="section-title">Customer Care & Technical Support</h2>
            <p className="section-description">
              Need assistance with your order, firmware flashing, switch recommendations, or warranty claims? Our hardware engineers respond to all tickets within 2 business hours.
            </p>
          </div>

          <div className="support-layout">
            <div className="support-channels">
              <div className="support-card">
                <h3 className="support-card-title">Priority Email Concierge</h3>
                <p className="support-card-desc">
                  Direct communication with our assembly workshop in Munich. Average response time: under 120 minutes.
                </p>
                <a href="mailto:atelier@nocturne.io" className="support-card-action">
                  atelier@nocturne.io →
                </a>
              </div>

              <div className="support-card">
                <h3 className="support-card-title">Discord Community Lab</h3>
                <p className="support-card-desc">
                  Join 12,000+ mechanical keyboard builders, share sound tests, download custom QMK firmware profiles, and chat with designers.
                </p>
                <a href="#discord" className="support-card-action" onClick={e => e.preventDefault()}>
                  discord.gg/nocturne-lab →
                </a>
              </div>

              <div className="support-card">
                <h3 className="support-card-title">Firmware & VIA Configurator</h3>
                <p className="support-card-desc">
                  Calibrate your rotary encoder dials, macro layers, and debounce filters directly in your browser.
                </p>
                <a href="https://usevia.app" target="_blank" rel="noreferrer" className="support-card-action">
                  Launch Web VIA Flasher →
                </a>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '1.25rem' }}>
                Open a Support Ticket
              </h3>

              {supportSubmitted ? (
                <div style={{ padding: '2rem', background: '#0e0e12', border: '1px solid #ffffff', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ffffff', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontWeight: 700 }}>
                    ✓
                  </div>
                  <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Ticket #NC-8924 Dispatched</h4>
                  <p style={{ color: '#d4d4d8', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                    Thank you, {supportName || 'Valued Customer'}. A confirmation has been transmitted to {supportEmail}. Our engineers are reviewing your hardware inquiry.
                  </p>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setSupportSubmitted(false)}
                    style={{ fontSize: '0.85rem', padding: '0.5rem 1.25rem' }}
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSupportSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="supp-name">Your Name *</label>
                      <input
                        id="supp-name"
                        type="text"
                        required
                        className="form-input"
                        placeholder="Alex Vance"
                        value={supportName}
                        onChange={e => setSupportName(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="supp-email">Email Address *</label>
                      <input
                        id="supp-email"
                        type="email"
                        required
                        className="form-input"
                        placeholder="alex@domain.com"
                        value={supportEmail}
                        onChange={e => setSupportEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="supp-topic">Inquiry Topic</label>
                      <select
                        id="supp-topic"
                        className="form-select"
                        value={supportTopic}
                        onChange={e => setSupportTopic(e.target.value)}
                      >
                        <option value="Order & Shipping Status">Order & Shipping Status</option>
                        <option value="Firmware & VIA Keymapping">Firmware & VIA Keymapping</option>
                        <option value="Hardware Troubleshooting">Hardware Troubleshooting</option>
                        <option value="Switch & Lubricant Consultation">Switch & Lubricant Consultation</option>
                        <option value="Warranty & Return Request">Warranty & Return Request</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="supp-order">Order Number (Optional)</label>
                      <input
                        id="supp-order"
                        type="text"
                        className="form-input"
                        placeholder="#NC-1042"
                        value={supportOrderNum}
                        onChange={e => setSupportOrderNum(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="supp-msg">How can we help? *</label>
                    <textarea
                      id="supp-msg"
                      required
                      className="form-textarea"
                      placeholder="Please describe your hardware setup, operating system, or questions..."
                      value={supportMessage}
                      onChange={e => setSupportMessage(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: '100%', marginTop: '0.5rem' }}
                  >
                    Submit Support Ticket
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* =====================================================================
            7. FAQ ACCORDION SECTION
            ===================================================================== */}
        <section id="faq" className="section container">
          <div className="section-header" style={{ textAlign: 'center', margin: '0 auto 3rem auto' }}>
            <p className="section-kicker" style={{ justifyContent: 'center' }}>Knowledge Base</p>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-description" style={{ margin: '0 auto' }}>
              Everything you need to know about our machining tolerances, warranty protections, switch compatibility, and 8000Hz controllers.
            </p>
          </div>

          <div className="faq-accordion-list">
            {faqs.map(item => {
              const isOpen = openFaq === item.id;
              return (
                <div key={item.id} className={`faq-accordion-item ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="faq-accordion-question"
                    onClick={() => setOpenFaq(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    <span className="faq-icon-arrow">{isOpen ? '✕' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="faq-accordion-answer">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* =====================================================================
            8. SHIPPING & RETURN POLICY SECTION
            ===================================================================== */}
        <section id="policies" className="section container">
          <div className="section-header">
            <p className="section-kicker">Guarantees & Logistics</p>
            <h2 className="section-title">Shipping & Return Policy</h2>
            <p className="section-description">
              Transparent, collector-grade customer commitments designed to protect your investment in bespoke mechanical hardware.
            </p>
          </div>

          <div className="policy-grid">
            <div className="policy-card">
              <div className="policy-icon-badge">✈</div>
              <h3 className="policy-title">Global Express Delivery</h3>
              <p className="policy-text">
                Every order is packaged inside custom high-density anti-static conductive foam and double-walled cartons. Dispatched via insured DHL Express Air with end-to-end tracking.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', color: '#d4d4d8', fontSize: '0.825rem', marginTop: '0.5rem' }}>
                <li>• USA & Canada: 2–4 Business Days</li>
                <li>• Europe & UK: 1–3 Business Days</li>
                <li>• Asia & Australia: 3–5 Business Days</li>
                <li>• All duties & customs fees pre-cleared</li>
              </ul>
            </div>

            <div className="policy-card">
              <div className="policy-icon-badge">↺</div>
              <h3 className="policy-title">30-Day Tactile Audition</h3>
              <p className="policy-text">
                True peripheral appreciation happens on your desk under your fingers. Audition our keyboards and mice for 30 calendar days. If the acoustics or ergonomics do not exceed your expectations, return them for a 100% refund.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', color: '#d4d4d8', fontSize: '0.825rem', marginTop: '0.5rem' }}>
                <li>• Prepaid return shipping labels provided</li>
                <li>• Zero restocking fees on undamaged gear</li>
                <li>• Instant refund upon return scan</li>
              </ul>
            </div>

            <div className="policy-card">
              <div className="policy-icon-badge">🛡</div>
              <h3 className="policy-title">2-Year Atelier Warranty</h3>
              <p className="policy-text">
                We stand behind every gram of machined alloy and PCB solder trace. Every Nocturne peripheral includes an unconditional 24-month replacement warranty against manufacturing defects.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', color: '#d4d4d8', fontSize: '0.825rem', marginTop: '0.5rem' }}>
                <li>• Aluminum case anodization durability guaranteed</li>
                <li>• Free replacement PCB modules if sockets fail</li>
                <li>• Direct engineer diagnostic support</li>
              </ul>
            </div>
          </div>
        </section>

      </main>

      {/* =====================================================================
          9. AUTH MODAL (LOGIN & SIGN UP)
          ===================================================================== */}
      <div className={`auth-overlay ${authModalOpen ? 'open' : ''}`} onClick={() => setAuthModalOpen(false)}>
        <div
          className="auth-modal"
          onClick={e => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-modal-title"
        >
          <button
            type="button"
            className="auth-close-btn"
            onClick={() => setAuthModalOpen(false)}
            aria-label="Close modal"
          >
            ✕
          </button>

          <h2 id="auth-modal-title" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem', textAlign: 'center' }}>
            {authMode === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#8e8e93', textAlign: 'center', marginBottom: '1.5rem' }}>
            {authMode === 'login'
              ? 'Sign in to track orders, manage firmware profiles, and view order receipts.'
              : 'Join the Nocturne Atelier for early access to limited edition milled batches.'}
          </p>

          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab-btn ${authMode === 'login' ? 'active' : ''}`}
              onClick={() => setAuthMode('login')}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`auth-tab-btn ${authMode === 'signup' ? 'active' : ''}`}
              onClick={() => setAuthMode('signup')}
            >
              Create Account
            </button>
          </div>

          {authMessage && (
            <div style={{ padding: '0.75rem', background: '#1c1c20', border: '1px solid #ffffff', borderRadius: '8px', fontSize: '0.8rem', color: '#ffffff', textAlign: 'center', marginBottom: '1rem' }}>
              {authMessage}
            </div>
          )}

          <form className="auth-form" onSubmit={handleAuthSubmit}>
            {authMode === 'signup' && (
              <div className="form-group">
                <label className="form-label" htmlFor="auth-name-input">Full Name</label>
                <input
                  id="auth-name-input"
                  type="text"
                  required
                  className="form-input"
                  placeholder="Alex Vance"
                  value={authName}
                  onChange={e => setAuthName(e.target.value)}
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="auth-email-input">Email Address</label>
              <input
                id="auth-email-input"
                type="email"
                required
                className="form-input"
                placeholder="alex@domain.com"
                value={authEmail}
                onChange={e => setAuthEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label" htmlFor="auth-password-input">Password</label>
                {authMode === 'login' && (
                  <a href="#reset" onClick={e => { e.preventDefault(); alert('Password reset link dispatched to your email.'); }} style={{ fontSize: '0.75rem', color: '#8e8e93', textDecoration: 'underline' }}>
                    Forgot?
                  </a>
                )}
              </div>
              <input
                id="auth-password-input"
                type="password"
                required
                className="form-input"
                placeholder="••••••••••••"
                value={authPassword}
                onChange={e => setAuthPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', marginTop: '0.75rem', borderRadius: '9999px' }}
            >
              {authMode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>

      {/* =====================================================================
          10. SLIDE-OVER CART DRAWER
          ===================================================================== */}
      <div className={`cart-overlay ${cartOpen ? 'open' : ''}`} onClick={() => setCartOpen(false)}>
        <aside
          className="cart-drawer"
          onClick={e => e.stopPropagation()}
          aria-label="Shopping Cart Drawer"
        >
          <div className="cart-header">
            <h2 className="cart-title">Your Order ({totalCartCount})</h2>
            <button
              type="button"
              className="cart-close-btn"
              onClick={() => setCartOpen(false)}
              aria-label="Close Shopping Cart"
            >
              ✕
            </button>
          </div>

          <div className="cart-items-list">
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#8e8e93' }}>
                <p>Your peripheral cart is currently empty.</p>
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ marginTop: '1.25rem' }}
                  onClick={() => setCartOpen(false)}
                >
                  Explore Hardware
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-thumb" />
                  <div className="cart-item-info">
                    <h4 className="cart-item-title">{item.name}</h4>
                    <span className="cart-item-price">${item.price}</span>
                    <div className="cart-qty-ctrl">
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="qty-num">{item.quantity}</span>
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span style={{ fontWeight: '600', color: '#ffffff', fontVariantNumeric: 'tabular-nums' }}>
                    ${item.price * item.quantity}
                  </span>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="cart-footer">
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d4d4d8', fontSize: '0.85rem' }}>
                <span>Complimentary Express Shipping</span>
                <span style={{ color: getActiveThemeColor(), fontWeight: '600' }}>FREE</span>
              </div>
              <div className="cart-total-row">
                <span>Subtotal</span>
                <span>${totalCartPrice}</span>
              </div>
              <button
                type="button"
                className="btn-primary"
                style={{ width: '100%', borderRadius: '9999px' }}
                onClick={() => setCheckoutNotice(true)}
              >
                Proceed to Checkout
              </button>
              {checkoutNotice && (
                <div style={{ padding: '0.85rem', background: '#1c1c20', border: '1px solid #ffffff', borderRadius: '8px', fontSize: '0.8rem', color: '#ffffff', textAlign: 'center' }}>
                  ✓ Secure checkout initialized. Batch packed in custom anti-static foam.
                </div>
              )}
            </div>
          )}
        </aside>
      </div>

      {/* =====================================================================
          11. SITE FOOTER
          ===================================================================== */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h3 className="footer-brand-name">NOCTURNE</h3>
              <p className="footer-brand-desc">
                An artisan engineering atelier devoted to bespoke mechanical keyboards, solid aluminum enclosures, and magnesium alloy precision mice.
              </p>
            </div>

            <div>
              <h4 className="footer-col-title">Keyboards (8)</h4>
              <ul className="footer-nav-list">
                <li><a href="#keyboards" className="footer-nav-link">60% Minimalist Compact</a></li>
                <li><a href="#keyboards" className="footer-nav-link">Apex TKL Tournament</a></li>
                <li><a href="#keyboards" className="footer-nav-link">Aether Alice Split</a></li>
                <li><a href="#keyboards" className="footer-nav-link">Zenith 75% Rotary</a></li>
                <li><a href="#keyboards" className="footer-nav-link">Matrix Columnar Split</a></li>
                <li><a href="#keyboards" className="footer-nav-link">Titan Monolith 100%</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title">Precision Mice (8)</h4>
              <ul className="footer-nav-list">
                <li><a href="#mice" className="footer-nav-link">Aerox Honeycomb Light</a></li>
                <li><a href="#mice" className="footer-nav-link">Master Sculpt Pro</a></li>
                <li><a href="#mice" className="footer-nav-link">Orthos 57° Vertical</a></li>
                <li><a href="#mice" className="footer-nav-link">Strife 28g Fingertip</a></li>
                <li><a href="#mice" className="footer-nav-link">Vector Carbon MMO</a></li>
                <li><a href="#mice" className="footer-nav-link">Solid Magnesium Shell</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title">Client Concierge</h4>
              <ul className="footer-nav-list">
                <li><a href="#about" className="footer-nav-link">Our Mission</a></li>
                <li><a href="#support" className="footer-nav-link">Contact Support</a></li>
                <li><a href="#faq" className="footer-nav-link">FAQ Knowledge Base</a></li>
                <li><a href="#policies" className="footer-nav-link">Shipping & Returns</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 Nocturne Peripherals Atelier. All rights reserved.</span>
            <span>Pure Semantic HTML5, Vanilla CSS & Poppins Typography.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
