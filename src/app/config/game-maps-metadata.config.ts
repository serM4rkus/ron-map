import { GameMapConfig } from '../services/game-map';

export interface GameMapMetadata {
  id: string;
  route: string;
  name: string;
  metaDescription: string;
  width: number;
  height: number;
  order: number;
  category: 'base' | 'dlc';
  loader: () => Promise<GameMapConfig>;
}

export const GAME_MAPS_METADATA: GameMapMetadata[] = [
  {
    id: '4U_gas',
    route: 'Thank_You_Come_Again',
    name: 'Thank You, Come Again / 4U Gas Station',
    metaDescription: 'Interactive map for Thank You, Come Again mission at 4U Gas Station in Ready or Not. Plan your tactical approach with detailed floor plans and objective locations.',
    width: 3840,
    height: 2160,
    order: 1,
    category: 'base',
    loader: () => import('./maps/4U_gas.map').then(m => m.MAP_4U_GAS)
  },
  {
    id: '23_mb',
    route: '23_Megabytes_a_Second',
    name: '23 Megabytes a Second / San Uriel Condominiums',
    metaDescription: 'Interactive map for 23 Megabytes a Second mission at San Uriel Condominiums. Explore detailed blueprints and plan your team strategy.',
    width: 2160,
    height: 3840,
    order: 2,
    category: 'base',
    loader: () => import('./maps/23_mb.map').then(m => m.MAP_23_MB)
  },
  {
    id: '213_park',
    route: 'Twisted_Nerve',
    name: 'Twisted Nerve / 213 Park Homes',
    metaDescription: 'Interactive map for Twisted Nerve mission at 213 Park Homes. View floor plans, objectives, and soft objectives for tactical planning.',
    width: 2160,
    height: 3840,
    order: 3,
    category: 'base',
    loader: () => import('./maps/213_park.map').then(m => m.MAP_213_PARK)
  },
  {
    id: 'brixley_talent',
    route: 'The_Spider',
    name: 'The Spider / Brixley talent time',
    metaDescription: 'Interactive map for The Spider mission at Brixley talent time. Detailed blueprints with marked objectives and entry points.',
    width: 2160,
    height: 3840,
    order: 4,
    category: 'base',
    loader: () => import('./maps/brixley_talent.map').then(m => m.MAP_BRIXLEY_TALENT)
  },
  {
    id: 'sullivans_slope',
    route: 'A_lethal_obsession',
    name: 'A lethal obsession / Sullivan\'s Slope',
    metaDescription: 'Interactive map for A lethal obsession mission at Sullivan\'s Slope. Find all comms locations and plan your tactical approach.',
    width: 1080,
    height: 1920,
    order: 5,
    category: 'base',
    loader: () => import('./maps/sullivans_slope.map').then(m => m.MAP_SULLIVANS_SLOPE)
  },
  {
    id: 'brisa_cove',
    route: 'Ides_of_march',
    name: 'Ides of march / Brisa Cove',
    metaDescription: 'Interactive map for Ides of march mission at Brisa Cove. Detailed floor plans to help you plan your mission strategy.',
    width: 1080,
    height: 1920,
    order: 6,
    category: 'base',
    loader: () => import('./maps/brisa_cove.map').then(m => m.MAP_BRISA_COVE)
  },
  {
    id: 'mindjot',
    route: 'Sinuous_trail',
    name: 'Sinuous trail / Mindjot data center',
    metaDescription: 'Interactive map for Sinuous trail mission at Mindjot data center. View blueprints with objectives and tactical entry points.',
    width: 1080,
    height: 1920,
    order: 7,
    category: 'base',
    loader: () => import('./maps/mindjot.map').then(m => m.MAP_MINDJOT)
  },
  {
    id: 'kawayu_beach',
    route: 'Ends_of_the_earth',
    name: 'Ends of the earth / Kawayu beach',
    metaDescription: 'Interactive map for Ends of the earth mission at Kawayu beach. Plan your operations with detailed floor plans and objective markers.',
    width: 1080,
    height: 1920,
    order: 8,
    category: 'base',
    loader: () => import('./maps/kawayu_beach.map').then(m => m.MAP_KAWAYU_BEACH)
  },
  {
    id: 'los_suenos_postal',
    route: 'Greased_palms',
    name: 'Greased palms / Los Suenos Postal Service',
    metaDescription: 'Interactive map for Greased palms mission at Los Suenos Postal Service. Explore detailed blueprints with marked objectives.',
    width: 1080,
    height: 1920,
    order: 9,
    category: 'base',
    loader: () => import('./maps/los_suenos_postal.map').then(m => m.MAP_LOS_SUENOS_POSTAL)
  },
  {
    id: 'voll_health_house',
    route: 'Valley_of_the_Dolls',
    name: 'Valley of the Dolls / Voll Health house',
    metaDescription: 'Interactive map for Valley of the Dolls mission at Voll Health house. Detailed floor plans for tactical planning.',
    width: 1080,
    height: 1920,
    order: 10,
    category: 'base',
    loader: () => import('./maps/voll_health_house.map').then(m => m.MAP_VOLL_HEALTH_HOUSE)
  },
  {
    id: 'watt_college',
    route: 'Elephant',
    name: 'Elephant / Watt Community college',
    metaDescription: 'Interactive map for Elephant mission at Watt Community college. View comprehensive blueprints with objectives and entry points.',
    width: 1080,
    height: 1920,
    order: 11,
    category: 'base',
    loader: () => import('./maps/watt_college.map').then(m => m.MAP_WATT_COLLEGE)
  },
  {
    id: 'costa_vino',
    route: 'Rust_Belt',
    name: 'Rust Belt / Costa Vino Border Reserve',
    metaDescription: 'Interactive map for Rust Belt mission at Costa Vino Border Reserve. Detailed blueprints with objectives for tactical operations.',
    width: 1080,
    height: 1920,
    order: 12,
    category: 'base',
    loader: () => import('./maps/costa_vino.map').then(m => m.MAP_COSTA_VINO)
  },
  {
    id: 'clemente_hotel',
    route: 'Sins_Of_The_Father',
    name: 'Sins Of The Father / Clemente Hotel',
    metaDescription: 'Interactive map for Sins Of The Father mission at Clemente Hotel. Plan your raid with comprehensive floor plans and objective markers.',
    width: 1080,
    height: 1920,
    order: 13,
    category: 'base',
    loader: () => import('./maps/clemente_hotel.map').then(m => m.MAP_CLEMENTE_HOTEL)
  },
  {
    id: 'neon_nightclub',
    route: 'Neon_Tomb',
    name: 'Neon Tomb / Neon Nightclub',
    metaDescription: 'Interactive map for Neon Tomb mission at Neon Nightclub. Detailed floor plans with marked entry points and objectives.',
    width: 1080,
    height: 1920,
    order: 14,
    category: 'base',
    loader: () => import('./maps/neon_nightclub.map').then(m => m.MAP_NEON_NIGHTCLUB)
  },
  {
    id: 'ceasars_cars_dealership',
    route: 'Buy_Cheap_Buy_Twice',
    name: 'Buy Cheap, Buy Twice / Ceasar\'s Cars Dealership',
    metaDescription: 'Interactive map for Buy Cheap, Buy Twice mission at Ceasar\'s Cars Dealership. View detailed blueprints for strategic planning.',
    width: 1080,
    height: 1920,
    order: 15,
    category: 'base',
    loader: () => import('./maps/ceasars_cars_dealership.map').then(m => m.MAP_CEASARS_CARS_DEALERSHIP)
  },
  {
    id: 'cherryessa_farm',
    route: 'Carriers_of_the_vine',
    name: 'Carriers of the vine / Cherryessa Farm',
    metaDescription: 'Interactive map for Carriers of the vine mission at Cherryessa Farm. Explore floor plans with objectives for mission planning.',
    width: 1080,
    height: 1920,
    order: 16,
    category: 'base',
    loader: () => import('./maps/cherryessa_farm.map').then(m => m.MAP_CHERRYESSA_FARM)
  },
  {
    id: 'medical_center',
    route: 'Relapse',
    name: 'Relapse / Coastal grove medical center',
    metaDescription: 'Interactive map for Relapse mission at Coastal grove medical center. Detailed blueprints for tactical team operations.',
    width: 1080,
    height: 1920,
    order: 17,
    category: 'base',
    loader: () => import('./maps/medical_center.map').then(m => m.MAP_MEDICAL_CENTER)
  },
  {
    id: 'port',
    route: 'Hide_And_Seek',
    name: 'Hide And Seek / Port Hokan',
    metaDescription: 'Interactive map for Hide And Seek mission at Port Hokan. Comprehensive floor plans with objectives and tactical entry points.',
    width: 1080,
    height: 1920,
    order: 18,
    category: 'base',
    loader: () => import('./maps/port.map').then(m => m.MAP_PORT)
  },
  {
    id: 'greenside_dormitories',
    route: 'Dorms',
    name: 'Dorms / Greenside dormitories',
    metaDescription: 'Interactive map for Dorms DLC mission at Greenside dormitories. Detailed floor plans with objectives for tactical planning.',
    width: 3840,
    height: 2715,
    order: 19,
    category: 'dlc',
    loader: () => import('./maps/greenside_dormitories.map').then(m => m.MAP_GREENSIDE_DORMITORIES)
  },
  {
    id: '25_hope_street',
    route: 'Narcos',
    name: 'Narcos / 25 Hope Street, 213 Park',
    metaDescription: 'Interactive map for Narcos DLC mission at 25 Hope Street. View comprehensive blueprints with marked objectives and entry points.',
    width: 3840,
    height: 2715,
    order: 20,
    category: 'dlc',
    loader: () => import('./maps/25_hope_street.map').then(m => m.MAP_25_HOPE_STREET)
  },
  {
    id: '155_playa_vista_lane',
    route: 'Lawmaker',
    name: 'Lawmaker / 155 Playa Vista Lane, Colina Beach',
    metaDescription: 'Interactive map for Lawmaker DLC mission at 155 Playa Vista Lane. Detailed blueprints for strategic tactical operations.',
    width: 3840,
    height: 2715,
    order: 21,
    category: 'dlc',
    loader: () => import('./maps/155_playa_vista_lane.map').then(m => m.MAP_155_PLAYA_VISTA_LANE)
  }
];
