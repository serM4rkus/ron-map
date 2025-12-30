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
  description: string;
  order: number;
  category: MapCategoryId;
  preview_picture?: string;
  loader: () => Promise<GameMapConfig>;
  isReady?: boolean; // If false, map is under construction and will show placeholder
}

export const GAME_MAPS_METADATA: GameMapMetadata[] = [
  {
    id: '4U_gas',
    route: 'thank-you-come-again',
    name: 'Thank You, Come Again / 4U Gas Station',
    metaDescription: 'Interactive map for Thank You, Come Again mission at 4U Gas Station in Ready or Not. Plan your tactical approach with detailed floor plans and objective locations.',
    description: 'Thank You, Come Again is the first mission in Ready or Not, chronologically and accessibly. On February 3, 2025, the Los Sueños Police Department responds to teenage meth addicts robbing a downtown 4U gas station. ',
    order: 1,
    category: 'base',
    preview_picture: './maps/1_4U_gas/4U_Gas_Station_preview.png',
    loader: () => import('./maps/4U_gas.map').then(m => m.MAP_4U_GAS)
  },
  {
    id: '23_mb',
    route: '23-megabytes-a-second',
    name: '23 Megabytes a Second / San Uriel Condominiums',
    metaDescription: 'Interactive map for 23 Megabytes a Second mission at San Uriel Condominiums. Explore detailed blueprints and plan your team strategy.',
    description: '23 Megabytes a Second is the second mission in Ready or Not. On December 8, 2025, the Los Sueños Police Department received a 911 call regarding a hostage situation at an apartment complex.',
    order: 2,
    category: 'base',
    preview_picture: './maps/2_23_mb/23_Megabytes_a_Second_preview.png',
    loader: () => import('./maps/23_mb.map').then(m => m.MAP_23_MB)
  },
  {
    id: '213_park',
    route: 'twisted-nerve',
    name: 'Twisted Nerve / 213 Park Homes',
    metaDescription: 'Interactive map for Twisted Nerve mission at 213 Park Homes. View floor plans, objectives, and soft objectives for tactical planning.',
    description: 'Twisted Nerve is the third playable mission in Ready or Not. On September 29, 2025, D Platoon are sent to a neighborhood with the objective of shutting down residential homes involved with the production and distribution of methamphetamine.',
    order: 3,
    category: 'base',
    preview_picture: './maps/3_213_park/213_Park_preview.png',
    loader: () => import('./maps/213_park.map').then(m => m.MAP_213_PARK)
  },
  {
    id: 'brixley_talent',
    route: 'the-spider',
    name: 'The Spider / Brixley talent time',
    metaDescription: 'Interactive map for The Spider mission at Brixley talent time. Detailed blueprints with marked objectives and entry points.',
    description: 'The Spider is the fourth mission in Ready or Not. On June 4, 2025, a number of anonymous tips by local residents report suspicious activity at a construction yard owned by the Brixley Talent production company. Repeated attempts to contact and serve a search warrant to the company have been rebuffed by their legal team. The Chief of Police has dispatched D Platoon to serve a no-knock search warrant of the residence, and to detain anyone present.',
    order: 4,
    category: 'base',
    preview_picture: './maps/4_brixley_talent/brixley_talent_preview.png',
    loader: () => import('./maps/brixley_talent.map').then(m => m.MAP_BRIXLEY_TALENT)
  },
  {
    id: 'sullivans_slope',
    route: 'a-lethal-obsession',
    name: 'A lethal obsession / Sullivan\'s Slope',
    metaDescription: 'Interactive map for A lethal obsession mission at Sullivan\'s Slope. Find all comms locations and plan your tactical approach.',
    description: 'A Lethal Obsession is the fifth mission in Ready or Not. Gerard Scott, 55, a former USIA analyst, waited out the front of East Makade Police Department with a loaded Mini-14 after setting a car alight on the street in front of the department. He then shot at officers while they attempted to extinguish the alighted vehicle. Witnesses on the street reported his vehicle as he drove away. On August 20, 2025, D Platoon is sent to service his warrant. ',
    order: 5,
    category: 'base',
    preview_picture: './maps/5_sullivans_slope/Sullivans slope_preview.png',
    loader: () => import('./maps/sullivans_slope.map').then(m => m.MAP_SULLIVANS_SLOPE)
  },
  {
    id: 'brisa_cove',
    route: 'ides-of-march',
    name: 'Ides of march / Brisa Cove',
    metaDescription: 'Interactive map for Ides of march mission at Brisa Cove. Detailed floor plans to help you plan your mission strategy.',
    description: 'Ides of March is the sixth playable mission in Ready or Not. A group of domestic terrorists have occupied the luxury Brisa Cove Apartments, taking several residents hostage. On October 1, 2025, D-Platoon have been dispatched to neutralize the threat and defuse the situation ahead of the Senator\'s upcoming presidential campaign.',
    order: 6,
    category: 'base',
    preview_picture: './maps/6_brisa_cove/brisa_cove_preview.png',
    loader: () => import('./maps/brisa_cove.map').then(m => m.MAP_BRISA_COVE)
  },
  {
    id: 'mindjot',
    route: 'sinuous-trail',
    name: 'Sinuous trail / Mindjot data center',
    metaDescription: 'Interactive map for Sinuous trail mission at Mindjot data center. View blueprints with objectives and tactical entry points.',
    description: 'Sinuous Trail is the seventh playable mission in Ready or Not. On December 15, 2025, D-Platoon have been dispatched to serve a high risk search warrant at a Mindjot Datacenter suspected of being used by a child pornography ring.',
    order: 7,
    category: 'base',
    preview_picture: './maps/7_mindjot/mindjot_preview.png',
    loader: () => import('./maps/mindjot.map').then(m => m.MAP_MINDJOT)
  },
  {
    id: 'kawayu_beach',
    route: 'ends-of-the-earth',
    name: 'Ends of the earth / Kawayu beach',
    metaDescription: 'Interactive map for Ends of the earth mission at Kawayu beach. Plan your operations with detailed floor plans and objective markers.',
    description: 'Ends of the Earth is the eighth mission in Ready or Not. On December 3, 2025, the LSPD raid a home on the beachfront for distributing and illegally modifying weapons.',
    order: 8,
    category: 'base',
    preview_picture: './maps/8_kawayu_beach/kawayu_beach_preview.png',
    loader: () => import('./maps/kawayu_beach.map').then(m => m.MAP_KAWAYU_BEACH)
  },
  {
    id: 'los_suenos_postal',
    route: 'greased-palms',
    name: 'Greased palms / Los Suenos Postal Service',
    metaDescription: 'Interactive map for Greased palms mission at Los Suenos Postal Service. Explore detailed blueprints with marked objectives.',
    description: 'Greased Palms is the ninth mission in Ready Or Not. On October 25, 2025, the Los Suenos Police Department responds to a shoot out at the Los Suenos Postal Service, and is ordered to arrest a weapons smuggler suspect.',
    order: 9,
    category: 'base',
    preview_picture: './maps/9_los_suenos_postal/los_suenos_postal_preview.png',
    loader: () => import('./maps/los_suenos_postal.map').then(m => m.MAP_LOS_SUENOS_POSTAL)
  },
  {
    id: 'voll_health_house',
    route: 'valley-of-the-dolls',
    name: 'Valley of the Dolls / Voll Health house',
    metaDescription: 'Interactive map for Valley of the Dolls mission at Voll Health house. Detailed floor plans for tactical planning.',
    description: 'Valley of the Dolls is the tenth playable mission in Ready or Not. The LSPD\'s cyber-crime team has found a lead pertaining to the person profiting from the illegal child-pornography ring operating in Los Sueños. Amos Voll owns a health house at 1962 Irwin Drive, Los Clemente, which is guarded by the security company, Bolton Security. With Amos\'s daughter, Janey Voll, having her 18th birthday, the LSPD decide to raid the home. This level takes place on January 5, 2026, making it the sixteenth mission chronologically.',
    order: 10,
    category: 'base',
    preview_picture: './maps/10_voll_health_house/voll_health_house_preview.png',
    loader: () => import('./maps/voll_health_house.map').then(m => m.MAP_VOLL_HEALTH_HOUSE)
  },
  {
    id: 'watt_college',
    route: 'elephant',
    name: 'Elephant / Watt Community college',
    metaDescription: 'Interactive map for Elephant mission at Watt Community college. View comprehensive blueprints with objectives and entry points.',
    description: 'Elephant is the eleventh (ninth chronologically) playable mission in Ready or Not. On October 17, 2025, four students commit a mass-shooting at Watt Community College, presumably due to a mixture of mental health issues and immense dissatisfaction with the current state of the United States. LSPD is able to contain the shooters in the Science Wing and D Platoon is sent in to neutralize the threat.',
    order: 11,
    category: 'base',
    preview_picture: './maps/11_watt_college/watt_college_previre.png',
    loader: () => import('./maps/watt_college.map').then(m => m.MAP_WATT_COLLEGE)
  },
  {
    id: 'costa_vino',
    route: 'rust-belt',
    name: 'Rust Belt / Costa Vino Border Reserve',
    metaDescription: 'Interactive map for Rust Belt mission at Costa Vino Border Reserve. Detailed blueprints with objectives for tactical operations.',
    description: 'Rust Belt is the twelfth mission in Ready or Not. On October 15, 2025, D Platoon raid a coyote stash house on the Mexican border.',
    order: 12,
    category: 'base',
    preview_picture: './maps/12_costa_vino/costa_vino_preview.png',
    loader: () => import('./maps/costa_vino.map').then(m => m.MAP_COSTA_VINO)
  },
  {
    id: 'clemente_hotel',
    route: 'sins-of-the-father',
    name: 'Sins Of The Father / Clemente Hotel',
    metaDescription: 'Interactive map for Sins Of The Father mission at Clemente Hotel. Plan your raid with comprehensive floor plans and objective markers.',
    description: 'Sins of The Father is the thirteenth mission in Ready or Not. On October 2, 2025, rogue Secret Service agents sympathetic to the plight of The Left Behind, have occupied the fourteenth floor of the Clemente Hotel, threatening to execute Senator Fremont\'s family on video. D Platoon is dispatched to neutralize the terrorists before they can carry out their threat.',
    order: 13,
    category: 'base',
    preview_picture: './maps/13_clemente_hotel/clemente_hotel_preview.png',
    loader: () => import('./maps/clemente_hotel.map').then(m => m.MAP_CLEMENTE_HOTEL)
  },
  {
    id: 'neon_nightclub',
    route: 'neon-tomb',
    name: 'Neon Tomb / Neon Nightclub',
    metaDescription: 'Interactive map for Neon Tomb mission at Neon Nightclub. Detailed floor plans with marked entry points and objectives.',
    description: 'Neon Tomb is the fourteenth playable mission in Ready or Not. The terrorist group, The Hand, has committed a mass shooting at the Neon Nightclub in response to US airstrikes targeting their shelters in Northern Yemen. D Platoon has been dispatched to bring an end to the massacre. The mission takes place on April 19, 2025, making it the chronologically second mission in the story. The attack killed approximately 60 people.',
    order: 14,
    category: 'base',
    preview_picture: './maps/14_neon_nightclub/neon_nightclub_preview.png',
    loader: () => import('./maps/neon_nightclub.map').then(m => m.MAP_NEON_NIGHTCLUB)
  },
  {
    id: 'ceasars_cars_dealership',
    route: 'buy-cheap-buy-twice',
    name: 'Buy Cheap, Buy Twice / Ceasar\'s Cars Dealership',
    metaDescription: 'Interactive map for Buy Cheap, Buy Twice mission at Ceasar\'s Cars Dealership. View detailed blueprints for strategic planning.',
    description: 'Buy Cheap, Buy Twice is the fifteenth playable mission in Ready or Not. It takes place on February 10, 2026 at a rather large car dealership beside an extremely run down street, in which both Los Locos and the Russian Mafia have made a base for themselves. The map consists of three main areas ; The interior of the two-floor dealership, the car lot outside, and the mechanic shop behind the dealership. Enemies can be found in any of these. A few civilians are also present.',
    order: 15,
    category: 'base',
    preview_picture:'./maps/15_ceasars_cars_dealership/ceasars_cars_dealership_preview.png',
    loader: () => import('./maps/ceasars_cars_dealership.map').then(m => m.MAP_CEASARS_CARS_DEALERSHIP)
  },
  {
    id: 'cherryessa_farm',
    route: 'carriers-of-the-vine',
    name: 'Carriers of the vine / Cherryessa Farm',
    metaDescription: 'Interactive map for Carriers of the vine mission at Cherryessa Farm. Explore floor plans with objectives for mission planning.',
    description: 'Carriers of the Vine is the sixteenth mission in Ready or Not. It has D Platoon being dispatched on June 1, 2025, to pacify a new age cult committing acts of vigilantism across Los Suenos.',
    order: 16,
    category: 'base',
    preview_picture: './maps/16_cherryessa_farm/cherryessa_farm_preview.png',
    loader: () => import('./maps/cherryessa_farm.map').then(m => m.MAP_CHERRYESSA_FARM)
  },
  {
    id: 'medical_center',
    route: 'relapse',
    name: 'Relapse / Coastal grove medical center',
    metaDescription: 'Interactive map for Relapse mission at Coastal grove medical center. Detailed blueprints for tactical team operations.',
    description: 'Relapse is the penultimate and seventeenth mission in Ready or Not. The mission takes place on May 8, 2025, as the third mission chronologically about 3 weeks after Neon Tomb. A leader of The Hand who took part in the shooting at the Neon Nightclub is taken into medical care. The group storms the Coastal Grove Medical Center in an attempt to prevent the suspect from being taken into police custody. The LSPD\'s SWAT team is deployed to intercept the cell.',
    order: 17,
    category: 'base',
    preview_picture: './maps/17_medical_center/medical_center_preview.png',
    loader: () => import('./maps/medical_center.map').then(m => m.MAP_MEDICAL_CENTER)
  },
  {
    id: 'port',
    route: 'hide-and-seek',
    name: 'Hide And Seek / Port Hokan',
    metaDescription: 'Interactive map for Hide And Seek mission at Port Hokan. Comprehensive floor plans with objectives and tactical entry points.',
    description: 'Hide and Seek is the last and eighteenth mission in Ready or Not. On February 18, 2026, the LSPD, along with the FISA and ATF, are inserted into Port Hokan to shut down a major arms distribution operation.',
    order: 18,
    category: 'base',
    preview_picture: './maps/18_port/port_preview.png',
    loader: () => import('./maps/port.map').then(m => m.MAP_PORT)
  },
  // Home Invasion DLC.
  {
    id: 'greenside_dormitories',
    route: 'dorms',
    name: 'Dorms / Greenside dormitories',
    metaDescription: 'Interactive map for Dorms DLC mission at Greenside dormitories. Detailed floor plans with objectives for tactical planning.',
    description: 'Dorms is a DLC mission in Ready or Not. Mass amounts of homeless people and drug addicts are seeking shelter in the abandoned Greenside Dormitories. Due to the structural instability and the location\'s history of attracting troublemakers, LSPD attempted to clear the building. However, the occupants resisted and an officer was shot in the leg; whether this was intentional or not is unknown. Other units are unavailable due to the current situation in the city, so SWAT is responsible for clearing the people out of the building.',
    order: 19,
    category: 'dlc-home-invasion',
    preview_picture: './maps/19_greenside_dormitories/greenside_dormitories_preview.png',
    loader: () => import('./maps/greenside_dormitories.map').then(m => m.MAP_GREENSIDE_DORMITORIES)
  },
  {
    id: '25_hope_street',
    route: 'narcos',
    name: 'Narcos / 25 Hope Street, 213 Park',
    metaDescription: 'Interactive map for Narcos DLC mission at 25 Hope Street. View comprehensive blueprints with marked objectives and entry points.',
    description: 'Narcos is a DLC mission in Ready or Not. Agent Mike Esperanza has had his cover blown and Los Locos have arrived at his home to torture and kill him. Screams loud enough to alert the entire neighbourhood have caused an LSPD response. Patrol officers are stretched thin due to Hurricane Antonio, so LSPD SWAT is called to the scene. Meanwhile, Esperanza has escaped his captors and has fled to a different place in the neighbourhood, warranting the Los Locos to search the neighbourhood to find him.',
    order: 20,
    category: 'dlc-home-invasion',
    preview_picture: './maps/20_25_hope_street/25_hope_street_preview.png',
    loader: () => import('./maps/25_hope_street.map').then(m => m.MAP_25_HOPE_STREET)
  },
  {
    id: '155_playa_vista_lane',
    route: 'lawmaker',
    name: 'Lawmaker / 155 Playa Vista Lane, Colina Beach',
    metaDescription: 'Interactive map for Lawmaker DLC mission at 155 Playa Vista Lane. Detailed blueprints for strategic tactical operations.',
    description: 'Lawmaker is a DLC level in Ready or Not. Members of the United Planet Front - an eco-terrorist group - have invaded the home of Sven Anderson-Lincoln - a wealthy lobbyist with connections to the oil industry. No civilians have been killed but many have been taken hostage. SWAT is deployed to rescue the hostages. ',
    order: 21,
    category: 'dlc-home-invasion',
    preview_picture: './maps/21_155_playa_vista_lane/155_playa_vista_lane_preview.png',
    loader: () => import('./maps/155_playa_vista_lane.map').then(m => m.MAP_155_PLAYA_VISTA_LANE)
  },
  // Dark Waters DLC.
  {
    id: 'sergalio',
    route: 'mirage-at-sea',
    name: 'Mirage at Sea / The Seraglio',
    metaDescription: 'Interactive map for Mirage at Sea DLC mission at The Seraglio yaht. Detailed blueprints for strategic tactical operations.',
    description: 'Mirage at Sea is the first DLC level of three in Ready or Not: Dark Waters. Sah\'id bin Khalid, serial rapist and son of a wealthy Qatari oligarch, has a BOLO order out for his recently-purchased yacht, The Seraglio. When the authorities attempt to make the ship return to shore, the situation escalates into a murder and hostage taking. LSPD SWAT, aided by C.O.A.S.T., is deployed to the yacht to arrest Sah\'id, rescue the hostages, and deal with Sah\'id\'s elite private security detail.',
    order: 22,
    category: 'dlc-dark-waters',
    preview_picture: './maps/22_Seraglio/Seraglio_preview.png',
    loader: () => import('./maps/seraglio.map').then(m => m.MAP_SERGALIO)
  },
  {
    id: 'heavywell_rig',
    route: 'leviathan',
    name: 'Leviathan / HeavyWell A-101 Rig',
    metaDescription: 'Interactive map for Leviathan DLC mission at HeavyWell A-101 Rig. Detailed blueprints for strategic tactical operations.',
    description: 'Leviathan is a DLC mission in Ready or Not: Dark Waters. Members of the United Planet Front have attacked the HeavyWell A-101 Oil Rig off the coast of Los Suenos; multiple civilians have been killed and the attack in being currently livestreamed by the perpetrators. Thanks to a new amendment to federal law allowing municipal police greater jurisdiction over maritime territory, the LSPD SWAT team is deployed via helicopter and boat to bring an end to the crisis.',
    order: 23,
    category: 'dlc-dark-waters',
    preview_picture: './maps/23_HeavyWell_Rig/HeavyWell_A-101_Rig_preview.png',
    loader: () => import('./maps/heavywell_rig.map').then(m => m.MAP_HEAVYWELL_RIG)
  },
  {
    id: 'elysian',
    route: '3-letter-triad',
    name: '3 Letter Triad / The Elysian',
    metaDescription: 'Interactive map for 3 Letter Triad DLC mission at The Elysian not finished hotel. Detailed blueprints for strategic tactical operations.',
    description: 'This map is currently under construction. Check back soon for the complete interactive map with detailed floor plans, objectives, and spawn points.',
    order: 24,
    category: 'dlc-dark-waters',
    preview_picture: './maps/24_elysian/elysian_preview.png',
    loader: () => import('./maps/elysian.map').then(m => m.MAP_ELYSIAN),
    isReady: false
  },
  // Los Suenos Stories.
    {
    id: 'chicos_mexican_resturant',
    route: 'hunger-strike',
    name: 'Hunger Strike / Chico\'s Mexican Resturant',
    metaDescription: 'Interactive map for Hunger Strike free extension mission at Chico\'s Mexican Resturant. Detailed blueprints for strategic tactical operations.',
    description: 'This map is currently under construction. Check back soon for the complete interactive map with detailed floor plans, objectives, and spawn points.',
    order: 25,
    category: 'los-suenos-stories',
    preview_picture: './maps/25_chicos_mexican_resturant/chicos_mexican_resturant_preview.png',
    loader: () => import('./maps/chicos_mexican_resturant.map').then(m => m.MAP_CHICOS_MEXICAN_RESTURANT),
    isReady: false
  },
  {
    id: 'edgeware_apartments',
    route: 'stolen-valor',
    name: 'Stolen Valor / Edgeware Apartments',
    metaDescription: 'Interactive map for Stolen Valor free extension mission at Edgeware Apartments complex. Detailed blueprints for strategic tactical operations.',
    description: 'This map is currently under construction. Check back soon for the complete interactive map with detailed floor plans, objectives, and spawn points.',
    order: 26,
    category: 'los-suenos-stories',
    preview_picture: './maps/26_edgeware_apartments/edgeware_apartments_preview.png',
    loader: () => import('./maps/edgeware_apartments.map').then(m => m.MAP_EDGEWARE_APARTMENTS),
    isReady: false
  }
];
