import { GameMapConfig, GameMarker, MapLayer, MapObjective } from '../../services/game-map.service';


// ============================================================================
// LAYER DEFINITIONS
// ============================================================================
const LAYERS: MapLayer[] = [
  {
    id: 'first',
    name: 'First Floor',
    imageUrl: './maps/24_elysian/elysian_floor1_black.png',
    zIndex: 2
  },
  {
    id: 'ground',
    name: 'Ground Floor',
    imageUrl: './maps/24_elysian/elysian_ground_black.png',
    zIndex: 1,
    isDefault: true
  }
];

// ============================================================================
// SPAWN POINTS
// ============================================================================
const SPAWNS: GameMarker[] = [
  {
    id: 'spawn1',
    x: 34.16,
    y: 74.91,
    title: 'Beach',
    description: 'Beach',
    type: 'spawn',
    layerId: 'ground'
  },
  {
    id: 'spawn2',
    x: 31.26,
    y: 37.34,
    title: 'Loading Bay',
    description: 'Loading Bay',
    type: 'spawn',
    layerId: 'ground'
  },
  {
    id: 'spawn3',
    x: 72.04,
    y: 66.34,
    title: 'Docks',
    description: 'Docks',
    type: 'spawn',
    layerId: 'ground'
  },
  {
    id: 'spawn4',
    x: 49.93,
    y: 18.15,
    title: 'Main Street',
    description: 'Main Street',
    type: 'spawn',
    layerId: 'first'
  }
];

// ============================================================================
// ACHIVEMENTS MARKERS - Organized by floor
// ============================================================================
const ACHIVEMENTS_MARKERS: GameMarker[] = [
  { 
    id: 'destructable1', 
    x: 43.99,
    y: 39.13,
    title: 'Destroy',
    description: 'Destroy with C2 change to get "Justice Uncovers Depths Ghosts in Elysium" steam achivement',
    type: 'explosion',
    layerId: 'ground'
  },
]

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
   // ==================== GROUND FLOOR ====================
  {
    id: 'ground_up1',
    x: 62.18,
    y: 59.67,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'first_down1'
  },
  {
    id: 'ground_up2',
    x: 48.91,
    y: 63.56,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'first_down2'
  },
  {
    id: 'ground_up3',
    x: 53.02,
    y: 49.74,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'first_down3'
  },
  {
    id: 'ground_up4',
    x: 45.25,
    y: 43.61,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'first_down4'
  },
  // ==================== FIRST FLOOR ====================
  {
    id: 'first_down1',
    x: 65.17,
    y: 58.78,
    layerId: 'first',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'ground_up1'
  },
  {
    id: 'first_down2',
    x: 46.76,
    y: 64.15,
    layerId: 'first',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'ground_up2'
  },
  {
    id: 'first_down3',
    x: 52.65,
    y: 44.66,
    layerId: 'first',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'ground_up3'
  },
  {
    id: 'first_down4',
    x: 41.05,
    y: 35.47,
    layerId: 'first',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'ground_up4'
  },
]

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
// OBJECTIVES - Organized by floor and type
// ============================================================================
const OBJECTIVE_MARKERS: GameMarker[] = [
  {
    id: 'hard_objective1',
    x: 53.45,
    y: 69.76,
    title: 'Possible package location.',
    description: 'Recover the packaged goods that were to be used in the deal.',
    type: 'hard_objective',
    layerId: 'ground'
  },
  {
    id: 'hard_objective2',
    x: 51.26,
    y: 53.7,
    title: 'Possible package location',
    description: 'Recover the packaged goods that were to be used in the deal.',
    type: 'hard_objective',
    layerId: 'ground'
  },
  {
    id: 'hard_objective3',
    x: 38.57,
    y: 38.91,
    title: 'Possible package location.',
    description: 'Recover the packaged goods that were to be used in the deal.',
    type: 'hard_objective',
    layerId: 'ground'
  },
  {
    id: 'hard_objective4',
    x: 51.18,
    y: 66.17,
    title: 'Possible package location',
    description: 'Recover the packaged goods that were to be used in the deal.',
    type: 'hard_objective',
    layerId: 'first'
  }, 
  {
    id: 'hard_objective5',
    x: 34.24,
    y: 32.56,
    title: 'Possible package location',
    description: 'Recover the packaged goods that were to be used in the deal.',
    type: 'hard_objective',
    layerId: 'first'
  }
];

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
    title: 'Arrest 5 suspects.',
    description: 'Arrest 5 suspects at the sceene',
    type: 'hard'
  },
  {
    id: 'obj2',
    title: 'Find the package.',
    description: 'Recover the packaged goods that were to be used in the deal.',
    markerIds: ['hard_objective1', 'hard_objective2', 'hard_objective3', 'hard_objective4', 'hard_objective5'],
    floorName: 'Ground & First Floor',
    type: 'hard'
  }
];

// ============================================================================
// FINAL MAP CONFIGURATION
// ============================================================================
export const MAP_PIER: GameMapConfig = {
  markers: [
    ...SPAWNS,
    ...ACHIVEMENTS_MARKERS,
    ...OBJECTIVE_MARKERS,
    ...buildStairwayMarkers()
  ],
  layers: LAYERS,
  objectives: OBJECTIVES
};
