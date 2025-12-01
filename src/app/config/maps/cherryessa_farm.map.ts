import { GameMapConfig, GameMarker, MapLayer, MapObjective } from '../../services/game-map';

// ============================================================================
// LAYER DEFINITIONS
// ============================================================================
const LAYERS: MapLayer[] = [
  { 
    id: 'floor1', 
    name: 'First Floor', 
    imageUrl: './maps/16_cherryessa_farm/cherryessa_farm_floor1.png', 
    visible: false, 
    zIndex: 1 
  },
  { 
    id: 'ground', 
    name: 'Ground Floor', 
    imageUrl: './maps/16_cherryessa_farm/cherryessa_farm_ground.png', 
    visible: true, 
    zIndex: 2, 
    isDefault: true 
  },
  { 
    id: 'underground', 
    name: 'Underground', 
    imageUrl: './maps/16_cherryessa_farm/cherryessa_farm_underground.png', 
    visible: false, 
    zIndex: 3 
  }
];

// ============================================================================
// SPAWN POINTS
// ============================================================================
const SPAWNS: GameMarker[] = [
  { 
    id: 'spawn1', 
    x: 60.67, 
    y: 92.84, 
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
  // Ground Floor - Primary Targets (Cult Leaders)
  { 
    id: 'hard_objective1', 
    x: 43.02, 
    y: 37.26, 
    title: 'Possible main target location', 
    description: 'Arrest Elaine Raskin  and Arrest Eve Nader', 
    type: 'hard_objective', 
    layerId: 'ground' 
  },
  { 
    id: 'hard_objective2', 
    x: 57.39, 
    y: 36.96, 
    title: 'Possible main target location', 
    description: 'Arrest Elaine Raskin  and Arrest Eve Nader', 
    type: 'hard_objective', 
    layerId: 'ground' 
  },
  { 
    id: 'hard_objective3', 
    x: 48.15, 
    y: 8.58, 
    title: 'Possible main target location', 
    description: 'Arrest Elaine Raskin  and Arrest Eve Nader', 
    type: 'hard_objective', 
    layerId: 'ground' 
  },
  
  // Ground Floor - Evidence
  { 
    id: 'soft_objective1', 
    x: 56.81, 
    y: 66.02, 
    title: 'Report Conspiracy Evidence', 
    description: 'Locate evidence for conspiracy to commit murder, of still missing persons', 
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
  // ==================== FIRST FLOOR ====================
  {
    id: 'stairs_down2',
    x: 38.87,
    y: 33.23,
    layerId: 'floor1',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'stairs_up_down1'
  },
  
  // ==================== GROUND FLOOR ====================
  // Multi-direction: Ground Floor ↔ First Floor/Underground
  {
    id: 'stairs_up_down1',
    x: 44.7,
    y: 37.49,
    layerId: 'ground',
    type: 'stairs_up_down',
    title: 'To First Floor / To Underground',
    connectsTo: [
      { targetId: 'stairs_down2', label: 'To First Floor' },
      { targetId: 'stairs_up4', label: 'To Underground' }
    ]
  },
  {
    id: 'stairs_down1',
    x: 42.18,
    y: 49.59,
    layerId: 'ground',
    type: 'stairs_down',
    title: 'To Underground',
    connectsTo: 'stairs_up3'
  },
  {
    id: 'stairs_down3',
    x: 47.31,
    y: 15.38,
    layerId: 'ground',
    type: 'stairs_down',
    title: 'To Church Underground',
    connectsTo: 'stairs_up2'
  },
  {
    id: 'stairs_down4',
    x: 48.57,
    y: 4.1,
    layerId: 'ground',
    type: 'stairs_down',
    title: 'To Church Underground',
    connectsTo: 'stairs_up1'
  },
  
  // ==================== UNDERGROUND ====================
  {
    id: 'stairs_up1',
    x: 50.71,
    y: 26.13,
    layerId: 'underground',
    type: 'stairs_up',
    title: 'To Church Ground Floor',
    connectsTo: 'stairs_down4'
  },
  {
    id: 'stairs_up2',
    x: 49.71,
    y: 37.34,
    layerId: 'underground',
    type: 'stairs_up',
    title: 'To Church Ground Floor',
    connectsTo: 'stairs_down3'
  },
  {
    id: 'stairs_up3',
    x: 44.58,
    y: 71.77,
    layerId: 'underground',
    type: 'stairs_up',
    title: 'To Ground Floor',
    connectsTo: 'stairs_down1'
  },
  {
    id: 'stairs_up4',
    x: 47.39,
    y: 59.75,
    layerId: 'underground',
    type: 'stairs_up',
    title: 'To Ground Floor',
    connectsTo: 'stairs_up_down1'
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
    title: 'Arrest Elaine Raskin and Eve Nader', 
    description: 'Arrest Elaine Raskin and Arrest Eve Nader', 
    type: 'hard', 
    markerIds: ['hard_objective1', 'hard_objective2', 'hard_objective3'], 
    floorName: 'Ground Floor' 
  },
  { 
    id: 'obj2', 
    title: 'Report Conspiracy Evidence', 
    description: 'Locate evidence for conspiracy to commit murder, of still missing persons', 
    type: 'soft', 
    markerIds: ['soft_objective1'], 
    floorName: 'Ground Floor' 
  }
];

// ============================================================================
// FINAL MAP CONFIGURATION
// ============================================================================
export const MAP_CHERRYESSA_FARM: GameMapConfig = {
  id: 'cherryessa_farm',
  name: 'Carriers of the vine / Cherryessa Farm',
  description: 'Carriers of the Vine is the sixteenth mission in Ready or Not. It has D Platoon being dispatched on June 1, 2025, to pacify a new age cult committing acts of vigilantism across Los Suenos.',
  layers: LAYERS,
  markers: [
    ...SPAWNS,
    ...OBJECTIVE_MARKERS,
    ...buildStairwayMarkers()
  ],
  objectives: OBJECTIVES
};
