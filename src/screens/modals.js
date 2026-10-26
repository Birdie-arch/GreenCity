// Modals for Guide, Settings, and Eco Trophy Hall
import { gameState } from '../state.js';
import { sound } from '../audio.js';

const ALL_ACHIEVEMENTS = [
  // Riverside District
  { id: 'river_restorer', district: 'Riverside', title: 'River Restorer', icon: '🌊', desc: 'Dredge plastic sludge and purify the historic canal in Mission 1.' },
  { id: 'nature_weaver', district: 'Riverside', title: 'Nature Weaver', icon: '🦋', desc: 'Plant golden maples and wildflower pollinator meadows in Mission 2.' },
  { id: 'district_champion', district: 'Riverside', title: 'Riverside Champion', icon: '👑', desc: 'Reopen the tea stall, restore the footbridge, and unlock Downtown.' },

  // Downtown Commercial
  { id: 'tram_conductor', district: 'Downtown', title: 'Tram Conductor', icon: '🚃', desc: 'Lays quiet electric streetcars and curbside ginkgo tree avenues in Mission 1.' },
  { id: 'plaza_architect', district: 'Downtown', title: 'Plaza Architect', icon: '🚶', desc: 'Convert asphalt roads into cobblestone pedestrian plazas with living ivy walls in Mission 2.' },
  { id: 'downtown_visionary', district: 'Downtown', title: 'Downtown Visionary', icon: '🏙️', desc: 'Install rooftop solar arrays, open the night market, and unlock Industrial Zone.' },

  // Industrial Zone
  { id: 'sky_purifier', district: 'Industrial', title: 'Sky Purifier', icon: '🏭', desc: 'Eliminate toxic smokestack emissions with electrostatic bio-scrubbers in Mission 1.' },
  { id: 'circular_pioneer', district: 'Industrial', title: 'Circular Pioneer', icon: '♻️', desc: 'Construct closed-loop scrap recycling depots and wetland bio-swales in Mission 2.' },
  { id: 'clean_tech_titan', district: 'Industrial', title: 'Clean Tech Titan', icon: '⚡', desc: 'Power factories with low-noise wind turbines and unlock Residential Neighbourhood.' },

  // Residential Neighbourhood
  { id: 'community_gardener', district: 'Residential', title: 'Community Gardener', icon: '🥕', desc: 'Revive dry suburban yards with organic vegetable planter boxes and sakura trees in Mission 1.' },
  { id: 'sponge_builder', district: 'Residential', title: 'Sponge Builder', icon: '🧱', desc: 'Pave permeable clay brick streets and rainwater harvesting cisterns in Mission 2.' },
  { id: 'grand_guardian_master', district: 'Residential', title: 'Grand Guardian Master', icon: '🌟', desc: 'Complete 100% net-zero eco-village harmony across the whole Forgotten City!' }
];

