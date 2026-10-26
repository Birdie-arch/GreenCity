// Planning Screen - Redesigned for Maximum Diorama Visibility & Non-interfering UI
import { gameState } from '../state.js';
import { renderDiorama } from '../components/diorama.js';
import { sound } from '../audio.js';
import { openMergePuzzle } from './mergePuzzle.js';

export function renderPlanningScreen() {
  const mission = gameState.getActiveMission();
  const spent = gameState.getSpentBudget();
  const remaining = gameState.getRemainingBudget();
  const preview = gameState.getPlanPreview();
  const hasSelections = gameState.selectedImprovementIds.size > 0;
  const isFullView = gameState.fullStreetViewMode;
  const isSprigPlanUnlocked = gameState.isSprigPlanUnlocked();

  return `
    <div class="screen planning-screen ${isFullView ? 'full-view-mode' : ''}">
      <!-- Diorama Stage occupies full view -->
      <div class="planning-diorama-stage">
        ${renderDiorama({ forceRestored: false })}

        <!-- Quick View Controls Floating Overlay -->
        <div class="diorama-floating-controls">
          <button class="cozy-pill-btn" id="btn-toggle-lighting" title="Toggle Lighting Atmosphere (Day / Sunset / Night)">
            <span>${gameState.lightingMode === 'sunset' ? '🌅 Sunset' : (gameState.lightingMode === 'night' ? '🌙 Night' : '☀️ Day')}</span>
          </button>
          <button class="cozy-pill-btn" id="btn-toggle-view" title="Toggle Full Street View">
            <span>${isFullView ? '📦 Show Planning Cards' : '👁️ View Full Street'}</span>
          </button>
        </div>
      </div>

      <!-- Floating Planning Deck (Docked at Bottom-Right to never overlap Sprig on bottom-left) -->
      ${!isFullView ? `
        <div class="planning-floating-deck bounce-in" id="planning-deck">
          <!-- Top Micro-Budget Strip -->
          <div class="micro-budget-strip">
            <div class="budget-chip">
              <span class="chip-label">Budget</span>
              <span class="chip-val">$${mission.startingBudget}</span>
            </div>
            <div class="budget-chip highlight-spent">
              <span class="chip-label">Spent</span>
              <span class="chip-val">$${spent}</span>
            </div>
            <div class="budget-chip ${remaining < 25 ? 'highlight-low' : 'highlight-avail'}">
              <span class="chip-label">Remaining</span>
              <span class="chip-val">$${remaining}</span>
            </div>
            <div class="budget-chip highlight-score">
              <span class="chip-label">Projected Health</span>
              <span class="chip-val ${preview.meetsGoal ? 'text-green' : 'text-warn'}">
                ${preview.projectedScore}% <small>(Target ≥ ${mission.targetGreenScore}%)</small>
              </span>
            </div>
          </div>

          <!-- Compact Improvement Cards Row -->
          <div class="compact-cards-row" id="improvement-cards">
            ${mission.improvements.map(item => {
              const isSelected = gameState.isImprovementSelected(item.id);
              const canAfford = isSelected || (spent + item.cost <= mission.startingBudget);

              return `
                <div 
                  class="compact-card ${isSelected ? 'selected' : ''} ${!canAfford ? 'unaffordable' : ''}" 
                  data-id="${item.id}"
                  data-cost="${item.cost}"
                  role="button"
                  tabindex="0"
                  aria-pressed="${isSelected}"
                  title="${item.description}"
                >
                  <div class="compact-card-header">
                    <span class="c-icon">${item.icon}</span>
                    <span class="c-name">${item.title}</span>
                    <span class="c-check">${isSelected ? '✓' : ''}</span>
                  </div>

                  <div class="compact-card-footer">
                    <span class="c-cost">$${item.cost}</span>
                    <span class="c-impact">+${item.scoreBonus}% Score</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Bottom Actions Strip -->
          <div class="planning-actions-strip">
            <div class="actions-strip-left">
              ${isSprigPlanUnlocked ? `
                <button class="cozy-btn primary-btn small-btn sprig-unlocked-btn" id="btn-sprig-recommend" title="Sprig's Plan is unlocked! Tap to apply the optimal green strategy.">
                  <span>✨ Apply Sprig's Plan</span>
                </button>
              ` : `
                <button class="cozy-btn secondary-btn small-btn sprig-puzzle-lock-btn" id="btn-sprig-recommend" title="Play the Eco-Lab Merge Puzzle to unlock Sprig's Plan!">
                  <span class="btn-puzzle-icon">🧩</span>
                  <span>Unlock Sprig's Plan</span>
                  <span class="mini-puzzle-badge">Puzzle</span>
                </button>
              `}
              <button class="cozy-btn secondary-btn small-btn" id="btn-reset-plan" ${!hasSelections ? 'disabled' : ''}>
                <span>🔄 Reset</span>
              </button>
            </div>

            <div class="actions-strip-right">
              <button 
                class="cozy-btn primary-btn ${!hasSelections ? 'disabled-btn' : ''}" 
                id="btn-preview-plan"
                ${!hasSelections ? 'disabled' : ''}
              >
                <span>Preview My Plan (ML Forecast)</span>
                <span class="btn-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

export function setupPlanningEvents() {
  // Toggle Full Street View
  const toggleViewBtn = document.getElementById('btn-toggle-view');
  if (toggleViewBtn) {
    toggleViewBtn.addEventListener('click', () => {
      gameState.toggleFullStreetView();
    });
  }

  // Toggle Lighting Atmosphere (Day / Sunset / Night)
  const toggleLightingBtn = document.getElementById('btn-toggle-lighting');
  if (toggleLightingBtn) {
    toggleLightingBtn.addEventListener('click', () => {
      gameState.toggleLightingMode();
    });
  }

  // Cards interactive handlers
  const cardsRow = document.getElementById('improvement-cards');
  if (cardsRow) {
    cardsRow.addEventListener('mouseleave', () => {
      gameState.resetHoverSprig();
    });
  }

  const cards = document.querySelectorAll('.compact-card');
  cards.forEach(card => {
    const id = card.getAttribute('data-id');

    // Automatic hover feedback from Sprig in-place (no DOM rebuild, zero flicker)
    card.addEventListener('mouseenter', () => {
      gameState.hoverImprovement(id);
    });

    // Click toggle - smooth and 100% reliable
    card.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const success = gameState.toggleImprovement(id);
      if (!success) {
        card.classList.add('shake-rejection');
        setTimeout(() => card.classList.remove('shake-rejection'), 400);
      }
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  const btnReset = document.getElementById('btn-reset-plan');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      gameState.resetCurrentPlan();
    });
  }

  const btnSprigTip = document.getElementById('btn-sprig-recommend');
  if (btnSprigTip) {
    btnSprigTip.addEventListener('click', () => {
      const isUnlocked = gameState.isSprigPlanUnlocked();
      if (!isUnlocked) {
        sound.playPop();
        gameState.setSprig('happy', 'Welcome to my Eco-Lab! Merge elements to craft the blueprint element and unlock my plan!');
        openMergePuzzle(gameState.activeMissionId);
      } else {
        gameState.applySprigRecommendation();
      }
    });
  }

  const btnPreview = document.getElementById('btn-preview-plan');
  if (btnPreview) {
    btnPreview.addEventListener('click', () => {
      if (gameState.selectedImprovementIds.size === 0) {
        sound.playWarning();
        return;
      }
      sound.playPop();
      gameState.setScreen('PREVIEW');
    });
  }
}
