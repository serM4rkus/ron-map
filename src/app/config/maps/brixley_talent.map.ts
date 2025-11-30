import { GameMapConfig } from '../../services/game-map';

export const MAP_BRIXLEY_TALENT: GameMapConfig = {
  id: 'brixley_talent',
  name: 'The Spider / Brixley talent time',
  width: 2160,
  height: 3840,
  description: 'The Spider is the fourth playable mission in Ready or Not. Hard drives seized during a raid on the apartment of Michael Williams contained child pornography which implicated Brixley\'s Talent Time in a child pornography ring. On December 21, 2025, D-Platoon have been dispatched to serve a high risk arrest warrant for George Brixley. Seemingly unaware of this development, Brixley continues to groom potential clients - But, forever unwilling to take any chances, has hired several low lives as armed security. Alerted by the arrival of the LSPD, Brixley and his men have barricaded themselves inside, holding several civilians hostage.',
  layers: [
    { id: 'roof', name: 'Roof', imageUrl: './maps/4_brixley_talent/brixley_talent_floor1.png', visible: false, zIndex: 1 },
    { id: 'ground', name: 'Ground Floor', imageUrl: './maps/4_brixley_talent/brixley_talent_ground.png', visible: true, zIndex: 2, isDefault: true }
  ],
  markers: [
    { id: 'spawn1', x: 44.41, y: 32.18, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' },
    { id: 'hard_objective1', x: 61.47, y: 57.21, title: 'Apprehend George Brixley', description: 'Apprehend and secure the owner of Brixley Talent Time. Usually located in his office, but maybe be in other areas of the building.', type: 'hard_objective', layerId: 'ground' },
    { id: 'stairs_up1', x: 51.26, y: 51.16, title: 'To Roof', type: 'stairs_up', layerId: 'ground', connections: ['stairs_down1'] },
    { id: 'stairs_up2', x: 55.17, y: 66.77, title: 'To Roof', type: 'stairs_up', layerId: 'ground', connections: ['stairs_down2'] },
    { id: 'stairs_down1', x: 47.18, y: 58.33, title: 'To Ground Floor', type: 'stairs_down', layerId: 'roof', connections: ['stairs_up1'] },
    { id: 'stairs_down2', x: 50.88, y: 83.35, title: 'To Grounf Floor', type: 'stairs_down', layerId: 'roof', connections: ['stairs_up2'] }
  ],
  objectives: [
    { id: 'obj_order', title: 'Bring order to chaos.', description: 'Arrest or neutralize any contact at the scene', type: 'hard' },
    { id: 'obj_rescue', title: 'Rescue all civilians.', description: 'Detain any unarmed contacts at the scene', type: 'hard' },
    { id: 'obj1', title: 'Apprehend George Brixley', description: 'Apprehend and secure the owner of Brixley Talent Time. Usually located in his office, but maybe be in other areas of the building.', type: 'hard', markerIds: ['hard_objective1'], floorName: 'Ground Floor' }
  ]
};
