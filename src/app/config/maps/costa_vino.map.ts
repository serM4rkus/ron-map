import { GameMapConfig, GameMarker, MapLayer, MapObjective } from '../../services/game-map';

// ============================================================================
// LAYER DEFINITIONS
// ============================================================================
const LAYERS: MapLayer[] = [
  { 
    id: 'ground', 
    name: 'Ground Floor', 
    imageUrl: './maps/12_costa_vino/costa_vino_ground.png', 
    visible: true, 
    zIndex: 1, 
    isDefault: true 
  },
  { 
    id: 'underground', 
    name: 'Underground', 
    imageUrl: './maps/12_costa_vino/costa_vino_underground.png', 
    visible: false, 
    zIndex: 2 
  }
];

// ============================================================================
// SPAWN POINTS
// ============================================================================
const SPAWNS: GameMarker[] = [
  { 
    id: 'spawn1', 
    x: 53.49, 
    y: 84.99, 
    title: 'Main spawn point', 
    description: 'Main spawn point', 
    type: 'spawn', 
    layerId: 'ground' 
  }
];

// ============================================================================
// OBJECTIVES - Organized by floor
// ============================================================================
const OBJECTIVE_MARKERS: GameMarker[] = [
  // Ground Floor - Evidence
  { 
    id: 'soft_objective1', 
    x: 51.97, 
    y: 15.23, 
    title: 'Report Confiscated Passports', 
    description: 'Locate confiscated Mexican passports in the ranch house', 
    type: 'soft_objective', 
    layerId: 'ground' 
  },
  
  // Underground - Smuggling Evidence
  { 
    id: 'soft_objective2', 
    x: 49.16, 
    y: 7.84, 
    title: 'Report Access Tunnel Barge', 
    description: 'Locate a barge in the underground cavern that Los Locos use as means to traffic goods across the border', 
    type: 'soft_objective', 
    layerId: 'underground' 
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
    id: 'stairs_down1',
    x: 47.81,
    y: 4.77,
    layerId: 'ground',
    type: 'stairs_down',
    title: 'To Underground',
    connectsTo: 'stairs_up1'
  },
  
  // ==================== UNDERGROUND ====================
  {
    id: 'stairs_up1',
    x: 50.58,
    y: 94.4,
    layerId: 'underground',
    type: 'stairs_up',
    title: 'To Ground Floor',
    connectsTo: 'stairs_down1'
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
    title: 'Report Confiscated Passports', 
    description: 'Locate confiscated Mexican passports in the ranch house', 
    type: 'soft', 
    markerIds: ['soft_objective1'], 
    floorName: 'Ground Floor' 
  },
  { 
    id: 'obj2', 
    title: 'Report Access Tunnel Barge', 
    description: 'Locate a barge in the underground cavern that Los Locos use as means to traffic goods across the border', 
    type: 'soft', 
    markerIds: ['soft_objective2'], 
    floorName: 'Underground' 
  }
];

// ============================================================================
// FINAL MAP CONFIGURATION
// ============================================================================
export const MAP_COSTA_VINO: GameMapConfig = {
  id: 'costa_vino',
  name: 'Rust Belt / Costa Vino Border Reserve',
  description: 'Rust Belt is the twelfth mission in Ready or Not. On October 15, 2025, D Platoon raid a coyote stash house on the Mexican border.',
  layers: LAYERS,
  markers: [
    ...SPAWNS,
    ...OBJECTIVE_MARKERS,
    ...buildStairwayMarkers()
  ],
  objectives: OBJECTIVES
};