export function renderModals(activeModal) {
  if (!activeModal) return '';

  if (activeModal === 'GUIDE') {
    return `
      <div class="modal-backdrop" id="modal-backdrop">
        <div class="cozy-dialog bounce-in" role="dialog" aria-modal="true" aria-labelledby="guide-title">
          <div class="dialog-header">
            <span class="dialog-icon">📜</span>
            <h3 id="guide-title" class="dialog-title">How to Play GreenCity</h3>
            <button class="dialog-close-btn" id="btn-close-modal" aria-label="Close Guide">✕</button>
          </div>

          <div class="dialog-body guide-content">
            <div class="guide-pillar">
              <span class="pillar-icon">🪙</span>
              <div class="pillar-text">
                <h4>1. Manage Your Coins</h4>
                <p>Each mission grants a restoration budget. Pick improvements delivering the highest ecological impact without exceeding your treasury.</p>
              </div>
            </div>

            <div class="guide-pillar">
              <span class="pillar-icon">🍃</span>
              <div class="pillar-text">
                <h4>2. Green Score & Pollution</h4>
                <p>Pollution Index measures water & air toxicity (lower is better). Green Score measures district health (0 to 100%). Meet or beat the target to win!</p>
              </div>
            </div>

            <div class="guide-pillar">
              <span class="pillar-icon">🤖</span>
              <div class="pillar-text">
                <h4>3. Sprig & AI Forecasts</h4>
                <p>Sprig is your friendly robot companion. Before committing your coins, click "Preview My Plan" to run the genuine scikit-learn ML regression forecast.</p>
              </div>
            </div>

            <div class="guide-pillar">
              <span class="pillar-icon">⭐</span>
              <div class="pillar-text">
                <h4>4. Stars & District Progression</h4>
                <p>Earn up to 3 stars per mission by hitting targets and conserving coins. Complete all 3 missions in a district to unlock the next region!</p>
              </div>
            </div>
          </div>

          <div class="dialog-footer">
            <button class="cozy-btn primary-btn" id="btn-modal-got-it">
              <span>Got it, let's restore!</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  if (activeModal === 'BADGES') {
    const profile = gameState.playerProfile;
    const unlockedSet = new Set(profile.unlockedBadges || []);
    const totalStars = Object.values(profile.completedMissions).reduce((acc, m) => acc + (m.stars || 0), 0);
    const completedCount = Object.keys(profile.completedMissions).length;
    const isMaster = profile.allDistrictsRestored;

    return `
      <div class="modal-backdrop" id="modal-backdrop">
        <div class="cozy-dialog bounce-in trophy-dialog" role="dialog" aria-modal="true" aria-labelledby="badges-title">
          <div class="dialog-header">
            <span class="dialog-icon">🏆</span>
            <h3 id="badges-title" class="dialog-title">Eco Trophy Hall</h3>
            <button class="dialog-close-btn" id="btn-close-modal" aria-label="Close Trophy Hall">✕</button>
          </div>

          <div class="dialog-body trophy-content">
            <!-- Trophy Summary Capsule -->
            <div class="trophy-summary-banner ${isMaster ? 'master-unlocked' : ''}">
              <span class="banner-big-trophy">${isMaster ? '👑' : '🏆'}</span>
              <div class="trophy-banner-text">
                <h4>${isMaster ? 'Grand Guardian of GreenCity' : 'Restoration Progress'}</h4>
                <p>${unlockedSet.size} of 12 Eco Badges Unlocked • ${totalStars} / 36 Stars Earned • ${completedCount} / 12 Missions Complete</p>
              </div>
            </div>

            <!-- Badges Grid -->
            <div class="badges-showcase-grid">
              ${ALL_ACHIEVEMENTS.map(b => {
                const isUnlocked = unlockedSet.has(b.id);
                return `
                  <div class="badge-card ${isUnlocked ? 'badge-earned' : 'badge-locked'}">
                    <div class="badge-icon-box">
                      <span>${isUnlocked ? b.icon : '🔒'}</span>
                    </div>
                    <div class="badge-details">
                      <div class="badge-title-row">
                        <span class="badge-name">${b.title}</span>
                        <span class="badge-district-tag">${b.district}</span>
                      </div>
                      <p class="badge-desc">${b.desc}</p>
                      <span class="badge-status-tag ${isUnlocked ? 'tag-earned' : 'tag-locked'}">
                        ${isUnlocked ? '✓ Unlocked' : 'Locked'}
                      </span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <div class="dialog-footer">
            <button class="cozy-btn primary-btn" id="btn-modal-close-badges">
              <span>Back to City</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  if (activeModal === 'SETTINGS') {
    return `
      <div class="modal-backdrop" id="modal-backdrop">
        <div class="cozy-dialog bounce-in" role="dialog" aria-modal="true" aria-labelledby="settings-title">
          <div class="dialog-header">
            <span class="dialog-icon">⚙️</span>
            <h3 id="settings-title" class="dialog-title">Game Options</h3>
            <button class="dialog-close-btn" id="btn-close-modal" aria-label="Close Settings">✕</button>
          </div>

          <div class="dialog-body settings-content">
            <div class="setting-toggle-row">
              <div class="setting-info">
                <span class="setting-name">Sound Effects</span>
                <span class="setting-desc">Tactile clicks, pops, chimes, and fanfare</span>
              </div>
              <button class="toggle-switch ${sound.sfxEnabled ? 'on' : 'off'}" id="toggle-sfx">
                <span class="toggle-knob"></span>
              </button>
            </div>

            <div class="setting-toggle-row">
              <div class="setting-info">
                <span class="setting-name">Peaceful Music</span>
                <span class="setting-desc">Gentle generative ambient chords</span>
              </div>
              <button class="toggle-switch ${sound.musicEnabled ? 'on' : 'off'}" id="toggle-music">
                <span class="toggle-knob"></span>
              </button>
            </div>

            <div class="setting-danger-zone">
              <div class="setting-info">
                <span class="setting-name">Reset Saved Progress</span>
                <span class="setting-desc">Resets all stars, coins, and completed missions</span>
              </div>
              <button class="cozy-btn danger-btn small-btn" id="btn-reset-save">
                <span>Reset Save</span>
              </button>
            </div>
          </div>

          <div class="dialog-footer">
            <button class="cozy-btn primary-btn" id="btn-modal-close-save">
              <span>Close Options</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  return '';
}

export function setupModalEvents(closeModalCallback) {
  const backdrop = document.getElementById('modal-backdrop');
  const closeBtn = document.getElementById('btn-close-modal');
  const gotItBtn = document.getElementById('btn-modal-got-it');
  const saveCloseBtn = document.getElementById('btn-modal-close-save');
  const badgesCloseBtn = document.getElementById('btn-modal-close-badges');

  const close = () => {
    sound.playPop();
    if (closeModalCallback) closeModalCallback();
  };

  if (closeBtn) closeBtn.addEventListener('click', close);
  if (gotItBtn) gotItBtn.addEventListener('click', close);
  if (saveCloseBtn) saveCloseBtn.addEventListener('click', close);
  if (badgesCloseBtn) badgesCloseBtn.addEventListener('click', close);

  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) close();
    });
  }

  // Settings toggles
  const sfxToggle = document.getElementById('toggle-sfx');
  if (sfxToggle) {
    sfxToggle.addEventListener('click', () => {
      sound.sfxEnabled = !sound.sfxEnabled;
      sound.playPop();
      sfxToggle.className = `toggle-switch ${sound.sfxEnabled ? 'on' : 'off'}`;
    });
  }

  const musicToggle = document.getElementById('toggle-music');
  if (musicToggle) {
    musicToggle.addEventListener('click', () => {
      const active = sound.toggleMusic();
      sound.playPop();
      musicToggle.className = `toggle-switch ${active ? 'on' : 'off'}`;
    });
  }

  const resetSaveBtn = document.getElementById('btn-reset-save');
  if (resetSaveBtn) {
    resetSaveBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset your GreenCity restoration progress?')) {
        sound.playWarning();
        localStorage.removeItem('greencity_save_v2');
        gameState.playerProfile = {
          coins: 150,
          totalCleanups: 0,
          completedMissions: {},
          unlockedBadges: [],
          downtownUnlocked: false,
          industrialUnlocked: false,
          residentialUnlocked: false,
          allDistrictsRestored: false,
          sfxVolume: true,
          musicVolume: false
        };
        gameState.resetCurrentPlan();
        close();
        gameState.setScreen('MAIN_MENU');
      }
    });
  }
}
