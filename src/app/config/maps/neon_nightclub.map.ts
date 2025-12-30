import { GameMapConfig, GameMarker, MapLayer, MapObjective } from '../../services/game-map';

// ============================================================================
// LAYER DEFINITIONS
// ============================================================================
const LAYERS: MapLayer[] = [
  { 
    id: 'floor1', 
    name: 'First Floor', 
    imageUrl: './maps/14_neon_nightclub/neon_nightclub_floor1.png',  
    zIndex: 1 
  },
  { 
    id: 'ground', 
    name: 'Ground Floor', 
    imageUrl: './maps/14_neon_nightclub/neon_nightclub_ground.png',
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
    x: 61.18, 
    y: 90.52, 
    title: 'Main spawn point', 
    description: 'Main spawn point', 
    type: 'spawn', 
    layerId: 'ground' 
  }
];

// ============================================================================
// OBJECTIVES
// ============================================================================
const OBJECTIVE_MARKERS: GameMarker[] = [
  { 
    id: 'hard_objective1', 
    x: 47.39, 
    y: 45.33, 
    title: 'Arrest Qadamah', 
    description: 'Apprehend and secure the leader of the group "The Hand", "Qadamah". Located somwhere in Nightclub.', 
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
    x: 35.97,
    y: 46.6,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'stairs_down1'
  },
  {
    id: 'stairs_up2',
    x: 41.43,
    y: 18.89,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'stairs_down2'
  },
  {
    id: 'stairs_up3',
    x: 53.91,
    y: 34.35,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'stairs_down3'
  },
  
  // ==================== FIRST FLOOR ====================
  {
    id: 'stairs_down1',
    x: 37.31,
    y: 55.19,
    layerId: 'floor1',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'stairs_up1'
  },
  {
    id: 'stairs_down2',
    x: 41.51,
    y: 27.18,
    layerId: 'floor1',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'stairs_up2'
  },
  {
    id: 'stairs_down3',
    x: 53.11,
    y: 41.3,
    layerId: 'floor1',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'stairs_up3'
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
    title: 'Arrest Qadamah', 
    description: 'Apprehend and secure the leader of the group "The Hand", "Qadamah". Located somewhere in Nightclub.', 
    type: 'hard', 
    markerIds: ['hard_objective1'], 
    floorName: 'Ground Floor' 
  }
];

// ============================================================================
// FINAL MAP CONFIGURATION
// ============================================================================
export const MAP_NEON_NIGHTCLUB: GameMapConfig = {
  layers: LAYERS,
  markers: [
    ...SPAWNS,
    ...OBJECTIVE_MARKERS,
    ...buildStairwayMarkers()
  ],
  objectives: OBJECTIVES
};
