import { GameMapConfig, GameMarker, MapLayer, MapObjective } from '../../services/game-map.service';


// ============================================================================
// LAYER DEFINITIONS
// ============================================================================
const LAYERS: MapLayer[] = [
  {
    id: 'first',
    name: 'First Floor',
    imageUrl: './maps/25_chicos_mexican_resturant/chicos_mexican_resturant_first.webp',
    zIndex: 2
  },
  {
    id: 'ground',
    name: 'Ground Floor',
    imageUrl: './maps/25_chicos_mexican_resturant/chicos_mexican_resturant_ground.webp',
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
    x: 64.69,
    y: 95.42,
    title: 'Front Entranse',
    description: 'Front Entranse',
    type: 'spawn',
    layerId: 'ground'
  },
  {
    id: 'spawn2',
    x: 11.8,
    y: 59.87,
    title: 'Parking Lot',
    description: 'Parking Lot',
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
  connectsTo: string | Array<{ targetId: string; label: string }>;
}

const STAIRWAYS: StairwayPair[] = [
  // ==================== GROUND FLOOR ====================
  {
    id: 'ground_up1',
    x: 60.31,
    y: 19.28,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'first_down1'
  },
  {
    id: 'first_down1',
    x: 60.31,
    y: 19.28,
    layerId: 'first',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'ground_up1'
  }
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
    id: 'soft_objective_1',
    title: 'Suspect\'s vehile',
    description: 'Report suspect\'s vehile.',
    type: 'soft',
    markerIds: ['soft_objective1'],
    floorName: 'Ground Floor'
  },
  {
    id: 'soft_objective_2',
    title: 'Potential Evidence',
    description: 'Report potential evidence.',
    type: 'soft',
    markerIds: ['soft_objective2'],
    floorName: 'First Floor'
  }
];

// ============================================================================
// OBJECTIVES - Organized by floor and type
// ============================================================================
const OBJECTIVE_MARKERS: GameMarker[] = [
  {
    id: 'soft_objective1',
    x: 35.87,
    y: 35.5,
    title: 'Suspect\'s vehile',
    description: 'Report suspect\'s vehile.',
    type: 'soft_objective',
    layerId: 'ground'
  },
  {
    id: 'soft_objective2',
    x: 40.62,
    y: 25.97,
    title: 'Potential Evidence',
    description: 'Report potential evidence.',
    type: 'soft_objective',
    layerId: 'first'
  }
];

// ============================================================================
// FINAL MAP CONFIGURATION
// ============================================================================
export const MAP_CHICOS_MEXICAN_RESTURANT: GameMapConfig = {
  layers: LAYERS,
  markers: [
    ...SPAWNS,
    ...OBJECTIVE_MARKERS,
    ...buildStairwayMarkers()
  ],
  objectives: OBJECTIVES
};
