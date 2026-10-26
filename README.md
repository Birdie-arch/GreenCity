# GreenCity: Restore the Forgotten City 🌿

> A cozy 2D orthographic/isometric environmental restoration game inspired by the visual warmth of *Minami Lane*. As the Green Guardian, team up with your eco-companion robot **Sprig** to heal polluted city districts through thoughtful budgeting, strategic improvements, and ML-supported forecasts.

---

## 🎨 Visual Style Direction
- **Orthographic / Isometric Miniature Diorama**: Fixed-camera miniature world built with raised cutaway ground slabs and full street views.
- **Cozy Miniature Art**: Pastel mint/soft green canvas (`#c6dfd2`), warm tan paths (`#f7eee1`), muted green roofs and foliage (`#488065`), golden-orange autumn trees (`#e5903b`), and thick rounded dark brown outlines (`#45362a`).
- **Tactile, Non-Interfering UI**:
  - The isometric street diorama occupies the centerpiece with spacious views.
  - Interactive **"👁️ View Full Street"** toggle collapses planning cards on demand for 100% unobstructed diorama inspection.
  - Floating planning deck is docked to the bottom-right, strictly separated from Sprig's dedicated bottom-left corner so cards and dialogue never collide.
- **Autonomous Reactive Sprig NPC**: Automatically updates dialogues and emotional expressions (*happy*, *thinking*, *concerned*, *celebrating*) on every player action without requiring manual clicking.

---

## 🚀 Exact Run Instructions

### Prerequisites
- Node.js (v18+) & npm
- Python (3.10+) with `.venv` for machine learning training

### Starting the Web Game
```bash
# Navigate to the project root
cd d:/GreenCity

# Install frontend dependencies
npm install

# Start the Vite development server
npm run dev
```

Open your browser to: **`http://localhost:5173/`**

### Re-training the Scikit-Learn Regression Model (Optional)
```bash
# Run the Python scikit-learn training script
.\.venv\Scripts\python.exe train_model.py
```
This evaluates on a 20% held-out test split ($R^2 = 0.7532$ Ridge / $0.9020$ Random Forest, $\text{MAE} = 5.73$) and exports parameters to `public/ml_model.json`.

---

## 🕹️ Screen Sequence & Game Flow

1. **Main Menu (`Screen 1`)**:
   - Title: *GreenCity: Restore the Forgotten City*
   - Living isometric miniature diorama backdrop with drifting golden leaves.
   - Primary action buttons: **Play Game**, **How to Play** (modal guide), and **Settings** (sound/music toggles & save reset).
   - Autonomous Sprig greeting.

2. **District Map (`Screen 2`)**:
   - Displays all 4 GreenCity districts with full multi-mission progression:
     - 🌊 **Riverside District**:
       - **Mission 1: Clean the River** (Unlocked)
       - **Mission 2: Bring Back Nature** (Unlocks after Mission 1)
       - **Mission 3: Community Haven** (Unlocks after Mission 2)
     - 🏢 **Downtown Commercial** (*Unlocks after completing Riverside Mission 3*)
     - ⚙️ **Industrial Zone** (*Unlocks after Downtown*)
     - 🏡 **Residential Neighbourhood** (*Unlocks after Industrial*)
   - Live tracking of total stars collected across missions.

3. **Mission Briefing (`Screen 3`)**:
   - Styled after cozy mission cards with amber tab header (`Mission 1 / 2 / 3`).
   - Clear problem statement, target score, starting conditions, and budget.
   - Autonomous Sprig briefing dialogue with emotional expression.

4. **Planning Screen (`Screen 4`)**:
   - **Hero Isometric Diorama View**: Maximized vertical space to admire the street, river canal, and architecture.
   - **"👁️ View Full Street" Toggle**: Lets players collapse the UI into a single floating pill tab for complete unobstructed diorama viewing.
   - **Docked Floating Deck (Bottom-Right)**:
     - Sits to the right of Sprig (`left: 310px`), ensuring cards never overlap Sprig's speech bubble or avatar.
     - 4 compact improvement cards with instant cost/score metrics.
     - **Hover & Click Feedback**: Hovering or clicking cards triggers automatic reactive guidance from Sprig.
     - **Strict Budget Validation**: Selecting cards exceeding budget is blocked with physical card shake and Sprig warning dialogues.
     - Refunded coins immediately reflected upon card deselection.

