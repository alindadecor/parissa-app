export function JourneyHeader() {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        background: 'transparent',
      }}
    >
      {/* Logo */}
      <a
        href="https://parissa-diamond-tta2zg1y.myshopify.com"
        style={{ textDecoration: 'none' }}
      >
        <img
          src="https://cdn.shopify.com/s/files/1/1011/5058/9226/files/Parissa_logo-02.png"
          alt="PARISSA"
          style={{ height: '28px', objectFit: 'contain' }}
        />
      </a>

      {/* Exit */}
      <a
        href="https://parissa-diamond-tta2zg1y.myshopify.com"
        style={{
          fontFamily: 'sans-serif',
          fontSize: '10px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#1A1A1A',
          textDecoration: 'none',
          opacity: 0.6,
        }}
      >
        ← Exit Journey
      </a>
    </header>
  );
}
