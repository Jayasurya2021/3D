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
    setShoesVisible, setShoesColor
  } = useModelStore();
  const [activeTab, setActiveTab] = useState('customize');

  // Dynamic pricing calculation
  const totalCost = (shirtVisible ? 85 : 0) + (pantVisible ? 60 : 0) + (shoesVisible ? 120 : 0);

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
            {/* Clothing Toggles */}
            <div className="glass-section">
          <span className="section-label">Wardrobe Visibility</span>
          <div className="toggle-grid">
            <div className="toggle-item" onClick={() => setShirtVisible(!shirtVisible)}>
              <div className={`toggle-icon ${shirtVisible ? 'active' : ''}`} />
              <span>Shirt</span>
            </div>
            <div className="toggle-item" onClick={() => setPantVisible(!pantVisible)}>
              <div className={`toggle-icon ${pantVisible ? 'active' : ''}`} />
              <span>Pant</span>
            </div>
            <div className="toggle-item" onClick={() => setShoesVisible(!shoesVisible)}>
              <div className={`toggle-icon ${shoesVisible ? 'active' : ''}`} />
              <span>Shoes</span>
            </div>
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
                  <span>Silk Shirt</span>
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
