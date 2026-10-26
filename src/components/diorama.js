// Diorama Component: Orthographic / Isometric miniature world renderer
import { gameState } from '../state.js';

// District-specific Diorama Artworks
const DISTRICT_ART = {
  riverside: {
    polluted: './assets/riverside_polluted.jpg',
    restored: './assets/riverside_restored.jpg',
    label: 'Riverside Canal'
  },
  downtown: {
    polluted: './assets/downtown_polluted.jpg',
    restored: './assets/downtown_restored.jpg',
    label: 'Downtown Commercial'
  },
  industrial: {
    polluted: './assets/industrial_polluted.jpg',
    restored: './assets/industrial_restored.jpg',
    label: 'Industrial Zone'
  },
  residential: {
    polluted: './assets/residential_polluted.jpg',
    restored: './assets/residential_restored.jpg',
    label: 'Residential Neighbourhood'
  }
};

// Maps improvement IDs across all 12 missions to visible badges in the diorama
const IMPROVEMENT_BADGE_MAP = {
  // District 1: Riverside
  river_cleanup:        { label: 'Canal Cleaned', icon: '✨' },
  recycling_bins:       { label: 'Eco Stations', icon: '♻️' },
  planters:             { label: 'Flower Planters', icon: '🌸' },
  embankment_restore:   { label: 'Bio-Reeds', icon: '🌿' },
  cherry_trees:         { label: 'Golden Maples', icon: '🍁' },
  mini_park:            { label: 'Riverside Path', icon: '🪑' },
  pollinator_garden:    { label: 'Wildflower Meadows', icon: '🦋' },
  water_aerator:        { label: 'Water Aerator', icon: '💧' },
  tea_shop:             { label: 'Tea & Flower Shop', icon: '🍵' },
  footbridge:           { label: 'Wooden Footbridge', icon: '🌉' },
  compost_hub:          { label: 'Compost Hub', icon: '🍂' },
  solar_canopies:       { label: 'Solar Canopies', icon: '🔋' },

  // District 2: Downtown Commercial
  electric_tram:        { label: 'Electric Streetcar', icon: '🚃' },
  bike_corridor:        { label: 'Protected Bike Lane', icon: '🚲' },
  ginkgo_avenue:        { label: 'Ginkgo Canopy', icon: '🌳' },
  smog_shelters:        { label: 'Moss Bus Shelter', icon: '🚏' },
  carfree_plaza:        { label: 'Cobblestone Plaza', icon: '🚶' },
  vertical_gardens:     { label: 'Vertical Living Wall', icon: '🌿' },
  rain_pavers:          { label: 'Rain Gardens', icon: '🌧️' },
  solar_fountains:      { label: 'Solar Fountains', icon: '⛲' },
  rooftop_solar_farm:   { label: 'Rooftop Solar Array', icon: '☀️' },
  rooftop_greenhouse:   { label: 'Rooftop Apiary', icon: '🐝' },
  night_market:         { label: 'Zero-Waste Market', icon: '🏮' },
  battery_microgrid:    { label: 'Battery Microgrid', icon: '🔋' },

  // District 3: Industrial Zone
  stack_scrubber:       { label: 'Bio-Scrubbers', icon: '🏭' },
  pine_windbreak:       { label: 'Pine Windbreak', icon: '🌲' },
  particulate_monitors: { label: 'Air Sensor Grid', icon: '📡' },
  dust_sprinklers:      { label: 'Mist Sprinklers', icon: '💦' },
  circular_depot:       { label: 'Circular Scrap Depot', icon: '♻️' },
  bio_retention_swale:  { label: 'Wetland Bio-Swale', icon: '🪷' },
  microbe_bioremediation: { label: 'Microbe Cleanse', icon: '🔬' },
  solar_carports:       { label: 'Electric Forklifts', icon: '🚜' },
  wind_turbines:        { label: 'Wind Turbines', icon: '💨' },
  cogeneration_plant:   { label: 'Cogeneration Plant', icon: '🔥' },
  eco_makerspace:       { label: 'Eco Makerspace', icon: '🔧' },
  lily_waterwheel:      { label: 'Lily Waterwheel', icon: '🪵' },

  // District 4: Residential Neighbourhood
  veggie_gardens:       { label: 'Vegetable Gardens', icon: '🥕' },
  compost_tumblers:     { label: 'Compost Tumblers', icon: '🪵' },
  sakura_canopy:        { label: 'Flowering Sakura', icon: '🌸' },
  bird_nesting:         { label: 'Songbird Sanctuary', icon: '🐦' },
  permeable_bricks:     { label: 'Permeable Bricks', icon: '🧱' },
  rain_cisterns:        { label: 'Rain Cisterns', icon: '🪣' },
  solar_benches:        { label: 'Solar Lanterns', icon: '🪑' },
  tool_library:         { label: 'Tool Sharing Shed', icon: '🏡' },
  residential_solar:    { label: 'Rooftop Solar Co-op', icon: '⚡' },
  ev_carshare:          { label: 'EV Car-Share Hub', icon: '🚗' },
  nature_pond:          { label: 'Natural Lily Pond', icon: '🐸' },
  eco_village_hall:     { label: 'Eco-Village Hall', icon: '📚' }
};

