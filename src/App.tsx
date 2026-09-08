import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeHero } from './components/HomeHero';
import { JourneyFlow } from './components/JourneyFlow';
import { ExploreRings } from './components/ExploreRings';
import { CollectionsView } from './components/CollectionsView';
import { EditorialPages } from './components/EditorialPages';
import { ProductDetailModal } from './components/ProductDetailModal';
import { MyStoriesModal } from './components/MyStoriesModal';
import { CartDrawer } from './components/CartDrawer';
import { RingConfiguration, ProductListing, DiamondShape } from './types';
import { ESSENCE_ARCHETYPES, INTENTION_OUTCOMES } from './data/parissaData';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useShopifyCheckout } from './hooks/useShopifyCheckout';

type EditorialPage = 'journal' | 'about' | 'craft';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const [presetShape, setPresetShape] = useState<DiamondShape>('oval');

  const { createCheckout, isConfigured } = useShopifyCheckout();

  // Modals & Drawers
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isStoriesOpen, setIsStoriesOpen] = useState(false);
  const [selectedProductForPDP, setSelectedProductForPDP] = useState<ProductListing | null>(null);

  // Cart / Atelier Bag Items
  const [cartItems, setCartItems] = useState<RingConfiguration[]>(() => {
    try {
      const saved = localStorage.getItem('parissa_bag');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Saved Stories / Talisman Archive
  const [savedStories, setSavedStories] = useState<RingConfiguration[]>(() => {
    try {
      const saved = localStorage.getItem('parissa_stories');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'parissa-seed-story',
        title: 'The Solar Sovereign & The Light of Pure Sovereignty',
        hand: 'left',
        finger: 'ring',
        shape: 'oval',
        collection: 'The Constellation',
        diamondType: 'natural',
        carat: 2.0,
        metal: '18k-yellow-gold',
        ringSize: 6.5,
        bandWidth: 'classic',
        essenceArchetype: ESSENCE_ARCHETYPES.Leo,
        essenceGem: ESSENCE_ARCHETYPES.Leo.essenceGem,
        intentionOutcome: INTENTION_OUTCOMES.emerald_sovereignty,
        intentionGem: INTENTION_OUTCOMES.emerald_sovereignty.intentionGem,
        birthData: {
          date: '1995-08-14',
          city: 'Melbourne, Australia',
          time: '06:45',
          isExactTimeKnown: true,
        },
        savedAt: 'Aug 14, 2026',
        priceDisplay: 'Price on request',
        leadTime: '2–4 Weeks Made to Order in Melbourne',
      },
    ];
  });

  // Persist to local storage
  useEffect(() => {
    try {
      localStorage.setItem('parissa_bag', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('parissa_stories', JSON.stringify(savedStories));
    } catch {
      // ignore
    }
  }, [savedStories]);

  // Derived current view from URL
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const currentView = pathSegments[0] ?? 'home';

  // Handlers
  const handleStartJourney = (shape?: DiamondShape) => {
    if (shape) setPresetShape(shape);
    navigate('/journey');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreRings = () => {
    navigate('/explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (config: RingConfiguration) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === config.id);
      if (existing) return prev;
      return [config, ...prev];
    });
    setIsBagOpen(true);
  };

  const handleSaveStory = (config: RingConfiguration) => {
    setSavedStories((prev) => {
      const existing = prev.find((item) => item.id === config.id);
      if (existing) return prev;
      return [config, ...prev];
    });
  };

  const handleRemoveFromBag = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRemoveStory = (id: string) => {
    setSavedStories((prev) => prev.filter((item) => item.id !== id));
  };

  const isConfigSaved = (configId: string) => {
    return savedStories.some((item) => item.id === configId);
  };

  const handleNavigate = (view: string) => {
    navigate(`/${view}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F7F2] text-[#1A1A1A] font-sans selection:bg-[#E8E4D9] selection:text-[#1A1A1A]">
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        bagCount={cartItems.length}
        savedStoriesCount={savedStories.length}
        onOpenBag={() => setIsBagOpen(true)}
        onOpenStories={() => setIsStoriesOpen(true)}
      />

      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <HomeHero
                  onStartJourney={() => handleStartJourney('oval')}
                  onExploreRings={handleExploreRings}
                />
              </ErrorBoundary>
            }
          />
          <Route
            path="/journey"
            element={
              <ErrorBoundary>
                <JourneyFlow
                  initialPresetShape={presetShape}
                  onBackToHome={() => navigate('/')}
                  onAddToCart={handleAddToCart}
                  onSaveStory={handleSaveStory}
                  isConfigSaved={isConfigSaved}
                />
              </ErrorBoundary>
            }
          />
          <Route
            path="/explore"
            element={
              <ErrorBoundary>
                <ExploreRings
                  onPersonalizeRing={(product) => handleStartJourney(product.shape)}
                  onOpenProductDetail={(product) => setSelectedProductForPDP(product)}
                />
              </ErrorBoundary>
            }
          />
          <Route
            path="/collections"
            element={
              <ErrorBoundary>
                <CollectionsView
                  onStartJourney={() => handleStartJourney('oval')}
                  onExploreCollection={() => navigate('/explore')}
                />
              </ErrorBoundary>
            }
          />
          <Route
            path="/journal"
            element={
              <ErrorBoundary>
                <EditorialPages
                  pageType="journal"
                  onStartJourney={() => handleStartJourney('oval')}
                />
              </ErrorBoundary>
            }
          />
          <Route
            path="/about"
            element={
              <ErrorBoundary>
                <EditorialPages
                  pageType="about"
                  onStartJourney={() => handleStartJourney('oval')}
                />
              </ErrorBoundary>
            }
          />
          <Route
            path="/craft"
            element={
              <ErrorBoundary>
                <EditorialPages
                  pageType="craft"
                  onStartJourney={() => handleStartJourney('oval')}
                />
              </ErrorBoundary>
            }
          />
          <Route
            path="*"
            element={
              <ErrorBoundary>
                <HomeHero
                  onStartJourney={() => handleStartJourney('oval')}
                  onExploreRings={handleExploreRings}
                />
              </ErrorBoundary>
            }
          />
        </Routes>
      </main>

      <Footer
        onStartJourney={() => handleStartJourney('oval')}
        onNavigate={handleNavigate}
      />

      {selectedProductForPDP && (
        <ProductDetailModal
          product={selectedProductForPDP}
          onClose={() => setSelectedProductForPDP(null)}
          onPersonalize={(product) => {
            setSelectedProductForPDP(null);
            handleStartJourney(product.shape);
          }}
        />
      )}

      {isStoriesOpen && (
        <MyStoriesModal
          stories={savedStories}
          onClose={() => setIsStoriesOpen(false)}
          onRemoveStory={handleRemoveStory}
          onSelectStoryForAtelier={(config) => {
            handleAddToCart(config);
            setIsStoriesOpen(false);
          }}
          onStartNewJourney={() => {
            setIsStoriesOpen(false);
            handleStartJourney('oval');
          }}
        />
      )}

      <CartDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromBag}
        onStartJourney={() => {
          setIsBagOpen(false);
          handleStartJourney('oval');
        }}
        onCheckout={() => createCheckout(cartItems)}
        isCheckoutReady={isConfigured}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
