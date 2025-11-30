import { GameMapConfig } from '../../services/game-map';

export const MAP_155_PLAYA_VISTA_LANE: GameMapConfig = {
  id: '155_playa_vista_lane',
  name: 'Lawmaker / 155 Playa Vista Lane, Colina Beach',
  width: 3840,
  height: 2715,
  description: 'Lawmaker is a DLC level in Ready or Not. Members of the United Planet Front - an eco-terrorist group - have invaded the home of Sven Anderson-Lincoln - a wealthy lobbyist with connections to the oil industry. No civilians have been killed but many have been taken hostage. SWAT is deployed to rescue the hostages. ',
  layers: [
    { id: 'floor2', name: 'Second Floor', imageUrl: './maps/21_155_playa_vista_lane/155_playa_vista_lane_floor2.png', visible: false, zIndex: 1 },
    { id: 'floor1', name: 'First Floor', imageUrl: './maps/21_155_playa_vista_lane/155_playa_vista_lane_floor1.png', visible: false, zIndex: 2 },
    { id: 'ground', name: 'Ground Floor', imageUrl: './maps/21_155_playa_vista_lane/155_playa_vista_lane_ground.png', visible: true, zIndex: 3, isDefault: true }
  ],
  markers: [
    { id: 'spawn1', x: 40.34, y: 94.26, title: 'Main entrance', description: 'Main entrance', type: 'spawn', layerId: 'ground' },
    { id: 'spawn2', x: 43.87, y: 8.06, title: 'Back entrance', description: 'Back entrance', type: 'spawn', layerId: 'ground' },
    { id: 'spawn3', x: 80.92, y: 46.15, title: 'Side entrance', description: 'Side entrance', type: 'spawn', layerId: 'ground' },
    { id: 'hard_objective1', x: 40, y: 57.28, title: 'Possible Active Panic Room', description: 'Rescue the family, located inside the panic room', type: 'hard_objective', layerId: 'floor2' },
    { id: 'hard_objective2', x: 55.55, y: 61.99, title: 'Possible Active Panic Room', description: 'Rescue the family, located inside the panic room', type: 'hard_objective', layerId: 'floor1' },
    { id: 'hard_objective3', x: 29.83, y: 66.69, title: 'Rescue Sven Anderson-Lincoln', description: 'Rescue the owner of the house, Sven Anderson-Lincoln. Usually located in his office on the first floor.', type: 'hard_objective', layerId: 'floor1' },
    { id: 'stairs_up1', x: 20.71, y: 44.06, title: 'To First Floor', type: 'stairs_up', layerId: 'ground', connections: ['stairs_down3'] },
    { id: 'stairs_up2', x: 39.54, y: 56.61, title: 'To First Floor', type: 'stairs_up', layerId: 'ground', connections: ['stairs_down2'] },
    { id: 'stairs_up3', x: 62.14, y: 19.49, title: 'To First Floor', type: 'stairs_up', layerId: 'ground', connections: ['stairs_down1'] },
    { id: 'stairs_up4', x: 33.07, y: 63.33, title: 'To Second Floor', type: 'stairs_up', layerId: 'floor1', connections: ['stairs_down5']},
    { id: 'stairs_up5', x: 53.7, y: 66.54, title: 'To Second Floor', type: 'stairs_up', layerId: 'floor1', connections: ['stairs_down6'] },
    { id: 'stairs_up6', x: 61.39, y: 33.16, title: 'To Second Floor', type: 'stairs_up', layerId: 'floor1', connections: ['stairs_down7'] },
    { id: 'stairs_down1', x: 71.05, y: 22.17, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1', connections: ['stairs_up3'] },
    { id: 'stairs_down2', x: 46.81, y: 61.61, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1', connections: ['stairs_up2'] },
    { id: 'stairs_down3', x: 28.82, y: 50.19, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1', connections: ['stairs_up1'] },
    { id: 'stairs_up7', x: 64.16, y: 63.41, title: 'To First Floor', type: 'stairs_up', layerId: 'ground', connections: ['stairs_down4'] },
    { id: 'stairs_down4', x: 72.9, y: 66.69, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1', connections: ['stairs_up7'] },
    { id: 'stairs_down5', x: 32.86, y: 64.6, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2', connections: ['stairs_up4'] },
    { id: 'stairs_down6', x: 52.73, y: 65.42, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2', connections: ['stairs_up5'] },
    { id: 'stairs_down7', x: 61.39, y: 32.78, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2', connections: ['stairs_up6'] }
  ],
  objectives: [
    { id: 'obj_order', title: 'Bring order to chaos.', description: 'Arrest or neutralize any contact at the scene', type: 'hard' },
    { id: 'obj_rescue', title: 'Rescue all civilians.', description: 'Detain any unarmed contacts at the scene', type: 'hard' },
    { id: 'obj1', title: 'Rescue Family from Panic Room', description: 'Rescue the family, located inside the panic room', type: 'hard', markerIds: ['hard_objective1', 'hard_objective2'], floorName: 'First & Second Floor' },
    { id: 'obj2', title: 'Rescue Sven Anderson-Lincoln', description: 'Rescue the owner of the house, Sven Anderson-Lincoln. Usually located in his office on the first floor.', type: 'hard', markerIds: ['hard_objective3'], floorName: 'First Floor' }
  ]
};
