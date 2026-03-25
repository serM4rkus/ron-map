import { GameMapConfig, GameMarker, MapLayer, MapObjective } from '../../services/game-map.service';


// ============================================================================
// LAYER DEFINITIONS
// ============================================================================
const LAYERS: MapLayer[] = [
  {
    id: 'first',
    name: 'First Floor',
    imageUrl: './maps/28_bank/bank_first.png',
    zIndex: 3
  },
  {
    id: 'ground',
    name: 'Ground Floor',
    imageUrl: './maps/28_bank/bank_ground.png',
    zIndex: 2,
    isDefault: true
  },
  {
    id: 'vault',
    name: 'Vault',
    imageUrl: './maps/28_bank/bank_vault.png',
    zIndex: 1
  }
];

// ============================================================================
// SPAWN POINTS
// ============================================================================
const SPAWNS: GameMarker[] = [
  {
    id: 'spawn1',
    x: 30.21,
    y: 95.45,
    title: 'Main Street',
    description: 'Main Street',
    type: 'spawn',
    layerId: 'ground'
  },
  {
    id: 'spawn2',
    x: 81.26,
    y: 30.09,
    title: 'Parking',
    description: 'Parking',
    type: 'spawn',
    layerId: 'ground'
  }
];

// ============================================================================
// SPECIAL MARKERS - Organized by floor
// ============================================================================
const SPECIAL_MARKERS: GameMarker[] = [
  // Additional entrance
  { 
    id: 'entrance', 
    x: 28.4,
    y: 40.4,
    title: 'Entrance',
    description: 'Broken window trough which riotes briched to the bank',
    type: 'entrance',
    layerId: 'ground'
  },
  // Vault key card
  { 
    id: 'vault_key_card1', 
    x: 65.67,
    y: 35.99,
    title: 'Vault Key Card',
    description: 'Vault Key Card',
    type: 'key_card',
    layerId: 'ground'
  },
  { 
    id: 'vault_key_card2', 
    x: 55.78,
    y: 36.67,
    title: 'Vault Key Card',
    description: 'Vault Key Card',
    type: 'key_card',
    layerId: 'ground'
  },
  { 
    id: 'vault_key_card3', 
    x: 56.72,
    y: 28.82,
    title: 'Vault Key Card',
    description: 'Vault Key Card',
    type: 'key_card',
    layerId: 'ground'
  },
  // Admin password
  { 
    id: 'admin_password1', 
    x: 65.63,
    y: 50.78,
    title: 'Possible admin PC password',
    description: 'Admin PC password, reqiered to unloc PC to get Vault PIN',
    type: 'password',
    layerId: 'ground'
  },
  {
    id: 'admin_password2', 
    x: 67.81,
    y: 38.38,
    title: 'Possible admin PC password',
    description: 'Admin PC password, reqiered to unloc PC to get Vault PIN',
    type: 'password',
    layerId: 'first'
  },
  { 
    id: 'admin_password3', 
    x: 62.76,
    y: 18.39,
    title: 'Possible admin PC password',
    description: 'Admin PC password, reqiered to unloc PC to get Vault PIN',
    type: 'password',
    layerId: 'first'
  },
  // PC with vault PIN
  { 
    id: 'pc1', 
    x: 58.91,
    y: 21.2,
    title: 'Possible PC with vault PIN',
    description: 'Possible to unlock only if you found admin password',
    type: 'pc',
    layerId: 'ground'
  },
  { 
    id: 'pc2', 
    x: 31.68,
    y: 64.98,
    title: 'Possible PC with vault PIN',
    description: 'Possible to unlock only if you found admin password',
    type: 'pc',
    layerId: 'ground'
  },
  { 
    id: 'pc3', 
    x: 48.78,
    y: 79.92,
    title: 'Possible PC with vault PIN',
    description: 'Possible to unlock only if you found admin password',
    type: 'pc',
    layerId: 'ground'
  },
  { 
    id: 'pc4', 
    x: 54.41,
    y: 79.99,
    title: 'Possible PC with vault PIN',
    description: 'Possible to unlock only if you found admin password',
    type: 'pc',
    layerId: 'ground'
  },
  { 
    id: 'pc1', 
    x: 61.97,
    y: 14.63,
    title: 'Possible PC with vault PIN',
    description: 'Possible to unlock only if you found admin password',
    type: 'pc',
    layerId: 'first'
  },
]

