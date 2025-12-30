import { GameMapConfig, GameMarker, MapLayer, MapObjective } from '../../services/game-map';

// ============================================================================
// LAYER DEFINITIONS
// ============================================================================
const LAYERS: MapLayer[] = [
  { 
    id: 'ground', 
    name: 'Ground Floor', 
    imageUrl: './maps/1_4U_gas/4U_Gas_Station.png',
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
    x: 58.36, 
    y: 81.82, 
    title: 'Main spawn point', 
    description: 'Main spawn point', 
    type: 'spawn', 
    layerId: 'ground' 
  }
];

// ============================================================================
// OBJECTIVES - Organized by type
// ============================================================================
const OBJECTIVE_MARKERS: GameMarker[] = [
  // Hard Objectives - Locate Civilians
  { 
    id: 'hard_objective1', 
    x: 48.05, 
    y: 30.99, 
    title: 'Find Cristal Leighton', 
    description: 'Locate the civilian, Cristal Leighton; a minor hiding somewhere at the crime scene', 
    type: 'hard_objective', 
    layerId: 'ground' 
  },
  { 
    id: 'hard_objective2', 
    x: 55.88, 
    y: 41.67, 
    title: 'Find the Store Manager', 
    description: 'Locate the civilian, responsible for the initial call to dispatch, who has since been unresponsive', 
    type: 'hard_objective', 
    layerId: 'ground' 
  },
  
  // Soft Objectives - Evidence
  { 
    id: 'soft_objective1', 
    x: 59.07, 
    y: 28.8, 
    title: 'Report Incapacitated Veteran', 
    description: 'Locate a downed civilian, a veteran, killed on scene by the suspects', 
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
    title: 'Find Cristal Leighton', 
    description: 'Locate the civilian, Cristal Leighton; a minor hiding somewhere at the crime scene', 
    type: 'hard', 
    markerIds: ['hard_objective1'], 
    floorName: 'Ground Floor' 
  },
  { 
    id: 'obj2', 
    title: 'Find the Store Manager', 
    description: 'Locate the civilian, responsible for the initial call to dispatch, who has since been unresponsive', 
    type: 'hard', 
    markerIds: ['hard_objective2'], 
    floorName: 'Ground Floor' 
  },
  { 
    id: 'obj3', 
    title: 'Report Incapacitated Veteran', 
    description: 'Locate a downed civilian, a veteran, killed on scene by the suspects', 
    type: 'soft', 
    markerIds: ['soft_objective1'], 
    floorName: 'Ground Floor' 
  }
];

// ============================================================================
// FINAL MAP CONFIGURATION
// ============================================================================
export const MAP_4U_GAS: GameMapConfig = {
  layers: LAYERS,
  markers: [
    ...SPAWNS,
    ...OBJECTIVE_MARKERS
  ],
  objectives: OBJECTIVES
};
