import { TestBed } from '@angular/core/testing';
import { MapInteractionService } from './map-interaction.service';

describe('MapInteractionService', () => {
  let service: MapInteractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapInteractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default state', () => {
    const state = service.getState();
    expect(state.zoomLevel).toBe(1);
    expect(state.panOffsetX).toBe(0);
    expect(state.panOffsetY).toBe(0);
    expect(state.isPanning).toBe(false);
  });

  it('should zoom in', () => {
    service.zoomIn();
    const state = service.getState();
    expect(state.zoomLevel).toBeGreaterThan(1);
  });

  it('should zoom out', () => {
    service.zoomOut();
    const state = service.getState();
    expect(state.zoomLevel).toBeLessThan(1);
  });

  it('should reset zoom and pan', () => {
    service.zoomIn();
    service.startPan(100, 100);
    service.updatePan(150, 150);
    service.resetZoom();
    
    const state = service.getState();
    expect(state.zoomLevel).toBe(1);
    expect(state.panOffsetX).toBe(0);
    expect(state.panOffsetY).toBe(0);
  });
});
