import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { GameMarker, MapLayer } from '../../services/game-map.service';

export interface ObjectiveItem {
  id: string;
  title: string;
  description?: string;
  type: 'hard' | 'soft';
  completed?: boolean;
  markerIds?: string[]; // IDs of markers associated with this objective
  floorName?: string; // Name of the floor where objective is located
}

export interface ObjectiveLocateEvent {
  markerId: string;
}

@Component({
  selector: 'app-objectives',
  imports: [CommonModule],
  templateUrl: './objectives.html',
  styleUrl: './objectives.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectivesComponent {
  @Input() objectives: ObjectiveItem[] = [];
  @Input() mapName: string = '';
  @Input() markers: GameMarker[] = [];
  @Input() layers: MapLayer[] = [];
  @Output() objectiveToggled = new EventEmitter<string>();
  @Output() objectiveLocated = new EventEmitter<ObjectiveLocateEvent>();
  
  isExpanded: boolean = true;
  isHardSectionExpanded: boolean = true;
  isSoftSectionExpanded: boolean = true;
  locatingObjectiveId: string | null = null;
  locatingObjectiveMarkerIds: string[] = [];
  menuPosition: { top: number; right: number } = { top: 0, right: 0 };

  constructor(
    private readonly languageService: LanguageService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }

  toggleHardSection(event: Event): void {
    event.stopPropagation();
    this.isHardSectionExpanded = !this.isHardSectionExpanded;
  }

  toggleSoftSection(event: Event): void {
    event.stopPropagation();
    this.isSoftSectionExpanded = !this.isSoftSectionExpanded;
  }

  toggleObjective(objectiveId: string, event: Event): void {
    event.stopPropagation();
    this.objectiveToggled.emit(objectiveId);
  }

  locateObjective(markerIds: string[], objectiveId: string, event: Event): void {
    event.stopPropagation();
    if (markerIds.length === 1) {
      this.objectiveLocated.emit({ markerId: markerIds[0] });
    } else {
      if (this.locatingObjectiveId === objectiveId) {
        this.locatingObjectiveId = null;
      } else {
        const btn = (event.currentTarget as HTMLElement);
        const rect = btn.getBoundingClientRect();
        this.menuPosition = {
          top: rect.top - 8,
          right: window.innerWidth - rect.right
        };
        this.locatingObjectiveId = objectiveId;
        this.locatingObjectiveMarkerIds = markerIds;
      }
      this.cdr.markForCheck();
    }
  }

  navigateToMarker(markerId: string, event: Event): void {
    event.stopPropagation();
    this.locatingObjectiveId = null;
    this.objectiveLocated.emit({ markerId });
  }

  closeLocateMenu(event: Event): void {
    event.stopPropagation();
    this.locatingObjectiveId = null;
    this.cdr.markForCheck();
  }

  getMarkerTitle(markerId: string): string {
    return this.markers.find(m => m.id === markerId)?.title || markerId;
  }

  getMarkerFloor(markerId: string): string {
    const layerId = this.markers.find(m => m.id === markerId)?.layerId;
    if (!layerId) return '';
    return this.layers.find(l => l.id === layerId)?.name || layerId;
  }

  get hardObjectives(): ObjectiveItem[] {
    return this.objectives.filter(obj => obj.type === 'hard');
  }

  get softObjectives(): ObjectiveItem[] {
    return this.objectives.filter(obj => obj.type === 'soft');
  }

  get totalObjectives(): number {
    return this.objectives.length;
  }

  get completedObjectives(): number {
    return this.objectives.filter(obj => obj.completed).length;
  }
}