export function renderDiorama({ forceRestored = false, showComparison = false } = {}) {
  const isRestored = forceRestored || ['RESTORATION', 'RESULTS'].includes(gameState.currentScreen);
  const activeImprovements = Array.from(gameState.selectedImprovementIds);
  const district = gameState.getActiveDistrict();
  const art = DISTRICT_ART[district.id] || DISTRICT_ART.riverside;

  return `
    <div class="diorama-stage" id="diorama-stage">
      <div class="diorama-slab-wrapper">
        <!-- Isometric diorama view with dynamic cozy lighting -->
        <div class="diorama-frame ${isRestored ? 'state-restored' : 'state-polluted'} lighting-${gameState.lightingMode || 'day'}" id="diorama-frame">
          <img 
            src="${art.polluted}" 
            alt="Polluted ${art.label}" 
            class="diorama-img polluted-layer ${isRestored && !showComparison ? 'fade-out' : 'fade-in'}" 
          />
          <img 
            src="${art.restored}" 
            alt="Restored ${art.label}" 
            class="diorama-img restored-layer ${isRestored ? 'fade-in' : 'fade-out'}" 
          />

          <!-- Ambient lighting overlays (Day/Sunset/Night) -->
          ${gameState.lightingMode === 'night' ? `<div class="night-lantern-glow" aria-hidden="true"></div>` : ''}

          <!-- Ambient particles: drifting golden autumn leaves -->
          <div class="ambient-leaves" aria-hidden="true">
            <span class="leaf p1">🍂</span>
            <span class="leaf p2">🍁</span>
            <span class="leaf p3">🍃</span>
            <span class="leaf p4">🍂</span>
            <span class="leaf p5">🍃</span>
          </div>

          <!-- Improvement Badges overlay — all missions covered -->
          <div class="diorama-badge-overlay" id="diorama-badges">
            ${activeImprovements.map(id => {
              const item = IMPROVEMENT_BADGE_MAP[id];
              return item ? `
                <div class="diorama-prop-badge active bounce-in">
                  <span class="badge-icon">${item.icon}</span>
                  <span class="badge-text">${item.label}</span>
                </div>
              ` : '';
            }).join('')}
          </div>

          <!-- Interactive Before / After toggle (available in Restoration & Results screens) -->
          ${showComparison ? `
            <div class="comparison-pill-toggle">
              <button class="comp-btn ${!isRestored ? 'active' : ''}" id="btn-show-before">Before</button>
              <button class="comp-btn ${isRestored ? 'active' : ''}" id="btn-show-after">After Clean</button>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

export function setupDioramaComparisonEvents() {
  const frame = document.getElementById('diorama-frame');
  const btnBefore = document.getElementById('btn-show-before');
  const btnAfter = document.getElementById('btn-show-after');

  if (!frame || !btnBefore || !btnAfter) return;

  btnBefore.addEventListener('click', () => {
    frame.classList.remove('state-restored');
    frame.classList.add('state-polluted');
    btnBefore.classList.add('active');
    btnAfter.classList.remove('active');
    const polluted = frame.querySelector('.polluted-layer');
    const restored = frame.querySelector('.restored-layer');
    if (polluted) { polluted.classList.remove('fade-out'); polluted.classList.add('fade-in'); }
    if (restored) { restored.classList.remove('fade-in'); restored.classList.add('fade-out'); }
  });

  btnAfter.addEventListener('click', () => {
    frame.classList.remove('state-polluted');
    frame.classList.add('state-restored');
    btnAfter.classList.add('active');
    btnBefore.classList.remove('active');
    const polluted = frame.querySelector('.polluted-layer');
    const restored = frame.querySelector('.restored-layer');
    if (polluted) { polluted.classList.remove('fade-in'); polluted.classList.add('fade-out'); }
    if (restored) { restored.classList.remove('fade-out'); restored.classList.add('fade-in'); }
  });
}
