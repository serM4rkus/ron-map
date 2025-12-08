import { GameMapConfig, GameMarker, MapLayer, MapObjective } from '../../services/game-map';

// ============================================================================
// LAYER DEFINITIONS
// ============================================================================
const LAYERS: MapLayer[] = [
  { 
    id: 'floor2', 
    name: 'Second Floor', 
    imageUrl: './maps/18_port/port_floor2.png',  
    zIndex: 1 
  },
  { 
    id: 'floor1', 
    name: 'First Floor', 
    imageUrl: './maps/18_port/port_floor1.png',  
    zIndex: 2 
  },
  { 
    id: 'ground', 
    name: 'Ground Floor', 
    imageUrl: './maps/18_port/port_ground.png',
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
    x: 37.62, 
    y: 91.12, 
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
  // Ground Floor - Weapon Storage Containers (Hard Objectives)
  { 
    id: 'hard_objective1', 
    x: 41.93, 
    y: 62.57, 
    title: 'Possible Weapon Storage Container', 
    description: 'Alternativley may contain Illegal Drugs Storage Container (soft oblective)', 
    type: 'hard_objective', 
    layerId: 'ground' 
  },
  { 
    id: 'hard_objective2', 
    x: 51.57, 
    y: 61.28, 
    title: 'Possible Weapon Storage Container', 
    description: 'Alternativley may contain Illegal Drugs Storage Container (soft oblective)', 
    type: 'hard_objective', 
    layerId: 'ground' 
  },
  { 
    id: 'hard_objective3', 
    x: 56.36, 
    y: 64.32, 
    title: 'Possible Weapon Storage Container', 
    description: 'Alternativley may contain Illegal Drugs Storage Container (soft oblective)', 
    type: 'hard_objective', 
    layerId: 'ground' 
  },
  
  // Ground Floor - Evidence (Soft Objectives)
  { 
    id: 'soft_objective1', 
    x: 49.44, 
    y: 42.31, 
    title: 'Report Missing Persons', 
    description: 'Locate missing persons, hidden and caged in an orange container, marked with a spider. Evidence of human trafficking', 
    type: 'soft_objective', 
    layerId: 'ground' 
  },
  { 
    id: 'soft_objective2', 
    x: 51.79, 
    y: 9.36, 
    title: 'Report Auction Room Laptops', 
    description: 'Locate personal computers of potential suspects, found in the warehouse auction room, that could contain further evidence of criminal activity', 
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
  connectsTo: string | Array<{ targetId: string; label: string }>;
}

const STAIRWAYS: StairwayPair[] = [
  // ==================== GROUND FLOOR ====================
  {
    id: 'stairs_up1',
    x: 55.5,
    y: 37.11,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'stairs_down1'
  },
  {
    id: 'stairs_up2',
    x: 58.24,
    y: 29.05,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'stairs_down2'
  },
  {
    id: 'stairs_up4',
    x: 58.24,
    y: 32.35,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'stairs_down3'
  },
  
  // ==================== FIRST FLOOR ====================
  {
    id: 'stairs_down1',
    x: 48.76,
    y: 51.06,
    layerId: 'floor1',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'stairs_up1'
  },
  {
    id: 'stairs_down2',
    x: 51.55,
    y: 43.62,
    layerId: 'floor1',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'stairs_up2'
  },
  {
    id: 'stairs_down3',
    x: 51.57,
    y: 48.13,
    layerId: 'floor1',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'stairs_up4'
  },
  {
    id: 'stairs_up3',
    x: 51,
    y: 55.6,
    layerId: 'floor1',
    type: 'stairs_up',
    title: 'To Second Floor',
    connectsTo: 'stairs_down4'
  },
  
  // ==================== SECOND FLOOR ====================
  {
    id: 'stairs_down4',
    x: 50.75,
    y: 47.16,
    layerId: 'floor2',
    type: 'stairs_down',
    title: 'To First Floor',
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
    id: 'obj1', 
    title: 'Locate Weapon Storage Containers', 
    description: 'Find weapon storage containers (Alternatively may contain Illegal Drugs Storage Container)', 
    type: 'hard', 
    markerIds: ['hard_objective1', 'hard_objective2', 'hard_objective3'], 
    floorName: 'Ground Floor' 
  },
  { 
    id: 'obj2', 
    title: 'Report Missing Persons', 
    description: 'Locate missing persons, hidden and caged in an orange container, marked with a spider. Evidence of human trafficking', 
    type: 'soft', 
    markerIds: ['soft_objective1'], 
    floorName: 'Ground Floor' 
  },
  { 
    id: 'obj3', 
    title: 'Report Auction Room Laptops', 
    description: 'Locate personal computers of potential suspects, found in the warehouse auction room, that could contain further evidence of criminal activity', 
    type: 'soft', 
    markerIds: ['soft_objective2'], 
    floorName: 'Ground Floor' 
  }
];

// ============================================================================
// FINAL MAP CONFIGURATION
// ============================================================================
export const MAP_PORT: GameMapConfig = {
  id: 'port',
  name: 'Hide And Seek / Port Hokan',
  description: 'Hide and Seek is the last and eighteenth mission in Ready or Not. On February 18, 2026, the LSPD, along with the FISA and ATF, are inserted into Port Hokan to shut down a major arms distribution operation.',
  layers: LAYERS,
  markers: [
    ...SPAWNS,
    ...OBJECTIVE_MARKERS,
    ...buildStairwayMarkers()
  ],
  objectives: OBJECTIVES
};

// ============================================================================
// UTILITY: Connection Visualization Helper
// ============================================================================
export function getStairwayConnectionMap_PORT(): Map<string, string[]> {
  const connectionMap = new Map<string, string[]>();
  STAIRWAYS.forEach(stair => {
    const targets = Array.isArray(stair.connectsTo)
      ? stair.connectsTo.map(c => c.targetId)
      : [stair.connectsTo];
    connectionMap.set(stair.id, targets);
  });
  return connectionMap;
}
