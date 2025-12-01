import { GameMapConfig, GameMarker, MapLayer, MapObjective } from '../../services/game-map';

// ============================================================================
// LAYER DEFINITIONS
// ============================================================================
const LAYERS: MapLayer[] = [
  { 
    id: 'floor2', 
    name: 'Second Floor', 
    imageUrl: './maps/10_voll_health_house/voll_health_house_floor2.png', 
    visible: true, 
    zIndex: 1, 
    isDefault: true 
  },
  { 
    id: 'floor1', 
    name: 'First Floor', 
    imageUrl: './maps/10_voll_health_house/voll_health_house_floor1.png', 
    visible: false, 
    zIndex: 2 
  },
  { 
    id: 'ground', 
    name: 'Ground Floor', 
    imageUrl: './maps/10_voll_health_house/voll_health_house_ground.png', 
    visible: false, 
    zIndex: 3 
  },
  { 
    id: 'underground', 
    name: 'Underground', 
    imageUrl: './maps/10_voll_health_house/voll_health_house_underground.png', 
    visible: false, 
    zIndex: 4 
  }
];

// ============================================================================
// SPAWN POINTS - Starts on second floor
// ============================================================================
const SPAWNS: GameMarker[] = [
  { 
    id: 'spawn1', 
    x: 52.94, 
    y: 88.28, 
    title: 'Main spawn point', 
    description: 'Main spawn point', 
    type: 'spawn', 
    layerId: 'floor2' 
  }
];

// ============================================================================
// OBJECTIVES - Organized by floor and type
// ============================================================================
const OBJECTIVE_MARKERS: GameMarker[] = [
  // Second Floor - Evidence
  { 
    id: 'soft_objective1', 
    x: 41.6, 
    y: 24.19, 
    title: 'Report Prohibited Video Tapes of Minors', 
    description: 'Locate indecent and prohibited videos of minors in the master bedroom of the Voll property', 
    type: 'soft_objective', 
    layerId: 'floor2' 
  },
  
  // First Floor - Computer Evidence
  { 
    id: 'hard_objective1', 
    x: 50.46, 
    y: 51.23, 
    title: 'Locate Voll\'s Office Computer', 
    description: 'Find and seize the laptop and hard drives belonging to Amos Voll, for any potentially incriminating evidence', 
    type: 'hard_objective', 
    layerId: 'floor1' 
  },
  
  // Ground Floor - Primary Suspect
  { 
    id: 'hard_objective2', 
    x: 46.34, 
    y: 50.56, 
    title: 'Arrest Amos Voll', 
    description: 'Apprehend and secure the prime suspect, Amos Voll. Usually located on first floor of his house, but maybe be in other areas of the building.', 
    type: 'hard_objective', 
    layerId: 'ground' 
  },
  
  // Underground - Evidence
  { 
    id: 'soft_objective2', 
    x: 46.47, 
    y: 63.86, 
    title: 'Report Prohibited Images of Minors', 
    description: 'Locate indecent and prohibited images of minors in the basement of the Voll property', 
    type: 'soft_objective', 
    layerId: 'underground' 
  }
];

