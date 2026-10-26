// Main Game Entry Point & Application Controller
import './style.css';
import { gameState } from './state.js';
import { renderHUD, setupHUDEvents } from './components/hud.js';
import { renderSprig, setupSprigEvents, updateSprigDOM } from './components/sprig.js';
import { renderMainMenu, setupMainMenuEvents } from './screens/mainMenu.js';
import { renderDistrictMap, setupDistrictMapEvents } from './screens/districtMap.js';
import { renderMissionBriefing, setupMissionBriefingEvents } from './screens/missionBriefing.js';
import { renderPlanningScreen, setupPlanningEvents } from './screens/planningScreen.js';
import { renderPreviewPlan, setupPreviewPlanEvents } from './screens/previewPlan.js';
import { renderRestorationScreen, setupRestorationEvents } from './screens/restorationScreen.js';
import { renderResultsScreen, setupResultsEvents } from './screens/resultsScreen.js';
import { renderModals, setupModalEvents } from './screens/modals.js';
import { renderMergePuzzleModal, setupMergePuzzleEvents } from './screens/mergePuzzle.js';

class GreenCityApp {
  constructor() {
    this.appEl = document.getElementById('app');
    this.activeModal = null; // null | 'GUIDE' | 'SETTINGS'
    this.init();
  }

  init() {
    // Reactive Sprig updates in-place without tearing down active page DOM
    gameState.onSprigChange(() => {
      updateSprigDOM();
    });

    // Subscribe to state changes for automatic re-renders
    gameState.subscribe(() => {
      this.render();
    });

    // Initial render
    this.render();
  }

  openModal(modalType) {
    this.activeModal = modalType;
    this.render();
  }

  closeModal() {
    this.activeModal = null;
    this.render();
  }

  render() {
    if (!this.appEl) return;

    const screen = gameState.currentScreen;
    let screenHtml = '';

    // Screen router
    switch (screen) {
      case 'MAIN_MENU':
        screenHtml = renderMainMenu();
        break;
      case 'DISTRICT_MAP':
        screenHtml = renderDistrictMap();
        break;
      case 'MISSION_BRIEFING':
        screenHtml = renderMissionBriefing();
        break;
      case 'PLANNING':
        screenHtml = renderPlanningScreen();
        break;
      case 'PREVIEW':
        screenHtml = renderPreviewPlan();
        break;
      case 'RESTORATION':
        screenHtml = renderRestorationScreen();
        break;
      case 'RESULTS':
        screenHtml = renderResultsScreen();
        break;
      default:
        screenHtml = renderMainMenu();
    }

    // Assemble page: HUD + Screen Content + Sprig NPC + Modal Overlay + Merge Mini-Game
    this.appEl.innerHTML = `
      ${screen !== 'MAIN_MENU' ? renderHUD() : ''}
      <main id="game-main-content" class="game-viewport">
        ${screenHtml}
      </main>
      ${renderSprig()}
      ${renderModals(this.activeModal)}
      ${renderMergePuzzleModal()}
    `;

    // Bind event handlers
    this.setupEvents();
  }

  setupEvents() {
    const screen = gameState.currentScreen;
    const openModalCallback = (type) => this.openModal(type);
    const closeModalCallback = () => this.closeModal();

    if (screen !== 'MAIN_MENU') {
      setupHUDEvents(openModalCallback);
    }

    switch (screen) {
      case 'MAIN_MENU':
        setupMainMenuEvents(openModalCallback);
        break;
      case 'DISTRICT_MAP':
        setupDistrictMapEvents();
        break;
      case 'MISSION_BRIEFING':
        setupMissionBriefingEvents();
        break;
      case 'PLANNING':
        setupPlanningEvents();
        break;
      case 'PREVIEW':
        setupPreviewPlanEvents();
        break;
      case 'RESTORATION':
        setupRestorationEvents();
        break;
      case 'RESULTS':
        setupResultsEvents();
        break;
    }

    setupSprigEvents();

    if (this.activeModal) {
      setupModalEvents(closeModalCallback);
    }

    // Setup Merge Puzzle events
    setupMergePuzzleEvents(
      () => this.render(),
      () => this.render()
    );
  }
}

// Boot game when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  new GreenCityApp();
});
