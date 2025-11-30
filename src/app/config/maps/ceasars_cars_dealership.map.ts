import { GameMapConfig } from '../../services/game-map';

export const MAP_CEASARS_CARS_DEALERSHIP: GameMapConfig = {
  id: 'ceasars_cars_dealership',
  name: 'Buy Cheap, Buy Twice / Ceasar\'s Cars Dealership',
  width: 1080,
  height: 1920,
  description: 'Buy Cheap, Buy Twice is the fifteenth playable mission in Ready or Not. It takes place on February 10, 2026 at a rather large car dealership beside an extremely run down street, in which both Los Locos and the Russian Mafia have made a base for themselves. The map consists of three main areas ; The interior of the two-floor dealership, the car lot outside, and the mechanic shop behind the dealership. Enemies can be found in any of these. A few civilians are also present.',
  layers: [
    { id: 'floor1', name: 'First Floor', imageUrl: './maps/15_ceasars_cars_dealership/ceasars_cars_dealership_floor1.png', visible: false, zIndex: 1 },
    { id: 'ground', name: 'Ground Floor', imageUrl: './maps/15_ceasars_cars_dealership/ceasars_cars_dealership_ground.png', visible: true, zIndex: 2, isDefault: true }
  ],
  markers: [
    { id: 'spawn1', x: 65.25, y: 86.19, title: 'Street', description: 'Street', type: 'spawn', layerId: 'ground' },
    { id: 'spawn2', x: 24.29, y: 80.36, title: 'Back alley', description: 'Back alley', type: 'spawn', layerId: 'ground' },
    { id: 'soft_objective1', x: 64.79, y: 15.45, title: 'Report Contraband in Storage', description: 'Locate narcotics and illegal firearms in the garages and storage room', type: 'soft_objective', layerId: 'ground' },
    { id: 'soft_objective2', x: 51.47, y: 22.7, title: 'Report Trafficking Records', description: 'Locate evidence concerning organised criminal behaviour including records of human trafficking', type: 'soft_objective', layerId: 'ground' },
    { id: 'hard_objective1', x: 42.35, y: 22.4, title: 'Locate Undercover Officer', description: 'Locate undercover Officer Brian, restrained and killed in the meeting room', type: 'hard_objective', layerId: 'floor1' },
    { id: 'stairs_down1', x: 20.29, y: 46, title: 'To First Floor', type: 'stairs_down', layerId: 'floor1', connections: ['stairs_up1'] },
    { id: 'stairs_down2', x: 74.29, y: 19.86, title: 'To First Floor', type: 'stairs_down', layerId: 'floor1', connections: ['stairs_up2'] },
    { id: 'stairs_up1', x: 43.4, y: 40.33, title: 'To First Floor', type: 'stairs_up', layerId: 'ground', connections: ['stairs_down1'] },
    { id: 'stairs_up2', x: 56.64, y: 34.43, title: 'To First Floor', type: 'stairs_up', layerId: 'ground', connections: ['stairs_down2'] }
  ],
  objectives: [
    { id: 'obj_order', title: 'Bring order to chaos.', description: 'Arrest or neutralize any contact at the scene', type: 'hard' },
    { id: 'obj_rescue', title: 'Rescue all civilians.', description: 'Detain any unarmed contacts at the scene', type: 'hard' },
    { id: 'obj1', title: 'Locate Undercover Officer', description: 'Locate undercover Officer Brian, restrained and killed in the meeting room', type: 'hard', markerIds: ['hard_objective1'], floorName: 'First Floor' },
    { id: 'obj2', title: 'Report Contraband in Storage', description: 'Locate narcotics and illegal firearms in the garages and storage room', type: 'soft', markerIds: ['soft_objective1'], floorName: 'Ground Floor' },
    { id: 'obj3', title: 'Report Trafficking Records', description: 'Locate evidence concerning organised criminal behaviour including records of human trafficking', type: 'soft', markerIds: ['soft_objective2'], floorName: 'Ground Floor' }
  ]
};
