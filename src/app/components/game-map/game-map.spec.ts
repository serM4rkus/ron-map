import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { GameMapComponent } from './game-map';
import { GameMapConfig, GameMapService } from '../../services/game-map.service';
import { DrawingService } from '../../services/drawing.service';
import { MapInteractionService } from '../../services/map-interaction.service';
import { MapStateService } from '../../services/map-state.service';
import { GAME_MAPS_METADATA } from '../../config/game-maps-metadata.config';

describe('GameMapComponent touch tools', () => {
  let fixture: ComponentFixture<GameMapComponent>;
  let component: GameMapComponent;
  let drawingService: DrawingService;
  let interactionService: MapInteractionService;
  let mapElement: HTMLElement;
  let imageBounds: jasmine.Spy;

  beforeEach(async () => {
    const storage = new Map<string, string>();
    spyOn(Storage.prototype, 'getItem').and.callFake(key => storage.get(key) ?? null);
    spyOn(Storage.prototype, 'setItem').and.callFake((key, value) => { storage.set(key, value); });

    const currentMap: GameMapConfig = {
      id: 'touch-map',
      name: 'Touch map',
      markers: [],
      layers: [{ id: 'ground', name: 'Ground', imageUrl: 'ReadyOrMaps.webp', visible: true, zIndex: 0 }]
    };
    const gameMapService = jasmine.createSpyObj<GameMapService>('GameMapService', ['getAvailableMaps', 'selectMarker'], {
      currentMap$: of(currentMap),
      currentMapMetadata$: of({ ...GAME_MAPS_METADATA[0], id: 'touch-map', name: 'Touch map', route: 'touch-map' }),
      markers$: of([]),
      selectedMarker$: of(null),
      loading$: of(false),
      pulsingMarkers$: of([])
    });
    gameMapService.getAvailableMaps.and.returnValue([]);

    await TestBed.configureTestingModule({
      imports: [GameMapComponent],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({})) } },
        { provide: GameMapService, useValue: gameMapService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameMapComponent);
    component = fixture.componentInstance;
    drawingService = TestBed.inject(DrawingService);
    interactionService = TestBed.inject(MapInteractionService);
    fixture.detectChanges();

    mapElement = fixture.nativeElement.querySelector('.map-zoom-container');
    const image = mapElement.querySelector<HTMLElement>('.image-wrapper')!;
    spyOnProperty(image, 'offsetWidth', 'get').and.returnValue(400);
    imageBounds = spyOn(image, 'getBoundingClientRect').and.returnValue(new DOMRect(100, 50, 400, 200));
  });

  afterEach(() => {
    fixture?.destroy();
  });

  function touch(identifier: number, clientX: number, clientY: number): Touch {
    return new Touch({ identifier, target: mapElement, clientX, clientY });
  }

  function dispatchTouch(type: string, touches: Touch[], changedTouches = touches): TouchEvent {
    const event = new TouchEvent(type, { touches, changedTouches, bubbles: true, cancelable: true });
    (type === 'touchstart' ? mapElement : document).dispatchEvent(event);
    fixture.detectChanges();
    return event;
  }

  function drawTouchLine(): void {
    dispatchTouch('touchstart', [touch(1, 140, 70)]);
    dispatchTouch('touchmove', [touch(1, 220, 110)]);
    dispatchTouch('touchend', [], [touch(1, 220, 110)]);
  }

  it('draws and saves a touch stroke without panning', () => {
    component.onDrawingModeToggled(true);
    const start = dispatchTouch('touchstart', [touch(1, 140, 70)]);
    const move = dispatchTouch('touchmove', [touch(1, 220, 110)]);
    dispatchTouch('touchend', [], [touch(1, 220, 110)]);

    expect(start.defaultPrevented).toBeTrue();
    expect(move.defaultPrevented).toBeTrue();
    expect(drawingService.getDrawings()).toEqual([
      jasmine.objectContaining({
        mapId: 'touch-map', layerId: 'ground', color: '#FF0000',
        path: [{ x: 10, y: 10 }, { x: 30, y: 30 }]
      })
    ]);
    expect(component.drawnLines).toEqual(drawingService.getDrawings());
    expect(JSON.parse(localStorage.getItem('ron-map-drawings') || '[]')).toEqual(component.drawnLines);
    expect(interactionService.getState()).toEqual(jasmine.objectContaining({
      panOffsetX: 0, panOffsetY: 0, isPanning: false, isTouching: false
    }));
    expect(component.isDrawing).toBeFalse();
  });

  it('erases a touch-drawn line with the touch eraser', () => {
    component.onDrawingModeToggled(true);
    drawTouchLine();
    expect(component.drawnLines.length).toBe(1);

    component.onEraserModeToggled(true);
    drawTouchLine();

    expect(component.drawnLines).toEqual([]);
    expect(drawingService.getDrawings()).toEqual([]);
    expect(JSON.parse(localStorage.getItem('ron-map-drawings') || '[]')).toEqual([]);
    expect(interactionService.getState()).toEqual(jasmine.objectContaining({ panOffsetX: 0, panOffsetY: 0 }));
  });

  it('keeps single-finger panning when drawing tools are disabled', () => {
    const start = dispatchTouch('touchstart', [touch(1, 140, 70)]);
    dispatchTouch('touchmove', [touch(1, 220, 110)]);
    dispatchTouch('touchend', [], [touch(1, 220, 110)]);

    expect(start.defaultPrevented).toBeFalse();
    expect(drawingService.getDrawings()).toEqual([]);
    expect(interactionService.getState()).toEqual(jasmine.objectContaining({
      panOffsetX: 80, panOffsetY: 40, isPanning: false, isTouching: false
    }));
  });

  for (const eraser of [false, true]) {
    it(`finishes the ${eraser ? 'eraser' : 'pen'} path once before a second finger starts pinch zoom`, () => {
      component.onDrawingModeToggled(true);
      if (eraser) {
        drawTouchLine();
        component.onEraserModeToggled(true);
      }
      const finish = spyOn(drawingService, 'finishDrawing').and.callThrough();
      dispatchTouch('touchstart', [touch(1, 140, 70)]);
      dispatchTouch('touchmove', [touch(1, 220, 110)]);
      dispatchTouch('touchstart', [touch(1, 220, 110), touch(2, 320, 110)], [touch(2, 320, 110)]);

      expect(finish).toHaveBeenCalledTimes(1);
      expect(component.drawnLines.length).toBe(eraser ? 0 : 1);
      expect(component.drawnLines.map(drawing => drawing.path)).toEqual(
        eraser ? [] : [[{ x: 10, y: 10 }, { x: 30, y: 30 }]]
      );
      const saved = JSON.parse(localStorage.getItem('ron-map-drawings') || '[]');
      expect(saved).toEqual(component.drawnLines);

      dispatchTouch('touchmove', [touch(2, 420, 110), touch(1, 220, 110)]);
      expect(interactionService.getState().zoomLevel).toBeCloseTo(2);
      dispatchTouch('touchend', [touch(1, 220, 110)], [touch(2, 420, 110)]);
      dispatchTouch('touchmove', [touch(1, 260, 130)]);
      expect(component.isDrawing).toBeFalse();
      expect(component.drawnLines).toEqual(saved);
      expect(interactionService.getState()).toEqual(jasmine.objectContaining({ panOffsetX: 0, panOffsetY: 0 }));
      dispatchTouch('touchend', [], [touch(1, 260, 130)]);
      expect(finish).toHaveBeenCalledTimes(1);

      component.onEraserModeToggled(false);
      drawTouchLine();
      expect(component.drawnLines.length).toBe(eraser ? 1 : 2);
    });

    it(`preserves the recorded ${eraser ? 'eraser' : 'pen'} operation on touchcancel and releases listeners`, () => {
      component.onDrawingModeToggled(true);
      if (eraser) {
        drawTouchLine();
        component.onEraserModeToggled(true);
      }
      const finish = spyOn(drawingService, 'finishDrawing').and.callThrough();
      dispatchTouch('touchstart', [touch(1, 140, 70)]);
      dispatchTouch('touchmove', [touch(1, 220, 110)]);
      dispatchTouch('touchcancel', [], [touch(1, 220, 110)]);

      expect(finish).toHaveBeenCalledTimes(1);
      expect(component.isDrawing).toBeFalse();
      expect(component.drawnLines.length).toBe(eraser ? 0 : 1);
      const saved = JSON.parse(localStorage.getItem('ron-map-drawings') || '[]');
      expect(saved).toEqual(component.drawnLines);
      const move = spyOn(drawingService, 'continueDrawing').and.callThrough();
      dispatchTouch('touchmove', [touch(1, 300, 150)]);
      dispatchTouch('touchend', [], [touch(1, 300, 150)]);
      expect(move).not.toHaveBeenCalled();
      expect(finish).toHaveBeenCalledTimes(1);
      expect(component.drawnLines).toEqual(saved);
      expect(interactionService.getState()).toEqual(jasmine.objectContaining({ isTouching: false, isPanning: false }));

      component.onEraserModeToggled(false);
      drawTouchLine();
      expect(component.drawnLines.length).toBe(eraser ? 1 : 2);
    });
  }

  it('initializes pinch when another contact is first seen moving and pauses for extra fingers', () => {
    component.onDrawingModeToggled(true);
    dispatchTouch('touchstart', [touch(1, 140, 70)]);
    dispatchTouch('touchmove', [touch(1, 220, 110)]);
    dispatchTouch('touchmove', [touch(2, 320, 110), touch(1, 220, 110)]);
    expect(component.drawnLines.length).toBe(1);
    expect(interactionService.getState().zoomLevel).toBe(1);

    dispatchTouch('touchmove', [touch(1, 220, 110), touch(2, 370, 110)]);
    expect(interactionService.getState().zoomLevel).toBeCloseTo(1.5);
    dispatchTouch('touchstart', [touch(1, 220, 110), touch(2, 370, 110), touch(3, 480, 130)]);
    dispatchTouch('touchmove', [touch(1, 220, 110), touch(2, 470, 110), touch(3, 580, 130)]);
    expect(interactionService.getState().zoomLevel).toBeCloseTo(1.5);
    dispatchTouch('touchend', [touch(1, 220, 110), touch(2, 470, 110)], [touch(3, 580, 130)]);
    expect(interactionService.getState().zoomLevel).toBeCloseTo(1.5);
    dispatchTouch('touchmove', [touch(1, 220, 110), touch(2, 520, 110)]);
    expect(interactionService.getState().zoomLevel).toBeCloseTo(1.8);
    dispatchTouch('touchend', []);
    expect(component.drawnLines.length).toBe(1);
  });

  it('allows an initial two-finger pinch without drawing, with tools on or off', () => {
    for (const enabled of [false, true]) {
      interactionService.reset();
      component.onDrawingModeToggled(enabled);
      dispatchTouch('touchstart', [touch(1, 140, 70), touch(2, 240, 70)]);
      dispatchTouch('touchmove', [touch(1, 140, 70), touch(2, 290, 70)]);
      expect(interactionService.getState().zoomLevel).toBeCloseTo(1.5);
      dispatchTouch('touchend', []);
      expect(component.drawnLines).toEqual([]);
    }
  });

  it('does not save a tap or open the marker form in drawing mode', () => {
    component.onDrawingModeToggled(true);
    const start = dispatchTouch('touchstart', [touch(1, 140, 70)]);
    dispatchTouch('touchend', [], [touch(1, 140, 70)]);
    expect(start.defaultPrevented).toBeTrue();
    expect(component.isDrawing).toBeFalse();
    expect(component.drawnLines).toEqual([]);
    expect(component.showMarkerForm).toBeFalse();
  });

  it('does not draw or pan while the marker form is open', () => {
    component.onDrawingModeToggled(true);
    TestBed.inject(MapStateService).showMarkerForm(10, 10);
    drawTouchLine();
    expect(component.drawnLines).toEqual([]);
    expect(interactionService.getState()).toEqual(jasmine.objectContaining({ panOffsetX: 0, panOffsetY: 0 }));
  });

  it('does not let mouse events alter a touch stroke and still supports mouse drawing and panning afterward', () => {
    component.onDrawingModeToggled(true);
    dispatchTouch('touchstart', [touch(1, 140, 70)]);
    dispatchTouch('touchmove', [touch(1, 220, 110)]);
    mapElement.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: 300, clientY: 150 }));
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 340, clientY: 170 }));
    document.dispatchEvent(new MouseEvent('mouseup'));
    expect(component.isDrawing).toBeTrue();
    dispatchTouch('touchend', [], [touch(1, 220, 110)]);
    expect(component.drawnLines.map(drawing => drawing.path)).toEqual([[{ x: 10, y: 10 }, { x: 30, y: 30 }]]);

    mapElement.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: 140, clientY: 70 }));
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 220, clientY: 110 }));
    document.dispatchEvent(new MouseEvent('mouseup'));
    expect(component.drawnLines.length).toBe(2);
    component.onDrawingModeToggled(false);
    mapElement.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: 140, clientY: 70 }));
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 220, clientY: 110 }));
    document.dispatchEvent(new MouseEvent('mouseup'));
    expect(interactionService.getState()).toEqual(jasmine.objectContaining({ panOffsetX: 80, panOffsetY: 40 }));
  });

  it('does not transfer a stroke to a different touch identifier', () => {
    component.onDrawingModeToggled(true);
    dispatchTouch('touchstart', [touch(1, 140, 70)]);
    dispatchTouch('touchmove', [touch(1, 220, 110)]);
    dispatchTouch('touchmove', [touch(2, 360, 180)]);
    expect(component.isDrawing).toBeFalse();
    dispatchTouch('touchend', []);
    expect(component.drawnLines.map(drawing => drawing.path)).toEqual([[{ x: 10, y: 10 }, { x: 30, y: 30 }]]);
  });

  it('ignores drawing until the map has usable image bounds', () => {
    component.onDrawingModeToggled(true);
    imageBounds.and.returnValue(new DOMRect());
    drawTouchLine();
    expect(component.drawnLines).toEqual([]);
    expect(component.isDrawing).toBeFalse();
  });

  it('clears a pending path if its map layer is no longer available', () => {
    component.onDrawingModeToggled(true);
    dispatchTouch('touchstart', [touch(1, 140, 70)]);
    dispatchTouch('touchmove', [touch(1, 220, 110)]);
    component.currentMap!.layers = [];
    dispatchTouch('touchend', []);
    expect(component.drawnLines).toEqual([]);
    expect(component.isDrawing).toBeFalse();
  });

  it('finishes a touch stroke and removes its listeners on destruction', () => {
    component.onDrawingModeToggled(true);
    dispatchTouch('touchstart', [touch(1, 140, 70)]);
    dispatchTouch('touchmove', [touch(1, 220, 110)]);
    const move = spyOn(drawingService, 'continueDrawing').and.callThrough();
    fixture.destroy();
    document.dispatchEvent(new TouchEvent('touchmove', { touches: [touch(1, 300, 150)] }));
    expect(move).not.toHaveBeenCalled();
    expect(drawingService.getDrawingState().isDrawing).toBeFalse();
    expect(drawingService.getDrawings().length).toBe(1);
    expect(interactionService.getState().isTouching).toBeFalse();
  });
});