import { GameMapConfig, GameMarker, MapLayer, MapObjective } from '../../services/game-map';

// ============================================================================
// LAYER DEFINITIONS
// ============================================================================
const LAYERS: MapLayer[] = [
  { 
    id: 'floor2', 
    name: 'Second Floor', 
    imageUrl: './maps/5_sullivans_slope/Sullivans slope_floor2.png', 
    visible: false, 
    zIndex: 1 
  },
  { 
    id: 'floor1', 
    name: 'First Floor', 
    imageUrl: './maps/5_sullivans_slope/Sullivans slope_floor1.png', 
    visible: false, 
    zIndex: 2 
  },
  { 
    id: 'ground', 
    name: 'Ground Floor', 
    imageUrl: './maps/5_sullivans_slope/Sullivans slope_ground.png', 
    visible: true, 
    zIndex: 3, 
    isDefault: true 
  }
];

// ============================================================================
// SPAWN POINTS
// ============================================================================
const SPAWNS: GameMarker[] = [
  { 
    id: 'spawn1', 
    x: 48.57, 
    y: 88.65, 
    title: 'Main spawn point', 
    description: 'Main spawn point', 
    type: 'spawn', 
    layerId: 'ground' 
  }
];

// ============================================================================
// OBJECTIVES - Organized by floor and type
// ============================================================================
const OBJECTIVE_MARKERS: GameMarker[] = [
  // Ground Floor - High Value Target
  { 
    id: 'hard_objective1', 
    x: 50.17, 
    y: 52.13, 
    title: 'Arrest Gerard Scott', 
    description: 'Apprehend and secure the prime suspect - Gerard Scott. He is usually located somwere incide apartment and wears armored suite', 
    type: 'hard_objective', 
    layerId: 'ground' 
  },
  
  // First Floor - Evidence
  { 
    id: 'soft_objective1', 
    x: 46.18, 
    y: 71.03, 
    title: 'Report Stolen Federal Documents', 
    description: 'Locate missing federal documents, found on the suspect\'s property', 
    type: 'soft_objective', 
    layerId: 'floor1' 
  }
];

// ============================================================================
// COMMS MARKERS - Organized by floor
// ============================================================================
const COMMS_MARKERS: GameMarker[] = [
  // Ground Floor - Speakers
  { 
    id: 'comms1', 
    x: 48.06, 
    y: 46.56, 
    title: 'Speaker', 
    type: 'comms', 
    layerId: 'ground' 
  },
  { 
    id: 'comms2', 
    x: 47.83, 
    y: 52.29, 
    title: 'Speaker', 
    type: 'comms', 
    layerId: 'ground' 
  },
  
  // First Floor - Speakers
  { 
    id: 'comms3', 
    x: 46.38, 
    y: 47.71, 
    title: 'Speaker', 
    type: 'comms', 
    layerId: 'floor1' 
  },
  { 
    id: 'comms4', 
    x: 62.24, 
    y: 72.07, 
    title: 'Speaker', 
    type: 'comms', 
    layerId: 'floor1' 
  },
  
  // Second Floor - Speakers
  { 
    id: 'comms5', 
    x: 54.08, 
    y: 45.69, 
    title: 'Speaker', 
    type: 'comms', 
    layerId: 'floor2' 
  },
  { 
    id: 'comms6', 
    x: 45.06, 
    y: 76.75, 
    title: 'Speaker', 
    type: 'comms', 
    layerId: 'floor2' 
  },
  { 
    id: 'comms7', 
    x: 54.87, 
    y: 67.04, 
    title: 'Speaker', 
    type: 'comms', 
    layerId: 'floor2' 
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
    x: 47.23,
    y: 69.53,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'stairs_down1'
  },
  {
    id: 'stairs_up2',
    x: 44.75,
    y: 60.79,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'stairs_down2'
  },
  {
    id: 'stairs_up3',
    x: 49.46,
    y: 24.04,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To Second Floor',
    connectsTo: 'stairs_down4'
  },
  
  // ==================== FIRST FLOOR ====================
  {
    id: 'stairs_down1',
    x: 52.19,
    y: 91.37,
    layerId: 'floor1',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'stairs_up1'
  },
  {
    id: 'stairs_down2',
    x: 43.42,
    y: 76.27,
    layerId: 'floor1',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'stairs_up2'
  },
  {
    id: 'stairs_up4',
    x: 49.02,
    y: 51.12,
    layerId: 'floor1',
    type: 'stairs_up',
    title: 'To Second Floor',
    connectsTo: 'stairs_down3'
  },
  
  // ==================== SECOND FLOOR ====================
  {
    id: 'stairs_down3',
    x: 48.97,
    y: 53.61,
    layerId: 'floor2',
    type: 'stairs_down',
    title: 'To First Floor',
    connectsTo: 'stairs_up4'
  },
  {
    id: 'stairs_down4',
    x: 50.19,
    y: 6.3,
    layerId: 'floor2',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'stairs_up3'
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
    id: 'obj1', 
    title: 'Arrest Gerard Scott', 
    description: 'Apprehend and secure the prime suspect - Gerard Scott. He is usually located somewhere inside apartment and wears armored suite', 
    type: 'hard', 
    markerIds: ['hard_objective1'], 
    floorName: 'Ground Floor' 
  },
  { 
    id: 'obj2', 
    title: 'Report Stolen Federal Documents', 
    description: 'Locate missing federal documents, found on the suspect\'s property', 
    type: 'soft', 
    markerIds: ['soft_objective1'], 
    floorName: 'First Floor' 
  }
];

// ============================================================================
// FINAL MAP CONFIGURATION
// ============================================================================
export const MAP_SULLIVANS_SLOPE: GameMapConfig = {
  id: 'sullivans_slope',
  name: 'A lethal obsession / Sullivan\'s Slope',
  description: 'A Lethal Obsession is the fifth mission in Ready or Not. Gerard Scott, 55, a former USIA analyst, waited out the front of East Makade Police Department with a loaded Mini-14 after setting a car alight on the street in front of the department. He then shot at officers while they attempted to extinguish the alighted vehicle. Witnesses on the street reported his vehicle as he drove away. On August 20, 2025, D Platoon is sent to service his warrant. ',
  layers: LAYERS,
  markers: [
    ...SPAWNS,
    ...OBJECTIVE_MARKERS,
    ...COMMS_MARKERS,
    ...buildStairwayMarkers()
  ],
  objectives: OBJECTIVES
};
