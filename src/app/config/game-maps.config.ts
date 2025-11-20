import { GameMapConfig } from '../services/game-map';

export const GAME_MAPS: GameMapConfig[] = [
  // 1
  {
    id: '4U_gas',
    name: 'Thank You, Come Again / 4U Gas Station',
    width: 3840,
    height: 2160,
    description: 'Thank You, Come Again is the first mission in Ready or Not, chronologically and accessibly. On February 3, 2025, the Los Sueños Police Department responds to teenage meth addicts robbing a downtown 4U gas station. ',
    layers: [
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/1_4U_gas/4U_Gas_Station.png', visible: true, zIndex: 1, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 58.36, y: 81.82, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' },
      { id: 'm2', x: 59.07, y: 28.8, title: 'Report Incapacitated Veteran', description: 'Locate a downed civilian, a veteran, killed on scene by the suspects', type: 'soft_objective', layerId: 'ground' },
      { id: 'm3', x: 48.05, y: 30.99, title: 'Find Cristal Leighton', description: 'Locate the civilian, Cristal Leighton; a minor hiding somewhere at the crime scene', type: 'hard_objective', layerId: 'ground' },
      { id: 'm4', x: 55.88, y: 41.67, title: 'Find the Store Manager', description: 'Locate the civilian, responsible for the initial call to dispatch, who has since been unresponsive', type: 'hard_objective', layerId: 'ground' }
    ]
  },
  // 2
  {
    id: '23_mb',
    name: '23 Megabytes a Second / San Uriel Condominiums',
    width: 2160,
    height: 3840,
    description: '23 Megabytes a Second is the second mission in Ready or Not. On December 8, 2025, the Los Sueños Police Department received a 911 call regarding a hostage situation at an apartment complex.',
    layers: [
      { id: 'floor2', name: 'Second Floor', imageUrl: '/maps/2_23_mb/23_mb_floor2.png', visible: false, zIndex: 1 },
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/2_23_mb/23_mb_floor1.png', visible: false, zIndex: 2 },
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/2_23_mb/23_mb_ground.png', visible: true, zIndex: 3, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 46.72, y: 76.78, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' },
      { id: 'm2', x: 60.42, y: 64.08, title: 'Report Illegal Server Farm', description: 'Locate the source of electricity theft: an illegal server cluster, farming cryptocurrency and hosting online illegal activity', type: 'soft_objective', layerId: 'floor1' },
      { id: 'm3', x: 36.3, y: 61.45, title: 'Report Suspect\'s PC', description: 'Locate the suspect\'s personal computer, showing incriminating evidence in connection to \'Mindjot\'', type: 'soft_objective', layerId: 'floor2' },
      { id: 'm4', x: 41.76, y: 62.61, title: 'Report Photographic evidence', description: 'Locate document evidences related to "Mindjot" in suspect\'s bedroom', type: 'soft_objective', layerId: 'floor2' },
      { id: 'm5', x: 42.35, y: 38.38, title: 'Arest Michael', description: 'Michael is main target and he is usually located in his appartment on second floor. Check all rooms. He wears headset with kitty ears.', type: 'hard_objective', layerId: 'floor2' },
      { id: 'm6', x: 47.9, y: 21.05, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'm7', x: 54.37, y: 61.76, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'm8', x: 37.66, y: 23.6, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'm9', x: 44.3, y: 21.47, title: 'To Second Floor', type: 'stairs_up', layerId: 'floor1' },
      { id: 'm10', x: 50.97, y: 23.6, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'm11', x: 63.87, y: 74.04, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'm12', x: 60.76, y: 77.3, title: 'To Second Floor', type: 'stairs_up', layerId: 'floor1' },
      { id: 'm13', x: 49.7, y: 25.98, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2' },
      { id: 'm14', x: 62.31, y: 25.98, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2' },
      { id: 'm15', x: 59.71, y: 69.12, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2' }
    ]
  },
  // 3
  {
    id: '213_park',
    name: 'Twisted Nerve / 213 Park Homes',
    width: 2160,
    height: 3840,
    description: 'Twisted Nerve is the third playable mission in Ready or Not. On September 29, 2025, D Platoon are sent to a neighborhood with the objective of shutting down residential homes involved with the production and distribution of methamphetamine.',
    layers: [
      { id: 'floor2', name: 'Second Floor', imageUrl: '/maps/3_213_park/213_park_floor2.png', visible: false, zIndex: 1 },
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/3_213_park/213_park_floor1.png', visible: false, zIndex: 2 },
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/3_213_park/213_park_ground.png', visible: true, zIndex: 3, isDefault: true },
      { id: 'underground', name: 'Underground', imageUrl: '/maps/3_213_park/213_park_underground.png', visible: false, zIndex: 4 }
    ],
    markers: [
      { id: 'm1', x: 40.17, y: 64.15, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' },
      { id: 'm2', x: 61.68, y: 41.15, title: 'Locate 2 Crystal Meth Laboratories', description: 'Find and report the multiple meth laboratories, that accounts suggest can be found in the residence. Only 2 reqiered', type: 'hard_objective', layerId: 'ground' },
      { id: 'm3', x: 57.1, y: 32.26, title: 'Locate 2 Crystal Meth Laboratories', description: 'Find and report the multiple meth laboratories, that accounts suggest can be found in the residence. Only 2 reqiered', type: 'hard_objective', layerId: 'ground' },
      { id: 'm4', x: 57.48, y: 29.5, title: 'Locate 2 Crystal Meth Laboratories', description: 'Find and report the multiple meth laboratories, that accounts suggest can be found in the residence. Only 2 reqiered', type: 'hard_objective', layerId: 'ground' },
      { id: 'm5', x: 62.98, y: 42.04, title: 'Locate 2 Crystal Meth Laboratories', description: 'Find and report the multiple meth laboratories, that accounts suggest can be found in the residence. Only 2 reqiered', type: 'hard_objective', layerId: 'floor1' },
      { id: 'm6', x: 56.18, y: 45.63, title: 'Locate 2 Crystal Meth Laboratories', description: 'Find and report the multiple meth laboratories, that accounts suggest can be found in the residence. Only 2 reqiered', type: 'hard_objective', layerId: 'floor1' },
      { id: 'new-1763580676354', x: 41.81, y: 58.78, title: 'Locate Crystal Meth Storage', description: 'Find and report the storage room, on the top floor of the residence. Accounts suggest these contain a large, packaged quantity of crystal meth', type: 'hard_objective', layerId: 'floor1' },
      { id: 'new-1763580657853', x: 43.15, y: 52.43, title: 'Report Hidden Money Cache', description: 'Locate a hidden money stash, evidence of buying and selling illegal narcotics', type: 'soft_objective', layerId: 'floor1' },
      { id: 'new-1763580706821', x: 40.13, y: 49.44, title: 'Find Incapacitated Minor', description: 'Locate and report the incapacitated minor in the residence', type: 'soft_objective', layerId: 'floor1' },
      { id: 'new-1763582997652', x: 54.5, y: 38.31, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763583011184', x: 51.13, y: 37.56, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763583067195', x: 51.01, y: 18.66, title: 'To Undeground', type: 'stairs_down', layerId: 'ground' },
      { id: 'new-1763583077971', x: 44.16, y: 16.57, title: 'to Udeground', type: 'stairs_down', layerId: 'ground' },
      { id: 'new-1763583206787', x: 47.14, y: 52.58, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'new-1763583211600', x: 52.44, y: 54.15, title: 'To First Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'new-1763583230147', x: 51.97, y: 48.54, title: 'To Second Floor', type: 'stairs_up', layerId: 'floor1' },
      { id: 'new-1763583251087', x: 39.33, y: 61.32, title: 'To First floor', type: 'stairs_down', layerId: 'floor2' }
    ]
  },
  // 4
  {
    id: 'brixley_talent',
    name: 'The Spider / Brixley talent time',
    width: 2160,
    height: 3840,
    description: 'The Spider is the fourth playable mission in Ready or Not. Hard drives seized during a raid on the apartment of Michael Williams contained child pornography which implicated Brixley\'s Talent Time in a child pornography ring. On December 21, 2025, D-Platoon have been dispatched to serve a high risk arrest warrant for George Brixley. Seemingly unaware of this development, Brixley continues to groom potential clients - But, forever unwilling to take any chances, has hired several low lives as armed security. Alerted by the arrival of the LSPD, Brixley and his men have barricaded themselves inside, holding several civilians hostage.',
    layers: [
      { id: 'roof', name: 'Roof', imageUrl: '/maps/4_brixley_talent/brixley_talent_floor1.png', visible: false, zIndex: 1 },
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/4_brixley_talent/brixley_talent_ground.png', visible: true, zIndex: 2, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 44.41, y: 32.18, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' },
      { id: 'new-1763584081493', x: 61.47, y: 57.21, title: 'Apprehend George Brixley', description: 'Apprehend and secure the owner of Brixley Talent Time. Usually located in his office, but maybe be in other areas of the building.', type: 'hard_objective', layerId: 'ground' },
      { id: 'new-1763584195494', x: 51.26, y: 51.16, title: 'To Roof', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763584202442', x: 55.17, y: 66.77, title: 'To Roof', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763584217833', x: 47.18, y: 58.33, title: 'To Ground Floor', type: 'stairs_down', layerId: 'roof' },
      { id: 'new-1763584227166', x: 50.88, y: 83.35, title: 'To Grounf Floor', type: 'stairs_down', layerId: 'roof' }
    ]
  },
  // 5
  {
    id: 'sullivans_slope',
    name: 'A lethal obsession / Sullivan\'s Slope',
    width: 1080,
    height: 1920,
    description: 'A Lethal Obsession is the fifth mission in Ready or Not. Gerard Scott, 55, a former USIA analyst, waited out the front of East Makade Police Department with a loaded Mini-14 after setting a car alight on the street in front of the department. He then shot at officers while they attempted to extinguish the alighted vehicle. Witnesses on the street reported his vehicle as he drove away. On August 20, 2025, D Platoon is sent to service his warrant. ',
    layers: [
      { id: 'floor2', name: 'Second Floor', imageUrl: '/maps/5_sullivans_slope/Sullivans slope_floor2.png', visible: false, zIndex: 1 },
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/5_sullivans_slope/Sullivans slope_floor1.png', visible: false, zIndex: 2 },
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/5_sullivans_slope/Sullivans slope_ground.png', visible: true, zIndex: 3, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 48.57, y: 88.65, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' },
      { id: 'm2', x: 50.17, y: 52.13, title: 'Arrest Gerard Scott', description: 'Apprehend and secure the prime suspect - Gerard Scott. He is usually located somwere incide apartment and wears armored suite', type: 'hard_objective', layerId: 'ground' },
      { id: 'm3', x: 46.18, y: 71.03, title: 'Report Stolen Federal Documents', description: 'Locate missing federal documents, found on the suspect\'s property', type: 'soft_objective', layerId: 'floor1' },
      { id: 'm4', x: 47.23, y: 69.53, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'm5', x: 44.75, y: 60.79, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'm6', x: 49.46, y: 24.04, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'm7', x: 52.19, y: 91.37, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'm8', x: 43.42, y: 76.27, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'm9', x: 49.02, y: 51.12, title: 'To Second Floor', type: 'stairs_up', layerId: 'floor1' },
      { id: 'm10', x: 55.18, y: 11.86, title: 'To Second Floor', type: 'stairs_up', layerId: 'floor1' },
      { id: 'm11', x: 48.97, y: 53.61, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2' },
      { id: 'm12', x: 50.19, y: 6.3, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2' },
      { id: 'm13', x: 48.06, y: 46.56, title: 'Speaker', type: 'comms', layerId: 'ground' },
      { id: 'm14', x: 47.83, y: 52.29, title: 'Speaker', type: 'comms', layerId: 'ground' },
      { id: 'm15', x: 46.38, y: 47.71, title: 'Speaker', type: 'comms', layerId: 'floor1' },
      { id: 'm16', x: 62.24, y: 72.07, title: 'Speaker', type: 'comms', layerId: 'floor1' },
      { id: 'm17', x: 54.08, y: 45.69, title: 'Speaker', type: 'comms', layerId: 'floor2' },
      { id: 'm18', x: 45.06, y: 76.75, title: 'Speaker', type: 'comms', layerId: 'floor2' },
      { id: 'm19', x: 54.87, y: 67.04, title: 'Speaker', type: 'comms', layerId: 'floor2' }
    ]
  },
  // 6
  {
    id: 'brisa_cove',
    name: 'Ides of march / Brisa Cove',
    width: 1080,
    height: 1920,
    description: 'Ides of March is the sixth playable mission in Ready or Not. A group of domestic terrorists have occupied the luxury Brisa Cove Apartments, taking several residents hostage. On October 1, 2025, D-Platoon have been dispatched to neutralize the threat and defuse the situation ahead of the Senator\'s upcoming presidential campaign.',
    layers: [
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/6_brisa_cove/brisa_cove_ground.png', visible: true, zIndex: 1, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 51.45, y: 70.77, title: 'Fire exit', description: 'Fire exit', type: 'spawn', layerId: 'ground' },
      { id: 'm2', x: 39.27, y: 28.08, title: 'Residential staircase', description: 'Residential staircase', type: 'spawn', layerId: 'ground' },
      { id: 'new-1763584553958', x: 60.67, y: 72, title: 'Locate Sniper Rifle in Room 1204', description: 'Find the rifle on the southern side of the building, where a sniper killed multiple civilians from the hotel window', type: 'hard_objective', layerId: 'ground' },
      { id: 'new-1763584575356', x: 41.39, y: 27.48, title: 'Locate Sniper Rifle in Room 1201', description: 'Find the rifle on the northern side of the building, where a sniper killed two officers and three civilians', type: 'hard_objective', layerId: 'ground' },
      { id: 'new-1763584593460', x: 50.67, y: 36.14, title: 'Find the Music Producer', description: 'Locate Laurie, resident of apartment 1202. Usually in main room hiding in wardrobe or under bed or in his music studio.', type: 'hard_objective', layerId: 'ground' },
      { id: 'new-1763584608532', x: 61.22, y: 52.28, title: 'Find the Retired Navy Officer', description: 'Locate the \'Sailor\', resident of apartment 1203', type: 'hard_objective', layerId: 'ground' }
    ]
  },
  // 7
  {
    id: 'mindjot',
    name: 'Sinuous trail / Mindjot data center',
    width: 1080,
    height: 1920,
    description: 'Sinuous Trail is the seventh playable mission in Ready or Not. On December 15, 2025, D-Platoon have been dispatched to serve a high risk search warrant at a Mindjot Datacenter suspected of being used by a child pornography ring.',
    layers: [
      { id: 'floor2', name: 'Second Floor', imageUrl: '/maps/7_mindjot/mindjot_floor2.png', visible: false, zIndex: 1 },
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/7_mindjot/mindjot_floor1.png', visible: false, zIndex: 2 },
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/7_mindjot/mindjot_ground.png', visible: true, zIndex: 3, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 48.24, y: 67.39, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' },
      { id: 'new-1763589015787', x: 61.62, y: 28.84, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763589033444', x: 46, y: 30.6, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763589080970', x: 52.84, y: 30.64, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763589239364', x: 32.45, y: 41.08, title: 'To Second Floor', type: 'stairs_up', layerId: 'floor1' },
      { id: 'new-1763589256916', x: 31.93, y: 24.48, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'new-1763589267737', x: 48.55, y: 23.81, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'new-1763589278200', x: 72.46, y: 18.92, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'new-1763589289213', x: 36.69, y: 55.6, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2' }
    ]
  },
  // 8
  {
    id: 'kawayu_beach',
    name: 'Ends of the earth / Kawayu beach',
    width: 1080,
    height: 1920,
    description: 'Ends of the Earth is the eighth mission in Ready or Not. On December 3, 2025, the LSPD raid a home on the beachfront for distributing and illegally modifying weapons.',
    layers: [
      { id: 'floor2', name: 'Second Floor', imageUrl: '/maps/8_kawayu_beach/kawayu_beach_floor2.png', visible: false, zIndex: 1 },
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/8_kawayu_beach/kawayu_beach_floor1.png', visible: false, zIndex: 2 },
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/8_kawayu_beach/kawayu_beach_ground.png', visible: true, zIndex: 3, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 36.5, y: 14.48, title: 'Street', description: 'Street', type: 'spawn', layerId: 'ground' },
      { id: 'm2', x: 66.26, y: 95.18, title: 'Beach', description: 'Beach', type: 'spawn', layerId: 'ground' },
      { id: 'new-1763584846101', x: 45.71, y: 23.67, title: 'Locate Weapon Manufactory', description: 'Find the weapon manufactory, the suspects were using to design and modify home built weaponry', type: 'hard_objective', layerId: 'floor2' },
      { id: 'new-1763584869510', x: 49.33, y: 27.55, title: 'Report Bag of Money', description: 'Locate bag of cash as evidence of selling illegal firearms', type: 'soft_objective', layerId: 'floor1' },
      { id: 'new-1763588687122', x: 51.97, y: 43.99, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763588699343', x: 44.75, y: 37.41, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763588715684', x: 55.13, y: 46.9, title: 'To Second Floor', type: 'stairs_up', layerId: 'floor1' },
      { id: 'new-1763588737019', x: 52.77, y: 47.72, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'new-1763588746121', x: 39.66, y: 34.57, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'new-1763588759542', x: 52.69, y: 46.68, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2' }
    ]
  },
  // 9
  {
    id: 'los_suenos_postal',
    name: 'Greased palms / Los Suenos Postal Service',
    width: 1080,
    height: 1920,
    description: 'Greased Palms is the ninth mission in Ready Or Not. On October 25, 2025, the Los Suenos Police Department responds to a shoot out at the Los Suenos Postal Service, and is ordered to arrest a weapons smuggler suspect.',
    layers: [
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/9_los_suenos_postal/los_suenos_postal_floor1.png', visible: false, zIndex: 1 },
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/9_los_suenos_postal/los_suenos_postal_ground.png', visible: true, zIndex: 2, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 43.71, y: 67.41, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' },
      { id: 'new-1763585490515', x: 46.38, y: 44.36, title: 'Arrest FISA Agent Adams', description: 'Apprehend and secure the prime suspect, FISA agent, Jack Adams. Usually located in the his office on the ground floor. Sometimes you can find him on backyard', type: 'hard_objective', layerId: 'ground' },
      { id: 'new-1763585505237', x: 53.2, y: 60.9, title: 'Arrest Maria Lopez', description: 'Apprehend and secure postal worker, Maria Lopez. Presumed to be working with our prime suspect. Usually located in the mail sorting area on the ground floor.', type: 'hard_objective', layerId: 'ground' },
      { id: 'new-1763585534649', x: 52.96, y: 49.38, title: 'Find Eugene Gomez', description: 'Locate the civilian, Eugene Gomez, who is believed to have information that may help the investigation', type: 'hard_objective', layerId: 'ground' },
      { id: 'new-1763585546165', x: 44.76, y: 43.54, title: 'Locate the FISA Office', description: 'Find the FISA Office within the Postal facility', type: 'hard_objective', layerId: 'ground' },
      { id: 'new-1763585562550', x: 45.98, y: 47.6, title: 'Report Suspected Shooter', description: 'Locate the incapacitated suspect, responsible for shooting an LSPD officer outside the Postal office', type: 'soft_objective', layerId: 'ground' },
      { id: 'new-1763585577024', x: 52.04, y: 33.26, title: 'Report Weapons Cache', description: 'Locate a cache of illegal firearms in the Postal facility loading bay', type: 'soft_objective', layerId: 'ground' },
      { id: 'new-1763585972033', x: 44.1, y: 54.77, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763585985414', x: 47.71, y: 43.14, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763586144602', x: 40.59, y: 74.54, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'new-1763586154529', x: 62.77, y: 12.61, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' }
    ]
  },
  // 10
  {
    id: 'voll_health_house',
    name: 'Valley of the Dolls / Voll Health house',
    width: 1080,
    height: 1920,
    description: 'Valley of the Dolls is the tenth playable mission in Ready or Not. The LSPD\'s cyber-crime team has found a lead pertaining to the person profiting from the illegal child-pornography ring operating in Los Sueños. Amos Voll owns a health house at 1962 Irwin Drive, Los Clemente, which is guarded by the security company, Bolton Security. With Amos\'s daughter, Janey Voll, having her 18th birthday, the LSPD decide to raid the home. This level takes place on January 5, 2026, making it the sixteenth mission chronologically.',
    layers: [
      { id: 'floor2', name: 'Second Floor', imageUrl: '/maps/10_voll_health_house/voll_health_house_floor2.png', visible: true, zIndex: 1, isDefault: true },
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/10_voll_health_house/voll_health_house_floor1.png', visible: false, zIndex: 2 },
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/10_voll_health_house/voll_health_house_ground.png', visible: false, zIndex: 3 },
      { id: 'underground', name: 'Underground', imageUrl: '/maps/10_voll_health_house/voll_health_house_underground.png', visible: false, zIndex: 4 }
    ],
    markers: [
      { id: 'm1', x: 52.94, y: 88.28, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'floor2' },
      { id: 'new-1763586448692', x: 41.6, y: 24.19, title: 'Report Prohibited Video Tapes of Minors', description: 'Locate indecent and prohibited videos of minors in the master bedroom of the Voll property', type: 'soft_objective', layerId: 'floor2' },
      { id: 'new-1763586480453', x: 46.47, y: 63.86, title: 'Report Prohibited Images of Minors', description: 'Locate indecent and prohibited images of minors in the basement of the Voll property', type: 'soft_objective', layerId: 'underground' },
      { id: 'new-1763586506365', x: 50.46, y: 51.23, title: 'Locate Voll\'s Office Computer', description: 'Find and seize the laptop and hard drives belonging to Amos Voll, for any potentially incriminating evidence', type: 'hard_objective', layerId: 'floor1' },
      { id: 'new-1763586526329', x: 46.34, y: 50.56, title: 'Arrest Amos Voll', description: 'Apprehend and secure the prime suspect, Amos Voll. Usually located on first floor of his house, but maybe be in other areas of the building.', type: 'hard_objective', layerId: 'ground' },
      { id: 'new-1763586831750', x: 53.11, y: 8.21, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2' },
      { id: 'new-1763586842285', x: 58.74, y: 62.44, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2' },
      { id: 'new-1763586904948', x: 49.33, y: 41.22, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'new-1763586918795', x: 58.49, y: 64.83, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'new-1763586945645', x: 63.66, y: 66.47, title: 'To Second Floor', type: 'stairs_up', layerId: 'floor1' },
      { id: 'new-1763586955430', x: 55.13, y: 26.28, title: 'To Second Floor', type: 'stairs_up', layerId: 'floor1' },
      { id: 'new-1763587046204', x: 52.48, y: 76.63, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763587057703', x: 43.36, y: 51.01, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763587072104', x: 37.44, y: 45.85, title: 'To Underground', type: 'stairs_down', layerId: 'ground' },
      { id: 'new-1763587081288', x: 57.06, y: 26.88, title: 'To Underground', type: 'stairs_down', layerId: 'ground' },
      { id: 'new-1763587098446', x: 36.93, y: 51.08, title: 'To Ground Floor', type: 'stairs_up', layerId: 'underground' },
      { id: 'new-1763587108620', x: 60.42, y: 34.95, title: 'To Ground Floor', type: 'stairs_up', layerId: 'underground' }
    ]
  },
  // 11
  {
    id: 'watt_college',
    name: 'Elephant / Watt Community college',
    width: 1080,
    height: 1920,
    description: 'Elephant is the eleventh (ninth chronologically) playable mission in Ready or Not. On October 17, 2025, four students commit a mass-shooting at Watt Community College, presumably due to a mixture of mental health issues and immense dissatisfaction with the current state of the United States. LSPD is able to contain the shooters in the Science Wing and D Platoon is sent in to neutralize the threat.',
    layers: [
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/11_watt_college/watt_college_floor1.png', visible: false, zIndex: 1 },
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/11_watt_college/watt_college_ground.png', visible: true, zIndex: 2, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 41.83, y: 69.52, title: 'Southern Entrance', description: 'Southern Entrance', type: 'spawn', layerId: 'ground' },
      { id: 'm2', x: 59.76, y: 33.96, title: 'Northern Exit', description: 'Northern Exit', type: 'spawn', layerId: 'ground' },
      { id: 'new-1763587500012', x: 44.14, y: 52.06, title: 'Possible bomb location', description: 'Deactivate any bombs at the scene', type: 'hard_objective', layerId: 'ground' },
      { id: 'new-1763587513533', x: 39.73, y: 43.85, title: 'Possible bomb location', description: 'Deactivate any bombs at the scene', type: 'hard_objective', layerId: 'ground' },
      { id: 'new-1763587522125', x: 48.98, y: 44.98, title: 'Possible bomb location', description: 'Deactivate any bombs at the scene', type: 'hard_objective', layerId: 'ground' },
      { id: 'new-1763587823690', x: 41.22, y: 42.2, title: 'Possible bomb location', description: 'Deactivate any bombs at the scene', type: 'hard_objective', layerId: 'floor1' },
      { id: 'new-1763587851831', x: 40.76, y: 39.09, title: 'Possible bomb location', description: 'Deactivate any bombs at the scene', type: 'hard_objective', layerId: 'ground' },
      { id: 'new-1763587891615', x: 59.58, y: 49.31, title: 'Possible bomb location', description: 'Deactivate any bombs at the scene', type: 'hard_objective', layerId: 'floor1' },
      { id: 'new-1763587618621', x: 51.46, y: 53.36, title: 'Report downed security guy', description: 'Report downed security guy', type: 'soft_objective', layerId: 'ground' },
      { id: 'new-1763588057439', x: 37, y: 51.43, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763588064008', x: 42.27, y: 50.1, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763588069627', x: 46.1, y: 50.14, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763588084108', x: 49.56, y: 51.93, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763588089667', x: 56.89, y: 49.27, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763588101736', x: 40.71, y: 40.89, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763588204922', x: 37.27, y: 55.27, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'new-1763588211196', x: 42.23, y: 39.06, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'new-1763588217506', x: 43.95, y: 50.78, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'new-1763588222429', x: 48.28, y: 50.78, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'new-1763588227608', x: 52.06, y: 51.83, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'new-1763588235649', x: 61.13, y: 49.89, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' }
    ]
  },
  // 12
  {
    id: 'costa_vino',
    name: 'Rust Belt / Costa Vino Border Reserve',
    width: 1080,
    height: 1920,
    description: 'Rust Belt is the twelfth mission in Ready or Not. On October 15, 2025, D Platoon raid a coyote stash house on the Mexican border.',
    layers: [
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/12_costa_vino/costa_vino_ground.png', visible: true, zIndex: 1, isDefault: true },
      { id: 'underground', name: 'Underground', imageUrl: '/maps/12_costa_vino/costa_vino_underground.png', visible: false, zIndex: 2 }
    ],
    markers: [
      { id: 'm1', x: 53.49, y: 84.99, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' },
      { id: 'new-1763588334485', x: 51.97, y: 15.23, title: 'Report Confiscated Passports', description: 'Locate confiscated Mexican passports in the ranch house', type: 'soft_objective', layerId: 'ground' },
      { id: 'new-1763588356187', x: 47.81, y: 4.77, title: 'To Undeground', type: 'stairs_down', layerId: 'ground' },
      { id: 'new-1763588384694', x: 50.58, y: 94.4, title: 'To Ground Floor', type: 'stairs_up', layerId: 'underground' },
      { id: 'new-1763588405153', x: 49.16, y: 7.84, title: 'Report Access Tunnel Barge', description: 'Locate a barge in the underground cavern that Los Locos use as means to traffic goods across the border', type: 'soft_objective', layerId: 'underground' }
    ]
  },
  // 13
  {
    id: 'clemente_hotel',
    name: 'Sins Of The Father / Clemente Hotel',
    width: 1080,
    height: 1920,
    description: 'Sins of The Father is the thirteenth mission in Ready or Not. On October 2, 2025, rogue Secret Service agents sympathetic to the plight of The Left Behind, have occupied the fourteenth floor of the Clemente Hotel, threatening to execute Senator Fremont\'s family on video. D Platoon is dispatched to neutralize the terrorists before they can carry out their threat.',
    layers: [
      { id: 'roof', name: 'Roof', imageUrl: '/maps/13_clemente_hotel/clemente_hotel_roof.png', visible: false, zIndex: 1 },
      { id: 'floor2', name: 'Second Floor', imageUrl: '/maps/13_clemente_hotel/clemente_hotel_floor2.png', visible: false, zIndex: 2 },
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/13_clemente_hotel/clemente_hotel_floor1.png', visible: true, zIndex: 3, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 36.93, y: 50.71, title: 'Balcony', description: 'Balcony', type: 'spawn', layerId: 'floor1' },
      { id: 'm2', x: 61.76, y: 51.01, title: 'Elevator', description: 'Elevator', type: 'spawn', layerId: 'floor1' },
      { id: 'm3', x: 55.8, y: 40.77, title: 'Rooftop', description: 'Rooftop', type: 'spawn', layerId: 'roof' },
      { id: 'new-1763588555836', x: 41.09, y: 55.64, title: 'Report downed civilian', description: 'Report downed civilian', type: 'soft_objective', layerId: 'floor1' },
      { id: 'new-1763589556825', x: 60.8, y: 41.81, title: 'To Second Floor', type: 'stairs_up', layerId: 'floor1' },
      { id: 'new-1763589570220', x: 43.85, y: 39.2, title: 'To Second Floor', type: 'stairs_up', layerId: 'floor1' },
      { id: 'new-1763589581057', x: 54.68, y: 53.23, title: 'To Second Floor', type: 'stairs_up', layerId: 'floor1' },
      { id: 'new-1763589602803', x: 51.97, y: 54.35, title: 'To Roof', type: 'stairs_up', layerId: 'floor2' },
      { id: 'new-1763589638176', x: 53.66, y: 54.35, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2' },
      { id: 'new-1763589647543', x: 42.32, y: 39.62, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2' },
      { id: 'new-1763589656208', x: 60.68, y: 42.29, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2' },
      { id: 'new-1763589670036', x: 42.21, y: 81.41, title: 'To Second Floor', type: 'stairs_down', layerId: 'roof' }
    ]
  },
  // 14
  {
    id: 'neon_nightclub',
    name: 'Neon Tomb / Neon Nightclub',
    width: 1080,
    height: 1920,
    description: 'Neon Tomb is the fourteenth playable mission in Ready or Not. The terrorist group, The Hand, has committed a mass shooting at the Neon Nightclub in response to US airstrikes targeting their shelters in Northern Yemen. D Platoon has been dispatched to bring an end to the massacre. The mission takes place on April 19, 2025, making it the chronologically second mission in the story. The attack killed approximately 60 people.',
    layers: [
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/14_neon_nightclub/neon_nightclub_floor1.png', visible: false, zIndex: 1 },
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/14_neon_nightclub/neon_nightclub_ground.png', visible: true, zIndex: 2, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 61.18, y: 90.52, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' },
      { id: 'new-1763589986533', x: 47.39, y: 45.33, title: 'Arrest Qadamah', description: 'Apprehend and secure the leader of the group "The Hand", "Qadamah". Located somwhere in Nightclub.', type: 'hard_objective', layerId: 'ground' },
      { id: 'new-1763590010085', x: 35.97, y: 46.6, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763590018701', x: 41.43, y: 18.89, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763590032057', x: 53.91, y: 34.35, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763590062873', x: 37.31, y: 55.19, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'new-1763590074779', x: 41.51, y: 27.18, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'new-1763590084194', x: 53.11, y: 41.3, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' }
    ]
  },
  // 15
  {
    id: 'ceasars_cars_dealership',
    name: 'Buy Cheap, Buy Twice / Ceasar\'s Cars Dealership',
    width: 1080,
    height: 1920,
    description: 'Buy Cheap, Buy Twice is the fifteenth playable mission in Ready or Not. It takes place on February 10, 2026 at a rather large car dealership beside an extremely run down street, in which both Los Locos and the Russian Mafia have made a base for themselves. The map consists of three main areas ; The interior of the two-floor dealership, the car lot outside, and the mechanic shop behind the dealership. Enemies can be found in any of these. A few civilians are also present.',
    layers: [
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/15_ceasars_cars_dealership/ceasars_cars_dealership_floor1.png', visible: false, zIndex: 1 },
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/15_ceasars_cars_dealership/ceasars_cars_dealership_ground.png', visible: true, zIndex: 2, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 65.25, y: 86.19, title: 'Street', description: 'Street', type: 'spawn', layerId: 'ground' },
      { id: 'm2', x: 24.29, y: 80.36, title: 'Back alley', description: 'Back alley', type: 'spawn', layerId: 'ground' },
      { id: 'new-1763590428860', x: 64.79, y: 15.45, title: 'Report Contraband in Storage', description: 'Locate narcotics and illegal firearms in the garages and storage room', type: 'soft_objective', layerId: 'ground' },
      { id: 'new-1763590445813', x: 51.47, y: 22.7, title: 'Report Trafficking Records', description: 'Locate evidence concerning organised criminal behaviour including records of human trafficking', type: 'soft_objective', layerId: 'ground' },
      { id: 'new-1763590591787', x: 42.35, y: 22.4, title: 'Locate Undercover Officer', description: 'Locate undercover Officer Brian, restrained and killed in the meeting room', type: 'hard_objective', layerId: 'floor1' },
      { id: 'new-1763590728072', x: 20.29, y: 46, title: 'To First Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'new-1763590741145', x: 74.29, y: 19.86, title: 'To First Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'new-1763590763148', x: 43.4, y: 40.33, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763590776604', x: 56.64, y: 34.43, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' }
    ]
  },
  // 16
  {
    id: 'cherryessa_farm',
    name: 'Carriers of the vine / Cherryessa Farm',
    width: 1080,
    height: 1920,
    description: 'Carriers of the Vine is the sixteenth mission in Ready or Not. It has D Platoon being dispatched on June 1, 2025, to pacify a new age cult committing acts of vigilantism across Los Suenos.',
    layers: [
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/16_cherryessa_farm/cherryessa_farm_floor1.png', visible: false, zIndex: 1 },
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/16_cherryessa_farm/cherryessa_farm_ground.png', visible: true, zIndex: 2, isDefault: true },
      { id: 'underground', name: 'Underground', imageUrl: '/maps/16_cherryessa_farm/cherryessa_farm_underground.png', visible: false, zIndex: 3 }
    ],
    markers: [
      { id: 'm1', x: 60.67, y: 92.84, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' },
      { id: 'new-1763591194381', x: 43.02, y: 37.26, title: 'Possible main target location', description: 'Arrest Elaine Raskin  and Arrest Eve Nader', type: 'hard_objective', layerId: 'ground' },
      { id: 'new-1763591216067', x: 57.39, y: 36.96, title: 'Possible main target location', description: 'Arrest Elaine Raskin  and Arrest Eve Nader', type: 'hard_objective', layerId: 'ground' },
      { id: 'new-1763591230605', x: 56.81, y: 66.02, title: 'Report Conspiracy Evidence', description: 'Locate evidence for conspiracy to commit murder, of still missing persons', type: 'soft_objective', layerId: 'ground' },
      { id: 'new-1763591301057', x: 48.15, y: 8.58, title: 'Possible main target location', description: 'Arrest Elaine Raskin  and Arrest Eve Nader', type: 'hard_objective', layerId: 'ground' },
      { id: 'new-1763591440049', x: 42.18, y: 49.59, title: 'To Undeground', type: 'stairs_down', layerId: 'ground' },
      { id: 'new-1763591499749', x: 45.5, y: 37.49, title: 'To Undeground', type: 'stairs_down', layerId: 'ground' },
      { id: 'new-1763591499749', x: 44, y: 37.49, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763591989132', x: 38.87, y: 33.23, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'new-1763592013283', x: 47.31, y: 15.38, title: 'To Church Undeground', type: 'stairs_down', layerId: 'ground' },
      { id: 'new-1763592030275', x: 48.57, y: 4.1, title: 'To Church Undegraund', type: 'stairs_down', layerId: 'ground' },
      { id: 'new-1763592134064', x: 50.71, y: 26.13, title: 'To Church Ground', type: 'stairs_up', layerId: 'underground' },
      { id: 'new-1763592144870', x: 49.71, y: 37.34, title: 'To Ground Floor', type: 'stairs_up', layerId: 'underground' },
      { id: 'new-1763592158656', x: 44.58, y: 71.77, title: 'To Ground Floor', type: 'stairs_up', layerId: 'underground' },
      { id: 'new-1763592166249', x: 47.39, y: 59.75, title: 'To Ground Floor', type: 'stairs_up', layerId: 'underground' }
    ]
  },
  // 17
  {
    id: 'medical_center',
    name: 'Relapse / Coastal grove medical center',
    width: 1080,
    height: 1920,
    description: 'Relapse is the penultimate and seventeenth mission in Ready or Not. The mission takes place on May 8, 2025, as the third mission chronologically about 3 weeks after Neon Tomb. A leader of The Hand who took part in the shooting at the Neon Nightclub is taken into medical care. The group storms the Coastal Grove Medical Center in an attempt to prevent the suspect from being taken into police custody. The LSPD\'s SWAT team is deployed to intercept the cell.',
    layers: [
      { id: 'floor2', name: 'Second Floor', imageUrl: '/maps/17_medical_center/medical_center_floor2.png', visible: false, zIndex: 1 },
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/17_medical_center/medical_center_floor1.png', visible: false, zIndex: 2 },
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/17_medical_center/medical_center_ground.png', visible: true, zIndex: 3, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 37.1, y: 92.17, title: 'Hospital main lobby', description: 'Hospital main lobby', type: 'spawn', layerId: 'ground' },
      { id: 'm2', x: 59.2, y: 10.97, title: 'Underground parking lot entrance', description: 'Underground parking lot entrance', type: 'spawn', layerId: 'ground' },
      { id: 'new-1763593144209', x: 39.5, y: 30.62, title: 'Bomb Location', description: 'Defuse the Bomb Threats', type: 'hard_objective', layerId: 'floor2' },
      { id: 'new-1763593152406', x: 52.44, y: 74.91, title: 'Bomb Location', description: 'Defuse the Bomb Threats', type: 'hard_objective', layerId: 'floor2' },
      { id: 'new-1763593382520', x: 51.03, y: 57.49, title: 'Arrest Zahir Asadullah', description: 'Ususally located in MRI room with hostage.', type: 'hard_objective', layerId: 'floor1' },
      { id: 'new-1763592562113', x: 45.34, y: 21.2, title: 'To Second Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763592575309', x: 54.92, y: 41.52, title: 'To Second Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763592604321', x: 62.18, y: 65.87, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763592620995', x: 54.62, y: 68.41, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763592672354', x: 46.34, y: 46.97, title: 'To First Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'new-1763592696354', x: 55, y: 44.96, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'new-1763592709972', x: 57.06, y: 44.96, title: 'To Second Floor', type: 'stairs_up', layerId: 'floor1' },
      { id: 'new-1763593171937', x: 52.14, y: 45.93, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2' },
      { id: 'new-1763593183727', x: 37.6, y: 16.42, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2' },
      { id: 'new-1763593206565', x: 49.45, y: 86.94, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2' },
      { id: 'new-1763593217055', x: 65.04, y: 75.88, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2' }
    ]
  },
  // 18
  {
    id: 'port',
    name: 'Hide And Seek / Port Hokan',
    width: 1080,
    height: 1920,
    description: 'Hide and Seek is the last and eighteenth mission in Ready or Not. On February 18, 2026, the LSPD, along with the FISA and ATF, are inserted into Port Hokan to shut down a major arms distribution operation.',
    layers: [
      { id: 'floor2', name: 'Second Floor', imageUrl: '/maps/18_port/port_floor2.png', visible: false, zIndex: 1 },
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/18_port/port_floor1.png', visible: false, zIndex: 2 },
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/18_port/port_ground.png', visible: true, zIndex: 3, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 37.62, y: 91.12, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' },
      { id: 'new-1763593557296', x: 41.93, y: 62.57, title: 'Possible Weapon Storage Container', description: 'Alternativley may contain Illegal Drugs Storage Container (soft oblective)', type: 'hard_objective', layerId: 'ground' },
      { id: 'new-1763593563833', x: 51.57, y: 61.28, title: 'Possible Weapon Storage Container', description: 'Alternativley may contain Illegal Drugs Storage Container (soft oblective)', type: 'hard_objective', layerId: 'ground' },
      { id: 'new-1763593572697', x: 56.36, y: 64.32, title: 'Possible Weapon Storage Container', description: 'Alternativley may contain Illegal Drugs Storage Container (soft oblective)', type: 'hard_objective', layerId: 'ground' },
      { id: 'new-1763593595107', x: 49.44, y: 42.31, title: 'Report Missing Persons', description: 'Locate missing persons, hidden and caged in an orange container, marked with a spider. Evidence of human trafficking', type: 'soft_objective', layerId: 'ground' },
      { id: 'new-1763593662864', x: 51.79, y: 9.36, title: 'Report Auction Room Laptops', description: 'Locate personal computers of potential suspects, found in the warehouse auction room, that could contain further evidence of criminal activity', type: 'soft_objective', layerId: 'ground' },
      { id: 'new-1763593936641', x: 55.5, y: 37.11, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763593949821', x: 58.24, y: 29.05, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763593968411', x: 51, y: 55.6, title: 'To Second Floor', type: 'stairs_up', layerId: 'floor1' },
      { id: 'new-1763593985502', x: 48.76, y: 51.06, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'new-1763593993869', x: 51.55, y: 43.62, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'new-1763594001654', x: 51.57, y: 48.13, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'new-1763594018136', x: 50.75, y: 47.16, title: 'To Second Floor', type: 'stairs_down', layerId: 'floor2' },
      { id: 'new-1763594040145', x: 58.24, y: 32.35, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' }
    ]
  },
  // 19
  {
    id: 'greenside_dormitories',
    name: 'Dorms / Greenside dormitories',
    width: 3840,
    height: 2715,
    description: 'Dorms is a DLC mission in Ready or Not. Mass amounts of homeless people and drug addicts are seeking shelter in the abandoned Greenside Dormitories. Due to the structural instability and the location\'s history of attracting troublemakers, LSPD attempted to clear the building. However, the occupants resisted and an officer was shot in the leg; whether this was intentional or not is unknown. Other units are unavailable due to the current situation in the city, so SWAT is responsible for clearing the people out of the building.',
    layers: [
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/19_greenside_dormitories/greenside_dormitories_floor1.png', visible: false, zIndex: 1 },
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/19_greenside_dormitories/greenside_dormitories_ground.png', visible: true, zIndex: 2, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 15.29, y: 46.68, title: 'North exit', description: 'North exit', type: 'spawn', layerId: 'ground' },
      { id: 'm2', x: 83.61, y: 74.31, title: 'South exit', description: 'South exit', type: 'spawn', layerId: 'ground' },
      { id: 'new-1763594309495', x: 80.84, y: 51.95, title: 'Report Drug Paraphernalia', description: 'Report proof of drug use found in the building. (on lectern)', type: 'soft_objective', layerId: 'floor1' },
      { id: 'new-1763594238485', x: 55.93, y: 32.45, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763594247044', x: 19.37, y: 57.51, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763594286909', x: 15.27, y: 62.74, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'new-1763594295516', x: 53.55, y: 31.12, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' }
    ]
  },
  // 20
  {
    id: '25_hope_street',
    name: 'Narcos / 25 Hope Street, 213 Park',
    width: 3840,
    height: 2715,
    description: 'Narcos is a DLC mission in Ready or Not. Agent Mike Esperanza has had his cover blown and Los Locos have arrived at his home to torture and kill him. Screams loud enough to alert the entire neighbourhood have caused an LSPD response. Patrol officers are stretched thin due to Hurricane Antonio, so LSPD SWAT is called to the scene. Meanwhile, Esperanza has escaped his captors and has fled to a different place in the neighbourhood, warranting the Los Locos to search the neighbourhood to find him.',
    layers: [
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/20_25_hope_street/25_hope_street_ground.png', visible: true, zIndex: 2, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 46.81, y: 88.8, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' },
      { id: 'new-1763594661385', x: 56.55, y: 72.89, title: 'Find the hidden documents', description: 'Locate the LSPD documents hidden in the house', type: 'soft_objective', layerId: 'ground' },
      { id: 'new-1763594676754', x: 52.86, y: 76.11, title: 'Reported Crime scene', description: 'The informant\'s home has been ransacked, with signs of a struggle', type: 'soft_objective', layerId: 'ground' },
      { id: 'new-1763594706638', x: 51.81, y: 25.09, title: 'Possible Informant location', description: 'Locate and secure the Informant', type: 'hard_objective', layerId: 'ground' },
      { id: 'new-1763594715286', x: 48.23, y: 15.83, title: 'Possible Informant location', description: 'Locate and secure the Informant', type: 'hard_objective', layerId: 'ground' },
      { id: 'new-1763594721080', x: 63.7, y: 21.8, title: 'Possible Informant location', description: 'Locate and secure the Informant', type: 'hard_objective', layerId: 'ground' },
      { id: 'new-1763594755272', x: 60.29, y: 55.71, title: 'Dead Dog', description: 'Dead Dog', type: 'soft_objective', layerId: 'ground' }
    ]
  },
  // 21
  {
    id: '155_playa_vista_lane',
    name: 'Lawmaker / 155 Playa Vista Lane, Colina Beach',
    width: 3840,
    height: 2715,
    description: 'Lawmaker is a DLC level in Ready or Not. Members of the United Planet Front - an eco-terrorist group - have invaded the home of Sven Anderson-Lincoln - a wealthy lobbyist with connections to the oil industry. No civilians have been killed but many have been taken hostage. SWAT is deployed to rescue the hostages. ',
    layers: [
      { id: 'floor2', name: 'Second Floor', imageUrl: '/maps/21_155_playa_vista_lane/155_playa_vista_lane_floor2.png', visible: false, zIndex: 1 },
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/21_155_playa_vista_lane/155_playa_vista_lane_floor1.png', visible: false, zIndex: 2 },
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/21_155_playa_vista_lane/155_playa_vista_lane_ground.png', visible: true, zIndex: 3, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 40.34, y: 94.26, title: 'Main entrance', description: 'Main entrance', type: 'spawn', layerId: 'ground' },
      { id: 'm2', x: 43.87, y: 8.06, title: 'Back entrance', description: 'Back entrance', type: 'spawn', layerId: 'ground' },
      { id: 'm3', x: 80.92, y: 46.15, title: 'Side entrance', description: 'Side entrance', type: 'spawn', layerId: 'ground' },
      { id: 'new-1763594940892', x: 40, y: 57.28, title: 'Possible Active Panic Room', description: 'Rescue the family, located inside the panic room', type: 'hard_objective', layerId: 'floor2' },
      { id: 'new-1763594949028', x: 55.55, y: 61.99, title: 'Possible Active Panic Room', description: 'Rescue the family, located inside the panic room', type: 'hard_objective', layerId: 'floor1' },
      { id: 'new-1763594983799', x: 29.83, y: 66.69, title: 'Rescue Sven Anderson-Lincoln', description: 'Rescue the owner of the house, Sven Anderson-Lincoln. Usually located in his office on the first floor.', type: 'hard_objective', layerId: 'floor1' },
      { id: 'new-1763595117273', x: 20.71, y: 44.06, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763595126223', x: 39.54, y: 56.61, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763595138347', x: 62.14, y: 19.49, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763595157300', x: 33.07, y: 63.33, title: 'To Second Floor', type: 'stairs_up', layerId: 'floor1' },
      { id: 'new-1763595170076', x: 53.7, y: 66.54, title: 'To Second Floor', type: 'stairs_up', layerId: 'floor1' },
      { id: 'new-1763595183150', x: 61.39, y: 33.16, title: 'To Second Floor', type: 'stairs_up', layerId: 'floor1' },
      { id: 'new-1763595199839', x: 71.05, y: 22.17, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'new-1763595209414', x: 46.81, y: 61.61, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'new-1763595214872', x: 28.82, y: 50.19, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'new-1763595457515', x: 64.16, y: 63.41, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'new-1763595502156', x: 72.9, y: 66.69, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'new-1763595529014', x: 32.86, y: 64.6, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2' },
      { id: 'new-1763595537134', x: 52.73, y: 65.42, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2' },
      { id: 'new-1763595545999', x: 61.39, y: 32.78, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2' }
    ]
  }
];
