import { GameMapConfig, GameMarker, MapLayer, MapObjective } from '../../services/game-map';

// ============================================================================
// LAYER DEFINITIONS
// ============================================================================
const LAYERS: MapLayer[] = [
  { 
    id: 'floor2', 
    name: 'Second Floor', 
    imageUrl: './maps/17_medical_center/medical_center_floor2.png',  
    zIndex: 1 
  },
  { 
    id: 'floor1', 
    name: 'First Floor', 
    imageUrl: './maps/17_medical_center/medical_center_floor1.png',  
    zIndex: 2 
  },
  { 
    id: 'ground', 
    name: 'Ground Floor', 
    imageUrl: './maps/17_medical_center/medical_center_ground.png',
    zIndex: 3, 
    isDefault: true 
  }
];

// ============================================================================
// SPAWN POINTS - Organized by floor
// ============================================================================
const SPAWNS: GameMarker[] = [
  // Ground Floor
  { 
    id: 'spawn1', 
    x: 37.1, 
    y: 92.17, 
    title: 'Hospital main lobby', 
    description: 'Hospital main lobby', 
    type: 'spawn', 
    layerId: 'ground' 
  },
  { 
    id: 'spawn2', 
    x: 59.2, 
    y: 10.97, 
    title: 'Underground parking lot entrance', 
    description: 'Underground parking lot entrance', 
    type: 'spawn', 
    layerId: 'ground' 
  }
];

// ============================================================================
// OBJECTIVES - Organized by floor and type
// ============================================================================
const OBJECTIVE_MARKERS: GameMarker[] = [
  // Second Floor - Bombs
  { 
    id: 'hard_objective1', 
    x: 39.5, 
    y: 30.62, 
    title: 'Bomb Location', 
    description: 'Defuse the Bomb Threats', 
    type: 'hard_objective', 
    layerId: 'floor2' 
  },
  { 
    id: 'hard_objective2', 
    x: 52.44, 
    y: 74.91, 
    title: 'Bomb Location', 
    description: 'Defuse the Bomb Threats', 
    type: 'hard_objective', 
    layerId: 'floor2' 
  },
  
  // First Floor - High Value Target
  { 
    id: 'hard_objective3', 
    x: 51.03, 
    y: 57.49, 
    title: 'Arrest Zahir Asadullah', 
    description: 'Usually located in MRI room with hostage.', 
    type: 'hard_objective', 
    layerId: 'floor1' 
  }
];

// ============================================================================
// STAIRWAY CONNECTIONS - Organized by floor with clear relationships
// ============================================================================

// Define stairway connections in a more maintainable format
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
  // Stairway 1: Ground → Second Floor
  {
    id: 'stairs_up1',
    x: 45.34,
    y: 21.2,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To Second Floor',
    connectsTo: 'stairs_down2'
  },
  
  // Stairway 2: Ground → Second Floor
  {
    id: 'stairs_up2',
    x: 54.92,
    y: 41.52,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To Second Floor',
    connectsTo: 'stairs_down1'
  },
  
  // Stairway 3: Ground → First Floor
  {
    id: 'stairs_up3',
    x: 62.18,
    y: 65.87,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'stairs_up_down1'
  },
  
  // ==================== FIRST FLOOR ====================
  // Stairway 4: First Floor → Second Floor
  {
    id: 'stairs_up4',
    x: 46.34,
    y: 46.97,
    layerId: 'floor1',
    type: 'stairs_up',
    title: 'To Second Floor',
    connectsTo: 'stairs_down3'
  },
  
  // Multi-direction stairway: First Floor ↔ Ground/Second Floor
  {
    id: 'stairs_up_down1',
    x: 56.05,
    y: 44.96,
    layerId: 'floor1',
    type: 'stairs_up_down',
    title: 'To Second Floor / To Ground Floor',
    connectsTo: [
      { targetId: 'stairs_down4', label: 'To Second Floor' },
      { targetId: 'stairs_up3', label: 'To Ground floor' }
    ]
  },
  
  // ==================== SECOND FLOOR ====================
  // Stairway 1 (from ground): Second Floor → First Floor
  {
    id: 'stairs_down2',
    x: 37.6,
    y: 16.42,
    layerId: 'floor2',
    type: 'stairs_down',
    title: 'To First Floor',
    connectsTo: 'stairs_up1'
  },
  
  // Stairway 2 (from ground): Second Floor → First Floor
  {
    id: 'stairs_down1',
    x: 52.14,
    y: 45.93,
    layerId: 'floor2',
    type: 'stairs_down',
    title: 'To First Floor',
    connectsTo: 'stairs_up2'
  },
  
  // Stairway 3 (from first): Second Floor → First Floor
  {
    id: 'stairs_down3',
    x: 49.45,
    y: 86.94,
    layerId: 'floor2',
    type: 'stairs_down',
    title: 'To First Floor',
    connectsTo: 'stairs_up4'
  },
  
  // Multi-direction stairway connection: Second Floor → First Floor
  {
    id: 'stairs_down4',
    x: 65.04,
    y: 75.88,
    layerId: 'floor2',
    type: 'stairs_down',
    title: 'To First Floor',
    connectsTo: 'stairs_up_down1'
  }
];

// Helper function to convert stairway definitions to GameMarker format
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
    title: 'Defuse the Bomb Threats', 
    description: 'Defuse the Bomb Threats', 
    type: 'hard', 
    markerIds: ['hard_objective1', 'hard_objective2'], 
    floorName: 'Second Floor' 
  },
  { 
    id: 'obj2', 
    title: 'Arrest Zahir Asadullah', 
    description: 'Usually located in MRI room with hostage.', 
    type: 'hard', 
    markerIds: ['hard_objective3'], 
    floorName: 'First Floor' 
  }
];

// ============================================================================
// FINAL MAP CONFIGURATION
// ============================================================================
export const MAP_MEDICAL_CENTER: GameMapConfig = {
  id: 'medical_center',
  name: 'Relapse / Coastal grove medical center',
  description: 'Relapse is the penultimate and seventeenth mission in Ready or Not. The mission takes place on May 8, 2025, as the third mission chronologically about 3 weeks after Neon Tomb. A leader of The Hand who took part in the shooting at the Neon Nightclub is taken into medical care. The group storms the Coastal Grove Medical Center in an attempt to prevent the suspect from being taken into police custody. The LSPD\'s SWAT team is deployed to intercept the cell.',
  layers: LAYERS,
  markers: [
    ...SPAWNS,
    ...OBJECTIVE_MARKERS,
    ...buildStairwayMarkers()
  ],
  objectives: OBJECTIVES
};

// ============================================================================
// UTILITY: Connection Visualization Helper (for debugging/documentation)
// ============================================================================
export function getStairwayConnectionMap(): Map<string, string[]> {
  const connectionMap = new Map<string, string[]>();
  
  STAIRWAYS.forEach(stair => {
    const targets = Array.isArray(stair.connectsTo)
      ? stair.connectsTo.map(c => c.targetId)
      : [stair.connectsTo];
    
    connectionMap.set(stair.id, targets);
  });
  
  return connectionMap;
}

// Example usage in console: console.log(getStairwayConnectionMap());
