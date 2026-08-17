import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { GameMapMetadata } from '../../config/game-maps-metadata.config';
import { getAllCategories, MapCategoryInfo, MapCategoryId } from '../../config/map-categories.config';
import { WEAPONS, Weapon } from '../../config/weapons.config';
import { DIFFICULTIES, Difficulty } from '../../config/difficulties.config';
import { ARMOR_TYPES, ArmorConfig, generateRandomArmor, getArmorTypeName, getArmorCoverageName, getArmorMaterialName } from '../../config/armor.config';
import { GameMarker } from '../../services/game-map.service';
import { Logger } from '../../utils/logger.util';

interface ChallengeResult {
  map: GameMapMetadata;
  weapon: Weapon;
  difficulty: Difficulty;
  armor: ArmorConfig;
  spawnPoint: GameMarker | null;
}

type ConfigTab = 'maps' | 'difficulty' | 'weapons' | 'armor';

@Component({
  selector: 'app-random-challenge',
  imports: [CommonModule],
  templateUrl: './random-challenge.html',
  styleUrl: './random-challenge.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RandomChallengeComponent implements OnDestroy {
  @Input() maps: GameMapMetadata[] = [];
  @Output() modalStateChanged = new EventEmitter<boolean>();

  showChallenge = false;
  showCategoryConfig = false;
  activeConfigTab: ConfigTab = 'maps';
  isRolling = false;
  result: ChallengeResult | null = null;

  // --- Map pool ---
  readonly allCategories: MapCategoryInfo[] = getAllCategories();
  enabledCategories = new Set<MapCategoryId>(this.allCategories.map(c => c.id as MapCategoryId));

  pinnedMap: GameMapMetadata | null = null;
  mapListExpanded = false;

  // --- Difficulty ---
  readonly allDifficulties: Difficulty[] = DIFFICULTIES;
  enabledDifficulties = new Set<string>(DIFFICULTIES.map(d => d.id));

  // --- Weapons ---
  readonly allWeaponTypes: string[] = [...new Set(WEAPONS.map(w => w.type))];
  enabledWeaponTypes = new Set<string>(this.allWeaponTypes);
  allowLethal = true;
  allowNonLethal = true;

  pinnedWeapon: Weapon | null = null;
  weaponListExpanded = false;

  // --- Armor ---
  readonly allArmorTypes = ARMOR_TYPES;
  armorEnabled = true;
  enabledArmorTypes = new Set<string>(ARMOR_TYPES.map(a => a.id));
  pinnedArmor: ArmorConfig | null = null;

  // --- Locked result fields ---
  lockedFields = new Set<'map' | 'weapon' | 'difficulty' | 'armor'>();

  // --- Computed ---
  get filteredMaps(): GameMapMetadata[] {
    return this.maps.filter(m => this.enabledCategories.has(m.category));
  }

  get filteredWeapons(): Weapon[] {
    return WEAPONS.filter(w =>
      this.enabledWeaponTypes.has(w.type) &&
      (w.lethal ? this.allowLethal : this.allowNonLethal)
    );
  }

  get allCategoriesEnabled(): boolean {
    return this.enabledCategories.size === this.allCategories.length;
  }

  get allDifficultiesEnabled(): boolean {
    return this.enabledDifficulties.size === this.allDifficulties.length;
  }

  get allWeaponTypesEnabled(): boolean {
    return this.enabledWeaponTypes.size === this.allWeaponTypes.length;
  }

  get enabledMapCount(): number {
    return this.filteredMaps.length;
  }

  get enabledWeaponCount(): number {
    return this.filteredWeapons.length;
  }

  get allLocked(): boolean {
    return this.lockedFields.size === 4;
  }

  get canRoll(): boolean {
    return this.enabledWeaponCount > 0 && !this.allLocked;
  }

  private readonly REROLL_DELAY = 1000;
  private rollTimeout?: ReturnType<typeof setTimeout>;

  constructor(
    private readonly languageService: LanguageService,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router
  ) {}

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  openChallenge(): void {
    this.showChallenge = true;
    this.modalStateChanged.emit(true);
    this.cdr.markForCheck();
  }

  closeChallenge(): void {
    this.showChallenge = false;
    this.result = null;
    this.isRolling = false;
    this.lockedFields = new Set();
    this.pinnedArmor = null;
    this.modalStateChanged.emit(false);
    this.cdr.markForCheck();
  }

  setConfigTab(tab: ConfigTab): void {
    this.activeConfigTab = tab;
    if (tab !== 'maps') this.mapListExpanded = false;
    if (tab !== 'weapons') this.weaponListExpanded = false;
    this.cdr.markForCheck();
  }

  // --- Map pool ---
  toggleCategory(categoryId: MapCategoryId): void {
    if (this.enabledCategories.has(categoryId)) {
      if (this.enabledCategories.size > 1) {
        this.enabledCategories.delete(categoryId);
      }
    } else {
      this.enabledCategories.add(categoryId);
    }
    this.enabledCategories = new Set(this.enabledCategories);
    if (this.pinnedMap && !this.enabledCategories.has(this.pinnedMap.category)) {
      this.pinnedMap = null;
    }
    this.cdr.markForCheck();
  }

  toggleAllCategories(): void {
    if (this.allCategoriesEnabled) {
      const first = this.allCategories[0].id as MapCategoryId;
      this.enabledCategories = new Set([first]);
    } else {
      this.enabledCategories = new Set(this.allCategories.map(c => c.id as MapCategoryId));
    }
    this.cdr.markForCheck();
  }

  isCategoryEnabled(categoryId: MapCategoryId): boolean {
    return this.enabledCategories.has(categoryId);
  }

  getMapsCountForCategory(categoryId: MapCategoryId): number {
    return this.maps.filter(m => m.category === categoryId).length;
  }

  pinMap(map: GameMapMetadata): void {
    this.pinnedMap = this.pinnedMap?.id === map.id ? null : map;
    if (this.pinnedMap) this.lockedFields.add('map');
    else this.lockedFields.delete('map');
    this.lockedFields = new Set(this.lockedFields);
    this.cdr.markForCheck();
  }

  // --- Difficulty ---
  toggleDifficulty(id: string): void {
    if (this.enabledDifficulties.has(id)) {
      if (this.enabledDifficulties.size > 1) {
        this.enabledDifficulties.delete(id);
      }
    } else {
      this.enabledDifficulties.add(id);
    }
    this.enabledDifficulties = new Set(this.enabledDifficulties);
    this.cdr.markForCheck();
  }

  toggleAllDifficulties(): void {
    if (this.allDifficultiesEnabled) {
      this.enabledDifficulties = new Set([this.allDifficulties[0].id]);
    } else {
      this.enabledDifficulties = new Set(this.allDifficulties.map(d => d.id));
    }
    this.cdr.markForCheck();
  }

  isDifficultyEnabled(id: string): boolean {
    return this.enabledDifficulties.has(id);
  }

  // --- Weapons ---
  toggleWeaponType(type: string): void {
    if (this.enabledWeaponTypes.has(type)) {
      if (this.enabledWeaponTypes.size > 1) {
        this.enabledWeaponTypes.delete(type);
      }
    } else {
      this.enabledWeaponTypes.add(type);
    }
    this.enabledWeaponTypes = new Set(this.enabledWeaponTypes);
    if (this.pinnedWeapon && !this.enabledWeaponTypes.has(this.pinnedWeapon.type)) {
      this.pinnedWeapon = null;
    }
    this.cdr.markForCheck();
  }

  toggleAllWeaponTypes(): void {
    if (this.allWeaponTypesEnabled) {
      this.enabledWeaponTypes = new Set([this.allWeaponTypes[0]]);
    } else {
      this.enabledWeaponTypes = new Set(this.allWeaponTypes);
    }
    this.cdr.markForCheck();
  }

  isWeaponTypeEnabled(type: string): boolean {
    return this.enabledWeaponTypes.has(type);
  }

  getWeaponsCountForType(type: string): number {
    return WEAPONS.filter(w => w.type === type).length;
  }

  pinWeapon(weapon: Weapon): void {
    this.pinnedWeapon = this.pinnedWeapon?.id === weapon.id ? null : weapon;
    if (this.pinnedWeapon) this.lockedFields.add('weapon');
    else this.lockedFields.delete('weapon');
    this.lockedFields = new Set(this.lockedFields);
    this.cdr.markForCheck();
  }

  toggleLethal(type: 'lethal' | 'nonLethal'): void {
    if (type === 'lethal') {
      this.allowLethal = !this.allowLethal;
    } else {
      this.allowNonLethal = !this.allowNonLethal;
    }
    if (this.pinnedWeapon) {
      const stillValid = this.pinnedWeapon.lethal ? this.allowLethal : this.allowNonLethal;
      if (!stillValid) this.pinnedWeapon = null;
    }
    this.cdr.markForCheck();
  }

  // --- Armor ---
  toggleArmorEnabled(): void {
    this.armorEnabled = !this.armorEnabled;
    this.cdr.markForCheck();
  }

  toggleArmorType(id: string): void {
    if (!this.armorEnabled) return;
    if (this.enabledArmorTypes.has(id)) {
      if (this.enabledArmorTypes.size > 1) {
        this.enabledArmorTypes.delete(id);
      }
    } else {
      this.enabledArmorTypes.add(id);
    }
    this.enabledArmorTypes = new Set(this.enabledArmorTypes);
    this.cdr.markForCheck();
  }

  isArmorTypeEnabled(id: string): boolean {
    return this.armorEnabled && this.enabledArmorTypes.has(id);
  }

  isLocked(field: 'map' | 'weapon' | 'difficulty' | 'armor'): boolean {
    return this.lockedFields.has(field);
  }

  toggleLock(field: 'map' | 'weapon' | 'difficulty' | 'armor'): void {
    if (!this.result) return;
    if (this.lockedFields.has(field)) {
      this.lockedFields.delete(field);
      if (field === 'map') this.pinnedMap = null;
      else if (field === 'weapon') this.pinnedWeapon = null;
      else if (field === 'difficulty') this.enabledDifficulties = new Set(this.allDifficulties.map(d => d.id));
      else if (field === 'armor') this.pinnedArmor = null;
    } else {
      this.lockedFields.add(field);
      if (field === 'map') this.pinnedMap = this.result.map;
      else if (field === 'weapon') this.pinnedWeapon = this.result.weapon;
      else if (field === 'difficulty') this.enabledDifficulties = new Set([this.result.difficulty.id]);
      else if (field === 'armor') this.pinnedArmor = this.result.armor;
    }
    this.lockedFields = new Set(this.lockedFields);
    this.cdr.markForCheck();
  }

  // --- Roll ---
  rollChallenge(): void {
    const mapPool = this.pinnedMap ? [this.pinnedMap] : this.filteredMaps;
    const weaponPool = this.pinnedWeapon ? [this.pinnedWeapon] : this.filteredWeapons;
    const difficultyPool = DIFFICULTIES.filter(d => this.enabledDifficulties.has(d.id));

    if (this.isRolling || mapPool.length === 0 || weaponPool.length === 0 || difficultyPool.length === 0 || this.allLocked) {
      Logger.warn('Cannot roll: pool empty, all locked, or already rolling');
      return;
    }

    this.isRolling = true;
    const prevResult = this.result;
    this.result = null;
    this.cdr.markForCheck();

    this.rollTimeout = setTimeout(async () => {
      try {
        const randomMap = mapPool[Math.floor(Math.random() * mapPool.length)];
        const randomWeapon = weaponPool[Math.floor(Math.random() * weaponPool.length)];
        const randomDifficulty = difficultyPool[Math.floor(Math.random() * difficultyPool.length)];

        let randomArmor: ArmorConfig;
        if (this.pinnedArmor) {
          randomArmor = this.pinnedArmor;
        } else if (!this.armorEnabled) {
          randomArmor = { type: 'no_armor', coverage: '', material: '' };
        } else {
          const armorPool = ARMOR_TYPES.filter(a => this.enabledArmorTypes.has(a.id));
          const picked = armorPool[Math.floor(Math.random() * armorPool.length)];
          randomArmor = generateRandomArmor(picked.id);
        }

        let randomSpawn: GameMarker | null = null;
        if (this.lockedFields.has('map') && prevResult?.spawnPoint) {
          randomSpawn = prevResult.spawnPoint;
        } else {
          try {
            const mapConfig = await randomMap.loader();
            const spawnPoints = mapConfig.markers.filter(m => m.type === 'spawn');
            if (spawnPoints.length > 0) {
              randomSpawn = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
            }
          } catch (error) {
            Logger.warn('Could not load spawn points for map:', randomMap.id, error);
          }
        }

        this.result = {
          map: randomMap,
          weapon: randomWeapon,
          difficulty: randomDifficulty,
          armor: randomArmor,
          spawnPoint: randomSpawn
        };
      } catch (error) {
        Logger.error('Error generating random challenge:', error);
        this.result = null;
      } finally {
        this.isRolling = false;
        this.rollTimeout = undefined;
        this.cdr.markForCheck();
      }
    }, this.REROLL_DELAY);
  }

  getArmorTypeName(typeId: string): string {
    return getArmorTypeName(typeId);
  }

  getArmorCoverageName(coverageId: string): string {
    return getArmorCoverageName(coverageId);
  }

  getArmorMaterialName(materialId: string): string {
    return getArmorMaterialName(materialId);
  }

  navigateToMap(map: GameMapMetadata): void {
    this.router.navigate(['/map', map.route]);
    this.closeChallenge();
  }

  ngOnDestroy(): void {
    if (this.rollTimeout) {
      clearTimeout(this.rollTimeout);
    }
  }
}
