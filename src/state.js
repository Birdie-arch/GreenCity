// Central Game State for GreenCity
import { sound } from './audio.js';
import { mlEngine } from './ml.js';

export const DISTRICTS = {
  riverside: {
    id: 'riverside',
    name: 'Riverside District',
    subtitle: 'A historic canal street being revived through water cleanup, flora, and community life',
    unlocked: true,
    totalMissions: 3,
    color: '#4e8067',
    icon: '🌊',
    badgeImage: './assets/riverside_restored.jpg'
  },
  downtown: {
    id: 'downtown',
    name: 'Downtown Commercial',
    subtitle: 'Dense shopping avenues awaiting clean transit, bike lanes, and roadside trees',
    unlocked: false,
    unlockRequirement: 'Complete Riverside Mission 3 to unlock',
    totalMissions: 3,
    color: '#e5903b',
    icon: '🏢',
    badgeImage: './assets/downtown_restored.jpg'
  },
  industrial: {
    id: 'industrial',
    name: 'Industrial Zone',
    subtitle: 'Processing mills transitioning to clean solar energy and closed-loop recycling',
    unlocked: false,
    unlockRequirement: 'Complete Downtown Mission 3 to unlock',
    totalMissions: 3,
    color: '#7c604b',
    icon: '⚙️',
    badgeImage: './assets/industrial_restored.jpg'
  },
  residential: {
    id: 'residential',
    name: 'Residential Neighbourhood',
    subtitle: 'Peaceful streets blossoming with shared community gardens and rooftop solar',
    unlocked: false,
    unlockRequirement: 'Complete Industrial Zone Mission 3 to unlock',
    totalMissions: 3,
    color: '#658d53',
    icon: '🏡',
    badgeImage: './assets/residential_restored.jpg'
  }
};

