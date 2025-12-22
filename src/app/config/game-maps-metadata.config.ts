import { GameMapConfig } from '../services/game-map';
import { MapCategoryId } from './map-categories.config';

/**
 * GAME MAPS METADATA CONFIGURATION
 *
 * This file contains metadata for all available game maps.
 *
 * Related files:
 * - config/map-categories.config.ts - Category definitions and utilities
 * - utils/game-maps.utils.ts - Helper functions for querying and filtering maps
 *
 * @example Using map metadata
 * ```typescript
 * import { GAME_MAPS_METADATA } from '@/config/game-maps-metadata.config';
 * import { getMapsByCategory, getMapById } from '@/utils/game-maps.utils';
 *
 * // Get all maps
 * const allMaps = GAME_MAPS_METADATA;
 *
 * // Filter by category (use utils)
 * const dlcMaps = getMapsByCategory('dlc-home-invasion');
 *
 * // Find specific map (use utils)
 * const map = getMapById('4U_gas');
 *
 * // Load a map config
 * const mapConfig = await map.loader();
 * ```
 */

// Re-export category types and utilities for convenience
export type { MapCategoryId, MapCategoryInfo } from './map-categories.config';
export { MAP_CATEGORIES, getCategoryInfo, getAllCategories } from './map-categories.config';

// ============================================================================
// MAP METADATA INTERFACE
// ============================================================================

export interface GameMapMetadata {
  id: string;
  route: string;
  name: string;
  metaDescription: string;
  order: number;
  category: MapCategoryId;
  preview_picture?: string;
  loader: () => Promise<GameMapConfig>;
  isReady?: boolean; // If false, map is under construction and will show placeholder
}

