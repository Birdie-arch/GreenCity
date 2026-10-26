// HUD Component matching the reference style
import { gameState } from '../state.js';
import { sound } from '../audio.js';

export function renderHUD() {
  const mission = gameState.getActiveMission();
  const screen = gameState.currentScreen;
  const isGameActive = ['MISSION_BRIEFING', 'PLANNING', 'PREVIEW', 'RESTORATION', 'RESULTS'].includes(screen);
  
  // Calculate display values
  const preview = gameState.getPlanPreview();
  const currentScore = screen === 'RESULTS' || screen === 'RESTORATION' 
    ? preview.projectedScore 
    : screen === 'PLANNING' && gameState.selectedImprovementIds.size > 0 
      ? preview.projectedScore 
      : mission.startingGreenScore;

  const currentCoins = screen === 'PLANNING' || screen === 'PREVIEW'
    ? gameState.getRemainingBudget()
    : gameState.playerProfile.coins;

  const isMapScreen = screen === 'DISTRICT_MAP';
  const totalStars = Object.values(gameState.playerProfile.completedMissions).reduce((acc, m) => acc + (m.stars || 0), 0);

  return `
    <header class="game-hud" aria-label="Game status bar">
      <!-- Top Left Stats Capsule -->
      <div class="hud-capsule">
        ${isMapScreen ? `
          <div class="hud-item world-pill" title="World Map">
            <span class="hud-icon">🧭</span>
            <div class="hud-stat-group">
              <span class="hud-stat-value">World Map</span>
              <span class="hud-stat-label">Districts</span>
            </div>
          </div>

          <div class="hud-item stars-pill" title="Stars Earned">
            <span class="hud-icon">⭐</span>
            <div class="hud-stat-group">
              <span class="hud-stat-value">${totalStars} / 36</span>
              <span class="hud-stat-label">Stars</span>
            </div>
          </div>

          <div class="hud-item coins-pill" title="Available Coins">
            <span class="hud-icon coin-stack">🪙</span>
            <div class="hud-stat-group">
              <span class="hud-stat-value">$${gameState.playerProfile.coins}</span>
              <span class="hud-stat-label">Treasury</span>
            </div>
          </div>
        ` : `
          <div class="hud-item score-pill" title="District Green Health (0-100%)">
            <span class="hud-icon smiley-leaf">🍃</span>
            <div class="hud-stat-group">
              <span class="hud-stat-value" id="hud-score-val">${currentScore}%</span>
              <span class="hud-stat-label">Green Score</span>
            </div>
          </div>

          <div class="hud-item coins-pill" title="Available Coins">
            <span class="hud-icon coin-stack">🪙</span>
            <div class="hud-stat-group">
              <span class="hud-stat-value" id="hud-coins-val">$${currentCoins}</span>
              <span class="hud-stat-label">${screen === 'PLANNING' ? 'Remaining' : 'Treasury'}</span>
            </div>
          </div>

          ${isGameActive ? `
            <div class="hud-item goal-pill" title="Mission Target Score">
              <span class="hud-icon target-icon">🎯</span>
              <div class="hud-stat-group">
                <span class="hud-stat-value">≥ ${mission.targetGreenScore}%</span>
                <span class="hud-stat-label">Goal</span>
              </div>
            </div>
          ` : ''}

          <div class="hud-item day-pill" title="Current Stage">
            <span class="hud-icon calendar-icon">📅</span>
            <div class="hud-stat-group">
              <span class="hud-stat-value">Mission ${mission.missionNumber || 1}</span>
              <span class="hud-stat-label">${gameState.getActiveDistrict().name.split(' ')[0]}</span>
            </div>
          </div>
        `}
      </div>

      <!-- Top Right Hanging Action Tags -->
      <div class="hud-hanging-tags">
        <button class="hanging-tag" id="tag-map-btn" title="${isMapScreen ? 'Return to Main Menu' : 'Open World Map'}" aria-label="${isMapScreen ? 'Main Menu' : 'District Map'}">
          <span class="tag-icon">${isMapScreen ? '🏠' : '🗺️'}</span>
          <span class="tag-ribbon">${isMapScreen ? 'Menu' : 'Map'}</span>
        </button>

        <button class="hanging-tag" id="tag-badges-btn" title="Eco Badges & Trophy Hall" aria-label="Eco Badges">
          <span class="tag-icon">🏆</span>
          <span class="tag-ribbon">Badges</span>
        </button>

        <button class="hanging-tag ${sound.musicEnabled ? 'active' : ''}" id="tag-music-btn" title="Toggle Peaceful Music" aria-label="Toggle Music">
          <span class="tag-icon">${sound.musicEnabled ? '🎵' : '🔇'}</span>
          <span class="tag-ribbon">Music</span>
        </button>

        <button class="hanging-tag" id="tag-guide-btn" title="How to Play" aria-label="How to Play">
          <span class="tag-icon">📜</span>
          <span class="tag-ribbon">Guide</span>
        </button>

        <button class="hanging-tag" id="tag-settings-btn" title="Settings" aria-label="Settings">
          <span class="tag-icon">⚙️</span>
          <span class="tag-ribbon">Options</span>
        </button>
      </div>
    </header>
  `;
}

export function setupHUDEvents(openModalCallback) {
  const mapBtn = document.getElementById('tag-map-btn');
  if (mapBtn) {
    mapBtn.addEventListener('click', () => {
      sound.playPop();
      if (gameState.currentScreen === 'DISTRICT_MAP') {
        gameState.setScreen('MAIN_MENU');
      } else {
        gameState.setScreen('DISTRICT_MAP');
      }
    });
  }

  const badgesBtn = document.getElementById('tag-badges-btn');
  if (badgesBtn) {
    badgesBtn.addEventListener('click', () => {
      sound.playPop();
      if (openModalCallback) openModalCallback('BADGES');
    });
  }

  const musicBtn = document.getElementById('tag-music-btn');
  if (musicBtn) {
    musicBtn.addEventListener('click', () => {
      const active = sound.toggleMusic();
      sound.playPop();
      musicBtn.classList.toggle('active', active);
      const icon = musicBtn.querySelector('.tag-icon');
      if (icon) icon.textContent = active ? '🎵' : '🔇';
    });
  }

  const guideBtn = document.getElementById('tag-guide-btn');
  if (guideBtn) {
    guideBtn.addEventListener('click', () => {
      sound.playPop();
      if (openModalCallback) openModalCallback('GUIDE');
    });
  }

  const settingsBtn = document.getElementById('tag-settings-btn');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      sound.playPop();
      if (openModalCallback) openModalCallback('SETTINGS');
    });
  }
}
