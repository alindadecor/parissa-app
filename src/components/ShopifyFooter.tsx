import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { shopifyService, ShopifyMenuItem } from '../services/shopifyIntegration';

const STORE_URL = 'https://parissa-diamond-tta2zg1y.myshopify.com';

export function ShopifyFooter() {
  const [items, setItems] = useState<ShopifyMenuItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    shopifyService
      .fetchMenus()
      .then((menus) => {
        if (!cancelled && menus?.footerMenu) setItems(menus.footerMenu.items);
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
    <footer
      style={{
        backgroundColor: '#1A1A1A',
        color: '#F5F0EB',
        padding: '48px 24px',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <span
            style={{
              fontSize: '16px',
              fontWeight: 500,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
            }}
          >
            PARISSA
          </span>
        </div>

        <nav
          className="flex flex-wrap items-center justify-center gap-6 md:gap-8"
          aria-label="Footer"
        >
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

        <div
          style={{
            fontSize: '11px',
            letterSpacing: '0.06em',
            opacity: 0.7,
            textAlign: 'center',
            lineHeight: 1.6,
          }}
        >
          © 2026 PARISSA. Outer Diamond Light · Melbourne, Australia
        </div>
      </div>
    </footer>
  );
}