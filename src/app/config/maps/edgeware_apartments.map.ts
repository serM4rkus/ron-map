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
    title: 'Main Spawn Point',
    description: 'Main Spawn Point',
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
export const MAP_EDGEWARE_APARTMENTS: GameMapConfig = {
  markers: [
    ...SPAWNS
  ],
  layers: LAYERS,
  objectives: OBJECTIVES,
  placeholderImage: './maps/construction_cat.png'
};
