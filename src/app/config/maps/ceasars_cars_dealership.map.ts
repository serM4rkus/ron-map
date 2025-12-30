import { GameMapConfig, GameMarker, MapLayer, MapObjective } from '../../services/game-map';

// ============================================================================
// LAYER DEFINITIONS
// ============================================================================
const LAYERS: MapLayer[] = [
  { 
    id: 'floor1', 
    name: 'First Floor', 
    imageUrl: './maps/15_ceasars_cars_dealership/ceasars_cars_dealership_floor1.png',  
    zIndex: 1 
  },
  { 
    id: 'ground', 
    name: 'Ground Floor', 
    imageUrl: './maps/15_ceasars_cars_dealership/ceasars_cars_dealership_ground.png',
    zIndex: 2, 
    isDefault: true 
  }
];

// ============================================================================
// SPAWN POINTS - Multiple entry points
// ============================================================================
const SPAWNS: GameMarker[] = [
  { 
    id: 'spawn1', 
    x: 65.25, 
    y: 86.19, 
    title: 'Street', 
    description: 'Street', 
    type: 'spawn', 
    layerId: 'ground' 
  },
  { 
    id: 'spawn2', 
    x: 24.29, 
    y: 80.36, 
    title: 'Back alley', 
    description: 'Back alley', 
    type: 'spawn', 
    layerId: 'ground' 
  }
];

// ============================================================================
// OBJECTIVES - Organized by floor and type
// ============================================================================
const OBJECTIVE_MARKERS: GameMarker[] = [
  // Ground Floor - Evidence
  { 
    id: 'soft_objective1', 
    x: 64.79, 
    y: 15.45, 
    title: 'Report Contraband in Storage', 
    description: 'Locate narcotics and illegal firearms in the garages and storage room', 
    type: 'soft_objective', 
    layerId: 'ground' 
  },
  { 
    id: 'soft_objective2', 
    x: 51.47, 
    y: 22.7, 
    title: 'Report Trafficking Records', 
    description: 'Locate evidence concerning organised criminal behaviour including records of human trafficking', 
    type: 'soft_objective', 
    layerId: 'ground' 
  },
  
  // First Floor - Undercover Officer
  { 
    id: 'hard_objective1', 
    x: 42.35, 
    y: 22.4, 
    title: 'Locate Undercover Officer', 
    description: 'Locate undercover Officer Brian, restrained and killed in the meeting room', 
    type: 'hard_objective', 
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
    x: 43.4,
    y: 40.33,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'stairs_down1'
  },
  {
    id: 'stairs_up2',
    x: 56.64,
    y: 34.43,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'stairs_down2'
  },
  
  // ==================== FIRST FLOOR ====================
  {
    id: 'stairs_down1',
    x: 20.29,
    y: 46,
    layerId: 'floor1',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'stairs_up1'
  },
  {
    id: 'stairs_down2',
    x: 74.29,
    y: 19.86,
    layerId: 'floor1',
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
    title: 'Locate Undercover Officer', 
    description: 'Locate undercover Officer Brian, restrained and killed in the meeting room', 
    type: 'hard', 
    markerIds: ['hard_objective1'], 
    floorName: 'First Floor' 
  },
  { 
    id: 'obj2', 
    title: 'Report Contraband in Storage', 
    description: 'Locate narcotics and illegal firearms in the garages and storage room', 
    type: 'soft', 
    markerIds: ['soft_objective1'], 
    floorName: 'Ground Floor' 
  },
  { 
    id: 'obj3', 
    title: 'Report Trafficking Records', 
    description: 'Locate evidence concerning organised criminal behaviour including records of human trafficking', 
    type: 'soft', 
    markerIds: ['soft_objective2'], 
    floorName: 'Ground Floor' 
  }
];

// ============================================================================
// FINAL MAP CONFIGURATION
// ============================================================================
export const MAP_CEASARS_CARS_DEALERSHIP: GameMapConfig = {
  layers: LAYERS,
  markers: [
    ...SPAWNS,
    ...OBJECTIVE_MARKERS,
    ...buildStairwayMarkers()
  ],
  objectives: OBJECTIVES
};
