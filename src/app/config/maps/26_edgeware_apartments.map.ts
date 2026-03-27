import { GameMapConfig, GameMarker, MapLayer, MapObjective } from '../../services/game-map.service';


// ============================================================================
// LAYER DEFINITIONS
// ============================================================================
const LAYERS: MapLayer[] = [
  {
    id: 'first',
    name: 'First Floor',
    imageUrl: './maps/26_edgeware_apartments/edgeware_apartments_first.webp',
    zIndex: 3
  },
   {
    id: 'ground',
    name: 'Ground Floor',
    imageUrl: './maps/26_edgeware_apartments/edgeware_apartments_ground.webp',
    zIndex: 2,
    isDefault: true
  },
  {
    id: 'basement',
    name: 'Basement',
    imageUrl: './maps/26_edgeware_apartments/edgeware_apartments_basement.webp',
    zIndex: 1
  }
];

// ============================================================================
// SPAWN POINTS
// ============================================================================
const SPAWNS: GameMarker[] = [
  {
    id: 'spawn1',
    x: 31.76,
    y: 92.39,
    title: 'Main Spawn Point',
    description: 'Main Spawn Point',
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
  // ==================== BASEMENT ========================
  {
    id: 'basement_up1',
    x: 38.82,
    y: 71.34,
    layerId: 'basement',
    type: 'stairs_up',
    title: 'To Ground Floor',
    connectsTo: 'ground_down1'
  },
  {
    id: 'basement_up2',
    x: 63.53,
    y: 71.33,
    layerId: 'basement',
    type: 'stairs_up',
    title: 'To Ground Floor',
    connectsTo: 'ground_down2'
  },
  {
    id: 'basement_up3',
    x: 52.6,
    y: 64.3,
    layerId: 'basement',
    type: 'stairs_up',
    title: 'To Ground Floor',
    connectsTo: 'ground_down3'
  },
  {
    id: 'basement_up4',
    x: 51.05,
    y: 24.79,
    layerId: 'basement',
    type: 'stairs_up',
    title: 'To Ground Floor',
    connectsTo: 'ground_up_down1'
  },
  // ==================== GROUND FLOOR ====================
  {
    id: 'ground_up_down1',
    x: 51.05,
    y: 24.79,
    layerId: 'ground',
    type: 'stairs_up_down',
    title: 'To Basement / To First Floor',
    connectsTo: [
      { targetId: 'first_down2', label: 'To First Floor'},
      { targetId: 'basement_up4', label: 'To Basement'}
    ]
  },
  {
    id: 'ground_down1',
    x: 38.11,
    y: 71.34,
    layerId: 'ground',
    type: 'stairs_down',
    title: 'To Basement',
    connectsTo: 'basement_up1'
  },
  {
    id: 'ground_down2',
    x: 64.1,
    y: 71.34,
    layerId: 'ground',
    type: 'stairs_down',
    title: 'To Basement',
    connectsTo: 'basement_up2'
  },
  {
    id: 'ground_down3',
    x: 49.12,
    y: 58.33,
    layerId: 'ground',
    type: 'stairs_down',
    title: 'To Basement',
    connectsTo: 'basement_up3'
  },
  {
    id: 'ground_up1',
    x: 52.48,
    y: 63.41,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'first_down1'
  },
  // ==================== FIRST FLOOR ====================
  {
    id: 'first_down1',
    x: 49.12,
    y: 58.33,
    layerId: 'first',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'ground_up1'
  },
  {
    id: 'first_down2',
    x: 51.05,
    y: 24.79,
    layerId: 'first',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'ground_up_down1'
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
    id: 'obj_hard1',
    title: 'Find Officer Rodriguez.',
    description: 'Search for and find the kidnapped Officer Rodriguez',
    type: 'hard',
    markerIds: ['hard_objective1'],
    floorName: 'Basement'
  },
  {
    id: 'obj_soft1',
    title: 'Report weapon storasge.',
    description: 'Report weapon storasge.',
    type: 'soft',
    markerIds: ['soft_objective1'],
    floorName: 'First Floor'
  }
];

// ============================================================================
// OBJECTIVES - Organized by floor and type
// ============================================================================
const OBJECTIVE_MARKERS: GameMarker[] = [
  {
    id: 'hard_objective1',
    x: 52.39,
    y: 48.85,
    title: 'Find Officer Rodriguez.',
    description: 'Search for and find the kidnapped Officer Rodriguez',
    type: 'hard_objective',
    layerId: 'basement'
  },
  {
    id: 'soft_objective1',
    x: 51.51,
    y:49.14,
    title: 'Report weapon storasge.',
    description: 'Report weapon storasge.',
    type: 'soft_objective',
    layerId: 'first'
  }
];

// ============================================================================
// FINAL MAP CONFIGURATION
// ============================================================================
export const MAP_EDGEWARE_APARTMENTS: GameMapConfig = {
  markers: [
    ...SPAWNS,
    ...OBJECTIVE_MARKERS,
    ...buildStairwayMarkers()
  ],
  layers: LAYERS,
  objectives: OBJECTIVES
};