export const MISSIONS = {
  // ==========================================
  // DISTRICT 1: RIVERSIDE DISTRICT
  // ==========================================
  'riverside-1': {
    id: 'riverside-1',
    districtId: 'riverside',
    missionNumber: 1,
    title: 'Clean the River',
    tagline: 'Remove rubbish and revive the forgotten canal',
    problem: 'Single-use plastic bottles, discarded wrappers, and murky urban runoff have turned the historic Riverside canal into an ecological hazard. Wildlife has vanished and the water is foul.',
    targetGreenScore: 60,
    startingGreenScore: 25,
    startingPollution: 78,
    startingBudget: 150,
    sprigIntro: 'The canal is heavily polluted with trash! Select improvements to clear the plastic and filter the water.',
    sprigPlanningHint: 'Start with the River Cleanup Crew. Removing the plastic sludge yields our biggest immediate drop in pollution!',
    improvements: [
      {
        id: 'river_cleanup',
        title: 'River Cleanup Crew',
        tag: 'Essential Waste Removal',
        icon: '🧹',
        cost: 60,
        scoreBonus: 32,
        pollutionDrop: 36,
        description: 'Dredges floating plastic containers, removes submerged debris, and restores natural water circulation.',
        sprigComment: 'Awesome! The cleanup crew directly dredges canal plastics and clears murky sludge.'
      },
      {
        id: 'recycling_bins',
        title: 'Eco Sorting Stations',
        tag: 'Source Reduction',
        icon: '♻️',
        cost: 40,
        scoreBonus: 16,
        pollutionDrop: 18,
        description: 'Installs handcrafted wooden recycling and compost receptacles along the stone walkway.',
        sprigComment: 'Great pick! Wooden recycling stations stop pedestrians from tossing trash into the water.'
      },
      {
        id: 'planters',
        title: 'Wildflower Planters',
        tag: 'Biodiversity Oasis',
        icon: '🌸',
        cost: 30,
        scoreBonus: 12,
        pollutionDrop: 10,
        description: 'Places cedar planter boxes blooming with native nectar flowers to attract butterflies and bees.',
        sprigComment: 'Charming! Native flower planters bring sweet scents and friendly honeybees to the sidewalk.'
      },
      {
        id: 'embankment_restore',
        title: 'Embankment Reeds',
        tag: 'Natural Bio-Filter',
        icon: '🌿',
        cost: 50,
        scoreBonus: 22,
        pollutionDrop: 24,
        description: 'Plants deep-root native sedges and water reeds along the riverbank to filter toxic runoff naturally.',
        sprigComment: 'Smart move! Bio-reeds act as nature\'s water filter, purifying urban runoff before it hits the canal.'
      }
    ]
  },
  'riverside-2': {
    id: 'riverside-2',
    districtId: 'riverside',
    missionNumber: 2,
    title: 'Bring Back Nature',
    tagline: 'Establish lush riverside greenery and restore aquatic life',
    problem: 'Now that the heaviest trash is gone, the riverbank is barren, dry, and lacking tree shade. Aquatic life struggles without dissolved oxygen and shaded banks.',
    targetGreenScore: 75,
    startingGreenScore: 45,
    startingPollution: 54,
    startingBudget: 180,
    sprigIntro: 'The canal is cleaner, but barren! Let\'s plant golden maples, add solar water aerators, and welcome wildlife back.',
    sprigPlanningHint: 'Riverside Cherry & Maple Trees give immense shade and score, while the Solar Aerator keeps fish healthy!',
    improvements: [
      {
        id: 'cherry_trees',
        title: 'Golden Maple & Cherry Trees',
        tag: 'Urban Canopy',
        icon: '🍁',
        cost: 65,
        scoreBonus: 28,
        pollutionDrop: 22,
        description: 'Plants mature golden-orange maples and flowering cherry saplings for shade and air filtration.',
        sprigComment: 'Magnificent! Golden trees cool the street down and filter the air beautifully!'
      },
      {
        id: 'mini_park',
        title: 'Riverside Benches & Path',
        tag: 'Cozy Community',
        icon: '🪑',
        cost: 55,
        scoreBonus: 24,
        pollutionDrop: 16,
        description: 'Installs curved wooden benches, stepping stones, and solar lanterns for pedestrians.',
        sprigComment: 'How cozy! Villagers can now sit peacefully by the water to read and talk.'
      },
      {
        id: 'pollinator_garden',
        title: 'Native Pollinator Meadows',
        tag: 'Ecological Habitat',
        icon: '🦋',
        cost: 40,
        scoreBonus: 18,
        pollutionDrop: 14,
        description: 'Establishes perennial clover, lavender, and milkweed patches along the pathway verge.',
        sprigComment: 'Look at the butterflies! Native wildflowers boost pollinators and soil health.'
      },
      {
        id: 'water_aerator',
        title: 'Solar Water Aerator',
        tag: 'Aquatic Life Support',
        icon: '☀️',
        cost: 50,
        scoreBonus: 22,
        pollutionDrop: 26,
        description: 'Submerged solar-powered bubble diffusers oxygenate the canal, preventing algae blooms.',
        sprigComment: 'The fish love this! Oxygenating the canal keeps water crystal-clear and fresh.'
      }
    ]
  },
  'riverside-3': {
    id: 'riverside-3',
    districtId: 'riverside',
    missionNumber: 3,
    title: 'Community Haven',
    tagline: 'Complete Riverside\'s eco-renovation and revitalize the street',
    problem: 'To finalize Riverside\'s transformation into a self-sustaining eco-haven, we need community infrastructure: reopen the historic tea shop, renovate the footbridge, and install rooftop solar!',
    targetGreenScore: 85,
    startingGreenScore: 60,
    startingPollution: 38,
    startingBudget: 200,
    sprigIntro: 'This is our final Riverside challenge! Reopen the tea shop and restore the footbridge to unlock Downtown!',
    sprigPlanningHint: 'The Tea & Flower Shop brings tremendous community satisfaction, and Rooftop Solar slashes energy emissions.',
    improvements: [
      {
        id: 'tea_shop',
        title: 'Tea & Flower Shop Opening',
        tag: 'Vibrant Local Business',
        icon: '🍵',
        cost: 75,
        scoreBonus: 30,
        pollutionDrop: 20,
        description: 'Refurbishes the shuttered shop into a zero-waste tea stall with glowing lanterns and fresh matcha.',
        sprigComment: 'Hooray! The shutters are up, tea is brewing, and warm lanterns welcome visitors!'
      },
      {
        id: 'footbridge',
        title: 'Wooden Footbridge Renovation',
        tag: 'Pedestrian Link',
        icon: '🌉',
        cost: 60,
        scoreBonus: 24,
        pollutionDrop: 16,
        description: 'Rebuilds the rustic wooden bridge with cedar railings, flower baskets, and fishing platforms.',
        sprigComment: 'The footbridge is safe and lovely! Villagers can now cross effortlessly over the koi stream.'
      },
      {
        id: 'compost_hub',
        title: 'Community Composting Hub',
        tag: 'Zero-Waste Cycle',
        icon: '🍂',
        cost: 45,
        scoreBonus: 18,
        pollutionDrop: 20,
        description: 'Provides smell-free cedar compost tumblers for residents to turn organic waste into garden mulch.',
        sprigComment: 'Smart recycling! Turning organic waste into fertile soil for our flower beds.'
      },
      {
        id: 'solar_canopies',
        title: 'Rooftop Moss & Solar Canopies',
        tag: 'Clean Energy & Insulation',
        icon: '🔋',
        cost: 55,
        scoreBonus: 22,
        pollutionDrop: 24,
        description: 'Installs living moss green-roofs and subtle miniature solar tiles on the street buildings.',
        sprigComment: 'Clean solar power plus natural roof cooling! The ultimate green building upgrade.'
      }
    ]
  },

  // ==========================================
  // DISTRICT 2: DOWNTOWN COMMERCIAL
  // ==========================================
  'downtown-1': {
    id: 'downtown-1',
    districtId: 'downtown',
    missionNumber: 1,
    title: 'Green Transit & Smog Buster',
    tagline: 'Replace car gridlock with electric streetcars and ginkgo avenues',
    problem: 'Endless car traffic and idling delivery trucks fill Downtown\'s shopping corridor with choking exhaust smog. Grime coats store awnings and pedestrians struggle to breathe.',
    targetGreenScore: 65,
    startingGreenScore: 30,
    startingPollution: 75,
    startingBudget: 170,
    sprigIntro: 'Welcome to Downtown Commercial! Exhaust smog is trapped between the shops. Let\'s build the electric tramway and plant ginkgo trees!',
    sprigPlanningHint: 'Electric Streetcar Line takes dozens of polluting cars off the road and drastically drops nitrogen dioxide!',
    improvements: [
      {
        id: 'electric_tram',
        title: 'Electric Streetcar Line',
        tag: 'Zero-Emissions Transit',
        icon: '🚃',
        cost: 70,
        scoreBonus: 32,
        pollutionDrop: 34,
        description: 'Lays central green-carpeted tram tracks with quiet electric streetcars connecting shoppers clean and fast.',
        sprigComment: 'Ding-ding! The electric streetcar glides silently down the avenue with zero tailpipe emissions!'
      },
      {
        id: 'bike_corridor',
        title: 'Protected Bike Lanes & Racks',
        tag: 'Active Mobility',
        icon: '🚲',
        cost: 45,
        scoreBonus: 20,
        pollutionDrop: 18,
        description: 'Separates two-wheel cyclists with curb barriers, painted green asphalt, and wooden bike locking bollards.',
        sprigComment: 'Pedal power! Cyclists and families can commute safely without worrying about vehicle traffic.'
      },
      {
        id: 'ginkgo_avenue',
        title: 'Golden Ginkgo Tree Canopy',
        tag: 'Urban Tree Canopy',
        icon: '🌳',
        cost: 50,
        scoreBonus: 24,
        pollutionDrop: 20,
        description: 'Lines both sidewalks with mature, hardy ginkgo trees that thrive in urban centers and filter fine dust.',
        sprigComment: 'Stunning golden leaves! Ginkgo trees are famous for absorbing city particulates and cooling sidewalks.'
      },
      {
        id: 'smog_shelters',
        title: 'Living Moss Bus Shelters',
        tag: 'Bio-Air Purification',
        icon: '🚏',
        cost: 35,
        scoreBonus: 16,
        pollutionDrop: 14,
        description: 'Installs transit stops crowned with dense moss carpets that trap PM2.5 soot particles naturally.',
        sprigComment: 'Super smart bio-tech! Natural moss walls eat up street dust while transit riders wait comfortably.'
      }
    ]
  },
  'downtown-2': {
    id: 'downtown-2',
    districtId: 'downtown',
    missionNumber: 2,
    title: 'Pedestrian Plaza & Living Walls',
    tagline: 'Convert hot asphalt into shaded pedestrian cobblestone plazas',
    problem: 'Asphalt surfaces generate an unbearable urban heat island during midday. Rainwater picks up motor oil and dumps it directly into storm drains.',
    targetGreenScore: 78,
    startingGreenScore: 48,
    startingPollution: 52,
    startingBudget: 190,
    sprigIntro: 'The smog is clearing, but the heat-island is sweltering! Let\'s convert asphalt roads into pedestrian cobblestone plazas.',
    sprigPlanningHint: 'Car-Free Cobblestone Plaza creates a walkable paradise, while Vertical Ivy Walls cool building facades.',
    improvements: [
      {
        id: 'carfree_plaza',
        title: 'Car-Free Cobblestone Plaza',
        tag: 'Pedestrian Paradise',
        icon: '🚶',
        cost: 75,
        scoreBonus: 30,
        pollutionDrop: 22,
        description: 'Paves over cracked asphalt with warm permeable pavers, café tables, parasols, and open walking promenades.',
        sprigComment: 'Look at the happy shoppers! Opening the street to pedestrians makes Downtown vibrant and peaceful.'
      },
      {
        id: 'vertical_gardens',
        title: 'Vertical Ivy & Moss Walls',
        tag: 'Building Bio-Cooling',
        icon: '🌿',
        cost: 50,
        scoreBonus: 22,
        pollutionDrop: 18,
        description: 'Mounts hydroponic climbing trellises with evergreen ivy, ferns, and jasmine against sunny shop facades.',
        sprigComment: 'Living green facades reduce building surface temperatures by up to 10 degrees!'
      },
      {
        id: 'rain_pavers',
        title: 'Permeable Paver Rain Gardens',
        tag: 'Stormwater Sponge',
        icon: '🌧️',
        cost: 45,
        scoreBonus: 20,
        pollutionDrop: 20,
        description: 'Constructs sunken roadside rain gardens with gravel drainage layers that soak up 100% of rainwater runoff.',
        sprigComment: 'No more puddles or polluted runoff! Rain gardens act as natural sponges for the avenue.'
      },
      {
        id: 'solar_fountains',
        title: 'Solar Mist & Drinking Fountains',
        tag: 'Microclimate Refresh',
        icon: '⛲',
        cost: 40,
        scoreBonus: 18,
        pollutionDrop: 12,
        description: 'Installs carved stone drinking fountains and evaporative solar cooling mist posts for hot summer afternoons.',
        sprigComment: 'Ahhh, so refreshing! A cool drink and gentle water mist for tired shoppers and their pets.'
      }
    ]
  },
  'downtown-3': {
    id: 'downtown-3',
    districtId: 'downtown',
    missionNumber: 3,
    title: 'Skyline Solar Canopy',
    tagline: 'Crown rooftops with clean solar arrays and open zero-waste markets',
    problem: 'Commercial buildings burn massive amounts of power for lighting and climate control. Barren black tar rooftops bake under the sun, wasting valuable space.',
    targetGreenScore: 88,
    startingGreenScore: 62,
    startingPollution: 35,
    startingBudget: 220,
    sprigIntro: 'Final Downtown mission! Crown the rooftops with solar arrays, build an apiary greenhouse, and unlock Industrial Zone!',
    sprigPlanningHint: 'Rooftop Solar Array Network produces clean renewable electricity, powering all street businesses.',
    improvements: [
      {
        id: 'rooftop_solar_farm',
        title: 'Rooftop Solar Array Network',
        tag: 'Clean Renewable Power',
        icon: '☀️',
        cost: 80,
        scoreBonus: 34,
        pollutionDrop: 28,
        description: 'Installs high-efficiency photovoltaic solar panels across flat commercial roofs, generating 200kW of clean power.',
        sprigComment: 'Rooftops are now sparkling solar generators, powering our trams and storefronts cleanly!'
      },
      {
        id: 'rooftop_greenhouse',
        title: 'Urban Rooftop Apiary & Greenhouse',
        tag: 'Hyper-Local Produce',
        icon: '🐝',
        cost: 55,
        scoreBonus: 24,
        pollutionDrop: 16,
        description: 'Builds glasshouse vegetable beds and safe honeybee hives on upper terraces for hyper-local Downtown produce.',
        sprigComment: 'Buzzy friends! Fresh rooftop honey and crisp lettuce harvested right above the ramen shops.'
      },
      {
        id: 'night_market',
        title: 'Zero-Waste Night Market',
        tag: 'Circular Economy',
        icon: '🏮',
        cost: 55,
        scoreBonus: 22,
        pollutionDrop: 14,
        description: 'Launches weekend evening stalls with reusable ceramic bowls, organic craft teas, and solar-lit lantern strings.',
        sprigComment: 'The lanterns are glowing! Zero single-use plastics and vibrant local craft artisans.'
      },
      {
        id: 'battery_microgrid',
        title: 'District Battery Microgrid',
        tag: 'Grid Resilience',
        icon: '🔋',
        cost: 50,
        scoreBonus: 20,
        pollutionDrop: 22,
        description: 'Installs safe lithium iron phosphate battery banks to store excess daytime solar energy for night street lighting.',
        sprigComment: 'Stored sunshine powers the streetlights all through the night with zero fossil backup!'
      }
    ]
  },

  // ==========================================
  // DISTRICT 3: INDUSTRIAL ZONE
  // ==========================================
  'industrial-1': {
    id: 'industrial-1',
    districtId: 'industrial',
    missionNumber: 1,
    title: 'Smokestack Scrubbers & Clean Skies',
    tagline: 'Capture industrial emissions and eliminate toxic soot plumes',
    problem: 'Aging factory chimneys release heavy soot, sulfur particles, and dark smoke clouds that drift across the valley. Workers cough and the nearby mill stream is coated in grey sludge.',
    targetGreenScore: 65,
    startingGreenScore: 25,
    startingPollution: 85,
    startingBudget: 180,
    sprigIntro: 'We\'ve reached the Industrial Zone! Smokestacks are billowing black soot. Let\'s install electrostatic scrubbers and bio-filters!',
    sprigPlanningHint: 'Electrostatic Bio-Scrubbers trap 90% of furnace emissions right at the chimney base.',
    improvements: [
      {
        id: 'stack_scrubber',
        title: 'Electrostatic Bio-Scrubbers',
        tag: 'Emission Elimination',
        icon: '🏭',
        cost: 75,
        scoreBonus: 34,
        pollutionDrop: 40,
        description: 'Mounts multi-stage ceramic filtration towers on the main smokestack to capture 95% of fine soot and sulfur particles.',
        sprigComment: 'Incredible! The black smoke vanishes into thin air—now only clean warm water vapor escapes!'
      },
      {
        id: 'pine_windbreak',
        title: 'Evergreen Pine Bio-Windbreak',
        tag: 'Natural Dust Barrier',
        icon: '🌲',
        cost: 45,
        scoreBonus: 18,
        pollutionDrop: 18,
        description: 'Plants a dense three-tier shelterbelt of cedar and white pine trees to capture fugitive factory dust particles.',
        sprigComment: 'Nature\'s perimeter guard! Dense pine needles absorb dust and muffle heavy factory noises.'
      },
      {
        id: 'particulate_monitors',
        title: 'Smart Emission Sensor Grid',
        tag: 'Air Quality Precision',
        icon: '📡',
        cost: 35,
        scoreBonus: 15,
        pollutionDrop: 12,
        description: 'Installs solar-powered IoT particulate and VOC sensors across the factory perimeter for real-time monitoring.',
        sprigComment: 'Data-driven sustainability! We can immediately detect any emission spikes before they spread.'
      },
      {
        id: 'dust_sprinklers',
        title: 'Recycled Water Mist Sprinklers',
        tag: 'Particulate Suppression',
        icon: '💦',
        cost: 45,
        scoreBonus: 18,
        pollutionDrop: 18,
        description: 'Uses treated recycled process water to mist loading docks and conveyor belts, preventing dust clouds from rising.',
        sprigComment: 'Keeps the yard dust-free without wasting a single drop of fresh municipal water!'
      }
    ]
  },
  'industrial-2': {
    id: 'industrial-2',
    districtId: 'industrial',
    missionNumber: 2,
    title: 'Circular Scrap & Bio-Swales',
    tagline: 'Clean up rusty scrap yards and purify industrial chemical runoff',
    problem: 'Piles of discarded iron machinery and leaking barrels of lubricating oils have contaminated the gravel yard. Rain washes toxic chemicals straight into the historic waterwheel ditch.',
    targetGreenScore: 78,
    startingGreenScore: 46,
    startingPollution: 58,
    startingBudget: 200,
    sprigIntro: 'The air is clean, but the ground runoff has scrap and grease! Let\'s build the circular recycling depot and water swales.',
    sprigPlanningHint: 'Circular Metal & Plastic Sorting Depot cleans the yard and generates recycled raw materials.',
    improvements: [
      {
        id: 'circular_depot',
        title: 'Circular Scrap & Sorting Depot',
        tag: 'Closed-Loop Material',
        icon: '♻️',
        cost: 70,
        scoreBonus: 30,
        pollutionDrop: 26,
        description: 'Clears rusted metal mounds and installs color-coded industrial sorting bays for paper, glass, and steel recycling.',
        sprigComment: 'The scrap heap is gone! Recycled metals go straight back into clean production.'
      },
      {
        id: 'bio_retention_swale',
        title: 'Engineered Wetland Bio-Swale',
        tag: 'Chemical Bio-Filter',
        icon: '🪷',
        cost: 60,
        scoreBonus: 26,
        pollutionDrop: 28,
        description: 'Carves stone-lined channels filled with cattails, gravel, and bio-char that capture heavy metal runoffs.',
        sprigComment: 'Water lilies and reeds filter out toxic metals, leaving the ditch stream sparkling clean.'
      },
      {
        id: 'microbe_bioremediation',
        title: 'Oil-Eating Microbe Water Cleanse',
        tag: 'Bio-Degradation',
        icon: '🔬',
        cost: 45,
        scoreBonus: 20,
        pollutionDrop: 22,
        description: 'Introduces harmless native hydrocarbon-digesting bacteria that break down stubborn motor oil slicks.',
        sprigComment: 'Microscopic eco-heroes! Microbes digest oil molecules into harmless carbon and water.'
      },
      {
        id: 'solar_carports',
        title: 'Solar Canopy & Electric Forklifts',
        tag: 'Zero-Emission Operations',
        icon: '🚜',
        cost: 50,
        scoreBonus: 20,
        pollutionDrop: 16,
        description: 'Replaces noisy diesel forklifts with electric models charged under factory solar parking shades.',
        sprigComment: 'Quiet, clean electric forklifts gliding smoothly across clean pavers!'
      }
    ]
  },
  'industrial-3': {
    id: 'industrial-3',
    districtId: 'industrial',
    missionNumber: 3,
    title: 'Clean Tech Microgrid',
    tagline: 'Turn the industrial zone into a 100% renewable eco-innovation hub',
    problem: 'Old fossil-fuel generators still churn in the basement. Transitioning to wind turbines, waste-heat cogeneration, and waterwheel power will achieve net-zero manufacturing!',
    targetGreenScore: 88,
    startingGreenScore: 62,
    startingPollution: 36,
    startingBudget: 220,
    sprigIntro: 'Final challenge for the Industrial Zone! Replace the old generator with wind turbines and build an eco-tech innovation lab to unlock Residential!',
    sprigPlanningHint: 'Low-Noise Wind Turbines + Cogeneration creates an eco-industrial model for the future.',
    improvements: [
      {
        id: 'wind_turbines',
        title: 'Gentle Low-Noise Wind Turbines',
        tag: 'Clean Kinetic Power',
        icon: '💨',
        cost: 80,
        scoreBonus: 32,
        pollutionDrop: 28,
        description: 'Installs whisper-quiet vertical-axis wind turbines atop factory gables to harvest mountain valley winds.',
        sprigComment: 'Whirrr! The turbines spin gently in the breeze, delivering abundant free renewable power!'
      },
      {
        id: 'cogeneration_plant',
        title: 'Industrial Waste-Heat Cogeneration',
        tag: 'Thermal Efficiency',
        icon: '🔥',
        cost: 65,
        scoreBonus: 26,
        pollutionDrop: 24,
        description: 'Captures heat escaping from factory boilers to heat district buildings and drive a steam micro-turbine.',
        sprigComment: 'Nothing wasted! Factory excess heat now keeps local offices toasty and warm.'
      },
      {
        id: 'eco_makerspace',
        title: 'Green Maker & Repair Workshop',
        tag: 'Community Upcycling',
        icon: '🔧',
        cost: 50,
        scoreBonus: 22,
        pollutionDrop: 16,
        description: 'Opens a community workshop where workers and citizens repair appliances and upcycle manufacturing surplus.',
        sprigComment: 'Repair over replace! The community workshop has saved hundreds of machines from landfills.'
      },
      {
        id: 'lily_waterwheel',
        title: 'Restored Waterwheel & Stepping Stones',
        tag: 'Heritage Hydro Power',
        icon: '🪵',
        cost: 45,
        scoreBonus: 20,
        pollutionDrop: 20,
        description: 'Restores the historic timber waterwheel to generate auxiliary hydro-electric power and adds stone crossing steps.',
        sprigComment: 'The timber wheel turns happily again! Blooming pink water lilies float along the stepping stones.'
      }
    ]
  },

  // ==========================================
  // DISTRICT 4: RESIDENTIAL NEIGHBOURHOOD
  // ==========================================
  'residential-1': {
    id: 'residential-1',
    districtId: 'residential',
    missionNumber: 1,
    title: 'Community Living Yards',
    tagline: 'Replace dry barren yards with living organic gardens and fruit trees',
    problem: 'Withered dead grass, chemical lawn treatments, and overflowing household trash cans make the neighborhood look abandoned. Songbirds and friendly neighbors have vanished.',
    targetGreenScore: 70,
    startingGreenScore: 35,
    startingPollution: 70,
    startingBudget: 175,
    sprigIntro: 'Welcome to the Residential Neighbourhood! Front lawns are dry and bins are overflowing. Let\'s plant organic vegetable beds and flowering trees!',
    sprigPlanningHint: 'Raised Organic Vegetable & Herb Beds replace dead lawns with fresh produce and rich microbial soil!',
    improvements: [
      {
        id: 'veggie_gardens',
        title: 'Raised Organic Vegetable & Herb Beds',
        tag: 'Local Permaculture',
        icon: '🥕',
        cost: 65,
        scoreBonus: 30,
        pollutionDrop: 26,
        description: 'Builds cedar planter boxes brimming with tomatoes, carrots, mint, and squash, irrigated by drip lines.',
        sprigComment: 'Fresh tomatoes and sweet basil growing right outside the front doors!'
      },
      {
        id: 'compost_tumblers',
        title: 'Cedar Neighborhood Compost Boxes',
        tag: 'Soil Regeneration',
        icon: '🪵',
        cost: 40,
        scoreBonus: 18,
        pollutionDrop: 18,
        description: 'Installs sealed rotational composters for kitchen food scraps and yard trimmings, eliminating landfill emissions.',
        sprigComment: 'Zero kitchen scraps in the trash! Rich black compost enriches our vegetable beds naturally.'
      },
      {
        id: 'sakura_canopy',
        title: 'Flowering Sakura & Golden Maples',
        tag: 'Neighborhood Canopy',
        icon: '🌸',
        cost: 50,
        scoreBonus: 24,
        pollutionDrop: 18,
        description: 'Plants blossoming pink cherry blossom and golden maples along property boundaries for shade and bird shelter.',
        sprigComment: 'Pink sakura blossoms dancing in the wind! The street feels magical and serene.'
      },
      {
        id: 'bird_nesting',
        title: 'Songbird Sanctuary & Roosting Boxes',
        tag: 'Avian Biodiversity',
        icon: '🐦',
        cost: 35,
        scoreBonus: 16,
        pollutionDrop: 12,
        description: 'Hangs handcrafted wooden birdhouses, seed feeders, and birdbaths from the mature yard trees.',
        sprigComment: 'Listen to that cheerful birdsong! Robins and chickadees have moved into their cozy wooden houses.'
      }
    ]
  },
  'residential-2': {
    id: 'residential-2',
    districtId: 'residential',
    missionNumber: 2,
    title: 'Cool Streets & Rain Catchment',
    tagline: 'Replace cracked asphalt with cool permeable bricks and rain cisterns',
    problem: 'Cracked concrete streets radiate heat, and heavy storms flood front driveways with silty mud. Dark pathways make evenings feel gloomy and uninviting.',
    targetGreenScore: 80,
    startingGreenScore: 52,
    startingPollution: 48,
    startingBudget: 195,
    sprigIntro: 'The yards are lush, but the roadway is cracked and flood-prone! Let\'s lay permeable clay bricks and install rain barrels.',
    sprigPlanningHint: 'Permeable Clay Brick Paving lets rainwater soak into aquifers instead of flooding the front porches!',
    improvements: [
      {
        id: 'permeable_bricks',
        title: 'Permeable Clay Brick Paving',
        tag: 'Eco-Roadway',
        icon: '🧱',
        cost: 70,
        scoreBonus: 28,
        pollutionDrop: 24,
        description: 'Lays warm terracotta permeable brick paving that lets stormwater filter naturally into the groundwater table.',
        sprigComment: 'What a handsome street! Permeable bricks prevent street flooding and look cozy and warm.'
      },
      {
        id: 'rain_cisterns',
        title: 'Rainwater Harvesting Cisterns',
        tag: 'Water Conservation',
        icon: '🪣',
        cost: 45,
        scoreBonus: 20,
        pollutionDrop: 18,
        description: 'Hooks wooden rain barrels to house roof downspouts, storing thousands of liters for garden watering.',
        sprigComment: 'Free natural rainwater for the veggies! Cuts city water dependency during dry summer months.'
      },
      {
        id: 'solar_benches',
        title: 'Warm Solar Porch Lanterns & Benches',
        tag: 'Cozy Streetscape',
        icon: '🪑',
        cost: 40,
        scoreBonus: 18,
        pollutionDrop: 12,
        description: 'Places cedar street benches and soft amber solar lanterns along the sidewalk for evening strolls.',
        sprigComment: 'Warm glowing lanterns light the path, inviting neighbors to sit and chat after dinner.'
      },
      {
        id: 'tool_library',
        title: 'Community Tool-Sharing Shed',
        tag: 'Shared Resources',
        icon: '🏡',
        cost: 45,
        scoreBonus: 18,
        pollutionDrop: 14,
        description: 'Builds a charming neighborhood lending shed stocked with electric lawnmowers, rakes, and ladders.',
        sprigComment: 'Why buy 20 lawnmowers when one shared mower does the job? Pure community cooperation!'
      }
    ]
  },
  'residential-3': {
    id: 'residential-3',
    districtId: 'residential',
    missionNumber: 3,
    title: 'Eco-Village Harmony',
    tagline: 'Achieve 100% net-zero sustainability and complete GreenCity\'s rebirth!',
    problem: 'This is the Grand Finale of our environmental restoration! Connect all residential rooftops into a solar cooperative, launch community EV car-sharing, and build the village hall!',
    targetGreenScore: 92,
    startingGreenScore: 68,
    startingPollution: 30,
    startingBudget: 230,
    sprigIntro: 'This is our final mission to restore the entire Forgotten City! Let\'s install solar rooftops, launch EV car-share, and build the village center!',
    sprigPlanningHint: 'Shared Rooftop Solar Cooperative + Natural Wetland Pond brings GreenCity to 100% sustainable perfection!',
    improvements: [
      {
        id: 'residential_solar',
        title: 'Shared Rooftop Solar Cooperative',
        tag: '100% Net-Zero Energy',
        icon: '⚡',
        cost: 85,
        scoreBonus: 34,
        pollutionDrop: 26,
        description: 'Installs high-efficiency solar roof tiles on every residential home, creating a shared microgrid energy pool.',
        sprigComment: 'Every roof is harvesting clean sunlight! Homes actually produce more clean power than they use!'
      },
      {
        id: 'ev_carshare',
        title: 'Neighborhood EV Car-Share Hub',
        tag: 'Shared Clean Mobility',
        icon: '🚗',
        cost: 60,
        scoreBonus: 26,
        pollutionDrop: 20,
        description: 'Provides shared electric vehicles and e-cargo bikes at a community solar charging pavilion.',
        sprigComment: 'Families can rent clean EVs on demand—reducing parking congestion and eliminating gas emissions!'
      },
      {
        id: 'nature_pond',
        title: 'Natural Wetland Pond & Stepping Stones',
        tag: 'Living Aquatic Haven',
        icon: '🐸',
        cost: 50,
        scoreBonus: 22,
        pollutionDrop: 18,
        description: 'Excavates a natural stormwater retention pond with stepping stones, water lilies, and singing frogs.',
        sprigComment: 'Ribbit! Dragonflies and frogs thrive in the natural pond, keeping insect populations in balance.'
      },
      {
        id: 'eco_village_hall',
        title: 'Eco-Village Community Library & Cafe',
        tag: 'Heart of the City',
        icon: '📚',
        cost: 55,
        scoreBonus: 24,
        pollutionDrop: 16,
        description: 'Opens a timber-framed community living room with a zero-waste café, lending library, and workshop space.',
        sprigComment: 'The heart of GreenCity beats strong! Neighbors share books, laugh over tea, and celebrate our green paradise!'
      }
    ]
  }
};

