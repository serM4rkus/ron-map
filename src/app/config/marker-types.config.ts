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
  /** Optional relative URL to an SVG to use as the icon. If set, this SVG
   * will be used instead of the Material Icon named in `icon`. Example:
   * '/svg/stairs_down.svg' */
  svgIconUrl?: string;
  color: string;       // Background color for the marker
  iconColor: string;   // Icon color (typically white or contrasting color)
  label: string;       // Human-readable label
  showInLegend: boolean;       // Whether this type appears in the legend UI
  clickable: boolean;          // Whether clicking opens the detail panel
  showTooltipOnHover: boolean; // Whether hovering shows a tooltip
  navigable: boolean;          // Whether clicking triggers floor navigation (stairs-style)
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
 * - flag, outlined_flag (spawn)
 * - person, groups, shield (units)
 * - apartment, domain, castle (buildings/wonders)
 * - explore, map, navigation (general navigation)
 */
export const MARKER_TYPE_CONFIGS: MarkerTypeConfig[] = [
  // Main markers
  {
    type: 'spawn',
    icon: 'flag',
    color: '#4CAF50',
    iconColor: '#ffffff',
    label: 'Spawn',
    showInLegend: true,
    clickable: true,
    showTooltipOnHover: false,
    navigable: false
  },
  {
    type: 'hard_objective',
    icon: 'place',
    color: '#FF6B00',
    iconColor: '#000000',
    label: 'Hard Objective',
    showInLegend: true,
    clickable: true,
    showTooltipOnHover: false,
    navigable: false
  },
  {
    type: 'soft_objective',
    icon: 'search',
    color: '#9C27B0',
    iconColor: '#ffffff',
    label: 'Soft Objective',
    showInLegend: true,
    clickable: true,
    showTooltipOnHover: false,
    navigable: false
  },
  // Stairs markers
  {
    type: 'stairs_down',
    icon: 'place',
    svgIconUrl: './svg/stairs_down.svg',
    color: '#607D8B',
    iconColor: '#ffffff',
    label: 'Stairs Down',
    showInLegend: false,
    clickable: false,
    showTooltipOnHover: true,
    navigable: true
  },
  {
    type: 'stairs_up',
    icon: 'place',
    svgIconUrl: './svg/stairs_up.svg',
    color: '#607D8B',
    iconColor: '#ffffff',
    label: 'Stairs Up',
    showInLegend: false,
    clickable: false,
    showTooltipOnHover: true,
    navigable: true
  },
  {
    type: 'stairs_up_down',
    icon: 'place',
    svgIconUrl: './svg/stairs_up_down.svg',
    color: '#607D8B',
    iconColor: '#ffffff',
    label: 'Stairs Up Down',
    showInLegend: false,
    clickable: false,
    showTooltipOnHover: true,
    navigable: true
  },
  // Sinious Trail specific marker
  {
    type: 'comms',
    icon: 'mobile_speaker',
    svgIconUrl: './svg/comms.svg',
    color: '#607D8B',
    iconColor: '#ffffff',
    label: 'Comm',
    showInLegend: false,
    clickable: false,
    showTooltipOnHover: true,
    navigable: false
  },
  // Dark Water specific markers
  {
    type: 'explosion',
    icon: 'place',
    svgIconUrl: './svg/explosion.svg',
    color: '#607D8B',
    iconColor: '#ffffff',
    label: 'Destructable',
    showInLegend: false,
    clickable: true,
    showTooltipOnHover: false,
    navigable: false
  },
  // Boiling point specific markers
  {
    type: 'entrance',
    icon: 'place',
    svgIconUrl: './svg/entrance.svg',
    color: '#607D8B',
    iconColor: '#ffffff',
    label: 'Entarnce',
    showInLegend: false,
    clickable: true,
    showTooltipOnHover: false,
    navigable: false
  },
  {
    type: 'key_card',
    icon: 'credit_card_gear',
    svgIconUrl: './svg/key_card.svg',
    color: '#607D8B',
    iconColor: '#ffffff',
    label: 'Key Card',
    showInLegend: false,
    clickable: true,
    showTooltipOnHover: false,
    navigable: false
  },
  {
    type: 'pc',
    icon: 'desktop_windows',
    svgIconUrl: './svg/pc.svg',
    color: '#607D8B',
    iconColor: '#ffffff',
    label: 'PC',
    showInLegend: false,
    clickable: true,
    showTooltipOnHover: false,
    navigable: false
  },
  {
    type: 'light_off',
    icon: 'light_off',
    svgIconUrl: './svg/light_off.svg',
    color: '#607D8B',
    iconColor: '#ffffff',
    label: 'Light OFF',
    showInLegend: false,
    clickable: true,
    showTooltipOnHover: false,
    navigable: false
  },
  {
    type: 'private',
    icon: 'private_connectivity',
    svgIconUrl: './svg/private.svg',
    color: '#607D8B',
    iconColor: '#ffffff',
    label: 'Private',
    showInLegend: false,
    clickable: true,
    showTooltipOnHover: false,
    navigable: false
  },
  {
    type: 'magnetic_doors',
    icon: 'sensor_door',
    svgIconUrl: './svg/magnetic_doors.svg',
    color: '#607D8B',
    iconColor: '#ffffff',
    label: 'Magnetic Doors',
    showInLegend: false,
    clickable: true,
    showTooltipOnHover: false,
    navigable: false
  },
  {
    type: 'camera',
    icon: 'linked_camera',
    svgIconUrl: './svg/camera.svg',
    color: '#607D8B',
    iconColor: '#ffffff',
    label: 'Camera',
    showInLegend: false,
    clickable: true,
    showTooltipOnHover: false,
    navigable: false
  },
  {
    type: 'phone',
    icon: 'mobile_speaker',
    svgIconUrl: './svg/comms.svg',
    color: '#607D8B',
    iconColor: '#ffffff',
    label: 'Phone',
    showInLegend: false,
    clickable: true,
    showTooltipOnHover: false,
    navigable: false
  },
  {
    type: 'password',
    icon: 'password',
    svgIconUrl: './svg/password.svg',
    color: '#607D8B',
    iconColor: '#ffffff',
    label: 'Phone',
    showInLegend: false,
    clickable: true,
    showTooltipOnHover: false,
    navigable: false
  }
];

/** Derived union type from config — add new types to MARKER_TYPE_CONFIGS only */
export type MarkerType = typeof MARKER_TYPE_CONFIGS[number]['type'];

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
    svgIconUrl: undefined,
    color: '#9E9E9E',
    iconColor: '#ffffff',
    label: type.charAt(0).toUpperCase() + type.slice(1),
    showInLegend: true,
    clickable: true,
    showTooltipOnHover: false,
    navigable: false
  };
}

/**
 * Get all available marker types
 * @returns Array of marker type strings
 */
export function getMarkerTypes(): string[] {
  return MARKER_TYPE_CONFIGS.map(config => config.type);
}
