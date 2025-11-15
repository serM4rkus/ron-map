import { GameMapConfig } from '../services/game-map';

export const GAME_MAPS: GameMapConfig[] = [
  {
    id: 'ancient-world',
    name: '4U Gas Station',
    imageUrl: '/maps/4U_Gas_Station.png',
    width: 1200,
    height: 800,
    description: 'Thank You, Come Again is the first mission in Ready or Not, chronologically and accessibly. On February 3, 2025, the Los Sueños Police Department responds to teenage meth addicts robbing a downtown 4U gas station. ',
    layers: [
      { id: 'base', name: 'Base Map', imageUrl: '/maps/4U_Gas_Station.png', visible: true, zIndex: 1 },
      { id: 'floor1', name: 'Floor 1', imageUrl: '/maps/4U_Gas_Station_Floor1.png', visible: false, zIndex: 2 },
      { id: 'floor2', name: 'Floor 2', imageUrl: '/maps/4U_Gas_Station_Floor2.png', visible: false, zIndex: 3 }
    ],
    markers: [
      // Coordinates are now percentages (0-100) of map dimensions for consistent positioning across screen sizes
      { id: 'm1', x: 58.4, y: 79.97, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', color: '#FF6B6B', layerId: 'base' },
      { id: 'm2', x: 29.17, y: 62.5, title: 'Gold Deposit', description: 'Gold resource', type: 'resource', color: '#FFD700', layerId: 'floor1' },
      { id: 'm3', x: 58.33, y: 75, title: 'Colossus', description: 'Wonder of the world', type: 'wonder', color: '#95E1D3', layerId: 'base' }
    ]
  },
  {
    id: 'medieval-realm',
    name: 'Medieval Realm',
    imageUrl: '/maps/medieval-realm.svg',
    width: 1200,
    height: 800,
    description: 'Medieval fantasy-inspired map',
    layers: [
      { id: 'base', name: 'Base Map', imageUrl: '/maps/medieval-realm.svg', visible: true, zIndex: 1 }
    ],
    markers: [
      // Coordinates are now percentages (0-100) of map dimensions for consistent positioning across screen sizes
      { id: 'm1', x: 25, y: 25, title: 'Kingdom', description: 'Main kingdom', type: 'spawn', layerId: 'base' },
      { id: 'm2', x: 50, y: 37.5, title: 'Forest', description: 'Enchanted forest', type: 'resource', layerId: 'base' },
      { id: 'm3', x: 75, y: 62.5, title: 'Dragon Lair', description: 'Ancient dragon lair', type: 'unit', layerId: 'base' }
    ]
  },
  {
    id: 'brisa-cove',
    name: 'Brisa Cove',
    imageUrl: '/maps/Brisa_Cove.png',
    width: 1200,
    height: 800,
    description: 'Ides of March is the sixth playable mission in Ready or Not. A group of domestic terrorists have occupied the luxury Brisa Cove Apartments, taking several residents hostage. On October 1, 2025, D-Platoon have been dispatched to neutralize the threat and defuse the situation ahead of the Senator\'s upcoming presidential campaign. ',
    layers: [
      { id: 'base', name: 'Ground Floor', imageUrl: '/maps/Brisa_Cove.png', visible: true, zIndex: 1 }
    ],
    markers: [
      // Coordinates are now percentages (0-100) of map dimensions for consistent positioning across screen sizes
      { id: 'm1', x: 25, y: 25, title: 'Kingdom', description: 'Main kingdom', type: 'spawn', layerId: 'base' },
      { id: 'm2', x: 50, y: 37.5, title: 'Forest', description: 'Enchanted forest', type: 'resource', layerId: 'base' },
      { id: 'm3', x: 75, y: 62.5, title: 'Dragon Lair', description: 'Ancient dragon lair', type: 'unit', layerId: 'base' }
    ]
  }
];
