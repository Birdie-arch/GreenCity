// Main Menu Screen
import { gameState } from '../state.js';
import { sound } from '../audio.js';

export function renderMainMenu() {
  return `
    <div class="screen main-menu-screen">
      <div class="menu-backdrop-diorama">
        <img src="./assets/riverside_restored.jpg" alt="GreenCity Diorama" class="menu-hero-img" />
        <div class="menu-vignette"></div>
      </div>

      <div class="menu-content-card">
        <div class="game-logo-badge">
          <span class="logo-leaf">🌿</span>
          <h1 class="game-title">GreenCity</h1>
          <p class="game-subtitle">Restore the Forgotten City</p>
        </div>

        <p class="game-tagline">
          Step into a cozy miniature world. Step up as the Green Guardian and heal polluted urban districts through smart planning and environmental care.
        </p>

        <div class="menu-btn-stack">
          <button class="cozy-btn primary-btn large-btn" id="btn-play-game">
            <span class="btn-icon">🎮</span>
            <span class="btn-text">Play Game</span>
          </button>

          <button class="cozy-btn secondary-btn" id="btn-menu-guide">
            <span class="btn-icon">📜</span>
            <span class="btn-text">How to Play</span>
          </button>

          <button class="cozy-btn secondary-btn" id="btn-menu-settings">
            <span class="btn-icon">⚙️</span>
            <span class="btn-text">Settings</span>
          </button>
        </div>

        <div class="menu-badges-row">
          <span class="mini-feature-tag">📐 Isometric 2D Diorama</span>
          <span class="mini-feature-tag">🌱 Sprig Companion</span>
          <span class="mini-feature-tag">🧠 ML-Supported Planning</span>
        </div>
      </div>
    </div>
  `;
}

export function setupMainMenuEvents(openModalCallback) {
  const playBtn = document.getElementById('btn-play-game');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      sound.playPop();
      gameState.setScreen('DISTRICT_MAP');
    });
  }

  const guideBtn = document.getElementById('btn-menu-guide');
  if (guideBtn) {
    guideBtn.addEventListener('click', () => {
      sound.playPop();
      if (openModalCallback) openModalCallback('GUIDE');
    });
  }

  const settingsBtn = document.getElementById('btn-menu-settings');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      sound.playPop();
      if (openModalCallback) openModalCallback('SETTINGS');
    });
  }
}
