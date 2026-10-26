// Sprig's Eco-Lab Merge Puzzle
// Tactile, cozy merge puzzle mini-game to earn and unlock Sprig's Plan for missions
import { gameState, MISSIONS } from '../state.js';
import { sound } from '../audio.js';

export const MERGE_CHAINS = {
  nature: {
    id: 'nature',
    name: 'Living Nature',
    color: '#4e8067',
    tiers: [
      { tier: 1, name: 'Sprout Seedling', icon: './assets/merge/nature_tier1.svg', desc: 'Tender seed sprout in dark loam' },
      { tier: 2, name: 'Wildflower Pot', icon: './assets/merge/nature_tier2.svg', desc: 'Sweet nectar blooms for honeybees' },
      { tier: 3, name: 'Lush Berry Bush', icon: './assets/merge/nature_tier3.svg', desc: 'Dense foliage with ripe berries' },
      { tier: 4, name: 'Golden Bonsai Tree', icon: './assets/merge/nature_tier4.svg', desc: 'Legendary radiant cedar bonsai' }
    ]
  },
  tech: {
    id: 'tech',
    name: 'Clean Tech',
    color: '#3a7ca5',
    tiers: [
      { tier: 1, name: 'Glass & Copper Scrap', icon: './assets/merge/tech_tier1.svg', desc: 'Recycled sea glass and copper wire' },
      { tier: 2, name: 'Solar Photocell', icon: './assets/merge/tech_tier2.svg', desc: 'Crystalline blue solar silicon cell' },
      { tier: 3, name: 'Bio-Battery Capacitor', icon: './assets/merge/tech_tier3.svg', desc: 'Capacitor storing renewable electricity' },
      { tier: 4, name: 'Microgrid Generator', icon: './assets/merge/tech_tier4.svg', desc: 'Zero-emission solar & wind turbine tower' }
    ]
  }
};

// Target goals per mission
const MISSION_TARGET_GOALS = {
  // District 1: Riverside
  'riverside-1': { chain: 'nature', tier: 2, name: 'Wildflower Pot' },
  'riverside-2': { chain: 'nature', tier: 3, name: 'Lush Berry Bush' },
  'riverside-3': { chain: 'nature', tier: 4, name: 'Golden Bonsai Tree' },

  // District 2: Downtown
  'downtown-1': { chain: 'tech', tier: 2, name: 'Solar Photocell' },
  'downtown-2': { chain: 'tech', tier: 3, name: 'Bio-Battery Capacitor' },
  'downtown-3': { chain: 'nature', tier: 4, name: 'Golden Bonsai Tree' },

  // District 3: Industrial
  'industrial-1': { chain: 'tech', tier: 3, name: 'Bio-Battery Capacitor' },
  'industrial-2': { chain: 'tech', tier: 4, name: 'Microgrid Generator' },
  'industrial-3': { chain: 'tech', tier: 4, name: 'Microgrid Generator' },

  // District 4: Residential
  'residential-1': { chain: 'nature', tier: 3, name: 'Lush Berry Bush' },
  'residential-2': { chain: 'tech', tier: 3, name: 'Bio-Battery Capacitor' },
  'residential-3': { chain: 'nature', tier: 4, name: 'Golden Bonsai Tree' }
};

class MergePuzzleManager {
  constructor() {
    this.isOpen = false;
    this.missionId = 'riverside-1';
    this.gridSize = 5; // 5x5 = 25 cells
    this.board = Array(25).fill(null);
    this.energy = 22;
    this.maxEnergy = 25;
    this.selectedCellIndex = null;
    this.draggedCellIndex = null;
    this.isDelivering = false;
    this.justMergedIndex = null;
  }

  getTargetGoal(missionId = this.missionId) {
    return MISSION_TARGET_GOALS[missionId] || { chain: 'nature', tier: 2, name: 'Wildflower Pot' };
  }

  getTargetItemData(missionId = this.missionId) {
    const goal = this.getTargetGoal(missionId);
    const chainData = MERGE_CHAINS[goal.chain];
    return chainData.tiers.find(t => t.tier === goal.tier) || chainData.tiers[1];
  }

  hasTargetItemOnBoard() {
    const goal = this.getTargetGoal(this.missionId);
    return this.board.some(cell => cell && !cell.isCrate && cell.chain === goal.chain && cell.tier >= goal.tier);
  }

