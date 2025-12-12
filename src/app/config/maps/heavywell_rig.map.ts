import { GameMapConfig, GameMarker, MapLayer, MapObjective } from '../../services/game-map';

// ============================================================================
// LAYER DEFINITIONS
// ============================================================================
const LAYERS: MapLayer[] = [
  {
    id: 'second',
    name: 'Second Floor',
    imageUrl: './maps/23_HeavyWell_Rig/HeavyWell_Rig_second.png',
    zIndex: 1
  },
  {
    id: 'first',
    name: 'First Floor',
    imageUrl: './maps/23_HeavyWell_Rig/HeavyWell_Rig_first.png',
    zIndex: 2
  },
  {
    id: 'ground',
    name: 'Ground Floor',
    imageUrl: './maps/23_HeavyWell_Rig/HeavyWell_Rig_ground.png',
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
    x: 73.35,
    y: 18.88,
    title: 'Helipad',
    description: 'Helipad Spawn Point',
    type: 'spawn',
    layerId: 'first'
  },
  {
    id: 'spawn2',
    x: 41.16,
    y: 80.92,
    title: 'Upper Deck Spawn',
    description: 'Upper Deck Spawn Point',
    type: 'spawn',
    layerId: 'ground'
  },
  {
    id: 'spawn3',
    x: 31.45,
    y: 12.64,
    title: 'Sun Deck Spawn',
    description: 'Sun Deck Spawn Point',
    type: 'spawn',
    layerId: 'first'
  },
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
    id: 'ground_up1',
    x: 25.71,
    y: 56.91,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'first_down4'
  },
  {
    id: 'ground_up2',
    x: 44.79,
    y: 66.5,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'first_up_down1'
  },
  {
    id: 'ground_up3',
    x: 30.5,
    y: 19.34,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'first_down1'
  },
  {
    id: 'ground_up4',
    x: 56.64,
    y: 36.37,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'first_down2'
  },
  {
    id: 'ground_up5',
    x: 67.23,
    y: 36.41,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'first_down3'
  },
  // ==================== FIRST FLOOR ====================
  {
    id: 'first_up1',
    x: 44.12,
    y: 39.58,
    layerId: 'first',
    type: 'stairs_up',
    title: 'To Second Floor',
    connectsTo: 'second_down1'
  },
  {
    id: 'first_up2',
    x: 53.11,
    y: 31.21,
    layerId: 'first',
    type: 'stairs_up',
    title: 'To Second Floor',
    connectsTo: 'second_down2'
  },
  {
    id: 'first_up_down1',
    x: 44.79,
    y: 66.5,
    layerId: 'first',
    type: 'stairs_up_down',
    title: 'To Fisrt Floor / To Fisrt Floor',
    connectsTo: [
      { targetId: 'second_down3', label: 'To Second Floor'},
      { targetId: 'ground_up2', label: 'To Ground Floor'}
    ]
  },
  {
    id: 'first_down1',
    x: 32.6,
    y: 19.34,
    layerId: 'first',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'ground_up3'
  },
  {
    id: 'first_down2',
    x: 56.6,
    y: 36.14,
    layerId: 'first',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'ground_up4'
  },
  {
    id: 'first_down3',
    x: 67.23,
    y: 37.41,
    layerId: 'first',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'ground_up5'
  },
  {
    id: 'first_down4',
    x: 25.71,
    y: 56.91,
    layerId: 'first',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'ground_up1'
  },
  // ==================== SECOND FLOOR ====================
  {
    id: 'second_down1',
    x: 43.66,
    y: 39.43,
    layerId: 'second',
    type: 'stairs_down',
    title: 'To First Floor',
    connectsTo: 'first_up1'
  },
  {
    id: 'second_down2',
    x: 51.43,
    y: 27.63,
    layerId: 'second',
    type: 'stairs_down',
    title: 'To First Floor',
    connectsTo: 'first_up2'
  },
  {
    id: 'second_down3',
    x: 42.9,
    y: 66,
    layerId: 'second',
    type: 'stairs_down',
    title: 'To First Floor',
    connectsTo: 'first_up_down1'
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
// OBJECTIVES - Organized by floor and type
// ============================================================================
const OBJECTIVE_MARKERS: GameMarker[] = [
  {
    id: 'hard_objective1',
    x: 41.22,
    y: 47.93,
    title: 'Possible livestream location',
    description: 'Terminate the UPF livestream, located somewhere on the rig',
    type: 'hard_objective',
    layerId: 'ground'
  },
  {
    id: 'hard_objective2',
    x: 40.19,
    y: 41.34,
    title: 'Possible livestream location',
    description: 'Terminate the UPF livestream, located somewhere on the rig',
    type: 'hard_objective',
    layerId: 'first'
  },
  //   { 
  //     id: 'hard_objective3', 
  //     x: 52.6, 
  //     y: 31.86, 
  //     title: 'Possible livestream location', 
  //     description: 'Terminate the UPF livestream, located somewhere on the rig', 
  //     type: 'hard_objective', 
  //     layerId: 'engineering' 
  //   },
  {
    id: 'soft_objective1',
    x: 44.6,
    y: 47.86,
    title: 'Rig Drill',
    description: 'Disable drill in control room on second floor.',
    type: 'soft_objective',
    layerId: 'second'
  }
];

// ============================================================================
// OBJECTIVES CONFIGURATION
// ============================================================================
const OBJECTIVES: MapObjective[] = [
  // Hard objectives
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
    title: 'Terminate the livestream',
    description: 'Terminate the UPF livestream, located somewhere on the rig',
    type: 'hard',
    markerIds: ['hard_objective1', 'hard_objective2'],
    floorName: 'Ground & First Floor'
  },
  // Soft objectives
  {
    id: 'obj2',
    title: 'Rig Drill',
    description: 'Disable drill in control room on second floor.',
    type: 'soft',
    markerIds: ['soft_objective1'],
    floorName: 'Second Floor'
  }
];

// ============================================================================
// FINAL MAP CONFIGURATION
// ============================================================================
export const MAP_HEAVYWELL_RIG: GameMapConfig = {
  id: 'heavywell_rig',
  name: 'Leviathan / HeavyWell A-101 Rig',
  description: 'Leviathan is a DLC mission in Ready or Not: Dark Waters. Members of the United Planet Front have attacked the HeavyWell A-101 Oil Rig off the coast of Los Suenos; multiple civilians have been killed and the attack in being currently livestreamed by the perpetrators. Thanks to a new amendment to federal law allowing municipal police greater jurisdiction over maritime territory, the LSPD SWAT team is deployed via helicopter and boat to bring an end to the crisis.',
  layers: LAYERS,
  markers: [
    ...SPAWNS,
    ...OBJECTIVE_MARKERS,
    ...buildStairwayMarkers()
  ],
  objectives: OBJECTIVES
};
