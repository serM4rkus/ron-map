import { GameMapConfig } from '../../services/game-map';

export const MAP_213_PARK: GameMapConfig = {
  id: '213_park',
  name: 'Twisted Nerve / 213 Park Homes',
  width: 2160,
  height: 3840,
  description: 'Twisted Nerve is the third playable mission in Ready or Not. On September 29, 2025, D Platoon are sent to a neighborhood with the objective of shutting down residential homes involved with the production and distribution of methamphetamine.',
  layers: [
    { id: 'floor2', name: 'Second Floor', imageUrl: './maps/3_213_park/213_park_floor2.png', visible: false, zIndex: 1 },
    { id: 'floor1', name: 'First Floor', imageUrl: './maps/3_213_park/213_park_floor1.png', visible: false, zIndex: 2 },
    { id: 'ground', name: 'Ground Floor', imageUrl: './maps/3_213_park/213_park_ground.png', visible: true, zIndex: 3, isDefault: true },
    { id: 'underground', name: 'Underground', imageUrl: './maps/3_213_park/213_park_underground.png', visible: false, zIndex: 4 }
  ],
  markers: [
    { id: 'spawn1', x: 40.17, y: 64.15, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' },
    { id: 'hard_objective1', x: 61.68, y: 41.15, title: 'Crystal Meth Laboratories', description: 'Find and report the multiple meth laboratories, that accounts suggest can be found in the residence. Only 2 reqiered', type: 'hard_objective', layerId: 'ground' },
    { id: 'hard_objective2', x: 57.1, y: 32.26, title: 'Crystal Meth Laboratories', description: 'Find and report the multiple meth laboratories, that accounts suggest can be found in the residence. Only 2 reqiered', type: 'hard_objective', layerId: 'ground' },
    { id: 'hard_objective3', x: 57.48, y: 29.5, title: 'Crystal Meth Laboratories', description: 'Find and report the multiple meth laboratories, that accounts suggest can be found in the residence. Only 2 reqiered', type: 'hard_objective', layerId: 'ground' },
    { id: 'hard_objective4', x: 62.98, y: 42.04, title: 'Crystal Meth Laboratories', description: 'Find and report the multiple meth laboratories, that accounts suggest can be found in the residence. Only 2 reqiered', type: 'hard_objective', layerId: 'floor1' },
    { id: 'hard_objective5', x: 56.18, y: 45.63, title: 'Crystal Meth Laboratories', description: 'Find and report the multiple meth laboratories, that accounts suggest can be found in the residence. Only 2 reqiered', type: 'hard_objective', layerId: 'floor1' },
    { id: 'hard_objective6', x: 41.81, y: 58.78, title: 'Locate Crystal Meth Storage', description: 'Find and report the storage room, on the top floor of the residence. Accounts suggest these contain a large, packaged quantity of crystal meth', type: 'hard_objective', layerId: 'floor1' },
    { id: 'soft_objective1', x: 43.15, y: 52.43, title: 'Report Hidden Money Cache', description: 'Locate a hidden money stash, evidence of buying and selling illegal narcotics', type: 'soft_objective', layerId: 'floor1' },
    { id: 'soft_objective2', x: 40.13, y: 49.44, title: 'Find Incapacitated Minor', description: 'Locate and report the incapacitated minor in the residence', type: 'soft_objective', layerId: 'floor1' },
    { id: 'stairs_up1', x: 54.5, y: 38.31, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
    { id: 'stairs_up2', x: 51.13, y: 37.56, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
    { id: 'stairs_down1', x: 51.01, y: 18.66, title: 'To Undeground', type: 'stairs_down', layerId: 'ground' },
    { id: 'stairs_down2', x: 44.16, y: 16.57, title: 'to Udeground', type: 'stairs_down', layerId: 'ground' },
    { id: 'stairs_down3', x: 47.14, y: 52.58, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
    { id: 'stairs_down4', x: 52.44, y: 54.15, title: 'To First Floor', type: 'stairs_down', layerId: 'floor1' },
    { id: 'stairs_up3', x: 51.97, y: 48.54, title: 'To Second Floor', type: 'stairs_up', layerId: 'floor1' },
    { id: 'stairs_down5', x: 39.33, y: 61.32, title: 'To First floor', type: 'stairs_down', layerId: 'floor2' }
  ],
  objectives: [
    { id: 'obj_order', title: 'Bring order to chaos.', description: 'Arrest or neutralize any contact at the scene', type: 'hard' },
    { id: 'obj_rescue', title: 'Rescue all civilians.', description: 'Detain any unarmed contacts at the scene', type: 'hard' },
    { id: 'obj_arrest', title: 'Arrest 2 Suspects.', description: 'To assist with finding out who the buyers are, detectives need at least two suspects secured.', type: 'hard' },
    { id: 'obj1', title: 'Locate 2 Crystal Meth Laboratories', description: 'Find and report the multiple meth laboratories, that accounts suggest can be found in the residence. Only 2 required', type: 'hard', markerIds: ['hard_objective1', 'hard_objective2', 'hard_objective3', 'hard_objective4', 'hard_objective5'], floorName: 'Ground & First Floor' },
    { id: 'obj2', title: 'Locate Crystal Meth Storage', description: 'Find and report the storage room, on the top floor of the residence. Accounts suggest these contain a large, packaged quantity of crystal meth', type: 'hard', markerIds: ['hard_objective6'], floorName: 'First Floor' },
    { id: 'obj3', title: 'Report Hidden Money Cache', description: 'Locate a hidden money stash, evidence of buying and selling illegal narcotics', type: 'soft', markerIds: ['soft_objective1'], floorName: 'First Floor' },
    { id: 'obj4', title: 'Find Incapacitated Minor', description: 'Locate and report the incapacitated minor in the residence', type: 'soft', markerIds: ['soft_objective2'], floorName: 'First Floor' }
  ]
};
