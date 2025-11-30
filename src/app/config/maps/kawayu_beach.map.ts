import { GameMapConfig } from '../../services/game-map';

export const MAP_KAWAYU_BEACH: GameMapConfig = {
  id: 'kawayu_beach',
  name: 'Ends of the earth / Kawayu beach',
  width: 1080,
  height: 1920,
  description: 'Ends of the Earth is the eighth mission in Ready or Not. On December 3, 2025, the LSPD raid a home on the beachfront for distributing and illegally modifying weapons.',
  layers: [
    { id: 'floor2', name: 'Second Floor', imageUrl: './maps/8_kawayu_beach/kawayu_beach_floor2.png', visible: false, zIndex: 1 },
    { id: 'floor1', name: 'First Floor', imageUrl: './maps/8_kawayu_beach/kawayu_beach_floor1.png', visible: false, zIndex: 2 },
    { id: 'ground', name: 'Ground Floor', imageUrl: './maps/8_kawayu_beach/kawayu_beach_ground.png', visible: true, zIndex: 3, isDefault: true }
  ],
  markers: [
    { id: 'spawn1', x: 36.5, y: 14.48, title: 'Street', description: 'Street', type: 'spawn', layerId: 'ground' },
    { id: 'spawn2', x: 66.26, y: 95.18, title: 'Beach', description: 'Beach', type: 'spawn', layerId: 'ground' },
    { id: 'hard_objective1', x: 45.71, y: 23.67, title: 'Locate Weapon Manufactory', description: 'Find the weapon manufactory, the suspects were using to design and modify home built weaponry', type: 'hard_objective', layerId: 'floor2' },
    { id: 'soft_objective1', x: 49.33, y: 27.55, title: 'Report Bag of Money', description: 'Locate bag of cash as evidence of selling illegal firearms', type: 'soft_objective', layerId: 'floor1' },
    { id: 'stairs_up1', x: 51.97, y: 43.99, title: 'To First Floor', type: 'stairs_up', layerId: 'ground', connections: ['stairs_down1'] },
    { id: 'stairs_up2', x: 44.75, y: 37.41, title: 'To First Floor', type: 'stairs_up', layerId: 'ground', connections: ['stairs_down2'] },
    { id: 'stairs_up3', x: 55.13, y: 46.9, title: 'To Second Floor', type: 'stairs_up', layerId: 'floor1', connections: ['stairs_down3'] },
    { id: 'stairs_down1', x: 52.77, y: 47.72, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1', connections: ['stairs_up1'] },
    { id: 'stairs_down2', x: 39.66, y: 34.57, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1', connections: ['stairs_up2'] },
    { id: 'stairs_down3', x: 52.69, y: 46.68, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2', connections: ['stairs_up3'] }
  ],
  objectives: [
    { id: 'obj_order', title: 'Bring order to chaos.', description: 'Arrest or neutralize any contact at the scene', type: 'hard' },
    { id: 'obj_rescue', title: 'Rescue all civilians.', description: 'Detain any unarmed contacts at the scene', type: 'hard' },
    { id: 'obj1', title: 'Locate Weapon Manufactory', description: 'Find the weapon manufactory, the suspects were using to design and modify home built weaponry', type: 'hard', markerIds: ['hard_objective1'], floorName: 'Second Floor' },
    { id: 'obj2', title: 'Report Bag of Money', description: 'Locate bag of cash as evidence of selling illegal firearms', type: 'soft', markerIds: ['soft_objective1'], floorName: 'First Floor' }
  ]
};
