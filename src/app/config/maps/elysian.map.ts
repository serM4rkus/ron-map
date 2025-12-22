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
    title: 'Main spawn point', 
    description: 'Main spawn point', 
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
  id: 'elysian',
  name: '3 Letter Triad / The Elysian',
  description: 'This map is currently under construction. Check back soon for the complete interactive map with detailed floor plans, objectives, and spawn points.',
  markers: [
    ...SPAWNS
  ],
  layers: [],
  objectives: OBJECTIVES,
  placeholderImage: './maps/23_HeavyWell_Rig/HeavyWell_A-101_Rig_preview.png'
};
