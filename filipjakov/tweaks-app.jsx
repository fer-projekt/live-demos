/* Tweaks panel for the Sv. Filip i Jakov page */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroLayout": "left",
  "heroOverlay": 55
}/*EDITMODE-END*/;

function applyTweaks(t) {
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.classList.toggle('hero-centered', t.heroLayout === 'centered');
  }
  document.documentElement.style.setProperty('--hero-overlay', (t.heroOverlay / 100).toFixed(2));
}

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => { applyTweaks(t); }, [t]);
  return (
    <TweaksPanel>
      <TweakSection label="Hero" />
      <TweakRadio
        label="Headline position"
        value={t.heroLayout}
        options={['left', 'centered']}
        onChange={(v) => setTweak('heroLayout', v)}
      />
      <TweakSlider
        label="Overlay darkness"
        value={t.heroOverlay}
        min={20} max={80} unit="%"
        onChange={(v) => setTweak('heroOverlay', v)}
      />
    </TweaksPanel>
  );
}

// Apply persisted/default tweaks immediately on load (before user opens panel)
try {
  const saved = JSON.parse(localStorage.getItem('tweaks') || 'null');
  applyTweaks(Object.assign({}, TWEAK_DEFAULTS, saved || {}));
} catch (e) {
  applyTweaks(TWEAK_DEFAULTS);
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<TweaksApp />);
