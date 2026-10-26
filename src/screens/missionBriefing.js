// Mission Briefing Screen - Dynamic District Backdrops & Heartwarming Villager Requests
import { gameState } from '../state.js';
import { sound } from '../audio.js';

const VILLAGER_REQUESTS = {
  // District 1: Riverside
  'riverside-1': {
    name: 'Old Fisherman Taro',
    avatar: '🎣',
    quote: 'The carp haven\'t jumped in our canal in years... murky runoff and plastic bottles have choked the water. Please help us dredge the trash!'
  },
  'riverside-2': {
    name: 'Botanist Aoi',
    avatar: '🌿',
    quote: 'Now that the heaviest trash is out, our riverbank needs life! If we plant golden maples and wildflower meadows, the butterflies will return.'
  },
  'riverside-3': {
    name: 'Tea Master Ken',
    avatar: '🍵',
    quote: 'My family has run this tea stall for three generations. With clean water and a restored wooden footbridge, neighbors can gather once more!'
  },

  // District 2: Downtown Commercial
  'downtown-1': {
    name: 'Barista Yumi',
    avatar: '☕',
    quote: 'Vehicle smog is trapped between the buildings and customers are coughing. An electric streetcar line and ginkgo trees would save our shopping street!'
  },
  'downtown-2': {
    name: 'Bookstore Owner Ren',
    avatar: '📚',
    quote: 'The asphalt heat is unbearable in the summer. A car-free cobblestone walking plaza with vertical ivy walls would make Downtown a paradise.'
  },
  'downtown-3': {
    name: 'Chef Mei',
    avatar: '🏮',
    quote: 'Let\'s turn our hot tar rooftops into solar farms and open a zero-waste night market under warm lanterns! The whole city will celebrate.'
  },

  // District 3: Industrial Zone
  'industrial-1': {
    name: 'Factory Foreman Kenji',
    avatar: '🔧',
    quote: 'Our team is tired of breathing soot. Retrofit our smokestacks with modern bio-scrubbers and plant an evergreen pine windbreak for our workers!'
  },
  'industrial-2': {
    name: 'Engineer Sora',
    avatar: '🔬',
    quote: 'Don\'t let metal scrap go to waste! A closed-loop sorting depot and wetland bio-swales will purify runoff and give materials a second life.'
  },
  'industrial-3': {
    name: 'Mill Carpenter Daiki',
    avatar: '🪵',
    quote: 'If we restore our historic timber waterwheel and install quiet wind turbines, we\'ll prove heavy manufacturing can be 100% clean and green!'
  },

  // District 4: Residential Neighbourhood
  'residential-1': {
    name: 'Grandmother Hana',
    avatar: '🌻',
    quote: 'The front lawns have withered to brown dust. My granddaughter and I want to plant sweet tomatoes and sakura trees so songbirds can nest again.'
  },
  'residential-2': {
    name: 'Architect Jin',
    avatar: '🧱',
    quote: 'Stormwater floods our front walks every time it rains. Permeable clay bricks and cedar rain barrels will soak up the water naturally.'
  },
  'residential-3': {
    name: 'Little Sakura',
    avatar: '👧',
    quote: 'This is the final step for our Forgotten City! Connect all our rooftops into a solar cooperative and build the community hall so we can play together!'
  }
};

export function renderMissionBriefing() {
  const mission = gameState.getActiveMission();
  const district = gameState.getActiveDistrict();
  const villager = VILLAGER_REQUESTS[mission.id] || {
    name: 'GreenCity Resident',
    avatar: '🌱',
    quote: 'Every tree planted and coin saved brings our city closer to ecological harmony!'
  };

  const bgImg = `./assets/${district.id}_polluted.jpg`;

  return `
    <div class="screen briefing-screen">
      <!-- District diorama backdrop in faded cozy frame -->
      <div class="briefing-backdrop-wrap">
        <img src="${bgImg}" alt="Polluted ${district.name}" class="briefing-bg-img" />
        <div class="briefing-overlay-tint"></div>
      </div>

      <!-- Cozy Briefing Modal Card -->
      <div class="briefing-modal-card bounce-in">
        <div class="card-amber-tab">
          <span class="tab-number">${mission.missionNumber}</span>
        </div>

        <div class="briefing-header">
          <span class="district-badge-label" style="background: ${district.color}22; color: ${district.color}; border: 1.5px solid ${district.color}66;">
            ${district.icon} ${district.name}
          </span>
          <h2 class="briefing-title">${mission.title}</h2>
          <p class="briefing-tagline">${mission.tagline}</p>
        </div>

        <div class="briefing-body">
          <!-- Villager Request Postcard -->
          <div class="briefing-villager-card">
            <div class="villager-avatar-badge">
              <span class="villager-emoji">${villager.avatar}</span>
            </div>
            <div class="villager-message">
              <div class="villager-meta">
                <span class="villager-name">${villager.name}</span>
                <span class="villager-tag">Resident Note</span>
              </div>
              <p class="villager-quote">"${villager.quote}"</p>
            </div>
          </div>

          <div class="briefing-problem-box">
            <span class="box-icon">⚠️</span>
            <p class="problem-text">${mission.problem}</p>
          </div>

          <div class="briefing-goals-list">
            <div class="goal-item primary-goal">
              <span class="goal-square square-green">■</span>
              <div class="goal-texts">
                <span class="goal-type">MISSION GOAL</span>
                <span class="goal-desc">Reach a Green Score of <strong>≥ ${mission.targetGreenScore}%</strong> (baseline: ${mission.startingGreenScore}%)</span>
              </div>
            </div>

            <div class="goal-item optional-goal">
              <span class="goal-square square-amber">■</span>
              <div class="goal-texts">
                <span class="goal-type">OPTIONAL BONUS</span>
                <span class="goal-desc">Conserve budget (keep <strong>≥ 35 Coins</strong>) for a 3-Star Rating</span>
              </div>
            </div>
          </div>

          <div class="briefing-stats-row">
            <div class="stat-pill-box">
              <span class="stat-label">Budget</span>
              <span class="stat-val highlight-gold">$${mission.startingBudget} Coins</span>
            </div>
            <div class="stat-pill-box">
              <span class="stat-label">Current Pollution</span>
              <span class="stat-val highlight-danger">${mission.startingPollution}% (Severe)</span>
            </div>
            <div class="stat-pill-box">
              <span class="stat-label">Current Health</span>
              <span class="stat-val highlight-warn">${mission.startingGreenScore}%</span>
            </div>
          </div>
        </div>

        <div class="briefing-actions">
          <button class="cozy-btn secondary-btn" id="btn-briefing-back">
            <span>← District Map</span>
          </button>
          <button class="cozy-btn primary-btn large-btn" id="btn-start-mission">
            <span>Start Planning</span>
            <span class="btn-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

export function setupMissionBriefingEvents() {
  const backBtn = document.getElementById('btn-briefing-back');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      sound.playPop();
      gameState.setScreen('DISTRICT_MAP');
    });
  }

  const startBtn = document.getElementById('btn-start-mission');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      sound.playPop();
      gameState.setScreen('PLANNING');
    });
  }
}
