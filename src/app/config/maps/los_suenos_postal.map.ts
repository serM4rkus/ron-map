import { GameMapConfig } from '../../services/game-map';

export const MAP_LOS_SUENOS_POSTAL: GameMapConfig = {
  id: 'los_suenos_postal',
  name: 'Greased palms / Los Suenos Postal Service',
  width: 1080,
  height: 1920,
  description: 'Greased Palms is the ninth mission in Ready Or Not. On October 25, 2025, the Los Suenos Police Department responds to a shoot out at the Los Suenos Postal Service, and is ordered to arrest a weapons smuggler suspect.',
  layers: [
    { id: 'floor1', name: 'First Floor', imageUrl: './maps/9_los_suenos_postal/los_suenos_postal_floor1.png', visible: false, zIndex: 1 },
    { id: 'ground', name: 'Ground Floor', imageUrl: './maps/9_los_suenos_postal/los_suenos_postal_ground.png', visible: true, zIndex: 2, isDefault: true }
  ],
  markers: [
    { id: 'spawn1', x: 43.71, y: 67.41, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' },
    { id: 'hard_objective1', x: 46.38, y: 44.36, title: 'Arrest FISA Agent Adams', description: 'Apprehend and secure the prime suspect, FISA agent, Jack Adams. Usually located in the his office on the ground floor. Sometimes you can find him on backyard', type: 'hard_objective', layerId: 'ground' },
    { id: 'hard_objective2', x: 53.2, y: 60.9, title: 'Arrest Maria Lopez', description: 'Apprehend and secure postal worker, Maria Lopez. Presumed to be working with our prime suspect. Usually located in the mail sorting area on the ground floor.', type: 'hard_objective', layerId: 'ground' },
    { id: 'hard_objective3', x: 52.96, y: 49.38, title: 'Find Eugene Gomez', description: 'Locate the civilian, Eugene Gomez, who is believed to have information that may help the investigation', type: 'hard_objective', layerId: 'ground' },
    { id: 'hard_objective4', x: 44.76, y: 43.54, title: 'Locate the FISA Office', description: 'Find the FISA Office within the Postal facility', type: 'hard_objective', layerId: 'ground' },
    { id: 'soft_objective1', x: 45.98, y: 47.6, title: 'Report Suspected Shooter', description: 'Locate the incapacitated suspect, responsible for shooting an LSPD officer outside the Postal office', type: 'soft_objective', layerId: 'ground' },
    { id: 'soft_objective2', x: 52.04, y: 33.26, title: 'Report Weapons Cache', description: 'Locate a cache of illegal firearms in the Postal facility loading bay', type: 'soft_objective', layerId: 'ground' },
    { id: 'stairs_up1', x: 44.1, y: 54.77, title: 'To First Floor', type: 'stairs_up', layerId: 'ground', connections: ['stairs_down1'] },
    { id: 'stairs_up2', x: 47.71, y: 43.14, title: 'To First Floor', type: 'stairs_up', layerId: 'ground', connections: ['stairs_down2'] },
    { id: 'stairs_down1', x: 40.59, y: 74.54, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1', connections: ['stairs_up1'] },
    { id: 'stairs_down2', x: 62.77, y: 12.61, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1', connections: ['stairs_up2'] }
  ],
  objectives: [
    { id: 'obj_order', title: 'Bring order to chaos.', description: 'Arrest or neutralize any contact at the scene', type: 'hard' },
    { id: 'obj_rescue', title: 'Rescue all civilians.', description: 'Detain any unarmed contacts at the scene', type: 'hard' },
    { id: 'obj1', title: 'Arrest FISA Agent Adams', description: 'Apprehend and secure the prime suspect, FISA agent, Jack Adams. Usually located in the his office on the ground floor. Sometimes you can find him on backyard', type: 'hard', markerIds: ['hard_objective1'], floorName: 'Ground Floor' },
    { id: 'obj2', title: 'Arrest Maria Lopez', description: 'Apprehend and secure postal worker, Maria Lopez. Presumed to be working with our prime suspect. Usually located in the mail sorting area on the ground floor.', type: 'hard', markerIds: ['hard_objective2'], floorName: 'Ground Floor' },
    { id: 'obj3', title: 'Find Eugene Gomez', description: 'Locate the civilian, Eugene Gomez, who is believed to have information that may help the investigation', type: 'hard', markerIds: ['hard_objective3'], floorName: 'Ground Floor' },
    { id: 'obj4', title: 'Locate the FISA Office', description: 'Find the FISA Office within the Postal facility', type: 'hard', markerIds: ['hard_objective4'], floorName: 'Ground Floor' },
    { id: 'obj5', title: 'Report Suspected Shooter', description: 'Locate the incapacitated suspect, responsible for shooting an LSPD officer outside the Postal office', type: 'soft', markerIds: ['soft_objective1'], floorName: 'Ground Floor' },
    { id: 'obj6', title: 'Report Weapons Cache', description: 'Locate a cache of illegal firearms in the Postal facility loading bay', type: 'soft', markerIds: ['soft_objective2'], floorName: 'Ground Floor' }
  ]
};
