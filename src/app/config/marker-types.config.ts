/**
 * Marker Type Configuration
 * 
 * This file defines the visual appearance of different marker types
 * including their icons and colors.
 * 
 * QUICK CUSTOMIZATION GUIDE:
 * 1. Find an icon at: https://fonts.google.com/icons
 * 2. Copy the icon name (e.g., "castle", "diamond", "flag")
 * 3. Update the 'icon' property below
 * 4. Optionally adjust 'color' and 'iconColor' for your theme
 * 5. Save and reload the application
 * 
 * See QUICK_REFERENCE.md for a fast guide
 * See MARKER_CUSTOMIZATION.md for complete documentation
 */

export interface MarkerTypeConfig {
  type: string;
  icon: string;        // Material Icon name
  color: string;       // Background color for the marker
  iconColor: string;   // Icon color (typically white or contrasting color)
  label: string;       // Human-readable label
}

/**
 * Default marker type configurations
 * 
 * To customize marker appearance:
 * 1. Change the 'icon' property to any Material Icon name
 *    Browse available icons at: https://fonts.google.com/icons
 * 2. Update the 'color' property with any valid CSS color
 * 3. Adjust 'iconColor' for contrast against the background
 * 
 * Example icons you might want to use:
 * - location_on, place, pin_drop (location markers)
 * - star, grade, emoji_events (special locations)
 * - grass, park, forest (nature/resources)
 * - flag, outlined_flag (spawn points)
 * - person, groups, shield (units)
 * - apartment, domain, castle (buildings/wonders)
 * - explore, map, navigation (general navigation)
 */
export const MARKER_TYPE_CONFIGS: MarkerTypeConfig[] = [
  {
    type: 'spawn',
    icon: 'flag',                    // Material Icon: flag
    color: '#4CAF50',                // Green
    iconColor: '#ffffff',            // White
    label: 'Spawn Point'
  },
  {
    type: 'resource',
    icon: 'grass',                   // Material Icon: grass
    color: '#FFC107',                // Amber
    iconColor: '#000000',            // Black
    label: 'Resource'
  },
  {
    type: 'wonder',
    icon: 'star',                    // Material Icon: star
    color: '#9C27B0',                // Purple
    iconColor: '#ffffff',            // White
    label: 'Wonder'
  },
  {
    type: 'unit',
    icon: 'shield',                  // Material Icon: shield
    color: '#F44336',                // Red
    iconColor: '#ffffff',            // White
    label: 'Unit'
  },
  {
    type: 'custom',
    icon: 'place',                   // Material Icon: place
    color: '#2196F3',                // Blue
    iconColor: '#ffffff',            // White
    label: 'Custom'
  }
];

/**
 * Helper function to get marker configuration by type
 * @param type - The marker type
 * @returns The marker configuration or a default configuration
 */
export function getMarkerConfig(type: string): MarkerTypeConfig {
  const config = MARKER_TYPE_CONFIGS.find(c => c.type === type);
  if (config) {
    return config;
  }
  
  // Default configuration for unknown types
  return {
    type: type,
    icon: 'place',
    color: '#9E9E9E',
    iconColor: '#ffffff',
    label: type.charAt(0).toUpperCase() + type.slice(1)
  };
}

/**
 * Get all available marker types
 * @returns Array of marker type strings
 */
export function getMarkerTypes(): string[] {
  return MARKER_TYPE_CONFIGS.map(config => config.type);
}
