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
    activeMaterial, activeEnvironment, autoRotate,
    shirtVisible, shirtColor,
    pantVisible, pantColor,
    shoesVisible, shoesColor,
    setMaterial, setEnvironment, setAutoRotate,
    setShirtVisible, setShirtColor,
    setPantVisible, setPantColor,
    setShoesVisible, setShoesColor,
  } = useModelStore();

  const [activeTab, setActiveTab] = useState('customize');
  const [selectedItem, setSelectedItem] = useState(null);

  // Dynamic pricing calculation
  const totalCost = (shirtVisible ? 85 : 0) + (pantVisible ? 60 : 0) + (shoesVisible ? 120 : 0);

  // Per-item details
  const itemDetails = {
    shirt: { name: 'Shirt', color: shirtColor, material: 'Pure Silk', price: '$85.00' },
    pant: { name: 'Pant', color: pantColor, material: 'Fine Linen', price: '$60.00' },
    shoes: { name: 'Shoes', color: shoesColor, material: 'Genuine Leather', price: '$120.00' },
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
                      gap: '8px',
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '13px', color: 'rgba(200,200,200,0.9)', letterSpacing: '0.04em' }}>
                      {details.name} Details
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'rgba(160,160,160,0.8)' }}>
                      <span>Color</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            width: '11px',
                            height: '11px',
                            borderRadius: '50%',
                            background: details.color,
                            border: '1px solid rgba(255,255,255,0.25)',
                          }}
                        />
                        <span style={{ color: 'rgba(160,160,160,0.8)' }}>{details.color}</span>
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'rgba(160,160,160,0.8)' }}>
                      <span>Material</span>
                      <span>{details.material}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'rgba(200,200,200,0.9)', fontWeight: 600 }}>
                      <span>Price</span>
                      <span>{details.price}</span>
                    </div>
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
                  <span>$85.00</span>
                </div>
              )}
              {pantVisible && (
                <div className="invoice-row">
                  <span>Classic Pant</span>
                  <span>$60.00</span>
                </div>
              )}
              {shoesVisible && (
                <div className="invoice-row">
                  <span>Leather Shoes</span>
                  <span>$120.00</span>
                </div>
              )}

              <div className="invoice-separator" />

              <div className="invoice-total">
                <span>Total</span>
                <span>${totalCost.toFixed(2)}</span>
              </div>

              <button className="checkout-btn">Complete Outfit</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
