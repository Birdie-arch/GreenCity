// Results Screen - Multi-District Progression & Victory Support
import { gameState, DISTRICTS } from '../state.js';
import { sound } from '../audio.js';

const MISSION_BADGE_TITLES = {
  'riverside-1': '🌊 "River Restorer"',
  'riverside-2': '🦋 "Nature Weaver"',
  'riverside-3': '👑 "Riverside Champion"',
  'downtown-1': '🚃 "Tram Conductor"',
  'downtown-2': '🚶 "Plaza Architect"',
  'downtown-3': '🏙️ "Downtown Visionary"',
  'industrial-1': '🏭 "Sky Purifier"',
  'industrial-2': '♻️ "Circular Pioneer"',
  'industrial-3': '⚡ "Clean Tech Titan"',
  'residential-1': '🥕 "Community Gardener"',
  'residential-2': '🧱 "Sponge Builder"',
  'residential-3': '🌟 "Grand Guardian Master"'
};

export function renderResultsScreen() {
  const mission = gameState.getActiveMission();
  const district = gameState.getActiveDistrict();
  const preview = gameState.getPlanPreview();
  const isSuccess = preview.meetsGoal;
  const stars = preview.stars || (isSuccess ? 1 : 0);
  const isDistrictFinale = mission.missionNumber === 3;
  const isGrandGameFinale = district.id === 'residential' && isDistrictFinale;

  // Next destination text
  let nextButtonLabel = `Next Mission (${mission.missionNumber + 1})`;
  if (isDistrictFinale) {
    if (district.id === 'riverside') nextButtonLabel = 'Enter Downtown District';
    else if (district.id === 'downtown') nextButtonLabel = 'Enter Industrial Zone';
    else if (district.id === 'industrial') nextButtonLabel = 'Enter Residential Neighbourhood';
    else nextButtonLabel = 'Celebrate City Rebirth! 🏆';
  }

  // Banner text
  let bannerTitle = `MISSION ${mission.missionNumber} ACCOMPLISHED!`;
  let bannerSub = `${mission.title} has succeeded!`;
  if (isSuccess && isDistrictFinale) {
    if (district.id === 'riverside') {
      bannerTitle = 'RIVERSIDE RESTORATION COMPLETE!';
      bannerSub = 'Downtown Commercial District is now unlocked!';
    } else if (district.id === 'downtown') {
      bannerTitle = 'DOWNTOWN ECO-DISTRICT RESTORED!';
      bannerSub = 'Industrial Zone is now unlocked!';
    } else if (district.id === 'industrial') {
      bannerTitle = 'INDUSTRIAL ZONE CLEAN TECH VICTORY!';
      bannerSub = 'Residential Neighbourhood is now unlocked!';
    } else {
      bannerTitle = '🎉 THE FORGOTTEN CITY IS FULLY RESTORED!';
      bannerSub = 'You achieved 100% net-zero sustainability across all 4 districts!';
    }
  } else if (!isSuccess) {
    bannerTitle = 'GOAL NOT REACHED';
    bannerSub = 'Our green improvements fell slightly short of the target.';
  }

  return `
    <div class="screen results-screen">
      <div class="results-card bounce-in ${isSuccess ? 'success-card' : 'retry-card'}">
        <div class="results-banner ${isSuccess ? 'banner-gold' : 'banner-warn'}">
          <span class="banner-icon">${isSuccess ? (isDistrictFinale ? '👑' : '🏆') : '🌱'}</span>
          <h2 class="banner-title">${bannerTitle}</h2>
          <p class="banner-sub">${bannerSub}</p>
        </div>

        <!-- Star Rating Display -->
        <div class="stars-display-row">
          <div class="star-slot ${stars >= 1 ? 'earned' : 'empty'}">
            <span class="star-icon">⭐</span>
            <span class="star-caption">Mission Goal</span>
          </div>
          <div class="star-slot ${stars >= 2 ? 'earned' : 'empty'}">
            <span class="star-icon">⭐</span>
            <span class="star-caption">Target + 10%</span>
          </div>
          <div class="star-slot ${stars >= 3 ? 'earned' : 'empty'}">
            <span class="star-icon">⭐</span>
            <span class="star-caption">Budget Master</span>
          </div>
        </div>

        <!-- Score & Treasury Grid -->
        <div class="results-stats-grid">
          <div class="res-stat-card">
            <span class="stat-icon">🍃</span>
            <div class="stat-info">
              <span class="stat-num ${isSuccess ? 'text-green' : 'text-danger'}">${preview.projectedScore}%</span>
              <span class="stat-lbl">Final Green Score</span>
            </div>
          </div>

          <div class="res-stat-card">
            <span class="stat-icon">🪙</span>
            <div class="stat-info">
              <span class="stat-num">$${preview.remaining}</span>
              <span class="stat-lbl">Coins Saved</span>
            </div>
          </div>

          <div class="res-stat-card">
            <span class="stat-icon">💧</span>
            <div class="stat-info">
              <span class="stat-num text-green">-${Math.max(1, mission.startingPollution - preview.predictedPollution)}</span>
              <span class="stat-lbl">Pollution Slashed</span>
            </div>
          </div>
        </div>

        <!-- Rewards earned section -->
        ${isSuccess ? `
          <div class="results-rewards-box">
            <h4 class="rewards-title">Rewards Earned:</h4>
            <div class="rewards-items">
              <div class="reward-pill">
                <span>🪙</span>
                <span>+$60 Treasury Coins</span>
              </div>
              <div class="reward-pill">
                <span>✨</span>
                <span>+150 Eco XP</span>
              </div>
              <div class="reward-pill badge-pill">
                <span>${MISSION_BADGE_TITLES[mission.id] || '🌱 "Eco Guardian"'}</span>
              </div>
            </div>
          </div>
        ` : `
          <div class="results-hint-box">
            <p>💡 Tip: We needed at least ${mission.targetGreenScore}% Green Score. Try picking higher-impact improvements to boost your score!</p>
          </div>
        `}

        <!-- Sprig Dialog Box in Results -->
        <div class="results-sprig-card">
          <div class="sprig-avatar-thumb">
            <img src="${isSuccess ? './assets/sprig_celebrating.jpg' : './assets/sprig_concerned.jpg'}" alt="Sprig" />
          </div>
          <div class="sprig-reaction-bubble">
            <div class="reaction-name-tag">
              <span>🌱 SPRIG</span>
            </div>
            <p class="reaction-text">
              ${isSuccess 
                ? (isGrandGameFinale
                    ? 'WE DID IT! From murky canal sludge to blooming rooftop gardens and zero-emission microgrids, GreenCity is reborn! You are the greatest Green Guardian in history!'
                    : (isDistrictFinale 
                        ? `Magnificent accomplishment! ${district.name} is completely transformed! The next district is unlocked and ready for our eco-designs!` 
                        : `Hooray! Mission ${mission.missionNumber} in ${district.name} is complete! Look how lively and clean the diorama looks!`))
                : 'Don\'t give up! Environmental planning takes testing. Let\'s adjust our improvements and try once more!'
              }
            </p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="results-actions">
          <button class="cozy-btn secondary-btn" id="btn-results-map">
            <span>🗺️ District Map</span>
          </button>

          <button class="cozy-btn secondary-btn" id="btn-results-retry">
            <span>🔄 Replay Plan</span>
          </button>

          ${isSuccess ? `
            <button class="cozy-btn primary-btn large-btn" id="btn-next-mission">
              <span>${nextButtonLabel}</span>
              <span class="btn-arrow">→</span>
            </button>
          ` : `
            <button class="cozy-btn primary-btn large-btn" id="btn-results-replan">
              <span>Revise Plan</span>
              <span class="btn-arrow">→</span>
            </button>
          `}
        </div>
      </div>
    </div>
  `;
}

export function setupResultsEvents() {
  const mapBtn = document.getElementById('btn-results-map');
  if (mapBtn) {
    mapBtn.addEventListener('click', () => {
      sound.playPop();
      gameState.setScreen('DISTRICT_MAP');
    });
  }

  const retryBtn = document.getElementById('btn-results-retry');
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      sound.playPop();
      gameState.resetCurrentPlan();
      gameState.setScreen('PLANNING');
    });
  }

  const replanBtn = document.getElementById('btn-results-replan');
  if (replanBtn) {
    replanBtn.addEventListener('click', () => {
      sound.playPop();
      gameState.setScreen('PLANNING');
    });
  }

  const nextBtn = document.getElementById('btn-next-mission');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      sound.playFanfare();
      gameState.startNextMission();
    });
  }
}
