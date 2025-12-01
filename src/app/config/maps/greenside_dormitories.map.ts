import { GameMapConfig, GameMarker, MapLayer, MapObjective } from '../../services/game-map';

// ============================================================================
// LAYER DEFINITIONS
// ============================================================================
const LAYERS: MapLayer[] = [
  { 
    id: 'floor1', 
    name: 'First Floor', 
    imageUrl: './maps/19_greenside_dormitories/greenside_dormitories_floor1.png', 
    visible: false, 
    zIndex: 1 
  },
  { 
    id: 'ground', 
    name: 'Ground Floor', 
    imageUrl: './maps/19_greenside_dormitories/greenside_dormitories_ground.png', 
    visible: true, 
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
    x: 15.29, 
    y: 46.68, 
    title: 'North exit', 
    description: 'North exit', 
    type: 'spawn', 
    layerId: 'ground' 
  },
  { 
    id: 'spawn2', 
    x: 83.61, 
    y: 74.31, 
    title: 'South exit', 
    description: 'South exit', 
    type: 'spawn', 
    layerId: 'ground' 
  }
];

// ============================================================================
// OBJECTIVES - Soft objective on first floor
// ============================================================================
const OBJECTIVE_MARKERS: GameMarker[] = [
  { 
    id: 'soft_objective1', 
    x: 80.84, 
    y: 51.95, 
    title: 'Report Drug Paraphernalia', 
    description: 'Report proof of drug use found in the building. (on lectern)', 
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
    x: 55.93,
    y: 32.45,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'stairs_down2'
  },
  {
    id: 'stairs_up2',
    x: 19.37,
    y: 57.51,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'stairs_down1'
  },
  
  // ==================== FIRST FLOOR ====================
  {
    id: 'stairs_down1',
    x: 15.27,
    y: 62.74,
    layerId: 'floor1',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'stairs_up2'
  },
  {
    id: 'stairs_down2',
    x: 53.55,
    y: 31.12,
    layerId: 'floor1',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'stairs_up1'
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
    id: 'obj_arrest', 
    title: 'Arrest 5 Suspects.', 
    description: 'Apprehend and secure five suspects at the scene.', 
    type: 'hard' 
  },
  { 
    id: 'obj1', 
    title: 'Report Drug Paraphernalia', 
    description: 'Report proof of drug use found in the building. (on lectern)', 
    type: 'soft', 
    markerIds: ['soft_objective1'], 
    floorName: 'First Floor' 
  }
];

// ============================================================================
// FINAL MAP CONFIGURATION
// ============================================================================
export const MAP_GREENSIDE_DORMITORIES: GameMapConfig = {
  id: 'greenside_dormitories',
  name: 'Dorms / Greenside dormitories',
  description: 'Dorms is a DLC mission in Ready or Not. Mass amounts of homeless people and drug addicts are seeking shelter in the abandoned Greenside Dormitories. Due to the structural instability and the location\'s history of attracting troublemakers, LSPD attempted to clear the building. However, the occupants resisted and an officer was shot in the leg; whether this was intentional or not is unknown. Other units are unavailable due to the current situation in the city, so SWAT is responsible for clearing the people out of the building.',
  layers: LAYERS,
  markers: [
    ...SPAWNS,
    ...OBJECTIVE_MARKERS,
    ...buildStairwayMarkers()
  ],
  objectives: OBJECTIVES
};