  initBoard(missionId) {
    this.missionId = missionId || gameState.activeMissionId;
    this.energy = 22;
    this.selectedCellIndex = null;
    this.draggedCellIndex = null;
    this.isDelivering = false;
    this.justMergedIndex = null;

    // Reset 5x5 board
    this.board = Array(25).fill(null);

    // Place 2 mystery cobweb crates (cells 6 and 18)
    this.board[6] = { id: 'crate_6', isCrate: true, isLocked: true };
    this.board[18] = { id: 'crate_18', isCrate: true, isLocked: true };

    // Place friendly initial starter items
    this.board[12] = { id: 'item_init_1', chain: 'nature', tier: 1 };
    this.board[11] = { id: 'item_init_2', chain: 'nature', tier: 1 };
    this.board[13] = { id: 'item_init_3', chain: 'tech', tier: 1 };
    this.board[7] = { id: 'item_init_4', chain: 'tech', tier: 1 };
  }

  spawnItem() {
    if (this.energy <= 0) {
      sound.playWarning();
      return false;
    }

    const emptyIndices = [];
    for (let i = 0; i < 25; i++) {
      if (!this.board[i]) emptyIndices.push(i);
    }

    if (emptyIndices.length === 0) {
      sound.playWarning();
      return 'FULL';
    }

    // Pick random empty tile
    const randIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    const chain = Math.random() < 0.5 ? 'nature' : 'tech';

    this.board[randIndex] = {
      id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      chain,
      tier: 1,
      isNew: true
    };

    this.energy = Math.max(0, this.energy - 1);
    sound.playPop();
    return true;
  }

  refillEnergy() {
    this.energy = Math.min(this.maxEnergy, this.energy + 10);
    sound.playChime();
  }

  recycleItem(index) {
    if (index === null || !this.board[index] || this.board[index].isCrate) return false;
    this.board[index] = null;
    this.energy = Math.min(this.maxEnergy, this.energy + 2);
    this.selectedCellIndex = null;
    sound.playPop();
    return true;
  }

  mergeCells(fromIdx, toIdx) {
    if (fromIdx === toIdx || fromIdx === null || toIdx === null) return false;
    const fromItem = this.board[fromIdx];
    const toItem = this.board[toIdx];

    if (!fromItem || fromItem.isCrate) return false;

    // Moving into empty cell
    if (!toItem) {
      this.board[toIdx] = fromItem;
      this.board[fromIdx] = null;
      this.selectedCellIndex = null;
      sound.playSelect();
      return true;
    }

    // Attempting to merge onto locked crate: unlocks crate!
    if (toItem.isCrate && toItem.isLocked) {
      toItem.isLocked = false;
      toItem.isCrate = false;
      toItem.chain = Math.random() < 0.5 ? 'nature' : 'tech';
      toItem.tier = 2; // Crates give Tier 2 reward!
      this.selectedCellIndex = null;
      sound.playMerge(2);
      return true;
    }

    // Check if both items share the same chain and tier (< 4)
    if (fromItem.chain === toItem.chain && fromItem.tier === toItem.tier && fromItem.tier < 4) {
      const nextTier = fromItem.tier + 1;
      this.board[toIdx] = {
        id: `merged_${Date.now()}`,
        chain: fromItem.chain,
        tier: nextTier,
        justMerged: true
      };
      this.board[fromIdx] = null;
      this.selectedCellIndex = null;
      this.justMergedIndex = toIdx;

      // Unlock adjacent crates if any
      this.checkAdjacentCrates(toIdx);

      sound.playMerge(nextTier);
      return true;
    }

    // Otherwise swap positions
    this.board[toIdx] = fromItem;
    this.board[fromIdx] = toItem;
    this.selectedCellIndex = null;
    sound.playSelect();
    return true;
  }

  checkAdjacentCrates(centerIdx) {
    const row = Math.floor(centerIdx / this.gridSize);
    const col = centerIdx % this.gridSize;
    const neighbors = [];

    if (row > 0) neighbors.push(centerIdx - 5);
    if (row < 4) neighbors.push(centerIdx + 5);
    if (col > 0) neighbors.push(centerIdx - 1);
    if (col < 4) neighbors.push(centerIdx + 1);

    neighbors.forEach(nIdx => {
      const cell = this.board[nIdx];
      if (cell && cell.isCrate && cell.isLocked) {
        cell.isLocked = false;
        cell.isCrate = false;
        cell.chain = Math.random() < 0.5 ? 'nature' : 'tech';
        cell.tier = 2; // Unlock bonus
        cell.justUnlocked = true;
      }
    });
  }
}

export const mergeManager = new MergePuzzleManager();

