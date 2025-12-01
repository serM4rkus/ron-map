import { GameMapConfig, GameMarker, MapLayer, MapObjective } from '../../services/game-map';

// ============================================================================
// LAYER DEFINITIONS
// ============================================================================
const LAYERS: MapLayer[] = [
  { 
    id: 'floor1', 
    name: 'First Floor', 
    imageUrl: './maps/11_watt_college/watt_college_floor1.png', 
    visible: false, 
    zIndex: 1 
  },
  { 
    id: 'ground', 
    name: 'Ground Floor', 
    imageUrl: './maps/11_watt_college/watt_college_ground.png', 
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
    x: 41.83, 
    y: 69.52, 
    title: 'Southern Entrance', 
    description: 'Southern Entrance', 
    type: 'spawn', 
    layerId: 'ground' 
  },
  { 
    id: 'spawn2', 
    x: 59.76, 
    y: 33.96, 
    title: 'Northern Exit', 
    description: 'Northern Exit', 
    type: 'spawn', 
    layerId: 'ground' 
  }
];

// ============================================================================
// OBJECTIVES - Organized by floor and type
// ============================================================================
const OBJECTIVE_MARKERS: GameMarker[] = [
  // Ground Floor - Bomb Locations (Random 2 of 12)
  { 
    id: 'hard_objective1', 
    x: 44.14, 
    y: 52.06, 
    title: 'Possible bomb location', 
    description: 'Deactivate any bombs at the scene. (2 random locations)', 
    type: 'hard_objective', 
    layerId: 'ground' 
  },
  { 
    id: 'hard_objective2', 
    x: 39.73, 
    y: 43.85, 
    title: 'Possible bomb location', 
    description: 'Deactivate any bombs at the scene. (2 random locations)', 
    type: 'hard_objective', 
    layerId: 'ground' 
  },
  { 
    id: 'hard_objective3', 
    x: 48.98, 
    y: 44.98, 
    title: 'Possible bomb location', 
    description: 'Deactivate any bombs at the scene. (2 random locations)', 
    type: 'hard_objective', 
    layerId: 'ground' 
  },
  { 
    id: 'hard_objective5', 
    x: 38.4, 
    y: 50.92, 
    title: 'Possible bomb location', 
    description: 'Deactivate any bombs at the scene. (2 random locations)', 
    type: 'hard_objective', 
    layerId: 'ground' 
  },
  { 
    id: 'hard_objective7', 
    x: 58.7, 
    y: 52.4, 
    title: 'Possible bomb location', 
    description: 'Deactivate any bombs at the scene. (2 random locations)', 
    type: 'hard_objective', 
    layerId: 'ground' 
  },
  { 
    id: 'hard_objective8', 
    x: 58.03, 
    y: 49.3, 
    title: 'Possible bomb location', 
    description: 'Deactivate any bombs at the scene. (2 random locations)', 
    type: 'hard_objective', 
    layerId: 'ground' 
  },
  { 
    id: 'hard_objective9', 
    x: 48.98, 
    y: 44.98, 
    title: 'Possible bomb location', 
    description: 'Deactivate any bombs at the scene. (2 random locations)', 
    type: 'hard_objective', 
    layerId: 'ground' 
  },
  
  // First Floor - Bomb Locations
  { 
    id: 'hard_objective4', 
    x: 41.22, 
    y: 42.2, 
    title: 'Possible bomb location', 
    description: 'Deactivate any bombs at the scene. (2 random locations)', 
    type: 'hard_objective', 
    layerId: 'floor1' 
  },
  { 
    id: 'hard_objective6', 
    x: 59.58, 
    y: 49.31, 
    title: 'Possible bomb location', 
    description: 'Deactivate any bombs at the scene. (2 random locations)', 
    type: 'hard_objective', 
    layerId: 'floor1' 
  },
  { 
    id: 'hard_objective10', 
    x: 58.4, 
    y: 43.76, 
    title: 'Possible bomb location', 
    description: 'Deactivate any bombs at the scene. (2 random locations)', 
    type: 'hard_objective', 
    layerId: 'floor1' 
  },
  { 
    id: 'hard_objective11', 
    x: 58.8, 
    y: 57, 
    title: 'Possible bomb location', 
    description: 'Deactivate any bombs at the scene. (2 random locations)', 
    type: 'hard_objective', 
    layerId: 'floor1' 
  },
  { 
    id: 'hard_objective12', 
    x: 62.95, 
    y: 54.14, 
    title: 'Possible bomb location', 
    description: 'Deactivate any bombs at the scene. (2 random locations)', 
    type: 'hard_objective', 
    layerId: 'floor1' 
  },
  
  // Ground Floor - Evidence
  { 
    id: 'soft_objective1', 
    x: 51.46, 
    y: 53.36, 
    title: 'Report downed security guy', 
    description: 'Report downed security guy', 
    type: 'soft_objective', 
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
  connectsTo: string;
}

const STAIRWAYS: StairwayPair[] = [
  // ==================== GROUND FLOOR ====================
  {
    id: 'stairs_up1',
    x: 37,
    y: 51.43,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'stairs_down1'
  },
  {
    id: 'stairs_up2',
    x: 42.27,
    y: 50.1,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'stairs_down3'
  },
  {
    id: 'stairs_up3',
    x: 46.1,
    y: 50.14,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'stairs_down4'
  },
  {
    id: 'stairs_up4',
    x: 49.56,
    y: 51.93,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'stairs_down5'
  },
  {
    id: 'stairs_up5',
    x: 56.89,
    y: 49.27,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'stairs_down6'
  },
  {
    id: 'stairs_up6',
    x: 40.71,
    y: 40.89,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'stairs_down2'
  },
  
  // ==================== FIRST FLOOR ====================
  {
    id: 'stairs_down1',
    x: 37.27,
    y: 55.27,
    layerId: 'floor1',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'stairs_up1'
  },
  {
    id: 'stairs_down2',
    x: 42.23,
    y: 39.06,
    layerId: 'floor1',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'stairs_up6'
  },
  {
    id: 'stairs_down3',
    x: 43.95,
    y: 50.78,
    layerId: 'floor1',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'stairs_up2'
  },
  {
    id: 'stairs_down4',
    x: 48.28,
    y: 50.78,
    layerId: 'floor1',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'stairs_up3'
  },
  {
    id: 'stairs_down5',
    x: 52.06,
    y: 51.83,
    layerId: 'floor1',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'stairs_up4'
  },
  {
    id: 'stairs_down6',
    x: 61.13,
    y: 49.89,
    layerId: 'floor1',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'stairs_up5'
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
    title: 'Deactivate Bombs', 
    description: 'Deactivate any bombs at the scene. (2 random locations)', 
    type: 'hard', 
    markerIds: ['hard_objective1', 'hard_objective2', 'hard_objective3', 'hard_objective4', 'hard_objective5', 'hard_objective6', 'hard_objective7', 'hard_objective8', 'hard_objective9', 'hard_objective10', 'hard_objective11', 'hard_objective12'], 
    floorName: 'Ground & First Floor' 
  },
  { 
    id: 'obj2', 
    title: 'Report Downed Security Guy', 
    description: 'Report downed security guy', 
    type: 'soft', 
    markerIds: ['soft_objective1'], 
    floorName: 'Ground Floor' 
  }
];

// ============================================================================
// FINAL MAP CONFIGURATION
// ============================================================================
export const MAP_WATT_COLLEGE: GameMapConfig = {
  id: 'watt_college',
  name: 'Elephant / Watt Community college',
  description: 'Elephant is the eleventh (ninth chronologically) playable mission in Ready or Not. On October 17, 2025, four students commit a mass-shooting at Watt Community College, presumably due to a mixture of mental health issues and immense dissatisfaction with the current state of the United States. LSPD is able to contain the shooters in the Science Wing and D Platoon is sent in to neutralize the threat.',
  layers: LAYERS,
  markers: [
    ...SPAWNS,
    ...OBJECTIVE_MARKERS,
    ...buildStairwayMarkers()
  ],
  objectives: OBJECTIVES
};
