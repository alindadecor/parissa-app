import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { shopifyService, ShopifyMenuItem } from '../services/shopifyIntegration';
import { ShoppingBag } from 'lucide-react';

const STORE_URL = 'https://parissa-diamond-tta2zg1y.myshopify.com';

export function ShopifyHeader({ bagCount = 0 }: { bagCount?: number }) {
  const [items, setItems] = useState<ShopifyMenuItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    shopifyService
      .fetchMenus()
      .then((menus) => {
        if (!cancelled && menus?.mainMenu) setItems(menus.mainMenu.items);
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleNavigate = (item: ShopifyMenuItem) => {
    const rel = item.url.replace(STORE_URL, '');
    if (rel === '/collections/all') {
      navigate('/explore');
    } else if (rel === '/') {
      navigate('/journey');
    } else if (rel.startsWith('/collections')) {
      navigate('/collections');
    } else {
      window.location.assign(item.url);
    }
  };

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ backgroundColor: '#2C1810' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href={STORE_URL}
          className="flex items-center"
          aria-label="PARISSA home"
        >
          <img
            src="https://cdn.shopify.com/s/files/1/1011/5058/9226/files/Parissa_logo-02.png"
            alt="PARISSA"
            style={{ height: '32px', objectFit: 'contain' }}
          />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {items.map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={() => handleNavigate(item)}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#F5F0EB',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                opacity: 0.85,
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.85')}
            >
              {item.title}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={`${STORE_URL}/cart`}
            className="relative flex items-center"
            style={{ color: '#F5F0EB', textDecoration: 'none' }}
            aria-label="Shopping bag"
          >
            <ShoppingBag size={19} />
            {bagCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: -8,
                  right: -10,
                  minWidth: 18,
                  height: 18,
                  borderRadius: 999,
                  backgroundColor: '#C9A15A',
                  color: '#1A1A1A',
                  fontSize: 10,
                  fontWeight: 700,
                  fontFamily: 'Inter, sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 4px',
                }}
              >
                {bagCount}
              </span>
            )}
          </a>
          <Link
            to="/journey"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#1A1A1A',
              backgroundColor: '#F5F0EB',
              borderRadius: 999,
              padding: '9px 20px',
              textDecoration: 'none',
            }}
          >
            Begin Journey
          </Link>
        </div>
      </div>
    </header>
  );
}