import { GameMapConfig } from '../../services/game-map';

export const MAP_CHERRYESSA_FARM: GameMapConfig = {
  id: 'cherryessa_farm',
  name: 'Carriers of the vine / Cherryessa Farm',
  width: 1080,
  height: 1920,
  description: 'Carriers of the Vine is the sixteenth mission in Ready or Not. It has D Platoon being dispatched on June 1, 2025, to pacify a new age cult committing acts of vigilantism across Los Suenos.',
  layers: [
    { id: 'floor1', name: 'First Floor', imageUrl: './maps/16_cherryessa_farm/cherryessa_farm_floor1.png', visible: false, zIndex: 1 },
    { id: 'ground', name: 'Ground Floor', imageUrl: './maps/16_cherryessa_farm/cherryessa_farm_ground.png', visible: true, zIndex: 2, isDefault: true },
    { id: 'underground', name: 'Underground', imageUrl: './maps/16_cherryessa_farm/cherryessa_farm_underground.png', visible: false, zIndex: 3 }
  ],
  markers: [
    { id: 'spawn1', x: 60.67, y: 92.84, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' },
    { id: 'hard_objective1', x: 43.02, y: 37.26, title: 'Possible main target location', description: 'Arrest Elaine Raskin  and Arrest Eve Nader', type: 'hard_objective', layerId: 'ground' },
    { id: 'hard_objective2', x: 57.39, y: 36.96, title: 'Possible main target location', description: 'Arrest Elaine Raskin  and Arrest Eve Nader', type: 'hard_objective', layerId: 'ground' },
    { id: 'soft_objective1', x: 56.81, y: 66.02, title: 'Report Conspiracy Evidence', description: 'Locate evidence for conspiracy to commit murder, of still missing persons', type: 'soft_objective', layerId: 'ground' },
    { id: 'hard_objective3', x: 48.15, y: 8.58, title: 'Possible main target location', description: 'Arrest Elaine Raskin  and Arrest Eve Nader', type: 'hard_objective', layerId: 'ground' },
    { id: 'stairs_down1', x: 42.18, y: 49.59, title: 'To Undeground', type: 'stairs_down', layerId: 'ground', connections: ['stairs_up3'] },
    { id: 'stairs_up_down1', x: 44.7, y: 37.49, title: 'To First Floor / To Undeground', type: 'stairs_up_down', layerId: 'ground', connections: [{ targetId: 'stairs_down2', label: 'To Frst Floor' }, { targetId: 'stairs_up4', label: 'To Undeground' }] },
    { id: 'stairs_down2', x: 38.87, y: 33.23, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1', connections: ['stairs_up_down1'] },
    { id: 'stairs_down3', x: 47.31, y: 15.38, title: 'To Church Undeground', type: 'stairs_down', layerId: 'ground', connections: ['stairs_up2'] },
    { id: 'stairs_down4', x: 48.57, y: 4.1, title: 'To Church Undegraund', type: 'stairs_down', layerId: 'ground', connections: ['stairs_up1'] },
    { id: 'stairs_up1', x: 50.71, y: 26.13, title: 'To Church Ground Floor', type: 'stairs_up', layerId: 'underground', connections: ['stairs_down4'] },
    { id: 'stairs_up2', x: 49.71, y: 37.34, title: 'To Church Ground Floor', type: 'stairs_up', layerId: 'underground', connections:['stairs_down3'] },
    { id: 'stairs_up3', x: 44.58, y: 71.77, title: 'To Ground Floor', type: 'stairs_up', layerId: 'underground', connections: ['stairs_down1'] },
    { id: 'stairs_up4', x: 47.39, y: 59.75, title: 'To Ground Floor', type: 'stairs_up', layerId: 'underground', connections: ['stairs_up_down1'] }
  ],
  objectives: [
    { id: 'obj_order', title: 'Bring order to chaos.', description: 'Arrest or neutralize any contact at the scene', type: 'hard' },
    { id: 'obj_rescue', title: 'Rescue all civilians.', description: 'Detain any unarmed contacts at the scene', type: 'hard' },
    { id: 'obj1', title: 'Arrest Elaine Raskin and Eve Nader', description: 'Arrest Elaine Raskin and Arrest Eve Nader', type: 'hard', markerIds: ['hard_objective1', 'hard_objective2', 'hard_objective3'], floorName: 'Ground Floor' },
    { id: 'obj2', title: 'Report Conspiracy Evidence', description: 'Locate evidence for conspiracy to commit murder, of still missing persons', type: 'soft', markerIds: ['soft_objective1'], floorName: 'Ground Floor' }
  ]
};
