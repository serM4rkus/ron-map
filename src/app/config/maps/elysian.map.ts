import { GameMapConfig, GameMarker, MapLayer, MapObjective } from '../../services/game-map';


// ============================================================================
// LAYER DEFINITIONS
// ============================================================================
const LAYERS: MapLayer[] = [
  {
    id: 'ground',
    name: 'Ground Floor',
    imageUrl: './maps/12_costa_vino/costa_vino_ground.png',
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
    x: 53.49,
    y: 84.99,
    title: 'Beach',
    description: 'Beach',
    type: 'spawn',
    layerId: 'ground'
  },
  {
    id: 'spawn2',
    x: 53.49,
    y: 84.99,
    title: 'Main Street',
    description: 'Main Streeet',
    type: 'spawn',
    layerId: 'ground'
  },
  {
    id: 'spawn3',
    x: 53.49,
    y: 84.99,
    title: 'Loading Bay',
    description: 'Loading Bay',
    type: 'spawn',
    layerId: 'ground'
  },
  {
    id: 'spawn4',
    x: 53.49,
    y: 84.99,
    title: 'Docks',
    description: 'Docks',
    type: 'spawn',
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
  }
];

// ============================================================================
// FINAL MAP CONFIGURATION
// ============================================================================
export const MAP_ELYSIAN: GameMapConfig = {
  markers: [
    ...SPAWNS
  ],
  layers: [],
  objectives: OBJECTIVES,
  placeholderImage: './maps/construction_cat.png'
};
