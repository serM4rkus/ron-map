import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { GameMapMetadata } from '../../config/game-maps-metadata.config';
import { WEAPONS, Weapon } from '../../config/weapons.config';
import { DIFFICULTIES, Difficulty } from '../../config/difficulties.config';
import { ArmorConfig, generateRandomArmor, getArmorTypeName, getArmorCoverageName, getArmorMaterialName } from '../../config/armor.config';
import { GameMarker } from '../../services/game-map';
import { Logger } from '../../utils/logger.util';

interface ChallengeResult {
  map: GameMapMetadata;
  weapon: Weapon;
  difficulty: Difficulty;
  armor: ArmorConfig;
  spawnPoint: GameMarker | null;
}

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
  isRolling = false;
  result: ChallengeResult | null = null;

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
    this.modalStateChanged.emit(false);
    this.cdr.markForCheck();
  }

  rollChallenge(): void {    
    if (this.isRolling || this.maps.length === 0) {
      Logger.warn('Cannot roll: isRolling=', this.isRolling, 'maps.length=', this.maps.length);
      return;
    }

    this.isRolling = true;
    this.result = null;
    this.cdr.markForCheck();

    this.rollTimeout = setTimeout(async () => {
      try {
        const randomMap = this.maps[Math.floor(Math.random() * this.maps.length)];
        const randomWeapon = WEAPONS[Math.floor(Math.random() * WEAPONS.length)];
        const randomDifficulty = DIFFICULTIES[Math.floor(Math.random() * DIFFICULTIES.length)];
        const randomArmor = generateRandomArmor();

        let randomSpawn: GameMarker | null = null;
        try {
          const mapConfig = await randomMap.loader();
          const spawnPoints = mapConfig.markers.filter(m => m.type === 'spawn');
          if (spawnPoints.length > 0) {
            randomSpawn = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
          }
        } catch (error) {
          Logger.warn('Could not load spawn points for map:', randomMap.id, error);
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
