/**
 * MAP CATEGORIES CONFIGURATION
 * 
 * Defines the category system for organizing game maps.
 * Categories are used for filtering, display badges, and organizing the map selector UI.
 * 
 * @example Adding a new DLC category
 * ```typescript
 * // Simply add to MAP_CATEGORIES - the type is automatically updated!
 * 'dlc-special-ops': {
 *   id: 'dlc-special-ops',
 *   displayName: 'Special Operations DLC',
 *   shortName: 'Spec Ops',
 *   description: 'Elite tactical missions',
 *   badgeColor: '#10b981', // Green
 *   order: 3
 * }
 * ```
 * 
 * @example Using in components
 * ```typescript
 * import { getCategoryInfo, getAllCategories } from './map-categories.config';
 * 
 * const categoryInfo = getCategoryInfo('dlc-home-invasion');
 * console.log(categoryInfo.displayName); // "Home Invasion DLC"
 * ```
 */

// ============================================================================
// CATEGORY TYPES & INTERFACES
// ============================================================================

/**
 * Category metadata for display and filtering
 */
export interface MapCategoryInfo {
  id: string;
  displayName: string;
  shortName: string;
  description: string;
  badgeColor: string; // CSS color for badges/tags
  order: number; // Display order in filters
}

// ============================================================================
// CATEGORY DEFINITIONS
// ============================================================================

/**
 * Category definitions with display information
 * 
 * To add a new category, simply add a new entry here:
 * - 'base': Base game maps
 * - 'dlc-home-invasion': Home Invasion DLC
 * - Add more as needed (e.g., 'dlc-special-ops', 'dlc-2', etc.)
 */
export const MAP_CATEGORIES = {
  'base': {
    id: 'base',
    displayName: 'Base Game',
    shortName: 'Base',
    description: 'Original Ready or Not missions',
    badgeColor: '#4f46e5', // Indigo - professional, authoritative
    order: 1
  },
  'dlc-home-invasion': {
    id: 'dlc-home-invasion',
    displayName: 'Home Invasion DLC',
    shortName: 'DLC 1',
    description: 'Home Invasion expansion pack missions',
    badgeColor: '#dc2626', // Red - intense, action-focused
    order: 2
  },
  'dlc-dark-waters': {
    id: 'dlc-dark-waters',
    displayName: 'Dark Waters DLC',
    shortName: 'DLC 2',
    description: 'Dark Waters expansion pack missions',
    badgeColor: '#059669', // Emerald Green - tactical, stealthy
    order: 3
  }
  // Add more DLC categories here - no need to update types!
  // 'dlc-special-ops': { id: 'dlc-special-ops', displayName: 'Special Ops DLC', badgeColor: '#059669', ... },
} as const satisfies Record<string, MapCategoryInfo>;

/**
 * Map category identifiers - automatically derived from MAP_CATEGORIES keys
 * This eliminates redundancy and ensures type safety
 */
export type MapCategoryId = keyof typeof MAP_CATEGORIES;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get category information by category ID
 */
export function getCategoryInfo(categoryId: MapCategoryId): MapCategoryInfo {
  return MAP_CATEGORIES[categoryId];
}

/**
 * Get all available categories sorted by order
 */
export function getAllCategories(): MapCategoryInfo[] {
  return Object.values(MAP_CATEGORIES).sort((a, b) => a.order - b.order);
}
