import { GameMapConfig } from '../services/game-map';

export const GAME_MAPS: GameMapConfig[] = [
  {
    id: '4U_gas',
    name: 'Thank You, Come Again',
    imageUrl: '/maps/4U_Gas_Station.png',
    width: 3840,
    height: 2160,
    description: 'Thank You, Come Again is the first mission in Ready or Not, chronologically and accessibly. On February 3, 2025, the Los Sueños Police Department responds to teenage meth addicts robbing a downtown 4U gas station. ',
    layers: [
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/4U_gas/4U_Gas_Station.png', visible: true, zIndex: 1, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 58.36, y: 81.82, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' },
      { id: 'm2', x: 59.07, y: 28.8, title: 'Veteran', description: 'Dead veteran', type: 'soft_objective', layerId: 'ground' },
      { id: 'm3', x: 48.05, y: 30.99, title: 'Girl', description: 'Hiden girl', type: 'hard_objective', layerId: 'ground' },
      { id: 'm4', x: 55.88, y: 41.67, title: 'Dead cachier', description: 'Dead cachier', type: 'hard_objective', layerId: 'ground' }
    ]
  },
  {
    id: '23_mb',
    name: '23 Megabytes a Second',
    imageUrl: '/maps/23_mb/23_mb_ground.png',
    width: 2160, 
    height: 3840,
    description: '23 Megabytes a Second is the second mission in Ready or Not. On December 8, 2025, the Los Sueños Police Department received a 911 call regarding a hostage situation at an apartment complex.',
    layers: [
      { id: 'floor2', name: 'Second Floor', imageUrl: '/maps/23_mb/23_mb_floor2.png', visible: false, zIndex: 1 },
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/23_mb/23_mb_floor1.png', visible: false, zIndex: 2 },
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/23_mb/23_mb_ground.png', visible: true, zIndex: 3, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 46.72, y: 76.78, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' },
      { id: 'm2', x: 61.3, y: 63.53, title: 'Maining farm', description: 'Maining farm', type: 'soft_objective', layerId: 'floor1' },
      { id: 'm3', x: 35.94, y: 61.45, title: 'Streamer PC', description: 'Streamer PC', type: 'soft_objective', layerId: 'floor2' },
      { id: 'm4', x: 41.5, y: 62.61, title: 'Mindjot documents', description: 'Mindjot documents', type: 'soft_objective', layerId: 'floor2' },
      { id: 'm5', x: 41.98, y: 39.58, title: 'Arest Michael', description: 'Michael is main target and he is usually located in his appartment on second floor. Check all rooms. He wears headset with kitty ears.', type: 'hard_objective', layerId: 'floor2' }
    ]
  },
  {
    id: 'brisa-cove',
    name: 'Brisa Cove',
    imageUrl: '/maps/Brisa_Cove.png',
    width: 2160,
    height: 3840,
    description: 'Ides of March is the sixth playable mission in Ready or Not. A group of domestic terrorists have occupied the luxury Brisa Cove Apartments, taking several residents hostage. On October 1, 2025, D-Platoon have been dispatched to neutralize the threat and defuse the situation ahead of the Senator\'s upcoming presidential campaign. ',
    layers: [
      { id: 'base', name: 'Ground Floor', imageUrl: '/maps/Brisa_Cove.png', visible: true, zIndex: 1, isDefault: true }
    ],
    markers: [
      // Coordinates are percentages (0-100) - work with ANY image size!
      { id: 'm1', x: 25, y: 25, title: 'Kingdom', description: 'Main kingdom', type: 'spawn', layerId: 'base' },
      { id: 'm2', x: 50, y: 37.5, title: 'Forest', description: 'Enchanted forest', type: 'hard_objective', layerId: 'base' }
    ]
  }
];
