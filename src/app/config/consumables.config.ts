export interface Consumable {
  id: string;
  name: string;
  picture: string;
}

export const CONSUMABLES: Consumable[] = [
  { id: 'flashbang', name: 'Flashbang', picture: '/assets/consumables/flashbang.webp' },
  { id: 'stinger', name: 'Stinger Grenade', picture: '/assets/consumables/stinger.webp' },
  { id: 'cs_gas', name: 'CS Gas', picture: '/assets/consumables/cs_gas.webp' },
  { id: 'pepper_spray', name: 'Pepper Spray', picture: '/assets/consumables/pepper_spray.webp' },
  { id: 'taser', name: 'Taser', picture: '/assets/consumables/taser.webp' },
  { id: 'door_wedge', name: 'Door Wedge', picture: '/assets/consumables/door_wedge.webp' },
  { id: 'breaching_charge', name: 'Breaching Charge', picture: '/assets/consumables/breaching_charge.webp' },
  { id: 'c2', name: 'C2 Explosive', picture: '/assets/consumables/c2.webp' }
];