5. **Preview My Plan (`Screen 5`)**:
   - **Genuine Scikit-Learn ML Prediction**: Evaluates city features using the trained regression model parameters in `public/ml_model.json`.
   - Side-by-side comparison of **Current Baseline** vs **ML Forecasted Outcome**.
   - Clear distinction between **Pollution Index** ($0-100$, lower is better) and **Green Score** ($0-100$, higher is better).
   - Model honesty & transparency card detailing training size (1,600 samples), test size (400 samples), algorithm (Ridge/Random Forest), and evaluation metrics ($R^2$, MAE).
   - Sprig explains the outcome automatically in plain language.

6. **Restoration Screen (`Screen 6`)**:
   - Visual before-and-after transformation.
   - Floating plastic debris dissolves, crystal-clear water with swimming koi fish fades in, and active improvement badges appear.
   - Interactive **Before / After Clean** comparison toggle.

7. **Results Screen (`Screen 7`)**:
   - **MISSION ACCOMPLISHED!** banner with star animation ($1$ to $3$ stars based on score targets and budget conservation).
   - Final Green Score and coins saved breakdown.
   - Rewards: Treasury coins, Eco XP, and district eco-badges.
   - Unlocks next mission in Riverside; completing Mission 3 unlocks **Downtown District**!
   - Sprig celebrating with confetti.

---

## 📁 Project Architecture & File Descriptions

```
d:/GreenCity/
├── index.html                   # HTML entrypoint with Google Fonts (Fredoka & Quicksand)
├── package.json                 # Project dependencies & Vite scripts
├── README.md                    # Project documentation & run guide
├── train_model.py               # Python scikit-learn ML training and evaluation script
├── public/
│   ├── ml_model.json            # Exported trained ML regression model weights & metrics
│   └── assets/                  # 2D isometric diorama & Sprig avatar art
│       ├── riverside_polluted.jpg   # Polluted Riverside isometric diorama
│       ├── riverside_restored.jpg   # Restored Riverside isometric diorama with koi & flowers
│       ├── sprig_happy.jpg          # Sprig avatar (happy / greeting)
│       ├── sprig_thinking.jpg       # Sprig avatar (thinking / planning / predicting)
│       ├── sprig_concerned.jpg      # Sprig avatar (worried / over-budget / mission miss)
│       └── sprig_celebrating.jpg    # Sprig avatar (celebrating / mission complete)
└── src/
    ├── main.js                  # App bootstrap, state subscription, and view router
    ├── state.js                 # Central game state, 3 Riverside missions, progression, save system
    ├── ml.js                    # Client-side ML regression inference engine
    ├── audio.js                 # Cozy Web Audio API synthesizer (SFX, chimes, ambience)
    ├── style.css                # Minami Lane cozy design system with non-overlapping layout
    ├── components/
    │   ├── hud.js               # Compact top stats capsule & cozy hanging tags
    │   ├── sprig.js             # Autonomous Sprig NPC robot & compact dialogue bubble
    │   └── diorama.js           # Orthographic diorama renderer with before/after toggles
    └── screens/
        ├── mainMenu.js          # Title screen with live diorama teaser
        ├── districtMap.js       # District map with Riverside Missions 1, 2, 3 and Downtown unlock
        ├── missionBriefing.js   # Mission briefing card with objectives
        ├── planningScreen.js    # Spacious diorama view, floating deck, and full-street toggle
        ├── previewPlan.js       # ML forecast comparison & evaluation transparency
        ├── restorationScreen.js # Before/after diorama visual transformation
        ├── resultsScreen.js     # Multi-mission progression, stars, and celebration
        └── modals.js            # "How to Play" guide & "Settings" modals
```

---

## 📋 Implementation Status

