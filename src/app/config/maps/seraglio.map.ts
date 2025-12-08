import { GameMapConfig, GameMarker, MapLayer, MapObjective } from '../../services/game-map';

// ============================================================================
// LAYER DEFINITIONS
// ============================================================================
const LAYERS: MapLayer[] = [
  { 
    id: 'sun', 
    name: 'Sun Deck', 
    imageUrl: './maps/22_Seraglio/Seraglio_sun_deck.png',  
    zIndex: 1 
  },
  { 
    id: 'upper', 
    name: 'Upper Deck', 
    imageUrl: './maps/22_Seraglio/Seraglio_upper_deck.png',  
    zIndex: 2 
  },
  { 
    id: 'middle', 
    name: 'Middle Deck', 
    imageUrl: './maps/22_Seraglio/Seraglio_middle_deck.png',
    zIndex: 3
  },
  { 
    id: 'lower', 
    name: 'Lower Deck', 
    imageUrl: './maps/22_Seraglio/Seraglio_lower_deck.png',  
    zIndex: 4, 
    isDefault: true 
  },
  {
    id: 'engineering',
    name: 'Engineering Deck',
    imageUrl: './maps/22_Seraglio/Seraglio_engineering_deck.png',
    zIndex: 5
  }
];

// ============================================================================
// SPAWN POINTS
// ============================================================================
const SPAWNS: GameMarker[] = [
  { 
    id: 'spawn1', 
    x: 49.83, 
    y: 89.88, 
    title: 'AFT Deck Spawn', 
    description: 'AFT Deck Spawn Point', 
    type: 'spawn', 
    layerId: 'lower' 
  },
  { 
    id: 'spawn2', 
    x: 49.83, 
    y: 18.86, 
    title: 'Upper Deck Spawn', 
    description: 'Upper Deck Spawn Point', 
    type: 'spawn', 
    layerId: 'middle' 
  },
  { 
    id: 'spawn3', 
    x: 49.92, 
    y: 67.14, 
    title: 'Sun Deck Spawn', 
    description: 'Sun Deck Spawn Point', 
    type: 'spawn', 
    layerId: 'sun' 
  },
];

// ============================================================================
// OBJECTIVES - Organized by floor and type
// ============================================================================
const OBJECTIVE_MARKERS: GameMarker[] = [
  { 
    id: 'hard_objective1', 
    x: 61.68, 
    y: 41.15, 
    title: 'Arrest Sah\'id', 
    description: 'Apprehend and secure the prime suspect, Sah\'id', 
    type: 'hard_objective', 
    layerId: 'ground' 
  },
  { 
    id: 'soft_objective1', 
    x: 49.81, 
    y: 47.93, 
    title: 'Crime scene', 
    description: 'Found a location with a lot of blood, looks like something was dragged through it.', 
    type: 'soft_objective', 
    layerId: 'upper' 
  },
  { 
    id: 'soft_objective2', 
    x: 48.19, 
    y: 48.34, 
    title: 'Possible Hidden Body location', 
    description: 'Found a dead body, looks to be one of Sah\'ids guards.', 
    type: 'soft_objective', 
    layerId: 'middle' 
  },
  { 
    id: 'soft_objective3', 
    x: 52.6, 
    y: 31.86, 
    title: 'Possible Hidden Body location', 
    description: 'Found a dead body, looks to be one of Sah\'ids guards.', 
    type: 'soft_objective', 
    layerId: 'engineering' 
  },
  { 
    id: 'soft_objective4', 
    x: 48.57, 
    y: 54.13, 
    title: 'Possible Hidden Body location', 
    description: 'Found a dead body, looks to be one of Sah\'ids guards.', 
    type: 'soft_objective', 
    layerId: 'middle' 
  }
];

// ============================================================================
// STAIRWAY CONNECTIONS - Organized by floor
// ============================================================================
interface StairwayPair {
  id: string;
  x: number;
  y: number;
  layerId: string;
  type: 'stairs_up' | 'stairs_down' | 'stairs_up_down';
  title: string;
  connectsTo: string | Array<{ targetId: string; label: string }>;
}

