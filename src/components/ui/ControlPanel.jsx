import { useState } from 'react';
import { useModelStore, SHIRT_COLORS, PANT_COLORS, SHOES_COLORS, MATERIALS, ENVIRONMENTS } from '../../store/useModelStore';

const ColorGrid = ({ title, colors, activeColor, onSelect }) => (
  <div className="color-grid-section">
    <div className="section-mini-label">{title}</div>
    <div className="color-grid">
      {colors && colors.map((color) => (
        <button
          key={color}
          className={`color-swatch ${activeColor.toLowerCase() === color.toLowerCase() ? 'active' : ''}`}
          style={{ backgroundColor: color }}
          onClick={() => onSelect(color)}
        />
      ))}
      <div className="custom-color-btn">
        <input
          type="color"
          value={activeColor}
          onChange={(e) => onSelect(e.target.value)}
          title="Custom Color"
        />
        <div className="custom-color-icon">+</div>
      </div>
    </div>
  </div>
);

export function ControlPanel() {
  const {
    autoRotate,
    shirtVisible, shirtColor,
    pantVisible, pantColor,
    shoesVisible, shoesColor,
    setAutoRotate,
    setShirtColor,
    setPantColor, setShoesColor,
  } = useModelStore();

  const [activeTab, setActiveTab] = useState('customize');
  const [selectedItem, setSelectedItem] = useState(null);

  // Dynamic pricing calculation
  const totalCost = (shirtVisible ? 85 : 0) + (pantVisible ? 60 : 0) + (shoesVisible ? 120 : 0);

  // Per-item details
  const itemDetails = {
    shirt: { name: 'Classic Dress Shirt', brand: 'Raymond', price: '₹1,199', rating: '4.3 / 5', category: "Men's Shirt" },
    pant: { name: 'Formal Slim Pant', brand: 'Arrow', price: '₹1,499', rating: '4.1 / 5', category: "Men's Trouser" },
    shoes: { name: 'Oxford Leather Shoes', brand: 'Clarks', price: '₹2,499', rating: '4.5 / 5', category: "Men's Footwear" },
  };

  const handleSelect = (item) => {
    setSelectedItem((prev) => (prev === item ? null : item));
  };

  const details = selectedItem ? itemDetails[selectedItem] : null;

  const itemLabelStyle = (item) => ({
    cursor: 'pointer',
    fontSize: '13px',
    color: selectedItem === item ? 'rgba(255,255,255,0.9)' : 'rgba(180,180,180,0.6)',
    fontWeight: selectedItem === item ? 600 : 400,
    padding: '6px 10px',
    borderRadius: '8px',
    transition: 'color 0.2s ease, font-weight 0.2s ease',
    userSelect: 'none',
  });

  return (
    <div className="control-panel">
      <div className="panel-inner">
        <div className="panel-header">
          <span className="logo-text">Warderobe</span>
          <p className="panel-subtitle">PREMIUM SHOWCASE</p>
        </div>

        <div className="panel-tabs">
          <button
            className={`tab-btn ${activeTab === 'customize' ? 'active' : ''}`}
            onClick={() => setActiveTab('customize')}
          >
            Customize
          </button>
          <button
            className={`tab-btn ${activeTab === 'summary' ? 'active' : ''}`}
            onClick={() => setActiveTab('summary')}
          >
            Total Price
          </button>
        </div>

        {activeTab === 'customize' && (
          <div className="tab-content" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Item Selector */}
            <div className="glass-section">
              <span className="section-label">Wardrobe</span>
              <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
                {['shirt', 'pant', 'shoes'].map((item) => (
                  <span
                    key={item}
                    style={itemLabelStyle(item)}
                    onClick={() => handleSelect(item)}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </span>
                ))}
              </div>

              {/* Details Panel — fades in when an item is selected */}
              <div
                style={{
                  marginTop: details ? '12px' : '0',
                  maxHeight: details ? '200px' : '0',
                  overflow: 'hidden',
                  opacity: details ? 1 : 0,
                  transition: 'max-height 0.35s ease, opacity 0.3s ease, margin-top 0.3s ease',
                }}
              >
                {details && (
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '10px',
                      padding: '12px 14px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '7px',
                    }}
                  >
                    {[
                      { label: 'Product', value: details.name },
                      { label: 'Brand', value: details.brand },
                      { label: 'Price', value: details.price },
                      { label: 'Rating', value: details.rating },
                      { label: 'Category', value: details.category },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'rgba(160,160,160,0.8)' }}
                      >
                        <span style={{ color: 'rgba(88, 87, 87, 0.7)' }}>{label}</span>
                        <span style={{ textAlign: 'right', color: 'rgba(127, 127, 127, 0.9)' }}>{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Color Customization */}
            <div className="glass-section">
              <span className="section-label">Color Palettes</span>
              {shirtVisible && (
                <ColorGrid
                  title="Shirt Presets"
                  colors={SHIRT_COLORS}
                  activeColor={shirtColor}
                  onSelect={setShirtColor}
                />
              )}
              {pantVisible && (
                <ColorGrid
                  title="Pant Presets"
                  colors={PANT_COLORS}
                  activeColor={pantColor}
                  onSelect={setPantColor}
                />
              )}
              {shoesVisible && (
                <ColorGrid
                  title="Shoes Presets"
                  colors={SHOES_COLORS}
                  activeColor={shoesColor}
                  onSelect={setShoesColor}
                />
              )}
            </div>

            {/* View Controls */}
            <div className="glass-section no-border">
              <div className="view-actions">
                <button
                  className={`view-btn ${autoRotate ? 'active' : ''}`}
                  onClick={() => setAutoRotate(!autoRotate)}
                >
                  {autoRotate ? 'Stop Rotation' : 'Auto Rotate'}
                </button>
              </div>
            </div>

          </div>
        )}

        {activeTab === 'summary' && (
          <div className="glass-section">
            <span className="section-label">Order Summary</span>
            <div className="invoice-section">
              {shirtVisible && (
                <div className="invoice-row">
                  <span>Shirt</span>
                  <span>₹1,199</span>
                </div>
              )}
              {pantVisible && (
                <div className="invoice-row">
                  <span>Classic Pant</span>
                  <span>₹1,499</span>
                </div>
              )}
              {shoesVisible && (
                <div className="invoice-row">
                  <span>Leather Shoes</span>
                  <span>₹2,499</span>
                </div>
              )}

              <div className="invoice-separator" />

              <div className="invoice-total">
                <span>Total</span>
                <span>₹{totalCost.toFixed(2)}</span>
              </div>

              <button className="checkout-btn">Complete Outfit</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
