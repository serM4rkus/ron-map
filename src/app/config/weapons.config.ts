export interface Weapon {
  id: string;
  name: string;
  type: string;
  picture: string;
}

export const WEAPONS: Weapon[] = [
  // Assault Rifles (AR)
  { id: 'arn180', name: 'ARN-180', type: 'Assault Rifle', picture: './weapons/AR_ARN180_1024.png' },
  { id: 'arwc', name: 'ARWC', type: 'Assault Rifle', picture: './weapons/AR_ARWC_1024.png' },
  { id: 'f90', name: 'F90', type: 'Assault Rifle', picture: './weapons/AR_F90_1024.png' },
  { id: 'g36c', name: 'G36C', type: 'Assault Rifle', picture: './weapons/AR_G36C_1024.png' },
  { id: 'ga416', name: 'GA416', type: 'Assault Rifle', picture: './weapons/AR_GA416_1024.png' },
  { id: 'lvar', name: 'LVAR', type: 'Assault Rifle', picture: './weapons/AR_LVAR_1024.png' },
  { id: 'mcx', name: 'MCX', type: 'Assault Rifle', picture: './weapons/AR_MCX_1024.png' },
  { id: 'mk16', name: 'MK16', type: 'Assault Rifle', picture: './weapons/AR_MK16_1024.png' },
  { id: 'mk18', name: 'MK18', type: 'Assault Rifle', picture: './weapons/AR_MK18_1024.png' },
  { id: 'slr47', name: 'SLR47', type: 'Assault Rifle', picture: './weapons/AR_SLR47_1024.png' },
  { id: 'sr16', name: 'SR16', type: 'Assault Rifle', picture: './weapons/AR_SR16_1024.png' },

  // Battle Rifles (BR)
  { id: 'g3a3', name: 'G3A3', type: 'Battle Rifle', picture: './weapons/BR_G3A3_1024.png' },
  { id: 'ga51', name: 'GA51', type: 'Battle Rifle', picture: './weapons/BR_GA51_1024.png' },
  { id: 'm14s_16', name: 'M14S-16', type: 'Battle Rifle', picture: './weapons/BR_M14S-16_1024.png' },
  { id: 'mk17', name: 'MK17', type: 'Battle Rifle', picture: './weapons/BR_MK17_1024.png' },
  { id: 'rtwc', name: 'RTWC', type: 'Battle Rifle', picture: './weapons/BR_RTWC_1024.png' },
  { id: 'sa58', name: 'SA58', type: 'Battle Rifle', picture: './weapons/BR_SA58_1024.png' },

  // Grenade Launchers (GL)
  { id: 'm32a1flash', name: 'M32A1 FLASH', type: 'Grenade Launchers', picture: './weapons/GL_M32A1_1024.png' },
  { id: 'm32a1gas', name: 'M32A1 GAS', type: 'Grenade Launchers', picture: './weapons/GL_M32A1_1024.png' },

  // Less Lethal
  { id: 'beanbag', name: 'Beanbag', type: 'Less Lethal', picture: './weapons/LL_BEANBAG_1024.png' },
  { id: 'tpl', name: 'TPL', type: 'Less Lethal', picture: './weapons/LL_TPL_1024.png' },
  { id: 'trpl', name: 'TRPL', type: 'Less Lethal', picture: './weapons/LL_TRPL_1024.png' },
  { id: 'vpl25', name: 'VPL25', type: 'Less Lethal', picture: './weapons/LL_VPL25_1024.png' },

  // Personal Defense Weapons (PDW)
  { id: 'ddm4pdw', name: 'DDM4PDW', type: 'Personal Defense Weapons', picture: './weapons/PDW_DDM4PDW_1024.png' },
  { id: 'mp7', name: 'MP7', type: 'Personal Defense Weapons', picture: './weapons/PDW_MP7_1024.png' },
  { id: 'p90', name: 'P90', type: 'Personal Defense Weapons', picture: './weapons/PDW_P90_1024.png' },
  { id: 'raiderxp320', name: 'Raider X P320', type: 'Personal Defense Weapons', picture: './weapons/PDW_RAIDERXP320_1024.png' },

  // Pistols / Sidearms (PS)
  { id: '357magnum', name: '357 Magnum', type: 'Pistol', picture: './weapons/PS_357MAGNUM_1024.png' },
  { id: '509', name: '509', type: 'Pistol', picture: './weapons/PS_509_1024.png' },
  { id: 'b92x', name: 'B92X', type: 'Pistol', picture: './weapons/PS_B92X_1024.png' },
  { id: 'fiveseven', name: 'FiveSeven', type: 'Pistol', picture: './weapons/PS_FUVESEVEN_1024.png' },
  { id: 'g18c', name: 'G18C', type: 'Pistol', picture: './weapons/PS_G18C_1024.png' },
  { id: 'g19', name: 'G19', type: 'Pistol', picture: './weapons/PS_G19_1024.png' },
  { id: 'm11', name: 'M11', type: 'Pistol', picture: './weapons/PS_M11_1024.png' },
  { id: 'm45a1', name: 'M45A1', type: 'Pistol', picture: './weapons/PS_M45A1_1024.png' },
  { id: 'mk_v', name: 'MK-V', type: 'Pistol', picture: './weapons/PS_MK-V_1024.png' },
  { id: 's2011_p', name: 'S2011-P', type: 'Pistol', picture: './weapons/PS_S2011-P_1024.png' },
  { id: 'tle1911', name: 'TLE1911', type: 'Pistol', picture: './weapons/PS_TLE1911_1024.png' },
  { id: 'usp45', name: 'USP45', type: 'Pistol', picture: './weapons/PS_USP45_1024.png' },

  // Shotguns (SG)
  { id: '870cqb', name: '870CQB', type: 'Shotgun', picture: './weapons/SG_870CQB_1024.png' },
  { id: 'b1301', name: 'B1301', type: 'Shotgun', picture: './weapons/SG_B1301_1024.png' },
  { id: 'm1014', name: 'M1014', type: 'Shotgun', picture: './weapons/SG_M1014_1024.png' },
  { id: '590m', name: '590M', type: 'Shotgun', picture: './weapons/SG_590M_1024.png' },
  { id: 'supernova', name: 'Supernova', type: 'Shotgun', picture: './weapons/SG_SURPERNOVA_1024.png' },

  // Submachine Guns (SMG)
  { id: 'mp510', name: 'MP5 10mm', type: 'Submachine Gun', picture: './weapons/SMG_MP510_1024.png' },
  { id: 'mp5a2', name: 'MP5A2', type: 'Submachine Gun', picture: './weapons/SMG_MP5A2_1024.png' },
  { id: 'mp5a3', name: 'MP5A3', type: 'Submachine Gun', picture: './weapons/SMG_MP5A3_1024.png' },
  { id: 'mp5sd6', name: 'MP5SD6', type: 'Submachine Gun', picture: './weapons/SMG_MP5SD6_1024.png' },
  { id: 'mp9', name: 'MP9', type: 'Submachine Gun', picture: './weapons/SMG_MP9_1024.png' },
  { id: 'mpx', name: 'MPX', type: 'Submachine Gun', picture: './weapons/SMG_MPX_1024.png' },
  { id: 'spc9', name: 'SPC9', type: 'Submachine Gun', picture: './weapons/SMG_SPC9_1024.png' },
  { id: 'ump9', name: 'UMP-9', type: 'Submachine Gun', picture: './weapons/SMG_UMP_1024.png' },
  { id: 'ump45', name: 'UMP-45', type: 'Submachine Gun', picture: './weapons/SMG_UMP_1024.png' }
];
