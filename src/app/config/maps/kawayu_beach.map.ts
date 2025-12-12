import { GameMapConfig, GameMarker, MapLayer, MapObjective } from '../../services/game-map';

// ============================================================================
// LAYER DEFINITIONS
// ============================================================================
const LAYERS: MapLayer[] = [
  { 
    id: 'floor2', 
    name: 'Second Floor', 
    imageUrl: './maps/8_kawayu_beach/kawayu_beach_floor2.png',  
    zIndex: 1 
  },
  { 
    id: 'floor1', 
    name: 'First Floor', 
    imageUrl: './maps/8_kawayu_beach/kawayu_beach_floor1.png',  
    zIndex: 2 
  },
  { 
    id: 'ground', 
    name: 'Ground Floor', 
    imageUrl: './maps/8_kawayu_beach/kawayu_beach_ground.png',
    zIndex: 3, 
    isDefault: true 
  }
];

// ============================================================================
// SPAWN POINTS - Multiple entry points
// ============================================================================
const SPAWNS: GameMarker[] = [
  { 
    id: 'spawn1', 
    x: 36.5, 
    y: 14.48, 
    title: 'Street', 
    description: 'Street', 
    type: 'spawn', 
    layerId: 'ground' 
  },
  { 
    id: 'spawn2', 
    x: 66.26, 
    y: 95.18, 
    title: 'Beach', 
    description: 'Beach', 
    type: 'spawn', 
    layerId: 'ground' 
  }
];

// ============================================================================
// OBJECTIVES - Organized by floor and type
// ============================================================================
const OBJECTIVE_MARKERS: GameMarker[] = [
  // Second Floor - Weapon Manufactory
  { 
    id: 'hard_objective1', 
    x: 45.71, 
    y: 23.67, 
    title: 'Locate Weapon Manufactory', 
    description: 'Find the weapon manufactory, the suspects were using to design and modify home built weaponry', 
    type: 'hard_objective', 
    layerId: 'floor2' 
  },
  
  // First Floor - Evidence
  { 
    id: 'soft_objective1', 
    x: 49.33, 
    y: 27.55, 
    title: 'Report Bag of Money', 
    description: 'Locate bag of cash as evidence of selling illegal firearms', 
    type: 'soft_objective', 
    layerId: 'floor1' 
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
    x: 51.97,
    y: 43.99,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'stairs_down1'
  },
  {
    id: 'stairs_up2',
    x: 44.75,
    y: 37.41,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'stairs_down2'
  },
  
  // ==================== FIRST FLOOR ====================
  {
    id: 'stairs_down1',
    x: 52.77,
    y: 47.72,
    layerId: 'floor1',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'stairs_up1'
  },
  {
    id: 'stairs_down2',
    x: 39.66,
    y: 34.57,
    layerId: 'floor1',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'stairs_up2'
  },
  {
    id: 'stairs_up3',
    x: 55.13,
    y: 46.9,
    layerId: 'floor1',
    type: 'stairs_up',
    title: 'To Second Floor',
    connectsTo: 'stairs_down3'
  },
  
  // ==================== SECOND FLOOR ====================
  {
    id: 'stairs_down3',
    x: 52.69,
    y: 46.68,
    layerId: 'floor2',
    type: 'stairs_down',
    title: 'To First Floor',
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
    title: 'Locate Weapon Manufactory', 
    description: 'Find the weapon manufactory, the suspects were using to design and modify home built weaponry', 
    type: 'hard', 
    markerIds: ['hard_objective1'], 
    floorName: 'Second Floor' 
  },
  { 
    id: 'obj2', 
    title: 'Report Bag of Money', 
    description: 'Locate bag of cash as evidence of selling illegal firearms', 
    type: 'soft', 
    markerIds: ['soft_objective1'], 
    floorName: 'First Floor' 
  }
];

// ============================================================================
// FINAL MAP CONFIGURATION
// ============================================================================
export const MAP_KAWAYU_BEACH: GameMapConfig = {
  id: 'kawayu_beach',
  name: 'Ends of the earth / Kawayu beach',
  description: 'Ends of the Earth is the eighth mission in Ready or Not. On December 3, 2025, the LSPD raid a home on the beachfront for distributing and illegally modifying weapons.',
  layers: LAYERS,
  markers: [
    ...SPAWNS,
    ...OBJECTIVE_MARKERS,
    ...buildStairwayMarkers()
  ],
  objectives: OBJECTIVES
};