// ============================================================================
// ACHIVEMENTS MARKERS - Organized by floor
// ============================================================================
const ACHIVEMENTS_MARKERS: GameMarker[] = [
  { 
    id: 'steam_achivement', 
    x: 48.28,
    y: 73.49,
    title: 'Ringing phone',
    description: 'Answer on a call to get "All secrets safe" achivement. Reqire Valt KeyCard and Valt pin to opne door.',
    type: 'phone',
    layerId: 'vault'
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
   // ==================== GROUND FLOOR ====================
  {
    id: 'ground_up1',
    x: 70.29,
    y: 33.38,
    layerId: 'ground',
    type: 'stairs_up',
    title: 'To First Floor',
    connectsTo: 'first_down1'
  },
  {
    id: 'ground_down1',
    x: 56.22,
    y: 17.54,
    layerId: 'ground',
    type: 'stairs_down',
    title: 'To Vault',
    connectsTo: 'vault_up1'
  },
  // ==================== FIRST FLOOR ====================
  {
    id: 'first_down1',
    x: 70.29,
    y: 33.38,
    layerId: 'first',
    type: 'stairs_down',
    title: 'To Ground Floor',
    connectsTo: 'ground_up1'
  },
  // ==================== VAULT ====================
  {
    id: 'vault_up1',
    x: 56.22,
    y: 17.54,
    layerId: 'vault',
    type: 'stairs_up',
    title: 'To Ground Floor',
    connectsTo: 'ground_down1'
  }
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
    id: 'soft_objective1',
    x: 32.35,
    y: 22.1,
    title: 'Report suspicious Laptop.',
    description: 'Report suspicious Laptop.',
    type: 'soft_objective',
    layerId: 'first'
  },
  {
    id: 'soft_objective2',
    x: 60.81,
    y: 25.86,
    title: 'Possible bomb location.',
    description: 'Possible part of the bomb location',
    type: 'soft_objective',
    layerId: 'first'
  },
  {
    id: 'soft_objective3',
    x: 60.81,
    y: 36.09,
    title: 'Possible bomb location.',
    description: 'Possible part of the bomb location',
    type: 'soft_objective',
    layerId: 'first'
  },
  {
    id: 'soft_objective4',
    x: 53.33,
    y: 21.16,
    title: 'Possible bomb location.',
    description: 'Possible part of the bomb location',
    type: 'soft_objective',
    layerId: 'ground'
  },
  {
    id: 'soft_objective5',
    x: 60.76,
    y: 27.5,
    title: 'Possible bomb location.',
    description: 'Possible part of the bomb location',
    type: 'soft_objective',
    layerId: 'ground'
  },
  {
    id: 'soft_objective6',
    x: 60.76,
    y: 37.89,
    title: 'Possible bomb location.',
    description: 'Possible part of the bomb location',
    type: 'soft_objective',
    layerId: 'ground'
  },
  {
    id: 'soft_objective7',
    x: 53.37,
    y: 22.57,
    title: 'Possible bomb location.',
    description: 'Possible part of the bomb location',
    type: 'soft_objective',
    layerId: 'vault'
  },
  {
    id: 'soft_objective8',
    x: 66.73,
    y: 25.56,
    title: 'Main bomb.',
    description: 'Main bomb location',
    type: 'soft_objective',
    layerId: 'vault'
  },
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
    title: 'Report suspicious Laptop.',
    description: 'Report suspicious Laptop.',
    markerIds: ['soft_objective1'],
    floorName: 'First Floor',
    type: 'soft'
  },
  {
    id: 'obj2',
    title: 'Report Bombs',
    description: 'Report all bombs',
    markerIds: ['soft_objective2', 'soft_objective3', 'soft_objective4', 'soft_objective5', 'soft_objective6', 'soft_objective7', 'soft_objective8'],
    floorName: 'All Floors',
    type: 'soft'
  },
];

// ============================================================================
// FINAL MAP CONFIGURATION
// ============================================================================
export const MAP_BANK: GameMapConfig = {
  markers: [
    ...SPAWNS,
    ...ACHIVEMENTS_MARKERS,
    ...SPECIAL_MARKERS,
    ...OBJECTIVE_MARKERS,
    ...buildStairwayMarkers()
  ],
  layers: LAYERS,
  objectives: OBJECTIVES
};
