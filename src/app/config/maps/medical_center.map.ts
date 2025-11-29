import { GameMapConfig } from '../../services/game-map';

export const MAP_MEDICAL_CENTER: GameMapConfig = {
  id: 'medical_center',
  name: 'Relapse / Coastal grove medical center',
  width: 1080,
  height: 1920,
  description: 'Relapse is the penultimate and seventeenth mission in Ready or Not. The mission takes place on May 8, 2025, as the third mission chronologically about 3 weeks after Neon Tomb. A leader of The Hand who took part in the shooting at the Neon Nightclub is taken into medical care. The group storms the Coastal Grove Medical Center in an attempt to prevent the suspect from being taken into police custody. The LSPD\'s SWAT team is deployed to intercept the cell.',
  layers: [
    { id: 'floor2', name: 'Second Floor', imageUrl: './maps/17_medical_center/medical_center_floor2.png', visible: false, zIndex: 1 },
    { id: 'floor1', name: 'First Floor', imageUrl: './maps/17_medical_center/medical_center_floor1.png', visible: false, zIndex: 2 },
    { id: 'ground', name: 'Ground Floor', imageUrl: './maps/17_medical_center/medical_center_ground.png', visible: true, zIndex: 3, isDefault: true }
  ],
  markers: [
    { id: 'spawn1', x: 37.1, y: 92.17, title: 'Hospital main lobby', description: 'Hospital main lobby', type: 'spawn', layerId: 'ground' },
    { id: 'spawn2', x: 59.2, y: 10.97, title: 'Underground parking lot entrance', description: 'Underground parking lot entrance', type: 'spawn', layerId: 'ground' },
    { id: 'hard_objective1', x: 39.5, y: 30.62, title: 'Bomb Location', description: 'Defuse the Bomb Threats', type: 'hard_objective', layerId: 'floor2' },
    { id: 'hard_objective2', x: 52.44, y: 74.91, title: 'Bomb Location', description: 'Defuse the Bomb Threats', type: 'hard_objective', layerId: 'floor2' },
    { id: 'hard_objective3', x: 51.03, y: 57.49, title: 'Arrest Zahir Asadullah', description: 'Ususally located in MRI room with hostage.', type: 'hard_objective', layerId: 'floor1' },
    { id: 'stairs_up1', x: 45.34, y: 21.2, title: 'To Second Floor', type: 'stairs_up', layerId: 'ground', connections: ['stairs_down2'] },
    { id: 'stairs_up2', x: 54.92, y: 41.52, title: 'To Second Floor', type: 'stairs_up', layerId: 'ground', connections: ['stairs_up_down1'] },
    { id: 'stairs_up3', x: 62.18, y: 65.87, title: 'To First Floor', type: 'stairs_up', layerId: 'ground', connections: ['stairs_down4'] },
    { id: 'stairs_up4', x: 46.34, y: 46.97, title: 'To Second Floor', type: 'stairs_up', layerId: 'floor1', connections: ['stairs_down3'] },
    { id: 'stairs_up_down1', x: 56.05, y: 44.96, title: 'To Second Floor / To Ground Floor', type: 'stairs_up_down', layerId: 'floor1', connections: ['stairs_down1', 'stairs_up2'] },
    { id: 'stairs_down1', x: 52.14, y: 45.93, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2', connections: ['stairs_up_down1'] },
    { id: 'stairs_down2', x: 37.6, y: 16.42, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2', connections: ['stairs_up1'] },
    { id: 'stairs_down3', x: 49.45, y: 86.94, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2', connections: ['stairs_up4'] },
    { id: 'stairs_down4', x: 65.04, y: 75.88, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2', connections: ['stairs_up3'] }
  ],
  objectives: [
    { id: 'obj_order', title: 'Bring order to chaos.', description: 'Arrest or neutralize any contact at the scene', type: 'hard' },
    { id: 'obj_rescue', title: 'Rescue all civilians.', description: 'Detain any unarmed contacts at the scene', type: 'hard' },
    { id: 'obj1', title: 'Defuse the Bomb Threats', description: 'Defuse the Bomb Threats', type: 'hard', markerIds: ['hard_objective1', 'hard_objective2'], floorName: 'Second Floor' },
    { id: 'obj2', title: 'Arrest Zahir Asadullah', description: 'Usually located in MRI room with hostage.', type: 'hard', markerIds: ['hard_objective3'], floorName: 'First Floor' }
  ]
};