const STAIRWAYS: StairwayPair[] = [
  // ==================== SUN DECK ====================
  {
    id: 'sun_down1',
    x: 48.43,
    y: 71.42,
    layerId: 'sun',
    type: 'stairs_down',
    title: 'To Upper Deck',
    connectsTo: 'upper_up2'
  },
  {
    id: 'sun_down2',
    x: 52.83,
    y: 53.29,
    layerId: 'sun',
    type: 'stairs_down',
    title: 'To Upper Deck',
    connectsTo: 'upper_up1'
  },
  // ==================== UPPER DECK ====================
  {
    id: 'upper_up1',
    x: 52.83,
    y: 53.29,
    layerId: 'upper',
    type: 'stairs_up',
    title: 'To Sun Deck',
    connectsTo: 'sun_down2'
  },
  {
    id: 'upper_up2',
    x: 48.54,
    y: 71.12,
    layerId: 'upper',
    type: 'stairs_up',
    title: 'To Sun Deck',
    connectsTo: 'sun_down1'
  },
  {
    id: 'upper_down1',
    x: 46.81,
    y: 47.7,
    layerId: 'upper',
    type: 'stairs_down',
    title: 'To Middle Deck',
    connectsTo: 'middle_up_down1'
  },
  {
    id: 'upper_down2',
    x: 49.88,
    y: 59.52,
    layerId: 'upper',
    type: 'stairs_down',
    title: 'To Middle Deck',
    connectsTo: 'middle_up_down2'
  },
  // ==================== MIDDLE DECK ====================
  {
    id: 'middle_up_down1',
    x: 46.48,
    y: 49.45,
    layerId: 'middle',
    type: 'stairs_up_down',
    title: 'To Upper Deck / To Lower Deck',
    connectsTo: [
      { targetId: 'upper_down1', label: 'To Upper Deck' },
      { targetId: 'lower_up1', label: 'To Lower Deck' }
    ]
  },
  {
    id: 'middle_up_down2',
    x: 49.88,
    y: 59.52,
    layerId: 'middle',
    type: 'stairs_up_down',
    title: 'To Upper Deck',
    connectsTo: [
      { targetId: 'upper_down2', label: 'To Upper Deck' },
      { targetId: 'lower_up2', label: 'To Lower Deck' }
    ]
  },
  {
    id: 'middle_down1',
    x: 50.02,
    y: 26.7,
    layerId: 'middle',
    type: 'stairs_down',
    title: 'To Lower Deck',
    connectsTo: 'lower_up_down1'
  },
  {
    id: 'middle_down2',
    x: 45.78,
    y: 78.76,
    layerId: 'middle',
    type: 'stairs_down',
    title: 'To Lower Deck',
    connectsTo: 'lower_up3'
  },
  {
    id: 'middle_down3',
    x: 54.03,
    y: 78.76,
    layerId: 'middle',
    type: 'stairs_down',
    title: 'To Lower Deck',
    connectsTo: 'lower_up4'
  },
  // ==================== LOWER DECK ====================
  {
    id: 'lower_up_down1',
    x: 49.49,
    y: 27.26,
    layerId: 'lower',
    type: 'stairs_up_down',
    title: 'To Middle Deck / To Engineering Deck',
    connectsTo: [
      { targetId: 'middle_down1', label: 'To Middle Deck' },
      { targetId: 'engineering_up1', label: 'To Engineering Deck' }
    ]
  },
  {
    id: 'lower_up1',
    x: 45.68,
    y: 48.53,
    layerId: 'lower',
    type: 'stairs_up',
    title: 'To Middle Deck',
    connectsTo: 'middle_up_down1'
  },
  {
    id: 'lower_up2',
    x: 49.88,
    y: 59.56,
    layerId: 'lower',
    type: 'stairs_up',
    title: 'To Middle Deck',
    connectsTo: 'middle_up_down2'
  },
  {
    id: 'lower_down1',
    x: 48.65,
    y: 48.41,
    layerId: 'lower',
    type: 'stairs_down',
    title: 'To Engineering Deck',
    connectsTo: 'engineering_up2'
  },
    {
    id: 'lower_up3',
    x: 45.78,
    y: 78.76,
    layerId: 'lower',
    type: 'stairs_up',
    title: 'To Middle Deck',
    connectsTo: 'middle_down2'
  },
    {
    id: 'lower_up4',
    x: 54.03,
    y: 78.76,
    layerId: 'lower',
    type: 'stairs_up',
    title: 'To Middle Deck',
    connectsTo: 'middle_down3'
  },
  // ==================== ENGINEERING DECK ====================
  {
    id: 'engineering_up1',
    x: 49.11,
    y: 28.74,
    layerId: 'engineering',
    type: 'stairs_up',
    title: 'To Lower Deck',
    connectsTo: 'lower_up_down1'
  },
  {
    id: 'engineering_up2',
    x: 48.61,
    y: 49.36,
    layerId: 'engineering',
    type: 'stairs_up',
    title: 'To Lower Deck',
    connectsTo: 'lower_down1'
  }
];

