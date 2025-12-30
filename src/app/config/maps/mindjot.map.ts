import { GameMapConfig, GameMarker, MapLayer, MapObjective } from '../../services/game-map';

// ============================================================================
// LAYER DEFINITIONS
// ============================================================================
const LAYERS: MapLayer[] = [
  { 
    id: 'roof', 
    name: 'Roof', 
    imageUrl: './maps/7_mindjot/mindjot_floor2.png',  
    zIndex: 1 
  },
  { 
    id: 'floor1', 
    name: 'First Floor', 
    imageUrl: './maps/7_mindjot/mindjot_floor1.png',  
    zIndex: 2 
  },
  { 
    id: 'ground', 
    name: 'Ground Floor', 
    imageUrl: './maps/7_mindjot/mindjot_ground.png',
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
    x: 48.24, 
    y: 67.39, 
    title: 'Main spawn point', 
    description: 'Main spawn point', 
    type: 'spawn', 
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
    x: 61.62,
    y: 28.84,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'stairs_down3'
  },
  {
    id: 'stairs_up2',
    x: 46,
    y: 30.6,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'stairs_down1'
  },
  {
    id: 'stairs_up3',
    x: 52.84,
    y: 30.64,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'stairs_down2'
  },
  
  // ==================== FIRST FLOOR ====================
  {
    id: 'stairs_down1',
    x: 31.93,
    y: 24.48,
    layerId: 'floor1',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'stairs_up2'
  },
  {
    id: 'stairs_down2',
    x: 48.55,
    y: 23.81,
    layerId: 'floor1',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'stairs_up3'
  },
  {
    id: 'stairs_down3',
    x: 72.46,
    y: 18.92,
    layerId: 'floor1',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'stairs_up1'
  },
  {
    id: 'stairs_up4',
    x: 32.45,
    y: 41.08,
    layerId: 'floor1',
    type: 'stairs_up',
    title: 'To Roof',
    connectsTo: 'stairs_down4'
  },
  
  // ==================== ROOF ====================
  {
    id: 'stairs_down4',
    x: 36.69,
    y: 55.6,
    layerId: 'roof',
    type: 'stairs_down',
    title: 'To First Floor',
    connectsTo: 'stairs_up4'
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
  }
];

// ============================================================================
// FINAL MAP CONFIGURATION
// ============================================================================
export const MAP_MINDJOT: GameMapConfig = {
  layers: LAYERS,
  markers: [
    ...SPAWNS,
    ...buildStairwayMarkers()
  ],
  objectives: OBJECTIVES
};
