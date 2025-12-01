import { GameMapConfig, GameMarker, MapLayer, MapObjective } from '../../services/game-map';

// ============================================================================
// LAYER DEFINITIONS
// ============================================================================
const LAYERS: MapLayer[] = [
  { 
    id: 'floor2', 
    name: 'Second Floor', 
    imageUrl: './maps/2_23_mb/23_mb_floor2.png', 
    visible: false, 
    zIndex: 1 
  },
  { 
    id: 'floor1', 
    name: 'First Floor', 
    imageUrl: './maps/2_23_mb/23_mb_floor1.png', 
    visible: false, 
    zIndex: 2 
  },
  { 
    id: 'ground', 
    name: 'Ground Floor', 
    imageUrl: './maps/2_23_mb/23_mb_ground.png', 
    visible: true, 
    zIndex: 3, 
    isDefault: true 
  }
];

// ============================================================================
// SPAWN POINTS
// ============================================================================
const SPAWNS: GameMarker[] = [
  { 
    id: 'spawn1', 
    x: 46.72, 
    y: 76.78, 
    title: 'Main spawn point', 
    description: 'Main spawn point', 
    type: 'spawn', 
    layerId: 'ground' 
  }
];

// ============================================================================
// OBJECTIVES - Organized by floor and type
// ============================================================================
const OBJECTIVE_MARKERS: GameMarker[] = [
  // First Floor - Server Farm
  { 
    id: 'soft_objective1', 
    x: 60.42, 
    y: 64.08, 
    title: 'Report Illegal Server Farm', 
    description: 'Locate the source of electricity theft: an illegal server cluster, farming cryptocurrency and hosting online illegal activity', 
    type: 'soft_objective', 
    layerId: 'floor1' 
  },
  
  // Second Floor - Michael's Apartment
  { 
    id: 'hard_objective1', 
    x: 42.35, 
    y: 38.38, 
    title: 'Arrest Michael', 
    description: 'Michael is main target and he is usually located in his appartment on second floor. Check all rooms. He wears headset with kitty ears.', 
    type: 'hard_objective', 
    layerId: 'floor2' 
  },
  { 
    id: 'soft_objective2', 
    x: 36.3, 
    y: 61.45, 
    title: 'Report Suspect\'s PC', 
    description: 'Locate the suspect\'s personal computer, showing incriminating evidence in connection to \'Mindjot\'', 
    type: 'soft_objective', 
    layerId: 'floor2' 
  },
  { 
    id: 'soft_objective3', 
    x: 41.76, 
    y: 62.61, 
    title: 'Report Photographic evidence', 
    description: 'Locate document evidences related to "Mindjot" in suspect\'s bedroom', 
    type: 'soft_objective', 
    layerId: 'floor2' 
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
  connectsTo: string | string[];
  autoNavigateAll?: boolean;
}

const STAIRWAYS: StairwayPair[] = [
  // ==================== GROUND FLOOR ====================
  // Main stairwell (auto-navigate to show both stairs on first floor)
  {
    id: 'stairs_up1',
    x: 47.9,
    y: 21.05,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: ['stairs_down1', 'stairs_down2'],
    autoNavigateAll: true
  },
  {
    id: 'stairs_up2',
    x: 54.37,
    y: 61.76,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: ['stairs_down3']
  },
  
  // ==================== FIRST FLOOR ====================
  {
    id: 'stairs_down1',
    x: 37.66,
    y: 23.6,
    layerId: 'floor1',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: ['stairs_up1']
  },
  {
    id: 'stairs_down2',
    x: 50.97,
    y: 23.6,
    layerId: 'floor1',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: ['stairs_up1']
  },
  {
    id: 'stairs_down3',
    x: 63.87,
    y: 74.04,
    layerId: 'floor1',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: ['stairs_up2']
  },
  // Main stairwell (auto-navigate to show both stairs on second floor)
  {
    id: 'stairs_up3',
    x: 44.3,
    y: 21.47,
    layerId: 'floor1',
    type: 'stairs_up',
    title: 'To Second Floor',
    connectsTo: ['stairs_down5', 'stairs_down4'],
    autoNavigateAll: true
  },
  {
    id: 'stairs_up4',
    x: 60.76,
    y: 77.3,
    layerId: 'floor1',
    type: 'stairs_up',
    title: 'To Second Floor',
    connectsTo: ['stairs_down6']
  },
  
  // ==================== SECOND FLOOR ====================
  {
    id: 'stairs_down4',
    x: 49.7,
    y: 25.98,
    layerId: 'floor2',
    type: 'stairs_down',
    title: 'To First Floor',
    connectsTo: ['stairs_up3']
  },
  {
    id: 'stairs_down5',
    x: 62.31,
    y: 25.98,
    layerId: 'floor2',
    type: 'stairs_down',
    title: 'To First Floor',
    connectsTo: ['stairs_up3']
  },
  {
    id: 'stairs_down6',
    x: 59.71,
    y: 69.12,
    layerId: 'floor2',
    type: 'stairs_down',
    title: 'To First Floor',
    connectsTo: ['stairs_up4']
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
    connections: Array.isArray(stair.connectsTo) ? stair.connectsTo : [stair.connectsTo],
    autoNavigateAll: stair.autoNavigateAll
  }));
}

// ============================================================================
// OBJECTIVES CONFIGURATION
// ============================================================================
const OBJECTIVES: MapObjective[] = [
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
    title: 'Arrest Michael', 
    description: 'Michael is main target and he is usually located in his apartment on second floor. Check all rooms. He wears headset with kitty ears.', 
    type: 'hard', 
    markerIds: ['hard_objective1'], 
    floorName: 'Second Floor' 
  },
  { 
    id: 'obj2', 
    title: 'Report Illegal Server Farm', 
    description: 'Locate the source of electricity theft: an illegal server cluster, farming cryptocurrency and hosting online illegal activity', 
    type: 'soft', 
    markerIds: ['soft_objective1'], 
    floorName: 'First Floor' 
  },
  { 
    id: 'obj3', 
    title: 'Report Suspect\'s PC', 
    description: 'Locate the suspect\'s personal computer, showing incriminating evidence in connection to \'Mindjot\'', 
    type: 'soft', 
    markerIds: ['soft_objective2'], 
    floorName: 'Second Floor' 
  },
  { 
    id: 'obj4', 
    title: 'Report Photographic Evidence', 
    description: 'Locate document evidences related to "Mindjot" in suspect\'s bedroom', 
    type: 'soft', 
    markerIds: ['soft_objective3'], 
    floorName: 'Second Floor' 
  }
];

// ============================================================================
// FINAL MAP CONFIGURATION
// ============================================================================
export const MAP_23_MB: GameMapConfig = {
  id: '23_mb',
  name: '23 Megabytes a Second / San Uriel Condominiums',
  description: '23 Megabytes a Second is the second mission in Ready or Not. On December 8, 2025, the Los Sueños Police Department received a 911 call regarding a hostage situation at an apartment complex.',
  layers: LAYERS,
  markers: [
    ...SPAWNS,
    ...OBJECTIVE_MARKERS,
    ...buildStairwayMarkers()
  ],
  objectives: OBJECTIVES
};
