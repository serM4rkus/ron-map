export interface ArmorConfig {
  type: string;
  coverage: string;
  material: string;
}

export const ARMOR_TYPES = [
  { id: 'no_armor', name: 'No Armor' },
  { id: 'stab_vest', name: 'Stab Vest' },
  { id: 'light_armor', name: 'Light Armor' },
  { id: 'heavy_vest', name: 'Heavy Vest' }
];

export const ARMOR_COVERAGES = [
  { id: 'front', name: 'Front' },
  { id: 'front_back', name: 'Front and Back' },
  { id: 'full', name: 'Full' }
];

export const ARMOR_MATERIALS = [
  { id: 'kevlar', name: 'Kevlar' },
  { id: 'steel', name: 'Steel' },
  { id: 'ceramic', name: 'Ceramic' }
];

export function getValidArmorCoverages(armorType: string): string[] {
  if (armorType === 'no_armor' || armorType === 'stab_vest') {
    return [];
  }
  if (armorType === 'light_armor') {
    return ['front', 'front_back'];
  }
  // heavy_vest
  return ['front', 'front_back', 'full'];
}

export function getValidArmorMaterials(armorType: string): string[] {
  if (armorType === 'no_armor' || armorType === 'stab_vest') {
    return [];
  }
  // light_armor and heavy_vest
  return ['kevlar', 'steel', 'ceramic'];
}

export function generateRandomArmor(pinnedTypeId?: string): ArmorConfig {
  const randomType = pinnedTypeId
    ? (ARMOR_TYPES.find(t => t.id === pinnedTypeId) ?? ARMOR_TYPES[Math.floor(Math.random() * ARMOR_TYPES.length)])
    : ARMOR_TYPES[Math.floor(Math.random() * ARMOR_TYPES.length)];
  
  const validCoverages = getValidArmorCoverages(randomType.id);
  const validMaterials = getValidArmorMaterials(randomType.id);
  
  const coverage = validCoverages.length > 0 
    ? validCoverages[Math.floor(Math.random() * validCoverages.length)]
    : '';
    
  const material = validMaterials.length > 0
    ? validMaterials[Math.floor(Math.random() * validMaterials.length)]
    : '';
  
  return {
    type: randomType.id,
    coverage,
    material
  };
}

export function getArmorTypeName(typeId: string): string {
  return ARMOR_TYPES.find(t => t.id === typeId)?.name || typeId;
}

export function getArmorCoverageName(coverageId: string): string {
  return ARMOR_COVERAGES.find(c => c.id === coverageId)?.name || coverageId;
}

export function getArmorMaterialName(materialId: string): string {
  return ARMOR_MATERIALS.find(m => m.id === materialId)?.name || materialId;
}
