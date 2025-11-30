import { GameMapConfig } from '../../services/game-map';

export const MAP_GREENSIDE_DORMITORIES: GameMapConfig = {
  id: 'greenside_dormitories',
  name: 'Dorms / Greenside dormitories',
  width: 3840,
  height: 2715,
  description: 'Dorms is a DLC mission in Ready or Not. Mass amounts of homeless people and drug addicts are seeking shelter in the abandoned Greenside Dormitories. Due to the structural instability and the location\'s history of attracting troublemakers, LSPD attempted to clear the building. However, the occupants resisted and an officer was shot in the leg; whether this was intentional or not is unknown. Other units are unavailable due to the current situation in the city, so SWAT is responsible for clearing the people out of the building.',
  layers: [
    { id: 'floor1', name: 'First Floor', imageUrl: './maps/19_greenside_dormitories/greenside_dormitories_floor1.png', visible: false, zIndex: 1 },
    { id: 'ground', name: 'Ground Floor', imageUrl: './maps/19_greenside_dormitories/greenside_dormitories_ground.png', visible: true, zIndex: 2, isDefault: true }
  ],
  markers: [
    { id: 'spawn1', x: 15.29, y: 46.68, title: 'North exit', description: 'North exit', type: 'spawn', layerId: 'ground' },
    { id: 'spawn2', x: 83.61, y: 74.31, title: 'South exit', description: 'South exit', type: 'spawn', layerId: 'ground' },
    { id: 'soft_objective1', x: 80.84, y: 51.95, title: 'Report Drug Paraphernalia', description: 'Report proof of drug use found in the building. (on lectern)', type: 'soft_objective', layerId: 'floor1' },
    { id: 'stairs_up1', x: 55.93, y: 32.45, title: 'To First Floor', type: 'stairs_up', layerId: 'ground', connections: ['stairs_down2'] },
    { id: 'stairs_up2', x: 19.37, y: 57.51, title: 'To First Floor', type: 'stairs_up', layerId: 'ground', connections: ['stairs_down1'] },
    { id: 'stairs_down1', x: 15.27, y: 62.74, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1', connections: ['stairs_up2'] },
    { id: 'stairs_down2', x: 53.55, y: 31.12, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1', connections: ['stairs_up1'] }
  ],
  objectives: [
    { id: 'obj_order', title: 'Bring order to chaos.', description: 'Arrest or neutralize any contact at the scene', type: 'hard' },
    { id: 'obj_rescue', title: 'Rescue all civilians.', description: 'Detain any unarmed contacts at the scene', type: 'hard' },
    { id: 'obj_arrest', title: 'Arrest 5 Suspects.', description: 'Apprehend and secure five suspects at the scene.', type: 'hard' },
    { id: 'obj1', title: 'Report Drug Paraphernalia', description: 'Report proof of drug use found in the building. (on lectern)', type: 'soft', markerIds: ['soft_objective1'], floorName: 'First Floor' }
  ]
};