class GameStateManager {
  constructor() {
    this.currentScreen = 'MAIN_MENU';
    this.activeDistrictId = 'riverside';
    this.activeMissionId = 'riverside-1';
    this.selectedImprovementIds = new Set();
    this.fullStreetViewMode = false;
    this.lightingMode = 'day'; // 'day' | 'sunset' | 'night'
    
    // Persistent profile state across all districts
    this.playerProfile = {
      coins: 150,
      totalCleanups: 0,
      completedMissions: {},
      unlockedBadges: [],
      unlockedSprigPlans: {},
      downtownUnlocked: false,
      industrialUnlocked: false,
      residentialUnlocked: false,
      allDistrictsRestored: false,
      sfxVolume: true,
      musicVolume: false
    };

    // Sprig NPC current speech & mood
    this.sprig = {
      expression: 'happy',
      text: 'Welcome to GreenCity, Green Guardian! Ready to restore our miniature world?',
      isPromptOpen: true
    };

    this.sprigListener = null;
    this.listeners = new Set();
    this.loadProfile();
  }

  // Strict check: District is only unlocked if previous district's Mission 3 is completed!
  isDistrictUnlocked(districtId) {
    if (districtId === 'riverside') return true;
    const completed = this.playerProfile?.completedMissions || {};
    if (districtId === 'downtown') {
      return !!completed['riverside-3'];
    }
    if (districtId === 'industrial') {
      return !!completed['downtown-3'];
    }
    if (districtId === 'residential') {
      return !!completed['industrial-3'];
    }
    return false;
  }