export const GAME_MAPS_METADATA: GameMapMetadata[] = [
  {
    id: '4U_gas',
    route: 'Thank_You_Come_Again',
    name: 'Thank You, Come Again / 4U Gas Station',
    metaDescription: 'Interactive map for Thank You, Come Again mission at 4U Gas Station in Ready or Not. Plan your tactical approach with detailed floor plans and objective locations.',
    order: 1,
    category: 'base',
    preview_picture: './maps/1_4U_gas/4U_Gas_Station_preview.png',
    loader: () => import('./maps/4U_gas.map').then(m => m.MAP_4U_GAS)
  },
  {
    id: '23_mb',
    route: '23_Megabytes_a_Second',
    name: '23 Megabytes a Second / San Uriel Condominiums',
    metaDescription: 'Interactive map for 23 Megabytes a Second mission at San Uriel Condominiums. Explore detailed blueprints and plan your team strategy.',
    order: 2,
    category: 'base',
    preview_picture: './maps/2_23_mb/23_Megabytes_a_Second_preview.png',
    loader: () => import('./maps/23_mb.map').then(m => m.MAP_23_MB)
  },
  {
    id: '213_park',
    route: 'Twisted_Nerve',
    name: 'Twisted Nerve / 213 Park Homes',
    metaDescription: 'Interactive map for Twisted Nerve mission at 213 Park Homes. View floor plans, objectives, and soft objectives for tactical planning.',
    order: 3,
    category: 'base',
    preview_picture: './maps/3_213_park/213_Park_preview.png',
    loader: () => import('./maps/213_park.map').then(m => m.MAP_213_PARK)
  },
  {
    id: 'brixley_talent',
    route: 'The_Spider',
    name: 'The Spider / Brixley talent time',
    metaDescription: 'Interactive map for The Spider mission at Brixley talent time. Detailed blueprints with marked objectives and entry points.',
    order: 4,
    category: 'base',
    preview_picture: './maps/4_brixley_talent/brixley_talent_preview.png',
    loader: () => import('./maps/brixley_talent.map').then(m => m.MAP_BRIXLEY_TALENT)
  },
  {
    id: 'sullivans_slope',
    route: 'A_lethal_obsession',
    name: 'A lethal obsession / Sullivan\'s Slope',
    metaDescription: 'Interactive map for A lethal obsession mission at Sullivan\'s Slope. Find all comms locations and plan your tactical approach.',
    order: 5,
    category: 'base',
    preview_picture: './maps/5_sullivans_slope/Sullivans slope_preview.png',
    loader: () => import('./maps/sullivans_slope.map').then(m => m.MAP_SULLIVANS_SLOPE)
  },
  {
    id: 'brisa_cove',
    route: 'Ides_of_march',
    name: 'Ides of march / Brisa Cove',
    metaDescription: 'Interactive map for Ides of march mission at Brisa Cove. Detailed floor plans to help you plan your mission strategy.',
    order: 6,
    category: 'base',
    preview_picture: './maps/6_brisa_cove/brisa_cove_preview.png',
    loader: () => import('./maps/brisa_cove.map').then(m => m.MAP_BRISA_COVE)
  },
  {
    id: 'mindjot',
    route: 'Sinuous_trail',
    name: 'Sinuous trail / Mindjot data center',
    metaDescription: 'Interactive map for Sinuous trail mission at Mindjot data center. View blueprints with objectives and tactical entry points.',
    order: 7,
    category: 'base',
    preview_picture: './maps/7_mindjot/mindjot_preview.png',
    loader: () => import('./maps/mindjot.map').then(m => m.MAP_MINDJOT)
  },
  {
    id: 'kawayu_beach',
    route: 'Ends_of_the_earth',
    name: 'Ends of the earth / Kawayu beach',
    metaDescription: 'Interactive map for Ends of the earth mission at Kawayu beach. Plan your operations with detailed floor plans and objective markers.',
    order: 8,
    category: 'base',
    preview_picture: './maps/8_kawayu_beach/kawayu_beach_preview.png',
    loader: () => import('./maps/kawayu_beach.map').then(m => m.MAP_KAWAYU_BEACH)
  },
  {
    id: 'los_suenos_postal',
    route: 'Greased_palms',
    name: 'Greased palms / Los Suenos Postal Service',
    metaDescription: 'Interactive map for Greased palms mission at Los Suenos Postal Service. Explore detailed blueprints with marked objectives.',
    order: 9,
    category: 'base',
    preview_picture: './maps/9_los_suenos_postal/los_suenos_postal_preview.png',
    loader: () => import('./maps/los_suenos_postal.map').then(m => m.MAP_LOS_SUENOS_POSTAL)
  },
  {
    id: 'voll_health_house',
    route: 'Valley_of_the_Dolls',
    name: 'Valley of the Dolls / Voll Health house',
    metaDescription: 'Interactive map for Valley of the Dolls mission at Voll Health house. Detailed floor plans for tactical planning.',
    order: 10,
    category: 'base',
    preview_picture: './maps/10_voll_health_house/voll_health_house_preview.png',
    loader: () => import('./maps/voll_health_house.map').then(m => m.MAP_VOLL_HEALTH_HOUSE)
  },
  {
    id: 'watt_college',
    route: 'Elephant',
    name: 'Elephant / Watt Community college',
    metaDescription: 'Interactive map for Elephant mission at Watt Community college. View comprehensive blueprints with objectives and entry points.',
    order: 11,
    category: 'base',
    preview_picture: './maps/11_watt_college/watt_college_previre.png',
    loader: () => import('./maps/watt_college.map').then(m => m.MAP_WATT_COLLEGE)
  },
  {
    id: 'costa_vino',
    route: 'Rust_Belt',
    name: 'Rust Belt / Costa Vino Border Reserve',
    metaDescription: 'Interactive map for Rust Belt mission at Costa Vino Border Reserve. Detailed blueprints with objectives for tactical operations.',
    order: 12,
    category: 'base',
    preview_picture: './maps/12_costa_vino/costa_vino_preview.png',
    loader: () => import('./maps/costa_vino.map').then(m => m.MAP_COSTA_VINO)
  },
  {
    id: 'clemente_hotel',
    route: 'Sins_Of_The_Father',
    name: 'Sins Of The Father / Clemente Hotel',
    metaDescription: 'Interactive map for Sins Of The Father mission at Clemente Hotel. Plan your raid with comprehensive floor plans and objective markers.',
    order: 13,
    category: 'base',
    preview_picture: './maps/13_clemente_hotel/clemente_hotel_preview.png',
    loader: () => import('./maps/clemente_hotel.map').then(m => m.MAP_CLEMENTE_HOTEL)
  },
  {
    id: 'neon_nightclub',
    route: 'Neon_Tomb',
    name: 'Neon Tomb / Neon Nightclub',
    metaDescription: 'Interactive map for Neon Tomb mission at Neon Nightclub. Detailed floor plans with marked entry points and objectives.',
    order: 14,
    category: 'base',
    preview_picture: './maps/14_neon_nightclub/neon_nightclub_preview.png',
    loader: () => import('./maps/neon_nightclub.map').then(m => m.MAP_NEON_NIGHTCLUB)
  },
  {
    id: 'ceasars_cars_dealership',
    route: 'Buy_Cheap_Buy_Twice',
    name: 'Buy Cheap, Buy Twice / Ceasar\'s Cars Dealership',
    metaDescription: 'Interactive map for Buy Cheap, Buy Twice mission at Ceasar\'s Cars Dealership. View detailed blueprints for strategic planning.',
    order: 15,
    category: 'base',
    preview_picture:'./maps/15_ceasars_cars_dealership/ceasars_cars_dealership_preview.png',
    loader: () => import('./maps/ceasars_cars_dealership.map').then(m => m.MAP_CEASARS_CARS_DEALERSHIP)
  },
  {
    id: 'cherryessa_farm',
    route: 'Carriers_of_the_vine',
    name: 'Carriers of the vine / Cherryessa Farm',
    metaDescription: 'Interactive map for Carriers of the vine mission at Cherryessa Farm. Explore floor plans with objectives for mission planning.',
    order: 16,
    category: 'base',
    preview_picture: './maps/16_cherryessa_farm/cherryessa_farm_preview.png',
    loader: () => import('./maps/cherryessa_farm.map').then(m => m.MAP_CHERRYESSA_FARM)
  },
  {
    id: 'medical_center',
    route: 'Relapse',
    name: 'Relapse / Coastal grove medical center',
    metaDescription: 'Interactive map for Relapse mission at Coastal grove medical center. Detailed blueprints for tactical team operations.',
    order: 17,
    category: 'base',
    preview_picture: './maps/17_medical_center/medical_center_preview.png',
    loader: () => import('./maps/medical_center.map').then(m => m.MAP_MEDICAL_CENTER)
  },
  {
    id: 'port',
    route: 'Hide_And_Seek',
    name: 'Hide And Seek / Port Hokan',
    metaDescription: 'Interactive map for Hide And Seek mission at Port Hokan. Comprehensive floor plans with objectives and tactical entry points.',
    order: 18,
    category: 'base',
    preview_picture: './maps/18_port/port_preview.png',
    loader: () => import('./maps/port.map').then(m => m.MAP_PORT)
  },
  // Home Invasion DLC.
  {
    id: 'greenside_dormitories',
    route: 'Dorms',
    name: 'Dorms / Greenside dormitories',
    metaDescription: 'Interactive map for Dorms DLC mission at Greenside dormitories. Detailed floor plans with objectives for tactical planning.',
    order: 19,
    category: 'dlc-home-invasion',
    preview_picture: './maps/19_greenside_dormitories/greenside_dormitories_preview.png',
    loader: () => import('./maps/greenside_dormitories.map').then(m => m.MAP_GREENSIDE_DORMITORIES)
  },
  {
    id: '25_hope_street',
    route: 'Narcos',
    name: 'Narcos / 25 Hope Street, 213 Park',
    metaDescription: 'Interactive map for Narcos DLC mission at 25 Hope Street. View comprehensive blueprints with marked objectives and entry points.',
    order: 20,
    category: 'dlc-home-invasion',
    preview_picture: './maps/20_25_hope_street/25_hope_street_preview.png',
    loader: () => import('./maps/25_hope_street.map').then(m => m.MAP_25_HOPE_STREET)
  },
  {
    id: '155_playa_vista_lane',
    route: 'Lawmaker',
    name: 'Lawmaker / 155 Playa Vista Lane, Colina Beach',
    metaDescription: 'Interactive map for Lawmaker DLC mission at 155 Playa Vista Lane. Detailed blueprints for strategic tactical operations.',
    order: 21,
    category: 'dlc-home-invasion',
    preview_picture: './maps/21_155_playa_vista_lane/155_playa_vista_lane_preview.png',
    loader: () => import('./maps/155_playa_vista_lane.map').then(m => m.MAP_155_PLAYA_VISTA_LANE)
  },
  // Dark Waters DLC.
  {
    id: 'sergalio',
    route: 'Mirage_at_Sea',
    name: 'Mirage at Sea / The Seraglio',
    metaDescription: 'Interactive map for Mirage at Sea DLC mission at The Seraglio yaht. Detailed blueprints for strategic tactical operations.',
    order: 22,
    category: 'dlc-dark-waters',
    preview_picture: './maps/22_Seraglio/Seraglio_preview.png',
    loader: () => import('./maps/seraglio.map').then(m => m.MAP_SERGALIO)
  },
  {
    id: 'heavywell_rig',
    route: 'Leviathan',
    name: 'Leviathan / HeavyWell A-101 Rig',
    metaDescription: 'Interactive map for Leviathan DLC mission at HeavyWell A-101 Rig. Detailed blueprints for strategic tactical operations.',
    order: 23,
    category: 'dlc-dark-waters',
    preview_picture: './maps/23_HeavyWell_Rig/HeavyWell_A-101_Rig_preview.png',
    loader: () => import('./maps/heavywell_rig.map').then(m => m.MAP_HEAVYWELL_RIG)
  },
  {
    id: 'elysian',
    route: '3_Letter_Triad',
    name: '3 Letter Triad / The Elysian',
    metaDescription: 'Interactive map for 3 Letter Triad DLC mission at The Elysian not finished hotel. Detailed blueprints for strategic tactical operations.',
    order: 24,
    category: 'dlc-dark-waters',
    preview_picture: './maps/23_HeavyWell_Rig/HeavyWell_A-101_Rig_preview.png',
    loader: () => import('./maps/elysian.map').then(m => m.MAP_ELYSIAN),
    isReady: false
  }
];
