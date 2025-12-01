/**
 * UTILS BARREL EXPORT
 * 
 * Convenience exports for all utility functions.
 * This allows importing utilities using shorter paths.
 * 
 * @example
 * ```typescript
 * // Instead of:
 * import { getMapById } from '@/utils/game-maps.utils';
 * 
 * // You can use:
 * import { getMapById } from '@/utils';
 * ```
 */

// Re-export all game map utilities
export {
  // Map Query Functions
  getMapById,
  getMapByRoute,
  getMapsByCategory,
  getAllMapsSorted,
  
  // Category Query Functions
  getUsedCategories,
  getMapCountsByCategory,
  
  // Search & Filter Functions
  searchMaps,
  getMapsByCategories,
  
  // Statistics Functions
  getTotalMapCount,
  getMapsGroupedByCategory
} from './game-maps.utils';
