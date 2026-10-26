// District Map Screen - Aesthetic Illustrated Diorama Map with Tactile Location Pins
import { gameState, DISTRICTS, MISSIONS } from '../state.js';
import { sound } from '../audio.js';

let selectedPinDistrictId = 'riverside';
let isInspectorOpen = true;

export function renderDistrictMap() {
  const completed = gameState.playerProfile.completedMissions;
  const profile = gameState.playerProfile;

  const isRiversideUnlocked = gameState.isDistrictUnlocked('riverside');
  const isDowntownUnlocked = gameState.isDistrictUnlocked('downtown');
  const isIndustrialUnlocked = gameState.isDistrictUnlocked('industrial');
  const isResidentialUnlocked = gameState.isDistrictUnlocked('residential');

  const activeDistrict = DISTRICTS[selectedPinDistrictId] || DISTRICTS.riverside;
  const isSelectedUnlocked = gameState.isDistrictUnlocked(selectedPinDistrictId);

  // Check if a district is 100% completed (all 3 missions done)
  const isRiversideDone = completed['riverside-1'] && completed['riverside-2'] && completed['riverside-3'];
  const isDowntownDone = completed['downtown-1'] && completed['downtown-2'] && completed['downtown-3'];
  const isIndustrialDone = completed['industrial-1'] && completed['industrial-2'] && completed['industrial-3'];
  const isResidentialDone = completed['residential-1'] && completed['residential-2'] && completed['residential-3'];

  // Mission keys for active district
  const m1Key = `${selectedPinDistrictId}-1`;
  const m2Key = `${selectedPinDistrictId}-2`;
  const m3Key = `${selectedPinDistrictId}-3`;

  return `
    <div class="screen district-map-screen">
      <!-- Aesthetic Illustrated Miniature World Canvas -->
      <div class="district-world-stage">
        <div class="district-map-frame">
          <!-- Hand-crafted Cozy Isometric Miniature World Map -->
          <img 
            src="./assets/district_map.jpg" 
            alt="GreenCity World Map Diorama" 
            class="district-map-img" 
            draggable="false"
          />

          <!-- Ambient lighting and soft vignette layers -->
          <div class="district-map-vignette"></div>

          <!-- ================================================================
               INTERACTIVE LOCATION PINS (Only Pins Are Clickable Targets)
               ================================================================ -->
          
          <!-- Pin 1: Riverside District (Historic Canal Street) -->
          <div 
            class="map-location-pin pin-riverside ${selectedPinDistrictId === 'riverside' ? 'active-pin' : ''}" 
            style="left: 26%; top: 70%;" 
            data-district-id="riverside" 
            role="button" 
            tabindex="0"
            aria-label="Riverside District"
          >
            <div class="pin-beacon-pulse"></div>
            <div class="pin-marker-head">
              <span class="pin-icon">🌊</span>
            </div>
            <div class="pin-stem"></div>
            <div class="pin-label-card">
              <span class="pin-title">Riverside</span>
              <span class="pin-status active-status">${isRiversideDone ? 'Restored 🌟' : 'Active'}</span>
            </div>
          </div>

          <!-- Pin 2: Downtown Commercial (Bustling Shops & Transit) -->
          <div 
            class="map-location-pin pin-downtown ${isDowntownUnlocked ? 'unlocked-pin' : 'locked-pin'} ${selectedPinDistrictId === 'downtown' ? 'active-pin' : ''}" 
            style="left: 53%; top: 48%;" 
            data-district-id="downtown" 
            role="button" 
            tabindex="0"
            aria-label="Downtown Commercial District"
          >
            ${isDowntownUnlocked ? `<div class="pin-beacon-pulse"></div>` : ''}
            <div class="pin-marker-head ${!isDowntownUnlocked ? 'head-locked' : ''}">
              <span class="pin-icon">${isDowntownUnlocked ? '🏢' : '🔒'}</span>
            </div>
            <div class="pin-stem"></div>
            <div class="pin-label-card">
              <span class="pin-title">Downtown</span>
              <span class="pin-status ${isDowntownUnlocked ? 'active-status' : 'locked-status'}">
                ${isDowntownUnlocked ? (isDowntownDone ? 'Restored 🌟' : 'Ready!') : 'Locked'}
              </span>
            </div>
          </div>

          <!-- Pin 3: Industrial Zone (Clean Energy & Solar Grid) -->
          <div 
            class="map-location-pin pin-industrial ${isIndustrialUnlocked ? 'unlocked-pin' : 'locked-pin'} ${selectedPinDistrictId === 'industrial' ? 'active-pin' : ''}" 
            style="left: 77%; top: 25%;" 
            data-district-id="industrial" 
            role="button" 
            tabindex="0"
            aria-label="Industrial Eco Zone"
          >
            ${isIndustrialUnlocked ? `<div class="pin-beacon-pulse"></div>` : ''}
            <div class="pin-marker-head ${!isIndustrialUnlocked ? 'head-locked' : ''}">
              <span class="pin-icon">${isIndustrialUnlocked ? '⚙️' : '🔒'}</span>
            </div>
            <div class="pin-stem"></div>
            <div class="pin-label-card">
              <span class="pin-title">Industrial</span>
              <span class="pin-status ${isIndustrialUnlocked ? 'active-status' : 'locked-status'}">
                ${isIndustrialUnlocked ? (isIndustrialDone ? 'Restored 🌟' : 'Ready!') : 'Locked'}
              </span>
            </div>
          </div>

          <!-- Pin 4: Residential Neighbourhood (Living Yards & Solar Co-op) -->
          <div 
            class="map-location-pin pin-residential ${isResidentialUnlocked ? 'unlocked-pin' : 'locked-pin'} ${selectedPinDistrictId === 'residential' ? 'active-pin' : ''}" 
            style="left: 23%; top: 25%;" 
            data-district-id="residential" 
            role="button" 
            tabindex="0"
            aria-label="Residential Neighbourhood"
          >
            ${isResidentialUnlocked ? `<div class="pin-beacon-pulse"></div>` : ''}
            <div class="pin-marker-head ${!isResidentialUnlocked ? 'head-locked' : ''}">
              <span class="pin-icon">${isResidentialUnlocked ? '🏡' : '🔒'}</span>
            </div>
            <div class="pin-stem"></div>
            <div class="pin-label-card">
              <span class="pin-title">Residential</span>
              <span class="pin-status ${isResidentialUnlocked ? 'active-status' : 'locked-status'}">
                ${isResidentialUnlocked ? (isResidentialDone ? 'Restored 🌟' : 'Ready!') : 'Locked'}
              </span>
            </div>
          </div>
        </div>

        <!-- ================================================================
             POP-UP DISTRICT INSPECTOR (Docked on Right Side)
             ================================================================ -->
        ${isInspectorOpen ? `
          <div class="district-inspector-popover bounce-in" id="district-inspector">
            <div class="inspector-header">
              <div class="inspector-badge-row">
                <span class="inspector-icon">${activeDistrict.icon}</span>
                <div class="inspector-title-group">
                  <h3 class="inspector-title">${activeDistrict.name}</h3>
                  <span class="inspector-state-pill ${isSelectedUnlocked ? 'pill-active' : 'pill-locked'}">
                    ${isSelectedUnlocked ? '● Unlocked & Active' : '🔒 Locked'}
                  </span>
                </div>
              </div>
              <button class="inspector-close-btn" id="btn-close-inspector" title="Close details panel" aria-label="Close inspector">✕</button>
            </div>

            <p class="inspector-desc">${activeDistrict.subtitle}</p>

            ${isSelectedUnlocked ? `
              <div class="inspector-missions-list">
                <h4 class="inspector-list-title">Missions Available (3):</h4>
                
                <!-- Mission 1 -->
                ${renderInspectorMissionItem(m1Key, 1, gameState.isMissionUnlocked(m1Key), completed[m1Key])}

                <!-- Mission 2 -->
                ${renderInspectorMissionItem(m2Key, 2, gameState.isMissionUnlocked(m2Key), completed[m2Key])}

                <!-- Mission 3 -->
                ${renderInspectorMissionItem(m3Key, 3, gameState.isMissionUnlocked(m3Key), completed[m3Key])}
              </div>
            ` : `
              <div class="inspector-lock-box">
                <span class="lock-big-icon">🔒</span>
                <p><strong>District Locked</strong></p>
                <p class="lock-req-text">${activeDistrict.unlockRequirement || 'Complete prior missions to unlock'}</p>
              </div>
            `}
          </div>
        ` : `
          <button class="cozy-pill-btn inspector-reopen-btn bounce-in" id="btn-reopen-inspector">
            <span>📋 View District Details</span>
          </button>
        `}
      </div>
    </div>
  `;
}