// ============================================================================
// STAIRWAY CONNECTIONS - Organized by floor (top to bottom)
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
  // ==================== SECOND FLOOR (Default spawn) ====================
  {
    id: 'stairs_down1',
    x: 53.11,
    y: 8.21,
    layerId: 'floor2',
    type: 'stairs_down',
    title: 'To First Floor',
    connectsTo: 'stairs_up2'
  },
  {
    id: 'stairs_down2',
    x: 58.74,
    y: 62.44,
    layerId: 'floor2',
    type: 'stairs_down',
    title: 'To First Floor',
    connectsTo: 'stairs_up1'
  },
  
  // ==================== FIRST FLOOR ====================
  {
    id: 'stairs_up1',
    x: 63.66,
    y: 66.47,
    layerId: 'floor1',
    type: 'stairs_up',
    title: 'To Second Floor',
    connectsTo: 'stairs_down2'
  },
  {
    id: 'stairs_up2',
    x: 55.13,
    y: 26.28,
    layerId: 'floor1',
    type: 'stairs_up',
    title: 'To Second Floor',
    connectsTo: 'stairs_down1'
  },
  {
    id: 'stairs_down3',
    x: 49.33,
    y: 41.22,
    layerId: 'floor1',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'stairs_up4'
  },
  {
    id: 'stairs_down4',
    x: 58.49,
    y: 64.83,
    layerId: 'floor1',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'stairs_up3'
  },
  
  // ==================== GROUND FLOOR ====================
  {
    id: 'stairs_up3',
    x: 52.48,
    y: 76.63,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'stairs_down4'
  },
  {
    id: 'stairs_up4',
    x: 43.36,
    y: 51.01,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'stairs_down3'
  },
  {
    id: 'stairs_down5',
    x: 37.44,
    y: 45.85,
    layerId: 'ground',
    type: 'stairs_down',
    title: 'To Underground',
    connectsTo: 'stairs_up5'
  },
  {
    id: 'stairs_down6',
    x: 57.06,
    y: 26.88,
    layerId: 'ground',
    type: 'stairs_down',
    title: 'To Underground',
    connectsTo: 'stairs_up6'
  },
  
  // ==================== UNDERGROUND ====================
  {
    id: 'stairs_up5',
    x: 36.93,
    y: 51.08,
    layerId: 'underground',
    type: 'stairs_up',
    title: 'To Ground Floor',
    connectsTo: 'stairs_down5'
  },
  {
    id: 'stairs_up6',
    x: 60.42,
    y: 34.95,
    layerId: 'underground',
    type: 'stairs_up',
    title: 'To Ground Floor',
    connectsTo: 'stairs_down6'
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
    title: 'Locate Voll\'s Office Computer', 
    description: 'Find and seize the laptop and hard drives belonging to Amos Voll, for any potentially incriminating evidence', 
    type: 'hard', 
    markerIds: ['hard_objective1'], 
    floorName: 'First Floor' 
  },
  { 
    id: 'obj2', 
    title: 'Arrest Amos Voll', 
    description: 'Apprehend and secure the prime suspect, Amos Voll. Usually located on first floor of his house, but maybe be in other areas of the building.', 
    type: 'hard', 
    markerIds: ['hard_objective2'], 
    floorName: 'Ground Floor' 
  },
  { 
    id: 'obj3', 
    title: 'Report Prohibited Video Tapes of Minors', 
    description: 'Locate indecent and prohibited videos of minors in the master bedroom of the Voll property', 
    type: 'soft', 
    markerIds: ['soft_objective1'], 
    floorName: 'Second Floor' 
  },
  { 
    id: 'obj4', 
    title: 'Report Prohibited Images of Minors', 
    description: 'Locate indecent and prohibited images of minors in the basement of the Voll property', 
    type: 'soft', 
    markerIds: ['soft_objective2'], 
    floorName: 'Underground' 
  }
];

// ============================================================================
// FINAL MAP CONFIGURATION
// ============================================================================
export const MAP_VOLL_HEALTH_HOUSE: GameMapConfig = {
  id: 'voll_health_house',
  name: 'Valley of the Dolls / Voll Health house',
  description: 'Valley of the Dolls is the tenth playable mission in Ready or Not. The LSPD\'s cyber-crime team has found a lead pertaining to the person profiting from the illegal child-pornography ring operating in Los Sueños. Amos Voll owns a health house at 1962 Irwin Drive, Los Clemente, which is guarded by the security company, Bolton Security. With Amos\'s daughter, Janey Voll, having her 18th birthday, the LSPD decide to raid the home. This level takes place on January 5, 2026, making it the sixteenth mission chronologically.',
  layers: LAYERS,
  markers: [
    ...SPAWNS,
    ...OBJECTIVE_MARKERS,
    ...buildStairwayMarkers()
  ],
  objectives: OBJECTIVES
};
