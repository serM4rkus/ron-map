import { GameMapConfig } from '../../services/game-map';

export const MAP_BRISA_COVE: GameMapConfig = {
  id: 'brisa_cove',
  name: 'Ides of march / Brisa Cove',
  width: 1080,
  height: 1920,
  description: 'Ides of March is the sixth playable mission in Ready or Not. A group of domestic terrorists have occupied the luxury Brisa Cove Apartments, taking several residents hostage. On October 1, 2025, D-Platoon have been dispatched to neutralize the threat and defuse the situation ahead of the Senator\'s upcoming presidential campaign.',
  layers: [
    { id: 'ground', name: 'Ground Floor', imageUrl: './maps/6_brisa_cove/brisa_cove_ground.png', visible: true, zIndex: 1, isDefault: true }
  ],
  markers: [
    { id: 'spawn1', x: 51.45, y: 70.77, title: 'Fire exit', description: 'Fire exit', type: 'spawn', layerId: 'ground' },
    { id: 'spawn2', x: 39.27, y: 28.08, title: 'Residential staircase', description: 'Residential staircase', type: 'spawn', layerId: 'ground' },
    { id: 'hard_objective1', x: 60.67, y: 72, title: 'Locate Sniper Rifle in Room 1204', description: 'Find the rifle on the southern side of the building, where a sniper killed multiple civilians from the hotel window', type: 'hard_objective', layerId: 'ground' },
    { id: 'hard_objective2', x: 41.39, y: 27.48, title: 'Locate Sniper Rifle in Room 1201', description: 'Find the rifle on the northern side of the building, where a sniper killed two officers and three civilians', type: 'hard_objective', layerId: 'ground' },
    { id: 'hard_objective3', x: 50.67, y: 36.14, title: 'Find the Music Producer', description: 'Locate Laurie, resident of apartment 1202. Usually in main room hiding in wardrobe or under bed or in his music studio.', type: 'hard_objective', layerId: 'ground' },
    { id: 'hard_objective4', x: 61.22, y: 52.28, title: 'Find the Retired Navy Officer', description: 'Locate the \'Sailor\', resident of apartment 1203', type: 'hard_objective', layerId: 'ground' }
  ],
  objectives: [
    { id: 'obj_order', title: 'Bring order to chaos.', description: 'Arrest or neutralize any contact at the scene', type: 'hard' },
    { id: 'obj_rescue', title: 'Rescue all civilians.', description: 'Detain any unarmed contacts at the scene', type: 'hard' },
    { id: 'obj_arrest', title: 'Arrest 3 Suspects.', description: 'Arrest 3 suspects at the scene.', type: 'hard' },
    { id: 'obj1', title: 'Locate Sniper Rifle in Room 1204', description: 'Find the rifle on the southern side of the building, where a sniper killed multiple civilians from the hotel window', type: 'hard', markerIds: ['hard_objective1'], floorName: 'Ground Floor' },
    { id: 'obj2', title: 'Locate Sniper Rifle in Room 1201', description: 'Find the rifle on the northern side of the building, where a sniper killed two officers and three civilians', type: 'hard', markerIds: ['hard_objective2'], floorName: 'Ground Floor' },
    { id: 'obj3', title: 'Find the Music Producer', description: 'Locate Laurie, resident of apartment 1202. Usually in main room hiding in wardrobe or under bed or in his music studio.', type: 'hard', markerIds: ['hard_objective3'], floorName: 'Ground Floor' },
    { id: 'obj4', title: 'Find the Retired Navy Officer', description: 'Locate the \'Sailor\', resident of apartment 1203', type: 'hard', markerIds: ['hard_objective4'], floorName: 'Ground Floor' }
  ]
};
