import { GAME_MAPS_METADATA, GameMapMetadata } from '../config/game-maps-metadata.config';
import { MAP_CATEGORIES, MapCategoryId, MapCategoryInfo } from '../config/map-categories.config';

/**
 * GAME MAPS UTILITY FUNCTIONS
 * 
 * This file contains helper functions for working with game maps and categories.
 * Separating utilities from config keeps data and logic cleanly separated.
 * 
 * @example
 * ```typescript
 * import { getMapsByCategory, getMapById } from '@/utils/game-maps.utils';
 * 
 * const dlcMaps = getMapsByCategory('dlc-home-invasion');
 * const map = getMapById('4U_gas');
 * ```
 */

// ============================================================================
// MAP QUERY FUNCTIONS
// ============================================================================

/**
 * Get map by ID
 * @param mapId - The unique identifier of the map
 * @returns The map metadata or undefined if not found
 */
export function getMapById(mapId: string): GameMapMetadata | undefined {
  return GAME_MAPS_METADATA.find(map => map.id === mapId);
}

/**
 * Get map by route
 * @param route - The route path of the map
 * @returns The map metadata or undefined if not found
 */
export function getMapByRoute(route: string): GameMapMetadata | undefined {
  return GAME_MAPS_METADATA.find(map => map.route === route);
}

/**
 * Filter maps by category
 * @param categoryId - The category to filter by
 * @returns Array of maps in the specified category
 */
export function getMapsByCategory(categoryId: MapCategoryId): GameMapMetadata[] {
  return GAME_MAPS_METADATA.filter(map => map.category === categoryId);
}

/**
 * Get all maps sorted by order
 * @returns Array of all maps sorted by their order property
 */
export function getAllMapsSorted(): GameMapMetadata[] {
  return [...GAME_MAPS_METADATA].sort((a, b) => a.order - b.order);
}

// ============================================================================
// CATEGORY QUERY FUNCTIONS
// ============================================================================

/**
 * Get unique categories that are actually used by maps
 * @returns Array of category info for categories with at least one map
 */
export function getUsedCategories(): MapCategoryInfo[] {
  const usedCategoryIds = new Set(GAME_MAPS_METADATA.map(map => map.category));
  return Array.from(usedCategoryIds)
    .map(id => MAP_CATEGORIES[id])
    .sort((a, b) => a.order - b.order);
}

/**
 * Get count of maps in each category
 * @returns Record mapping category IDs to map counts
 */
export function getMapCountsByCategory(): Record<MapCategoryId, number> {
  const counts = {} as Record<MapCategoryId, number>;
  
  for (const category of Object.keys(MAP_CATEGORIES) as MapCategoryId[]) {
    counts[category] = 0;
  }
  
  for (const map of GAME_MAPS_METADATA) {
    counts[map.category]++;
  }
  
  return counts;
}

// ============================================================================
// SEARCH & FILTER FUNCTIONS
// ============================================================================

/**
 * Search maps by name or description
 * @param searchTerm - The term to search for (case-insensitive)
 * @returns Array of matching maps
 */
export function searchMaps(searchTerm: string): GameMapMetadata[] {
  const term = searchTerm.toLowerCase();
  return GAME_MAPS_METADATA.filter(map => 
    map.name.toLowerCase().includes(term) ||
    map.metaDescription.toLowerCase().includes(term)
  );
}

/**
 * Filter maps by multiple categories
 * @param categoryIds - Array of category IDs to include
 * @returns Array of maps matching any of the specified categories
 */
export function getMapsByCategories(categoryIds: MapCategoryId[]): GameMapMetadata[] {
  const categorySet = new Set(categoryIds);
  return GAME_MAPS_METADATA.filter(map => categorySet.has(map.category));
}

// ============================================================================
// STATISTICS FUNCTIONS
// ============================================================================

/**
 * Get total number of maps
 * @returns Total count of all maps
 */
export function getTotalMapCount(): number {
  return GAME_MAPS_METADATA.length;
}

/**
 * Get maps grouped by category
 * @returns Record mapping category IDs to arrays of maps
 */
export function getMapsGroupedByCategory(): Record<MapCategoryId, GameMapMetadata[]> {
  const grouped = {} as Record<MapCategoryId, GameMapMetadata[]>;
  
  for (const category of Object.keys(MAP_CATEGORIES) as MapCategoryId[]) {
    grouped[category] = [];
  }
  
  for (const map of GAME_MAPS_METADATA) {
    grouped[map.category].push(map);
  }
  
  return grouped;
}
