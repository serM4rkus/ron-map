import { GameMapConfig, GameMarker, MapLayer, MapObjective } from '../../services/game-map.service';


// ============================================================================
// LAYER DEFINITIONS
// ============================================================================
const LAYERS: MapLayer[] = [
  {
    id: '22d',
    name: '22d Floor',
    imageUrl: './maps/29_city_hall/city_hall_22d.png',
    zIndex: 3
  },
  {
    id: '21st',
    name: '21st Floor',
    imageUrl: './maps/29_city_hall/city_hall_21st.png',
    zIndex: 2
  },
  {
    id: '20th',
    name: '20th Floor',
    imageUrl: './maps/29_city_hall/city_hall_20th.png',
    zIndex: 3
  },
  {
    id: '19th',
    name: '19th Floor',
    imageUrl: './maps/29_city_hall/city_hall_19th.png',
    zIndex: 0,
    isDefault: true
  }
];

// ============================================================================
// SPAWN POINTS
// ============================================================================
const SPAWNS: GameMarker[] = [
  {
    id: 'spawn1',
    x: 49.75,
    y: 16.12,
    title: 'Main spawn point',
    description: 'Main spawn point',
    type: 'spawn',
    layerId: '19th'
  }
];

// ============================================================================
// ADDITIONAL MARKERS - Organized by floor
// ============================================================================
const ADDITIONAL_MARKERS: GameMarker[] = [
  // Conneact to CCTV cameras
  { 
    id: 'camera', 
    x: 54.79,
    y: 36.67,
    title: 'Connect to CCTV cameras',
    description: 'Hack to get access to CCTV cameras in the building and check them in on your helmet camera',
    type: 'camera',
    layerId: '19th'
  },
  // Key Card locations
  { 
    id: 'key_card1', 
    x: 56.18,
    y: 32.41,
    title: 'Key Card location',
    description: 'Key Card that helps to unlock magnetic doors with help of PC',
    type: 'key_card',
    layerId: '19th'
  },
  { 
    id: 'key_card2', 
    x: 55.59,
    y: 50.71,
    title: 'Possible Key Card location',
    description: 'Key Card that helps to unlock magnetic doors with help of PC',
    type: 'key_card',
    layerId: '20th'
  },
  { 
    id: 'key_card3', 
    x: 50.25,
    y: 89.18,
    title: 'Possible Key Card location',
    description: 'Key Card that helps to unlock magnetic doors with help of PC',
    type: 'key_card',
    layerId: '20th'
  },
  { 
    id: 'key_card4', 
    x: 39.16,
    y: 62.74,
    title: 'Possible Key Card location',
    description: 'Key Card that helps to unlock magnetic doors with help of PC',
    type: 'key_card',
    layerId: '20th'
  },
  { 
    id: 'key_card5', 
    x: 40.63,
    y: 24.19,
    title: 'Possible Key Card location',
    description: 'Key Card that helps to unlock magnetic doors with help of PC',
    type: 'key_card',
    layerId: '20th'
  },
  // PC to unlock magnetic doors
  { 
    id: 'pc1', 
    x: 65.63,
    y: 47.27,
    title: 'Possible PC to unlock magnetic doors',
    description: 'Possible to unlock only if you found at least one key card',
    type: 'pc',
    layerId: '20th'
  },
  { 
    id: 'pc2', 
    x: 43.02,
    y: 55.64,
    title: 'Possible PC to unlock magnetic doors',
    description: 'Possible to unlock only if you found at least one key card',
    type: 'pc',
    layerId: '20th'
  },
  { 
    id: 'pc3', 
    x: 45.29,
    y: 82.68,
    title: 'Possible PC to unlock magnetic doors',
    description: 'Possible to unlock only if you found at least one key card',
    type: 'pc',
    layerId: '20th'
  },
  { 
    id: 'pc4', 
    x: 33.82,
    y: 27.18,
    title: 'Possible PC to unlock magnetic doors',
    description: 'Possible to unlock only if you found at least one key card',
    type: 'pc',
    layerId: '20th'
  },
  // Light OFF
  { 
    id: 'light_off', 
    x: 44.87,
    y: 34.13,
    title: 'Switch that turn off light in the building',
    description: 'Open all magnetic doors even if you didn`t use keycard on PC and turn off CCTV cameras',
    type: 'light_off',
    layerId: '20th'
  },
  // Private room
  { 
    id: 'private', 
    x: 59.79,
    y: 23,
    title: 'Hidden room',
    description: 'Open`s only from major office when interacting with bookshelf',
    type: 'private',
    layerId: '21st'
  },
  // Magnetic doors
  {
    id: 'magnetic_doors1', 
    x: 34.79,
    y: 61.54,
    title: 'Magnetic doors',
    description: 'Opens only if you activtaed PC, OR you turned off lighd OR with C2',
    type: 'magnetic_doors',
    layerId: '21st'
  },
  {
    id: 'magnetic_doors2', 
    x: 41.13,
    y: 41.07,
    title: 'Magnetic doors',
    description: 'Opens only if you activtaed PC, OR you turned off lighd OR with C2',
    type: 'magnetic_doors',
    layerId: '21st'
  },
  {
    id: 'magnetic_doors3', 
    x: 36.55,
    y: 55.19,
    title: 'Magnetic doors',
    description: 'Opens only if you activtaed PC, OR you turned off lighd OR with C2',
    type: 'magnetic_doors',
    layerId: '22d'
  },
  {
    id: 'magnetic_doors4', 
    x: 63.93,
    y: 55.19,
    title: 'Magnetic doors',
    description: 'Opens only if you activtaed PC, OR you turned off lighd OR with C2',
    type: 'magnetic_doors',
    layerId: '22d'
  },
]

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
   // ==================== 19th FLOOR ====================
  {
    id: '19th_up1',
    x: 65.55,
    y: 20.68,
    layerId: '19th',
    type: 'stairs_up',
    title: 'To 21st Floor',
    connectsTo: '20th_down1'
  },
  // ==================== 20th FLOOR ====================
  {
    id: '20th_down1',
    x: 65.55,
    y: 20.68,
    layerId: '20th',
    type: 'stairs_down',
    title: 'To 19th Floor',
    connectsTo: '19th_up1'
  },
  {
    id: '20th_up1',
    x: 34.75,
    y: 83.58,
    layerId: '20th',
    type: 'stairs_up',
    title: 'To 21st Floor',
    connectsTo: '21st_down1'
  },
  {
    id: '20th_up2',
    x: 65.23,
    y: 83.58,
    layerId: '20th',
    type: 'stairs_up',
    title: 'To 21st Floor',
    connectsTo: '20th_down2'
  },
  // ==================== 21st FLOOR ====================
  {
    id: '21st_down1',
    x: 34.75,
    y: 83.58,
    layerId: '21st',
    type: 'stairs_down',
    title: 'To 20th Floor',
    connectsTo: '20th_up1'
  },
  {
    id: '20th_down2',
    x: 65.23,
    y: 83.58,
    layerId: '21st',
    type: 'stairs_down',
    title: 'To 20th Floor',
    connectsTo: '20th_up2'
  },
  {
    id: '21st_up1',
    x: 47.57,
    y: 29.12,
    layerId: '21st',
    type: 'stairs_up',
    title: 'To 22d Floor',
    connectsTo: '22d_down1'
  },
  {
    id: '21st_up2',
    x: 52.18,
    y: 29.12,
    layerId: '21st',
    type: 'stairs_up',
    title: 'To 22d Floor',
    connectsTo: '22d_down2'
  },
  // ==================== 22d FLOOR ====================
  {
    id: '22d_down1',
    x: 45.76,
    y: 24.04,
    layerId: '22d',
    type: 'stairs_down',
    title: 'To 21st Floor',
    connectsTo: '21st_up1'
  },
  {
    id: '22d_down2',
    x: 54.79,
    y: 24.04,
    layerId: '22d',
    type: 'stairs_down',
    title: 'To 21st Floor',
    connectsTo: '21st_up2'
  },
]

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
    x: 50,
    y: 77,
    title: 'Apprehend VIP Suspect.',
    description: 'Apprehend VIP Suspect.',
    type: 'hard_objective',
    layerId: '22d'
  },
  {
    id: 'soft_objective1',
    x: 37.02,
    y: 22.03,
    title: 'Possible jammer location',
    description: 'Possible signal jammer location',
    type: 'soft_objective',
    layerId: '21st'
  },
  {
    id: 'soft_objective2',
    x: 41.97,
    y: 55.71,
    title: 'Possible jammer location',
    description: 'Possible signal jammer location',
    type: 'soft_objective',
    layerId: '21st'
  },
  {
    id: 'soft_objective3',
    x: 58.45,
    y: 52.5,
    title: 'Possible jammer location',
    description: 'Possible signal jammer location',
    type: 'soft_objective',
    layerId: '21st'
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
    title: 'Apprehend VIP Suspect.',
    description: 'Apprehend VIP Suspect',
    type: 'hard',
    markerIds: ['hard_objective1']
  },
  {
    id: 'obj2',
    title: 'Activate & intercept the detonator`s safe signal',
    description: 'This objective become available only if you find signal jamer',
    type: 'soft',
    floorName: '21st Floor',
    markerIds: ['soft_objective1','soft_objective2','soft_objective3']
  },
  {
    id: 'obj3',
    title: 'Disarm VIP Suspects & disable detonator',
    description: 'This objective become available only if you find signal jammer and activate it.',
    type: 'soft',
    floorName: '22d Floor',
    markerIds: ['hard_objective1']
  }
];

// ============================================================================
// FINAL MAP CONFIGURATION
// ============================================================================
export const MAP_CITY_HALL: GameMapConfig = {
  markers: [
    ...SPAWNS,
    ...ADDITIONAL_MARKERS,
    ...OBJECTIVE_MARKERS,
    ...buildStairwayMarkers()
  ],
  layers: LAYERS,
  objectives: OBJECTIVES
};
