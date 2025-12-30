import { GameMapConfig, GameMarker, MapLayer, MapObjective } from '../../services/game-map';

// ============================================================================
// LAYER DEFINITIONS
// ============================================================================
const LAYERS: MapLayer[] = [
  { 
    id: 'roof', 
    name: 'Roof', 
    imageUrl: './maps/4_brixley_talent/brixley_talent_floor1.png',  
    zIndex: 1 
  },
  { 
    id: 'ground', 
    name: 'Ground Floor', 
    imageUrl: './maps/4_brixley_talent/brixley_talent_ground.png',
    zIndex: 2, 
    isDefault: true 
  }
];

// ============================================================================
// SPAWN POINTS
// ============================================================================
const SPAWNS: GameMarker[] = [
  { 
    id: 'spawn1', 
    x: 44.41, 
    y: 32.18, 
    title: 'Main spawn point', 
    description: 'Main spawn point', 
    type: 'spawn', 
    layerId: 'ground' 
  }
];

// ============================================================================
// OBJECTIVES - High Value Target
// ============================================================================
const OBJECTIVE_MARKERS: GameMarker[] = [
  { 
    id: 'hard_objective1', 
    x: 61.47, 
    y: 57.21, 
    title: 'Apprehend George Brixley', 
    description: 'Apprehend and secure the owner of Brixley Talent Time. Usually located in his office, but maybe be in other areas of the building.', 
    type: 'hard_objective', 
    layerId: 'ground' 
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
  connectsTo: string;
}

const STAIRWAYS: StairwayPair[] = [
  // ==================== GROUND FLOOR ====================
  {
    id: 'stairs_up1',
    x: 51.26,
    y: 51.16,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To Roof',
    connectsTo: 'stairs_down1'
  },
  {
    id: 'stairs_up2',
    x: 55.17,
    y: 66.77,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To Roof',
    connectsTo: 'stairs_down2'
  },
  
  // ==================== ROOF ====================
  {
    id: 'stairs_down1',
    x: 47.18,
    y: 58.33,
    layerId: 'roof',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'stairs_up1'
  },
  {
    id: 'stairs_down2',
    x: 50.88,
    y: 83.35,
    layerId: 'roof',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'stairs_up2'
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
    connections: [stair.connectsTo]
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
    title: 'Apprehend George Brixley', 
    description: 'Apprehend and secure the owner of Brixley Talent Time. Usually located in his office, but maybe be in other areas of the building.', 
    type: 'hard', 
    markerIds: ['hard_objective1'], 
    floorName: 'Ground Floor' 
  }
];

// ============================================================================
// FINAL MAP CONFIGURATION
// ============================================================================
export const MAP_BRIXLEY_TALENT: GameMapConfig = {
  layers: LAYERS,
  markers: [
    ...SPAWNS,
    ...OBJECTIVE_MARKERS,
    ...buildStairwayMarkers()
  ],
  objectives: OBJECTIVES
};
