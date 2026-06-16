import { GameMapConfig, GameMarker, MapLayer, MapObjective } from '../../services/game-map.service';


// ============================================================================
// LAYER DEFINITIONS
// ============================================================================
const LAYERS: MapLayer[] = [
  {
    id: 'ground',
    name: 'Ground Floor',
    imageUrl: './maps/27_pier/pier_ground.webp',
    zIndex: 0,
    isDefault: true
  }
];

// ============================================================================
// SPAWN POINTS
// ============================================================================
const SPAWNS: GameMarker[] = [
  {
    id: 'spawn1',
    x: 42.14,
    y: 89.92,
    title: 'Parking Lot',
    description: 'Parking Lot',
    type: 'spawn',
    layerId: 'ground'
  },
  {
    id: 'spawn2',
    x: 37.18,
    y: 34.65,
    title: 'Beach',
    description: 'Beach',
    type: 'spawn',
    layerId: 'ground'
  },
  {
    id: 'spawn3',
    x: 66.18,
    y: 8.06,
    title: 'Docks',
    description: 'Docks',
    type: 'spawn',
    layerId: 'ground'
  }
];

// ============================================================================
// OBJECTIVES - Organized by floor and type
// ============================================================================
const OBJECTIVE_MARKERS: GameMarker[] = [
  {
    id: 'soft_objective1',
    x: 53.34,
    y: 59.62,
    title: 'Chemical weapon cargo.',
    description: 'Report Chemical weapon cargo.',
    type: 'soft_objective',
    layerId: 'ground'
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
    title: 'Report Chemical weapon cargo.',
    description: 'Report Chemical weapon cargo.',
    type: 'soft', 
    markerIds: ['soft_objective1'], 
    floorName: 'Ground Floor' 
  }
];

// ============================================================================
// FINAL MAP CONFIGURATION
// ============================================================================
export const MAP_PIER: GameMapConfig = {
    markers: [
    ...SPAWNS,
    ...OBJECTIVE_MARKERS
  ],
  layers: LAYERS,
  objectives: OBJECTIVES
};