  // Strict check: Mission is only unlocked if previous missions and district are completed!
  isMissionUnlocked(missionId) {
    if (!missionId) return false;
    const [districtId, missionNumStr] = missionId.split('-');
    const num = parseInt(missionNumStr, 10);

    // If district itself is locked, all its missions are locked
    if (!this.isDistrictUnlocked(districtId)) {
      return false;
    }

    // Riverside-1 is the only initial mission
    if (num === 1) return true;

    const completed = this.playerProfile?.completedMissions || {};

    // Mission 2 requires Mission 1 completed
    if (num === 2) {
      return !!completed[`${districtId}-1`];
    }

    // Mission 3 requires Mission 2 completed
    if (num === 3) {
      return !!completed[`${districtId}-2`];
    }

    return false;
  }

  // Check if Sprig's Plan is unlocked for the current mission (via Merge Mini-Puzzle)
  isSprigPlanUnlocked(missionId = this.activeMissionId) {
    return !!(this.playerProfile?.unlockedSprigPlans && this.playerProfile.unlockedSprigPlans[missionId]);
  }

  // Mark Sprig's Plan as unlocked for the mission after solving the mini-puzzle
  unlockSprigPlan(missionId = this.activeMissionId) {
    if (!this.playerProfile.unlockedSprigPlans) {
      this.playerProfile.unlockedSprigPlans = {};
    }
    this.playerProfile.unlockedSprigPlans[missionId] = true;
    this.saveProfile();
    this.notify();
  }

