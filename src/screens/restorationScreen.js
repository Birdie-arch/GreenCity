// Restoration Screen: Visual Before/After Transformation with District Tailored Metrics
import { gameState } from '../state.js';
import { renderDiorama, setupDioramaComparisonEvents } from '../components/diorama.js';
import { sound } from '../audio.js';

const DISTRICT_RESTO_TEXTS = {
  riverside: {
    sub: 'Watch the canal water turn crystal clear and koi fish return to the stream!',
    statLabel: 'Water Clarity',
    statVal: '100% Sparkling'
  },
  downtown: {
    sub: 'Watch vehicle smog dissolve as electric streetcars glide and golden trees flourish!',
    statLabel: 'Air Purity',
    statVal: '100% Breathable'
  },
  industrial: {
    sub: 'Watch black smokestack soot vanish as clean wind turbines and waterwheels awaken!',
    statLabel: 'Emissions Neutralized',
    statVal: '95% Clean Steam'
  },
  residential: {
    sub: 'Watch dry lawns blossom with organic vegetable gardens, sakura, and rooftop solar!',
    statLabel: 'Soil & Canopy Health',
    statVal: '100% Regenerated'
  }
};

export function renderRestorationScreen() {
  const mission = gameState.getActiveMission();
  const district = gameState.getActiveDistrict();
  const preview = gameState.getPlanPreview();
  const textInfo = DISTRICT_RESTO_TEXTS[district.id] || DISTRICT_RESTO_TEXTS.riverside;

  return `
    <div class="screen restoration-screen">
      <div class="restoration-header-strip">
        <div class="restoration-badge">
          <span class="sparkle-anim">✨</span>
          <span class="badge-text">Restoring ${district.name}: ${mission.title}...</span>
          <span class="sparkle-anim">✨</span>
        </div>
        <p class="restoration-subtitle">${textInfo.sub}</p>
      </div>

      <!-- Restored Isometric Diorama with Interactive Comparison -->
      <div class="restoration-diorama-wrap">
        ${renderDiorama({ forceRestored: true, showComparison: true })}
      </div>

      <!-- Transformation Progress Card -->
      <div class="restoration-control-card bounce-in">
        <div class="restoration-stats-row">
          <div class="resto-stat">
            <span class="resto-stat-label">${textInfo.statLabel}</span>
            <span class="resto-stat-val text-green">${textInfo.statVal}</span>
          </div>
          <div class="resto-stat">
            <span class="resto-stat-label">Pollution Reduced</span>
            <span class="resto-stat-val text-green">-${Math.max(1, mission.startingPollution - preview.predictedPollution)} Points</span>
          </div>
          <div class="resto-stat">
            <span class="resto-stat-label">Green Score</span>
            <span class="resto-stat-val text-green">${preview.projectedScore}%</span>
          </div>
        </div>

        <div class="restoration-actions">
          <button class="cozy-btn primary-btn large-btn" id="btn-view-results">
            <span>View Mission Results</span>
            <span class="btn-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

export function setupRestorationEvents() {
  setupDioramaComparisonEvents();

  const resultsBtn = document.getElementById('btn-view-results');
  if (resultsBtn) {
    resultsBtn.addEventListener('click', () => {
      sound.playVictory();
      gameState.completeMission();
      gameState.setScreen('RESULTS');
    });
  }
}