export function renderMergePuzzleModal() {
  if (!mergeManager.isOpen) return '';

  const mission = gameState.getActiveMission();
  const goal = mergeManager.getTargetGoal();
  const targetItem = mergeManager.getTargetItemData();
  const isGoalReady = mergeManager.hasTargetItemOnBoard();

  return `
    <div class="modal-backdrop merge-modal-backdrop" id="merge-modal-backdrop">
      <div class="cozy-modal merge-puzzle-modal bounce-in" role="dialog" aria-labelledby="merge-modal-title">
        
        <!-- Header Strip -->
        <div class="merge-modal-header">
          <div class="merge-header-left">
            <span class="merge-header-icon">🧩</span>
            <div>
              <h2 class="merge-header-title" id="merge-modal-title">Sprig's Eco-Lab: Merge Puzzle</h2>
              <p class="merge-header-sub">Synthesise eco-elements to unlock Sprig's Plan for ${mission.title}</p>
            </div>
          </div>
          <button class="modal-close-btn" id="btn-close-merge" title="Close Lab" aria-label="Close">✕</button>
        </div>

        <!-- Sprig's Order Counter Strip (matching user's reference!) -->
        <div class="sprig-order-counter-card">
          <div class="order-sprig-avatar-wrap">
            <img 
              src="${isGoalReady ? './assets/sprig_celebrating.jpg' : './assets/sprig_thinking.jpg'}" 
              alt="Sprig" 
              class="order-sprig-avatar"
            />
            <span class="order-sprig-badge">${isGoalReady ? '🎉 Ready!' : '🌱 Researching'}</span>
          </div>

          <div class="order-speech-bubble">
            <p class="order-speech-text">
              ${isGoalReady ? 
                `<strong>Incredible!</strong> You crafted the <strong>${targetItem.name}</strong>! Tap <em>Deliver & Unlock</em> to acquire my optimal restoration plan!` : 
                `Guardian, merge items to craft <strong>1x ${targetItem.name} (Tier ${targetItem.tier})</strong>! Once we have it, my AI model will formulate the ultimate plan!`
              }
            </p>
          </div>

          <!-- Order Delivery Box -->
          <div class="order-goal-card ${isGoalReady ? 'goal-achieved' : ''}">
            <div class="goal-item-preview">
              <img src="${targetItem.icon}" alt="${targetItem.name}" class="goal-icon-img" />
              <div class="goal-details">
                <span class="goal-tag">Tier ${targetItem.tier} • ${goal.chain === 'nature' ? 'Living Nature' : 'Clean Tech'}</span>
                <span class="goal-name">${targetItem.name}</span>
                <span class="goal-progress-pill ${isGoalReady ? 'pill-ready' : 'pill-pending'}">
                  ${isGoalReady ? '✓ 1 / 1 In Stock' : '0 / 1 Needed'}
                </span>
              </div>
            </div>

            <button 
              class="cozy-btn ${isGoalReady ? 'primary-btn pulse-glow-btn' : 'secondary-btn'} btn-deliver-order" 
              id="btn-deliver-order" 
              ${!isGoalReady || mergeManager.isDelivering ? 'disabled' : ''}
            >
              <span>${mergeManager.isDelivering ? '✨ Unlocking...' : (isGoalReady ? '🎁 Deliver & Unlock Plan!' : 'Craft Item to Deliver')}</span>
            </button>
          </div>
        </div>

        <!-- Merge Controls Strip (Energy + Spawner + Recycle) -->
        <div class="merge-controls-strip">
          <!-- Energy Pill -->
          <div class="merge-energy-pill">
            <span class="energy-icon">⚡</span>
            <div class="energy-text-group">
              <span class="energy-val">${mergeManager.energy} / ${mergeManager.maxEnergy}</span>
              <span class="energy-label">Compost Energy</span>
            </div>
            <button class="cozy-pill-btn refill-btn" id="btn-refill-energy" title="Free Energy Boost">
              <span>+10 Refill</span>
            </button>
          </div>

          <!-- Central Spawner Box Button -->
          <div class="spawner-cta-wrap">
            <button class="spawner-box-btn ${mergeManager.energy <= 0 ? 'spawner-depleted' : ''}" id="btn-spawn-item" title="Tap to spawn a new Tier 1 item">
              <img src="./assets/merge/producer_box.svg" alt="Spawner Box" class="spawner-box-icon" />
              <div class="spawner-btn-labels">
                <span class="spawner-main-lbl">Tap to Spawn</span>
                <span class="spawner-sub-lbl">Cost: 1 ⚡ Energy</span>
              </div>
            </button>
          </div>

          <!-- Recycle Bin / Selling -->
          <div class="merge-recycle-zone" id="zone-recycle" title="Drag an item here or click with item selected to recycle (+2 Energy)">
            <span class="recycle-icon">♻️</span>
            <div class="recycle-text">
              <span class="recycle-lbl">Recycle Bin</span>
              <span class="recycle-sub">+2 ⚡ refund</span>
            </div>
          </div>
        </div>

        <!-- 5x5 Tactile Merge Board -->
        <div class="merge-board-container">
          <div class="merge-board-grid" id="merge-board-grid">
            ${mergeManager.board.map((cell, idx) => {
              const isSelected = mergeManager.selectedCellIndex === idx;
              const isJustMerged = mergeManager.justMergedIndex === idx;

              if (!cell) {
                return `
                  <div 
                    class="merge-tile tile-empty" 
                    data-index="${idx}"
                    data-droppable="true"
                  ></div>
                `;
              }

              if (cell.isCrate && cell.isLocked) {
                return `
                  <div 
                    class="merge-tile tile-crate" 
                    data-index="${idx}" 
                    title="Mystery Webbed Crate! Merge items nearby or tap to reveal."
                  >
                    <img src="./assets/merge/locked_crate.svg" alt="Locked Crate" class="tile-img" />
                    <span class="tile-crate-tag">🔒 Webbed</span>
                  </div>
                `;
              }

              // Normal Item Tile
              const chainData = MERGE_CHAINS[cell.chain];
              const tierData = chainData ? chainData.tiers.find(t => t.tier === cell.tier) : null;
              const iconSrc = tierData ? tierData.icon : './assets/merge/nature_tier1.svg';
              const name = tierData ? tierData.name : 'Eco Element';

              return `
                <div 
                  class="merge-tile tile-item ${isSelected ? 'tile-selected' : ''} ${isJustMerged ? 'pop-bounce' : ''}" 
                  data-index="${idx}"
                  draggable="true"
                  role="button"
                  tabindex="0"
                  title="${name} (Tier ${cell.tier} ${chainData ? chainData.name : ''})\nDrag or tap to merge with identical item."
                >
                  <img src="${iconSrc}" alt="${name}" class="tile-img" draggable="false" />
                  <span class="tile-tier-badge badge-${cell.chain}">T${cell.tier}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Evolution Chains Helper Accordion -->
        <div class="merge-chains-bar">
          <div class="chain-preview-group">
            <span class="chain-title">🌿 Living Nature:</span>
            <span class="chain-step">Sprout (T1)</span>
            <span class="chain-arrow">→</span>
            <span class="chain-step">Wildflower (T2)</span>
            <span class="chain-arrow">→</span>
            <span class="chain-step">Berry Bush (T3)</span>
            <span class="chain-arrow">→</span>
            <span class="chain-step gold-step">Golden Bonsai (T4)</span>
          </div>

          <div class="chain-preview-group">
            <span class="chain-title">⚡ Clean Tech:</span>
            <span class="chain-step">Copper Scrap (T1)</span>
            <span class="chain-arrow">→</span>
            <span class="chain-step">Solar Cell (T2)</span>
            <span class="chain-arrow">→</span>
            <span class="chain-step">Bio-Battery (T3)</span>
            <span class="chain-arrow">→</span>
            <span class="chain-step blue-step">Microgrid (T4)</span>
          </div>
        </div>

      </div>
    </div>
  `;
}

export function setupMergePuzzleEvents(onCloseCallback, onPlanUnlockedCallback) {
  if (!mergeManager.isOpen) return;

  // Backdrop or Close button
  const closeBtn = document.getElementById('btn-close-merge');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      sound.playPop();
      mergeManager.isOpen = false;
      if (onCloseCallback) onCloseCallback();
      gameState.notify();
    });
  }

  // Refill Energy
  const refillBtn = document.getElementById('btn-refill-energy');
  if (refillBtn) {
    refillBtn.addEventListener('click', () => {
      mergeManager.refillEnergy();
      gameState.notify();
    });
  }

  // Spawner Box Click
  const spawnBtn = document.getElementById('btn-spawn-item');
  if (spawnBtn) {
    spawnBtn.addEventListener('click', () => {
      const res = mergeManager.spawnItem();
      if (res === 'FULL') {
        gameState.setSprig('concerned', 'The merge board is completely full! Merge identical items or recycle to clear space.');
      }
      gameState.notify();
    });
  }

  // Recycle Zone Click with Item Selected
  const recycleZone = document.getElementById('zone-recycle');
  if (recycleZone) {
    recycleZone.addEventListener('click', () => {
      if (mergeManager.selectedCellIndex !== null) {
        mergeManager.recycleItem(mergeManager.selectedCellIndex);
        gameState.notify();
      } else {
        sound.playPop();
        gameState.setSprig('thinking', 'Select an unwanted item first, then tap Recycle to free space and get +2 Energy!');
      }
    });

    recycleZone.addEventListener('dragover', (e) => e.preventDefault());
    recycleZone.addEventListener('drop', (e) => {
      e.preventDefault();
      if (mergeManager.draggedCellIndex !== null) {
        mergeManager.recycleItem(mergeManager.draggedCellIndex);
        mergeManager.draggedCellIndex = null;
        gameState.notify();
      }
    });
  }

  // Deliver Goal Button
  const deliverBtn = document.getElementById('btn-deliver-order');
  if (deliverBtn) {
    deliverBtn.addEventListener('click', () => {
      if (!mergeManager.hasTargetItemOnBoard() || mergeManager.isDelivering) return;

      mergeManager.isDelivering = true;
      sound.playVictory();
      gameState.setSprig('celebrating', '🎉 ECO-BLUEPRINT SYNTHESISED! Sprig\'s Plan is now completely unlocked for this mission!');

      // Unlock in persistent profile
      gameState.unlockSprigPlan(mergeManager.missionId);

      // Auto-apply Sprig's optimal recommendation!
      gameState.applySprigRecommendation();

      gameState.notify();

      // Close modal smoothly after victory celebration
      setTimeout(() => {
        mergeManager.isOpen = false;
        mergeManager.isDelivering = false;
        if (onPlanUnlockedCallback) onPlanUnlockedCallback();
        gameState.notify();
      }, 1600);
    });
  }

  // Tiles Click & Drag Handlers
  const tiles = document.querySelectorAll('.merge-tile');
  tiles.forEach(tile => {
    const idx = parseInt(tile.getAttribute('data-index'), 10);

    // Click to Select & Click to Merge
    tile.addEventListener('click', (e) => {
      e.stopPropagation();

      // If already has a selected cell
      if (mergeManager.selectedCellIndex !== null) {
        if (mergeManager.selectedCellIndex === idx) {
          // Deselect
          mergeManager.selectedCellIndex = null;
          sound.playPop();
        } else {
          // Attempt merge or move
          mergeManager.mergeCells(mergeManager.selectedCellIndex, idx);
        }
      } else {
        // Select this cell if it has an item or crate
        const cell = mergeManager.board[idx];
        if (cell) {
          if (cell.isCrate && cell.isLocked) {
            // Tapping locked crate
            sound.playPop();
            gameState.setSprig('thinking', 'That crate is webbed! Merge two adjacent items to crack it open.');
          } else {
            mergeManager.selectedCellIndex = idx;
            sound.playSelect();
          }
        }
      }
      gameState.notify();
    });

    // Drag and Drop (HTML5 Drag API)
    tile.addEventListener('dragstart', (e) => {
      const cell = mergeManager.board[idx];
      if (!cell || cell.isCrate) {
        e.preventDefault();
        return;
      }
      mergeManager.draggedCellIndex = idx;
      tile.classList.add('dragging-tile');
      e.dataTransfer.setData('text/plain', idx.toString());
    });

    tile.addEventListener('dragend', () => {
      tile.classList.remove('dragging-tile');
      mergeManager.draggedCellIndex = null;
    });

    tile.addEventListener('dragover', (e) => {
      e.preventDefault();
      tile.classList.add('drag-hover');
    });

    tile.addEventListener('dragleave', () => {
      tile.classList.remove('drag-hover');
    });

    tile.addEventListener('drop', (e) => {
      e.preventDefault();
      tile.classList.remove('drag-hover');
      const fromIdx = mergeManager.draggedCellIndex !== null ? mergeManager.draggedCellIndex : parseInt(e.dataTransfer.getData('text/plain'), 10);
      if (!isNaN(fromIdx)) {
        mergeManager.mergeCells(fromIdx, idx);
        gameState.notify();
      }
    });
  });
}

export function openMergePuzzle(missionId) {
  mergeManager.isOpen = true;
  mergeManager.initBoard(missionId);
  sound.playPop();
  gameState.notify();
}

export function isMergePuzzleOpen() {
  return mergeManager.isOpen;
}