function renderInspectorMissionItem(missionId, number, isUnlocked, result) {
  const m = MISSIONS[missionId];
  if (!m) return '';
  const starsEarned = result ? result.stars : 0;

  return `
    <div class="inspector-mission-row ${isUnlocked ? 'row-unlocked' : 'row-locked'}">
      <div class="row-left">
        <span class="row-num">M${number}</span>
        <div class="row-titles">
          <span class="row-name">${m.title}</span>
          <span class="row-target">Goal ≥ ${m.targetGreenScore}% | Budget $${m.startingBudget}</span>
        </div>
      </div>

      <div class="row-right">
        <div class="row-stars">
          ${isUnlocked && result ? '⭐'.repeat(starsEarned) : (isUnlocked ? '⏳ New' : '🔒')}
        </div>
        ${isUnlocked ? `
          <button class="cozy-btn primary-btn small-btn btn-launch-pin-mission" data-mission-id="${missionId}" data-district-id="${m.districtId}">
            <span>${result ? 'Replay' : 'Start'}</span>
            <span class="btn-arrow">→</span>
          </button>
        ` : `
          <span class="row-locked-note">Locked</span>
        `}
      </div>
    </div>
  `;
}

export function setupDistrictMapEvents() {
  const backBtn = document.getElementById('btn-back-menu');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      sound.playPop();
      gameState.setScreen('MAIN_MENU');
    });
  }

  // Close Inspector Card
  const closeInspectorBtn = document.getElementById('btn-close-inspector');
  if (closeInspectorBtn) {
    closeInspectorBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sound.playPop();
      isInspectorOpen = false;
      gameState.notify();
    });
  }

  // Reopen Inspector Card
  const reopenInspectorBtn = document.getElementById('btn-reopen-inspector');
  if (reopenInspectorBtn) {
    reopenInspectorBtn.addEventListener('click', () => {
      sound.playPop();
      isInspectorOpen = true;
      gameState.notify();
    });
  }

  // Location Pins Click Handlers
  const pins = document.querySelectorAll('.map-location-pin');
  pins.forEach(pin => {
    pin.addEventListener('click', () => {
      const districtId = pin.getAttribute('data-district-id');
      selectedPinDistrictId = districtId;
      isInspectorOpen = true; // Auto-open inspector on pin click
      sound.playPop();

      const district = DISTRICTS[districtId];
      if (districtId === 'riverside') {
        gameState.setSprig('happy', 'Riverside District selected! Check out our canal cleanup and revitalization missions.');
      } else if (districtId === 'downtown') {
        if (gameState.isDistrictUnlocked('downtown')) {
          gameState.setSprig('celebrating', 'Downtown Commercial is active! Ready to tackle smog, streetcars, and rooftop solar!');
        } else {
          gameState.setSprig('thinking', 'Downtown Commercial is locked! Complete Riverside Mission 3 to finish the canal first!');
        }
      } else if (districtId === 'industrial') {
        if (gameState.isDistrictUnlocked('industrial')) {
          gameState.setSprig('celebrating', 'Industrial Zone is ready! Let\'s eliminate smokestack soot and install wind turbines!');
        } else {
          gameState.setSprig('thinking', 'Industrial Zone is locked! Complete Downtown Mission 3 to unlock it!');
        }
      } else if (districtId === 'residential') {
        if (gameState.isDistrictUnlocked('residential')) {
          gameState.setSprig('celebrating', 'Residential Neighbourhood is open! Let\'s build community gardens and solar rooftops!');
        } else {
          gameState.setSprig('thinking', 'Residential Neighbourhood is locked! Complete Industrial Zone Mission 3 first!');
        }
      }

      gameState.notify();
    });

    pin.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        pin.click();
      }
    });
  });

  // Launch Mission from Inspector
  const launchBtns = document.querySelectorAll('.btn-launch-pin-mission');
  launchBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const missionId = btn.getAttribute('data-mission-id');
      const districtId = btn.getAttribute('data-district-id') || selectedPinDistrictId;
      
      // Strict security guard against launching locked missions
      if (!gameState.isMissionUnlocked(missionId)) {
        sound.playWarning();
        gameState.setSprig('concerned', 'That mission is locked! Complete the prerequisite missions first.');
        return;
      }

      sound.playPop();
      gameState.activeDistrictId = districtId;
      gameState.activeMissionId = missionId;
      gameState.resetCurrentPlan();
      gameState.setScreen('MISSION_BRIEFING');
    });
  });
}
