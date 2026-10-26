// Sprig Robot NPC Component
import { gameState } from '../state.js';
import { sound } from '../audio.js';

export function renderSprig() {
  const sprigData = gameState.sprig;
  const avatarMap = {
    happy: './assets/sprig_happy.jpg',
    thinking: './assets/sprig_thinking.jpg',
    concerned: './assets/sprig_concerned.jpg',
    celebrating: './assets/sprig_celebrating.jpg'
  };

  const currentAvatar = avatarMap[sprigData.expression] || avatarMap.happy;

  return `
    <aside class="sprig-container ${sprigData.expression}" id="sprig-npc" aria-label="Sprig eco-robot guide">
      <!-- Dialogue Bubble -->
      <div class="sprig-bubble ${sprigData.isPromptOpen ? 'open' : 'minimized'}" id="sprig-bubble">
        <div class="sprig-name-tag">
          <span class="leaf-icon">🌱</span>
          <span class="sprig-label">SPRIG</span>
          <span class="sprig-mood-badge">${sprigData.expression}</span>
          <button class="sprig-bubble-toggle-btn" id="btn-toggle-bubble" title="Minimize / Expand message" aria-label="Toggle speech bubble">
            ${sprigData.isPromptOpen ? '–' : '+'}
          </button>
        </div>
        ${sprigData.isPromptOpen ? `
          <p class="sprig-speech" id="sprig-text">${escapeHtml(sprigData.text)}</p>
        ` : ''}
      </div>

      <!-- Sprig Avatar Sticker Badge -->
      <button class="sprig-avatar-btn" id="sprig-tap-btn" title="Tap Sprig for another hint!" aria-label="Sprig Avatar">
        <img src="${currentAvatar}" alt="Sprig (${sprigData.expression})" class="sprig-img" />
      </button>
    </aside>
  `;
}

export function updateSprigDOM() {
  const sprigData = gameState.sprig;
  const avatarMap = {
    happy: './assets/sprig_happy.jpg',
    thinking: './assets/sprig_thinking.jpg',
    concerned: './assets/sprig_concerned.jpg',
    celebrating: './assets/sprig_celebrating.jpg'
  };

  const currentAvatar = avatarMap[sprigData.expression] || avatarMap.happy;
  const container = document.getElementById('sprig-npc');
  if (!container) return;

  // Update expression class
  container.className = `sprig-container ${sprigData.expression}`;

  // Auto-open bubble so player always sees new dialogue without needing to click
  const bubble = document.getElementById('sprig-bubble');
  if (bubble && !bubble.classList.contains('open')) {
    bubble.classList.remove('minimized');
    bubble.classList.add('open');
    gameState.sprig.isPromptOpen = true;
  }

  // Update the speech text — if element missing (bubble was collapsed), rebuild it
  let textEl = document.getElementById('sprig-text');
  if (!textEl && bubble) {
    const p = document.createElement('p');
    p.className = 'sprig-speech';
    p.id = 'sprig-text';
    bubble.appendChild(p);
    textEl = p;
  }
  if (textEl) {
    textEl.textContent = sprigData.text;
    // Flash animation to draw attention to new dialogue
    textEl.style.animation = 'none';
    requestAnimationFrame(() => {
      textEl.style.animation = 'sprigTextFade 0.3s ease';
    });
  }

  // Update mood badge
  const badgeEl = container.querySelector('.sprig-mood-badge');
  if (badgeEl) badgeEl.textContent = sprigData.expression;

  // Update toggle button symbol
  const toggleBtn = document.getElementById('btn-toggle-bubble');
  if (toggleBtn) toggleBtn.textContent = '–';

  // Swap avatar image only if changed (no flicker)
  const imgEl = container.querySelector('.sprig-img');
  if (imgEl && imgEl.getAttribute('src') !== currentAvatar) {
    imgEl.src = currentAvatar;
  }
}

export function setupSprigEvents() {
  const btn = document.getElementById('sprig-tap-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      sound.playPop();
      const mission = gameState.getActiveMission();
      const screen = gameState.currentScreen;

      if (screen === 'PLANNING') {
        const remaining = gameState.getRemainingBudget();
        if (remaining > 50) {
          gameState.setSprig('thinking', `We still have $${remaining} Coins available! Try selecting another improvement.`);
        } else {
          gameState.setSprig('celebrating', 'Plan looks great! Click "Preview My Plan" to inspect our ML regression forecast.');
        }
      } else {
        gameState.setSprig('happy', 'I am here with you, Green Guardian! We will restore GreenCity street by street.');
      }
    });
  }

  const toggleBtn = document.getElementById('btn-toggle-bubble');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sound.playPop();
      gameState.sprig.isPromptOpen = !gameState.sprig.isPromptOpen;
      gameState.notify();
    });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