function buildStairwayMarkers(): GameMarker[] {
  return STAIRWAYS.map(stair => ({
    id: stair.id,
    x: stair.x,
    y: stair.y,
    title: stair.title,
    type: stair.type,
    layerId: stair.layerId,
    connections: Array.isArray(stair.connectsTo) ? stair.connectsTo : [stair.connectsTo]
  }));
}

// ============================================================================
// OBJECTIVES CONFIGURATION
// ============================================================================
const OBJECTIVES: MapObjective[] = [
    // Hard objectives
  { 
    id: 'obj_order', 
    title: 'Bring order to chaos.', 
    description: 'Arrest or neutralize any contact at the scene', 
    type: 'hard' 
  },
  { 
    id: 'obj_rescue', 
    title: 'Rescue all civilians.', 
    description: 'Detain any unarmed contacts at the scene', 
    type: 'hard' 
  },
  { 
    id: 'obj1', 
    title: 'Arrest Sah\'id', 
    description: 'Apprehend and secure the prime suspect, Sah\'id', 
    type: 'hard', 
    markerIds: ['hard_objective1'], 
    floorName: 'Middle Deck' 
  },
  // Soft objectives
  {
    id: 'obj2',
    title: 'Crime scene',
    description: 'Found a location with a lot of blood, looks like something was dragged through it.',
    type: 'soft',
    markerIds: ['soft_objective1'],
    floorName: 'Upper Deck'
  },
  {
    id: 'obj3',
    title: 'Hidden Body',
    description: 'Found a dead body, looks to be one of Sah\'ids guards.',
    type: 'soft',
    markerIds: ['soft_objective2', 'soft_objective3', 'soft_objective4'],
    floorName: 'Middle & Engineering Deck'
  }
];

// ============================================================================
// FINAL MAP CONFIGURATION
// ============================================================================
export const MAP_SERGALIO: GameMapConfig = {
  id: 'sergalio',
  name: 'Mirage at Sea / The Seraglio',
  description: 'Mirage at Sea is the first DLC level of three in Ready or Not: Dark Waters. Sah\'id bin Khalid, serial rapist and son of a wealthy Qatari oligarch, has a BOLO order out for his recently-purchased yacht, The Seraglio. When the authorities attempt to make the ship return to shore, the situation escalates into a murder and hostage taking. LSPD SWAT, aided by C.O.A.S.T., is deployed to the yacht to arrest Sah\'id, rescue the hostages, and deal with Sah\'id\'s elite private security detail.',
  layers: LAYERS,
  markers: [
    ...SPAWNS,
    ...OBJECTIVE_MARKERS,
    ...buildStairwayMarkers()
  ],
  objectives: OBJECTIVES
};