  onSprigChange(listener) {
    this.sprigListener = listener;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn(this));
  }

  loadProfile() {
    try {
      const saved = localStorage.getItem('greencity_save_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.playerProfile = { ...this.playerProfile, ...parsed };
      }
    } catch (e) {
      console.warn('Failed to load profile:', e);
    }

    if (!this.playerProfile.unlockedSprigPlans) {
      this.playerProfile.unlockedSprigPlans = {};
    }

    // Strictly sync district unlocks based on true mission progression
    this.playerProfile.downtownUnlocked = this.isDistrictUnlocked('downtown');
    this.playerProfile.industrialUnlocked = this.isDistrictUnlocked('industrial');
    this.playerProfile.residentialUnlocked = this.isDistrictUnlocked('residential');

    DISTRICTS.riverside.unlocked = true;
    DISTRICTS.downtown.unlocked = this.playerProfile.downtownUnlocked;
    DISTRICTS.industrial.unlocked = this.playerProfile.industrialUnlocked;
    DISTRICTS.residential.unlocked = this.playerProfile.residentialUnlocked;

    // Safety fallback: ensure active mission is unlocked
    if (!this.isMissionUnlocked(this.activeMissionId)) {
      this.activeMissionId = 'riverside-1';
      this.activeDistrictId = 'riverside';
    }
  }

  saveProfile() {
    try {
      localStorage.setItem('greencity_save_v2', JSON.stringify(this.playerProfile));
    } catch (e) {
      console.warn('Failed to save profile:', e);
    }
  }

  setScreen(newScreen) {
    this.currentScreen = newScreen;
    sound.playPop();

    // Contextual Sprig updates automatically on screen change
    const mission = this.getActiveMission();
    const district = this.getActiveDistrict();

    if (newScreen === 'MAIN_MENU') {
      this.setSprig('happy', 'Welcome to GreenCity! Tap "Play Game" to explore our districts and start restoring.', false);
    } else if (newScreen === 'DISTRICT_MAP') {
      if (this.playerProfile.allDistrictsRestored) {
        this.setSprig('celebrating', '🎉 GREEN GUARDIAN MASTER! All 4 GreenCity districts are completely restored!', false);
      } else if (this.playerProfile.residentialUnlocked) {
        this.setSprig('happy', 'Residential Neighbourhood is unlocked! The final chapter of GreenCity awaits your touch.', false);
      } else if (this.playerProfile.industrialUnlocked) {
        this.setSprig('happy', 'Industrial Zone is unlocked! Let\'s convert factories to clean renewable power.', false);
      } else if (this.playerProfile.downtownUnlocked) {
        this.setSprig('celebrating', 'Downtown Commercial is unlocked! Clean electric transit and shopping awaits!', false);
      } else {
        this.setSprig('happy', 'Here is GreenCity! Riverside needs our care. Tap Riverside to see our active missions.', false);
      }
    } else if (newScreen === 'MISSION_BRIEFING') {
      this.setSprig('concerned', mission ? mission.sprigIntro : 'Let\'s review the mission objectives and budget.', false);
    } else if (newScreen === 'PLANNING') {
      this.setSprig('thinking', mission ? mission.sprigPlanningHint : 'Choose 2 or 3 improvements within our budget.', false);
    } else if (newScreen === 'PREVIEW') {
      const preview = this.getPlanPreview();
      if (preview.meetsGoal) {
        this.setSprig('celebrating', `Our ML model predicts pollution will drop to ${preview.predictedPollution}/100 and Green Score will reach ${preview.projectedScore}%! We hit our goal!`, false);
      } else {
        this.setSprig('concerned', `Caution: our plan reaches ${preview.projectedScore}%, which is below the ${preview.targetScore}% requirement. You may want to Revise Plan.`, false);
      }
    } else if (newScreen === 'RESTORATION') {
      this.setSprig('celebrating', `Look at ${district.name} transform! Clear air, thriving nature, and smiling citizens!`, false);
    } else if (newScreen === 'RESULTS') {
      const preview = this.getPlanPreview();
      if (preview.meetsGoal) {
        this.setSprig('celebrating', `Incredible work, Green Guardian! We earned ${preview.stars} Star${preview.stars > 1 ? 's' : ''} and saved $${preview.remaining} Coins!`, false);
      } else {
        this.setSprig('concerned', 'We fell slightly short of the target. Don\'t worry—click "Replay Plan" to adjust your selections!', false);
      }
    }

    this.notify();
  }

  setSprig(expression, text, shouldNotify = false) {
    this.sprig.expression = expression;
    this.sprig.text = text;
    this.sprig.isPromptOpen = true;
    if (this.sprigListener) {
      try {
        this.sprigListener(this.sprig);
      } catch (err) {
        console.warn('Sprig listener error:', err);
      }
    }
    if (shouldNotify) {
      this.notify();
    }
  }

  toggleFullStreetView() {
    this.fullStreetViewMode = !this.fullStreetViewMode;
    sound.playPop();
    this.notify();
  }

  toggleLightingMode() {
    sound.playPop();
    if (this.lightingMode === 'day') {
      this.lightingMode = 'sunset';
      this.setSprig('happy', 'Golden hour over GreenCity! Look how warm the diorama looks.', false);
    } else if (this.lightingMode === 'sunset') {
      this.lightingMode = 'night';
      this.setSprig('thinking', 'Cozy night in GreenCity! The lanterns and stars are glowing softly.', false);
    } else {
      this.lightingMode = 'day';
      this.setSprig('happy', 'Bright morning sunshine! Clear skies for our eco improvements.', false);
    }
    this.notify();
  }

  // Automatic smart strategy: calculates the most budget-efficient winning plan
  applySprigRecommendation() {
    const mission = this.getActiveMission();
    const items = mission.improvements;
    
    // Evaluate combinations of items (powerset of improvements)
    let bestPlan = [];
    let bestRemaining = -1;

    for (let mask = 1; mask < (1 << items.length); mask++) {
      let cost = 0;
      let scoreGain = 0;
      const currentCombo = [];

      for (let i = 0; i < items.length; i++) {
        if (mask & (1 << i)) {
          cost += items[i].cost;
          scoreGain += items[i].scoreBonus;
          currentCombo.push(items[i].id);
        }
      }

      if (cost <= mission.startingBudget && (mission.startingGreenScore + scoreGain) >= mission.targetGreenScore) {
        const remaining = mission.startingBudget - cost;
        if (remaining > bestRemaining) {
          bestRemaining = remaining;
          bestPlan = currentCombo;
        }
      }
    }

    if (bestPlan.length > 0) {
      this.selectedImprovementIds = new Set(bestPlan);
      sound.playChime();
      this.setSprig('celebrating', `I've selected the optimal eco-plan! We hit the goal with $${bestRemaining} Coins left for maximum stars!`, false);
      this.notify();
      return true;
    } else {
      sound.playWarning();
      this.setSprig('concerned', 'Try selecting the highest score improvement first to reach our goal!', false);
      return false;
    }
  }

  getActiveMission() {
    return MISSIONS[this.activeMissionId] || MISSIONS['riverside-1'];
  }

  getActiveDistrict() {
    const mission = this.getActiveMission();
    const districtId = mission ? mission.districtId : this.activeDistrictId;
    return DISTRICTS[districtId] || DISTRICTS.riverside;
  }

  // Automatic Reactive Sprig when user hovers - never triggers full app re-render
  hoverImprovement(id) {
    const mission = this.getActiveMission();
    const item = mission.improvements.find(i => i.id === id);
    if (!item) return;
    this.setSprig('thinking', `${item.title} ($${item.cost}): ${item.description}`, false);
  }

  resetHoverSprig() {
    const mission = this.getActiveMission();
    this.setSprig('thinking', mission ? mission.sprigPlanningHint : 'Choose improvements to balance score and budget.', false);
  }

  // Budget and Selection Management with Automatic Reactive Sprig
  toggleImprovement(id) {
    const mission = this.getActiveMission();
    const item = mission.improvements.find(i => i.id === id);
    if (!item) return;

    if (this.selectedImprovementIds.has(id)) {
      this.selectedImprovementIds.delete(id);
      sound.playSelect(0.9);
      const remaining = this.getRemainingBudget();
      this.setSprig('thinking', `Removed ${item.title}. Refunded $${item.cost} Coins! We now have $${remaining} remaining.`, false);
      this.notify();
      return true;
    }

    // Check budget limit
    const currentSpent = this.getSpentBudget();
    if (currentSpent + item.cost > mission.startingBudget) {
      sound.playWarning();
      const needed = (currentSpent + item.cost) - mission.startingBudget;
      this.setSprig('concerned', `We can't afford ${item.title}! It costs $${item.cost}, but we only have $${mission.startingBudget - currentSpent} left (short by $${needed}). Deselect a card first!`, false);
      return false;
    }

    this.selectedImprovementIds.add(id);
    sound.playSelect(1.15);

    // Contextual automatic speech for this specific improvement
    const remaining = this.getRemainingBudget();
    
    if (remaining === 0) {
      this.setSprig('celebrating', `${item.sprigComment || 'Great choice!'} Budget fully utilized! Hit "Preview My Plan" to run the ML forecast.`, false);
    } else {
      this.setSprig('happy', `${item.sprigComment || 'Great choice!'} We have $${remaining} Coins left for more improvements.`, false);
    }

    this.notify();
    return true;
  }

  isImprovementSelected(id) {
    return this.selectedImprovementIds.has(id);
  }

  getSpentBudget() {
    const mission = this.getActiveMission();
    let total = 0;
    this.selectedImprovementIds.forEach(id => {
      const item = mission.improvements.find(i => i.id === id);
      if (item) total += item.cost;
    });
    return total;
  }

  getRemainingBudget() {
    const mission = this.getActiveMission();
    return mission.startingBudget - this.getSpentBudget();
  }

  // Projection / Preview calculation using genuine scikit-learn ML model
  getPlanPreview() {
    const mission = this.getActiveMission();
    let totalScoreGain = 0;
    let totalPollutionDrop = 0;

    this.selectedImprovementIds.forEach(id => {
      const item = mission.improvements.find(i => i.id === id);
      if (item) {
        totalScoreGain += item.scoreBonus;
        totalPollutionDrop += (item.pollutionDrop || 20);
      }
    });

    // Normalized feature vector mapping for scikit-learn regression model
    const numSelected = this.selectedImprovementIds.size;
    const features = {
      initial_pollution: mission.startingPollution,
      waste_cleanup: (totalPollutionDrop >= 30) ? 1.0 : (totalPollutionDrop / 30),
      recycling_stations: Math.min(4, Math.round(numSelected * 1.2)),
      green_canopy: Math.min(1.0, (totalScoreGain / 50)),
      bio_reeds: (totalPollutionDrop >= 40) ? 1.0 : (totalPollutionDrop / 45),
      water_aeration: Math.min(2, Math.round(numSelected * 0.7)),
      community_hub: (numSelected >= 2) ? 1 : 0
    };

    // Run the genuine scikit-learn regression model prediction
    const mlResult = mlEngine.predictPollution(features);
    const predictedPollution = Math.max(5, Math.min(mission.startingPollution - 5, mlResult.predictedPollution));

    const projectedScore = Math.min(100, mission.startingGreenScore + totalScoreGain);
    const spent = this.getSpentBudget();
    const remaining = mission.startingBudget - spent;
    const meetsGoal = projectedScore >= mission.targetGreenScore;

    // Star calculation (1 to 3 stars)
    let stars = 0;
    if (meetsGoal) {
      stars = 1;
      if (projectedScore >= mission.targetGreenScore + 10) stars = 2;
      if (stars === 2 && remaining >= 30) stars = 3;
    }

    return {
      currentScore: mission.startingGreenScore,
      projectedScore,
      currentPollution: mission.startingPollution,
      predictedPollution,
      targetScore: mission.targetGreenScore,
      spent,
      remaining,
      meetsGoal,
      stars,
      selectedCount: this.selectedImprovementIds.size,
      mlResult
    };
  }

  resetCurrentPlan() {
    this.selectedImprovementIds.clear();
    sound.playPop();
    const mission = this.getActiveMission();
    this.setSprig('thinking', `Plan reset! You have all $${mission.startingBudget} Coins available.`);
    this.notify();
  }

  // Finalizes the mission results, awards stars, and unlocks progression
  completeMission() {
    const preview = this.getPlanPreview();
    const mission = this.getActiveMission();

    if (preview.meetsGoal) {
      this.playerProfile.completedMissions[this.activeMissionId] = {
        stars: preview.stars,
        score: preview.projectedScore,
        coinsRemaining: preview.remaining,
        timestamp: Date.now()
      };
      
      this.playerProfile.coins += (preview.remaining + 60);
      this.playerProfile.totalCleanups++;

      // Progressive District Unlocks & Badges
      // 1. Riverside District
      if (this.activeMissionId === 'riverside-1' && !this.playerProfile.unlockedBadges.includes('river_restorer')) {
        this.playerProfile.unlockedBadges.push('river_restorer');
      } else if (this.activeMissionId === 'riverside-2' && !this.playerProfile.unlockedBadges.includes('nature_weaver')) {
        this.playerProfile.unlockedBadges.push('nature_weaver');
      } else if (this.activeMissionId === 'riverside-3') {
        if (!this.playerProfile.unlockedBadges.includes('district_champion')) {
          this.playerProfile.unlockedBadges.push('district_champion');
        }
        // Unlock Downtown Commercial!
        this.playerProfile.downtownUnlocked = true;
        DISTRICTS.downtown.unlocked = true;
      }
      
      // 2. Downtown Commercial District
      else if (this.activeMissionId === 'downtown-1' && !this.playerProfile.unlockedBadges.includes('tram_conductor')) {
        this.playerProfile.unlockedBadges.push('tram_conductor');
      } else if (this.activeMissionId === 'downtown-2' && !this.playerProfile.unlockedBadges.includes('plaza_architect')) {
        this.playerProfile.unlockedBadges.push('plaza_architect');
      } else if (this.activeMissionId === 'downtown-3') {
        if (!this.playerProfile.unlockedBadges.includes('downtown_visionary')) {
          this.playerProfile.unlockedBadges.push('downtown_visionary');
        }
        // Unlock Industrial Zone!
        this.playerProfile.industrialUnlocked = true;
        DISTRICTS.industrial.unlocked = true;
      }

      // 3. Industrial Zone
      else if (this.activeMissionId === 'industrial-1' && !this.playerProfile.unlockedBadges.includes('sky_purifier')) {
        this.playerProfile.unlockedBadges.push('sky_purifier');
      } else if (this.activeMissionId === 'industrial-2' && !this.playerProfile.unlockedBadges.includes('circular_pioneer')) {
        this.playerProfile.unlockedBadges.push('circular_pioneer');
      } else if (this.activeMissionId === 'industrial-3') {
        if (!this.playerProfile.unlockedBadges.includes('clean_tech_titan')) {
          this.playerProfile.unlockedBadges.push('clean_tech_titan');
        }
        // Unlock Residential Neighbourhood!
        this.playerProfile.residentialUnlocked = true;
        DISTRICTS.residential.unlocked = true;
      }

      // 4. Residential Neighbourhood
      else if (this.activeMissionId === 'residential-1' && !this.playerProfile.unlockedBadges.includes('community_gardener')) {
        this.playerProfile.unlockedBadges.push('community_gardener');
      } else if (this.activeMissionId === 'residential-2' && !this.playerProfile.unlockedBadges.includes('sponge_builder')) {
        this.playerProfile.unlockedBadges.push('sponge_builder');
      } else if (this.activeMissionId === 'residential-3') {
        if (!this.playerProfile.unlockedBadges.includes('grand_guardian_master')) {
          this.playerProfile.unlockedBadges.push('grand_guardian_master');
        }
        // Full City Victory!
        this.playerProfile.allDistrictsRestored = true;
      }

      this.saveProfile();
    }
  }

  // Advances to the next unlocked mission or returns to District Map
  startNextMission() {
    const mission = this.getActiveMission();
    const [districtId, missionNumStr] = mission.id.split('-');
    const currentNum = parseInt(missionNumStr, 10);

    if (currentNum < 3) {
      const nextMissionId = `${districtId}-${currentNum + 1}`;
      if (MISSIONS[nextMissionId]) {
        this.activeDistrictId = districtId;
        this.activeMissionId = nextMissionId;
        this.resetCurrentPlan();
        this.setScreen('MISSION_BRIEFING');
        return;
      }
    }

    // Completed mission 3 of current district!
    // Auto-advance to next district if unlocked
    if (districtId === 'riverside') {
      this.activeDistrictId = 'downtown';
      this.activeMissionId = 'downtown-1';
      this.resetCurrentPlan();
      this.setScreen('MISSION_BRIEFING');
    } else if (districtId === 'downtown') {
      this.activeDistrictId = 'industrial';
      this.activeMissionId = 'industrial-1';
      this.resetCurrentPlan();
      this.setScreen('MISSION_BRIEFING');
    } else if (districtId === 'industrial') {
      this.activeDistrictId = 'residential';
      this.activeMissionId = 'residential-1';
      this.resetCurrentPlan();
      this.setScreen('MISSION_BRIEFING');
    } else {
      // Completed Residential-3: All Districts complete!
      this.setScreen('DISTRICT_MAP');
    }
  }
}

export const gameState = new GameStateManager();
