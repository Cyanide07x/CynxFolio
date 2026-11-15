import { useState, useRef } from 'react';

/**
 * CynxKageMockup
 * Code-rendered interactive Flutter phone mockup for Cynx Kage E-Commerce app.
 * Built with locked viewport dimensions to eliminate size shifts during tab switches,
 * delivering native-feeling cross-fade transitions and live theme shifts.
 */
export default function CynxKageMockup() {
  const [activeTab, setActiveTab] = useState('shop');
  const [theme, setTheme] = useState('cynx'); // 'cynx' or 'forest'
  const [activeCategory, setActiveCategory] = useState('All');
  const [quantity, setQuantity] = useState(2);
  const [couponApplied, setCouponApplied] = useState(false);
  const [isWiping, setIsWiping] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const cardRef = useRef(null);

  const categories = ['All', 'Men', 'Women', 'Unisex', 'Street'];
  const unitPrice = 599;
  const delivery = 99;
  const discount = couponApplied ? 200 : 0;
  const subtotal = unitPrice * quantity;
  const total = Math.max(0, subtotal + delivery - discount);

  const handleTabSwitch = (tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setIsWiping(true);
    setTimeout(() => {
      setIsWiping(false);
    }, 280);
  };

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `perspective(1000px) rotateY(${x * 0.04}deg) rotateX(${-y * 0.04}deg)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    }
  };

  const applyCoupon = () => {
    setCouponApplied(!couponApplied);
  };

  const handlePlaceOrder = () => {
    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 2400);
  };

  const isForest = theme === 'forest';

  return (
    <div
      ref={cardRef}
      className={`phone-mockup-frame kage-phone-frame ${isForest ? 'theme-forest' : 'theme-cynx'}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Wipe layer during tab transitions */}
      <div className={`shard-wipe-layer ${isWiping ? 'is-active' : ''}`} aria-hidden="true" />

      {/* Top Controls: Screen Tabs & Dual Theme Switcher */}
      <div className="kage-top-controls">
        <div className="phone-tabs-bar" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'shop'}
            className={`phone-tab ${activeTab === 'shop' ? 'is-active' : ''}`}
            onClick={() => handleTabSwitch('shop')}
          >
            Store
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'cart'}
            className={`phone-tab ${activeTab === 'cart' ? 'is-active' : ''}`}
            onClick={() => handleTabSwitch('cart')}
          >
            Cart ({quantity})
          </button>
        </div>

        {/* Dual Theme Pill Switcher */}
        <button
          type="button"
          className="kage-theme-toggle-pill"
          onClick={() => setTheme(isForest ? 'cynx' : 'forest')}
          title="Toggle Forest / Cynx App Theme"
        >
          <span className={`theme-dot ${isForest ? 'dot-forest' : 'dot-cynx'}`} />
          <span>{isForest ? 'Forest Theme' : 'Cynx Theme'}</span>
        </button>
      </div>

      {/* Locked Screen Viewport (Size Never Changes) */}
      <div className="kage-screen-viewport">
        {/* Store Screen Pane */}
        <div className={`kage-tab-pane ${activeTab === 'shop' ? 'is-active' : ''}`}>
          {/* App Top Bar */}
          <div className="kage-app-bar">
            <div className="kage-brand-title">
              <span className="brand-badge-ck">CK</span>
              <span className="brand-name-txt">CYNX KAGE</span>
            </div>
            <div className="kage-app-bar-icons">
              <span className="kage-badge-icon">🔔</span>
              <span className="kage-badge-icon badge-count">🛍️ <b>{quantity}</b></span>
            </div>
          </div>

          {/* Hero Banner */}
          <div className="kage-hero-banner">
            <span className="kage-hero-sub">GEAR for the ones who</span>
            <span className="kage-hero-main">move <i>Differently...</i></span>
          </div>

          {/* Search Bar */}
          <div className="kage-search-bar">
            <span className="search-icon">🔍</span>
            <span className="search-placeholder">Search jackets, cargos...</span>
          </div>

          {/* Category Chips */}
          <div className="kage-category-row">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`kage-cat-chip ${activeCategory === cat ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Product Card */}
          <div className="kage-product-card">
            <div className="kage-product-thumb">
              <div className="kage-graphic-art">
                <span className="kage-art-symbol">⚔️</span>
                <span className="kage-art-tag">SHADOWS SHAPE A BETTER YOU</span>
              </div>
              <span className="product-badge-new">+ NEW</span>
              <button
                type="button"
                className="product-wishlist-heart"
                aria-label="Wishlist"
              >
                ♥
              </button>
            </div>

            <div className="kage-product-info">
              <div className="product-name-row">
                <h5>Kage Oversized Tee</h5>
                <span className="product-price">₹{unitPrice}</span>
              </div>
              <p className="product-meta">Size S · Olive Streetwear Fit</p>

              <div className="kage-qty-row">
                <span className="qty-label">Qty:</span>
                <div className="qty-stepper">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <span className="qty-number">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="kage-add-cart-btn"
                  onClick={() => handleTabSwitch('cart')}
                >
                  View Cart →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cart Screen Pane */}
        <div className={`kage-tab-pane ${activeTab === 'cart' ? 'is-active' : ''}`}>
          {/* Checkout Header */}
          <div className="kage-checkout-header">
            <h4>Cart & Checkout</h4>
            <span className="delivery-free-notice">
              ✓ Free delivery unlocked above ₹999
            </span>
          </div>

          {/* Cart Item Summary */}
          <div className="kage-cart-item">
            <div className="cart-item-info">
              <h6>Kage Oversized Tee (x{quantity})</h6>
              <span className="cart-item-sub">Heavyweight 240 GSM Cotton</span>
            </div>
            <span className="cart-item-price">₹{subtotal}</span>
          </div>

          {/* Coupon Code Section */}
          <div className="kage-coupon-box">
            <div className="coupon-left">
              <span className="coupon-icon">🏷️</span>
              <div>
                <span className="coupon-title">FLAT ₹200 OFF Coupon</span>
                <span className="coupon-code-label">Code: FLAT200</span>
              </div>
            </div>
            <button
              type="button"
              className={`coupon-apply-btn ${couponApplied ? 'is-applied' : ''}`}
              onClick={applyCoupon}
            >
              {couponApplied ? 'Applied ✓' : 'Apply'}
            </button>
          </div>

          {/* Pricing Summary */}
          <div className="kage-price-table">
            <div className="price-row">
              <span>Subtotal ({quantity} items)</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="price-row">
              <span>Delivery fee</span>
              <span className="free-tag">₹{delivery}</span>
            </div>
            {couponApplied && (
              <div className="price-row discount-row">
                <span>Coupon Discount</span>
                <span>−₹{discount}</span>
              </div>
            )}
            <div className="price-row total-row">
              <span>Total Payable</span>
              <span className="total-val">₹{total}</span>
            </div>
          </div>

          {/* Place Order CTA */}
          <button
            type="button"
            className={`kage-checkout-cta ${orderSuccess ? 'order-success' : ''}`}
            onClick={handlePlaceOrder}
          >
            {orderSuccess ? '✓ Order Placed with Firebase!' : `Place Order · ₹${total} →`}
          </button>
        </div>
      </div>
    </div>
  );
}
