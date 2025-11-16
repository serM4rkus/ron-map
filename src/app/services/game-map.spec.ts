import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { GameMapService, GameMapConfig, GameMarker } from './game-map';
import { GAME_MAPS } from '../config/game-maps.config';

describe('GameMapService', () => {
  let service: GameMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return available maps', () => {
    const maps = service.getAvailableMaps();
    expect(maps).toBeTruthy();
    expect(Array.isArray(maps)).toBeTrue();
    expect(maps.length).toBeGreaterThan(0);
  });

  it('should load a map and set default layer visibility', fakeAsync(() => {
    const firstMap = GAME_MAPS[0] as GameMapConfig;
    service.loadMap(firstMap.id);
    // advance timers for simulated loading delay
    tick(300);

    const current = service.getCurrentMap();
    expect(current).not.toBeNull();
    if (current && current.layers) {
      // ensure exactly one layer is visible
      const visibleLayers = current.layers.filter(l => l.visible);
      expect(visibleLayers.length).toBe(1);
    }
  }));

  it('should add, update, select and remove markers', fakeAsync(() => {
    const map = GAME_MAPS[0] as GameMapConfig;
    service.loadMap(map.id);
    tick(300);

    const newMarker: GameMarker = {
      id: 'tm1',
      x: 10,
      y: 20,
      title: 'Test',
      description: 'desc',
      type: 'spawn'
    };

    service.addMarker(newMarker);
    let currentMap = service.getCurrentMap();
    expect(currentMap).toBeTruthy();
    if (currentMap) {
      expect(currentMap.markers.some(m => m.id === newMarker.id)).toBeTrue();
    }

    // update marker
    service.updateMarker(newMarker.id, { title: 'Updated' });
    currentMap = service.getCurrentMap();
    if (currentMap) {
      const m = currentMap.markers.find(mk => mk.id === newMarker.id)!;
      expect(m.title).toBe('Updated');
    }

    // select marker
    service.selectMarker(newMarker);
    expect(service.getSelectedMarker()?.id).toBe(newMarker.id);

    // remove marker
    service.removeMarker(newMarker.id);
    currentMap = service.getCurrentMap();
    if (currentMap) {
      expect(currentMap.markers.some(m => m.id === newMarker.id)).toBeFalse();
    }
    expect(service.getSelectedMarker()).toBeNull();
  }));

  it('should select layer and set only that layer visible', fakeAsync(() => {
    const map = GAME_MAPS.find(m => m.layers && m.layers.length > 1);
    if (!map) {
      pending('no map with multiple layers in GAME_MAPS');
      return;
    }

    service.loadMap(map.id);
    tick(300);

    const layerToSelect = map.layers![0].id;
    service.selectLayer(layerToSelect);
    tick(200);

    const current = service.getCurrentMap();
    expect(current).toBeTruthy();
    if (current && current.layers) {
      const visibleLayers = current.layers.filter(l => l.visible);
      expect(visibleLayers.length).toBe(1);
      expect(visibleLayers[0].id).toBe(layerToSelect);
    }
  }));
});
