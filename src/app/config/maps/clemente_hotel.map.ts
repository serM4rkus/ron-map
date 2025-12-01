import { GameMapConfig, GameMarker, MapLayer, MapObjective } from '../../services/game-map';

// ============================================================================
// LAYER DEFINITIONS
// ============================================================================
const LAYERS: MapLayer[] = [
  { 
    id: 'roof', 
    name: 'Roof', 
    imageUrl: './maps/13_clemente_hotel/clemente_hotel_roof.png', 
    visible: false, 
    zIndex: 1 
  },
  { 
    id: 'floor2', 
    name: 'Second Floor', 
    imageUrl: './maps/13_clemente_hotel/clemente_hotel_floor2.png', 
    visible: false, 
    zIndex: 2 
  },
  { 
    id: 'floor1', 
    name: 'First Floor', 
    imageUrl: './maps/13_clemente_hotel/clemente_hotel_floor1.png', 
    visible: true, 
    zIndex: 3, 
    isDefault: true 
  }
];

// ============================================================================
// SPAWN POINTS - Organized by floor
// ============================================================================
const SPAWNS: GameMarker[] = [
  // First Floor
  { 
    id: 'spawn1', 
    x: 36.93, 
    y: 50.71, 
    title: 'Balcony', 
    description: 'Balcony', 
    type: 'spawn', 
    layerId: 'floor1' 
  },
  { 
    id: 'spawn2', 
    x: 61.76, 
    y: 51.01, 
    title: 'Elevator', 
    description: 'Elevator', 
    type: 'spawn', 
    layerId: 'floor1' 
  },
  
  // Roof
  { 
    id: 'spawn3', 
    x: 55.8, 
    y: 40.77, 
    title: 'Rooftop', 
    description: 'Rooftop', 
    type: 'spawn', 
    layerId: 'roof' 
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
    id: 'stairs_up1',
    x: 60.8,
    y: 41.81,
    layerId: 'floor1',
    type: 'stairs_up',
    title: 'To Second Floor',
    connectsTo: 'stairs_down1'
  },
  {
    id: 'stairs_up2',
    x: 43.85,
    y: 39.2,
    layerId: 'floor1',
    type: 'stairs_up',
    title: 'To Second Floor',
    connectsTo: 'stairs_down2'
  },
  {
    id: 'stairs_up3',
    x: 54.68,
    y: 53.23,
    layerId: 'floor1',
    type: 'stairs_up',
    title: 'To Second Floor',
    connectsTo: 'stairs_up_down1'
  },
  
  // ==================== SECOND FLOOR ====================
  {
    id: 'stairs_down1',
    x: 76.01,
    y: 30.17,
    layerId: 'floor2',
    type: 'stairs_down',
    title: 'To First Floor',
    connectsTo: 'stairs_up1'
  },
  {
    id: 'stairs_down2',
    x: 38.4,
    y: 24.27,
    layerId: 'floor2',
    type: 'stairs_down',
    title: 'To First Floor',
    connectsTo: 'stairs_up2'
  },
  // Multi-direction: Second Floor ↔ Roof/First Floor
  {
    id: 'stairs_up_down1',
    x: 57.65,
    y: 56.31,
    layerId: 'floor2',
    type: 'stairs_up_down',
    title: 'To Roof / To First Floor',
    connectsTo: [
      { targetId: 'stairs_down3', label: 'To Roof' },
      { targetId: 'stairs_up3', label: 'To First Floor' }
    ]
  },
  
  // ==================== ROOF ====================
  {
    id: 'stairs_down3',
    x: 42.21,
    y: 81.41,
    layerId: 'roof',
    type: 'stairs_down',
    title: 'To Second Floor',
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
  }
];

// ============================================================================
// FINAL MAP CONFIGURATION
// ============================================================================
export const MAP_CLEMENTE_HOTEL: GameMapConfig = {
  id: 'clemente_hotel',
  name: 'Sins Of The Father / Clemente Hotel',
  description: 'Sins of The Father is the thirteenth mission in Ready or Not. On October 2, 2025, rogue Secret Service agents sympathetic to the plight of The Left Behind, have occupied the fourteenth floor of the Clemente Hotel, threatening to execute Senator Fremont\'s family on video. D Platoon is dispatched to neutralize the terrorists before they can carry out their threat.',
  layers: LAYERS,
  markers: [
    ...SPAWNS,
    ...buildStairwayMarkers()
  ],
  objectives: OBJECTIVES
};