- [x] **Full Street View & Spacious Diorama**: Sized and scaled for expansive viewing; includes dedicated "👁️ View Full Street" toggle to hide/show cards with one click.
- [x] **Zero Sprig / Card Interference**: Sprig docked to bottom-left (`280px` max-width); floating planning deck docked to bottom-right (`left: 310px`), ensuring complete visual separation.
- [x] **Autonomous Reactive Sprig**: Dialogue and expressions change dynamically on screen entry, card hover, selection, deselection, budget limits, ML forecast, and victory without needing manual clicks.
- [x] **Complete 4-District Progression (12 Missions Total)**:
  - 🌊 **Riverside District**:
    - Mission 1: *Clean the River* (Waste cleanup & recycling)
    - Mission 2: *Bring Back Nature* (Trees, benches, pollinator meadows, solar water aerators)
    - Mission 3: *Community Haven* (Tea shop reopening, wooden footbridge, rooftop solar)
  - 🏢 **Downtown Commercial District** (*Unlocks after Riverside Mission 3*):
    - Mission 1: *Green Transit & Smog Buster* (Electric streetcar, protected bike lanes, ginkgo avenue, moss bus shelters)
    - Mission 2: *Pedestrian Plaza & Living Walls* (Cobblestone car-free plaza, vertical ivy walls, rain gardens, solar fountains)
    - Mission 3: *Skyline Solar Canopy* (Rooftop solar arrays, urban apiary greenhouse, zero-waste night market, battery microgrid)
  - ⚙️ **Industrial Zone** (*Unlocks after Downtown Mission 3*):
    - Mission 1: *Smokestack Scrubbers & Clean Skies* (Electrostatic bio-scrubbers, pine windbreak, air sensors, mist sprinklers)
    - Mission 2: *Circular Scrap & Bio-Swales* (Circular scrap sorting depot, wetland bio-swales, oil-eating microbes, solar forklifts)
    - Mission 3: *Clean Tech Microgrid* (Low-noise wind turbines, waste-heat cogeneration, eco-makerspace, restored lily waterwheel)
  - 🏡 **Residential Neighbourhood** (*Unlocks after Industrial Mission 3*):
    - Mission 1: *Community Living Yards* (Raised vegetable beds, compost tumblers, pink sakura trees, songbird sanctuaries)
    - Mission 2: *Cool Streets & Rain Catchment* (Permeable clay bricks, rainwater cisterns, solar porch lanterns, tool-sharing shed)
    - Mission 3: *Eco-Village Harmony* (Shared rooftop solar co-op, EV car-sharing hub, natural wetland pond, eco-village community hall)
- [x] **Strict Linear Progression Locking**:
  - All subsequent districts (Downtown, Industrial, Residential) and their missions are strictly locked until the player finishes Mission 3 of the preceding district.
  - Within each district, Mission 2 requires Mission 1, and Mission 3 requires Mission 2.
- [x] **Sprig's Eco-Lab Merge Mini-Game**:
  - Sprig's Plan is no longer free. To unlock Sprig's optimal ML recommendation for a mission, the player must play a tactile merge puzzle.
  - Combines two thematic chains:
    - 🌿 **Living Nature Chain**: Sprout Seedling (T1) → Wildflower Pot (T2) → Lush Berry Bush (T3) → Golden Bonsai Tree (T4)
    - ⚡ **Clean Tech Chain**: Glass & Copper Scrap (T1) → Solar Photocell (T2) → Bio-Battery Capacitor (T3) → Microgrid Generator (T4)
  - Features high-resolution custom illustrated game assets (no bland emojis!), drag-and-drop & click-to-merge controls, compost spawner box, webbed crates, recycle refunds, and animated celebratory delivery.
- [x] **Dynamic District Diorama Art**: Hand-crafted cozy miniature dioramas with dedicated Before & After clean visuals for all 4 districts.
- [x] **Trained Scikit-Learn Regression Model**: Genuine Python regression model trained on 2,000 environmental vectors ($R^2 = 0.7532$ Ridge, $0.9020$ Random Forest), evaluating predictions in real-time in *Preview My Plan*.
- [x] **Tactile Audio & Save System**: Web Audio synthesizer for pops, chimes, victory fanfares, and local storage persistence.


