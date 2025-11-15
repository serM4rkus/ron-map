# Marker Customization Guide

This guide provides detailed instructions on how to customize marker icons, colors, and behavior in the interactive map application.

## Overview

Markers use **Google Material Icons** for visual representation. Each marker type can have:
- A unique icon from the Material Icons library
- Custom background color
- Custom icon color
- Animated effects

## Quick Start

To change a marker's appearance:

1. Open `src/app/config/marker-types.config.ts`
2. Locate the marker type you want to customize
3. Update the `icon`, `color`, or `iconColor` properties
4. Save the file - changes will appear after reload

## Configuration File Structure

The `marker-types.config.ts` file contains the `MARKER_TYPE_CONFIGS` array:

```typescript
export const MARKER_TYPE_CONFIGS: MarkerTypeConfig[] = [
  {
    type: 'spawn',           // Internal identifier (don't change)
    icon: 'flag',            // Material Icon name
    color: '#4CAF50',        // Background color (hex, rgb, etc.)
    iconColor: '#ffffff',    // Icon color for contrast
    label: 'Spawn Point'     // Human-readable name
  },
  // ... more marker types
];
```

## Finding the Right Icon

### Method 1: Browse Material Icons Website

1. Visit [Google Material Icons](https://fonts.google.com/icons)
2. Use the search bar or browse categories
3. Click on an icon you like
4. Copy the icon name (shown below the icon)
5. Paste the name into the `icon` field

### Method 2: Browse by Category

**Popular Categories:**

- **Maps & Location**: `location_on`, `place`, `room`, `explore`, `map`
- **Action**: `flag`, `bookmark`, `star`, `grade`, `favorite`
- **Social**: `person`, `groups`, `military_tech`, `shield`
- **Places**: `castle`, `home`, `apartment`, `domain`, `church`, `warehouse`
- **Nature**: `grass`, `park`, `forest`, `nature`, `local_florist`, `eco`
- **Items**: `diamond`, `emoji_events`, `workspace_premium`, `key`, `star`

## Icon Recommendations by Marker Type

### Spawn Points
Marks where players or units start.

**Recommended Icons:**
- `flag` (current default)
- `outlined_flag`
- `tour`
- `start`
- `add_location`
- `my_location`

**Example:**
```typescript
{
  type: 'spawn',
  icon: 'outlined_flag',
  color: '#4CAF50',
  iconColor: '#ffffff',
  label: 'Spawn Point'
}
```

### Resources
Marks collectible resources or points of interest.

**Recommended Icons:**
- `grass` (current default)
- `eco`
- `nature`
- `park`
- `local_florist`
- `diamond`
- `currency_bitcoin` (for currency/gold)

**Example:**
```typescript
{
  type: 'resource',
  icon: 'eco',
  color: '#FFC107',
  iconColor: '#000000',
  label: 'Resource'
}
```

### Wonders
Marks special buildings or landmarks.

**Recommended Icons:**
- `star` (current default)
- `castle`
- `domain`
- `apartment`
- `church`
- `emoji_events`
- `workspace_premium`
- `attractions`

**Example:**
```typescript
{
  type: 'wonder',
  icon: 'castle',
  color: '#9C27B0',
  iconColor: '#ffffff',
  label: 'Wonder'
}
```

### Units
Marks military units or characters.

**Recommended Icons:**
- `shield` (current default)
- `security`
- `person`
- `groups`
- `military_tech`
- `sports_martial_arts`
- `people`

**Example:**
```typescript
{
  type: 'unit',
  icon: 'military_tech',
  color: '#F44336',
  iconColor: '#ffffff',
  label: 'Unit'
}
```

### Custom Markers
General-purpose markers.

**Recommended Icons:**
- `place` (current default)
- `location_on`
- `pin_drop`
- `room`
- `push_pin`
- `bookmark`

## Color Schemes

### Choosing Colors

Good color choices make markers easily identifiable. Consider:

1. **Contrast**: Use light icons on dark backgrounds or vice versa
2. **Theme**: Match your game's visual style
3. **Differentiation**: Make each marker type visually distinct
4. **Accessibility**: Ensure colors are distinguishable for colorblind users

### Color Format Options

You can use any CSS color format:

```typescript
// Hexadecimal (most common)
color: '#FF5733'

// RGB
color: 'rgb(255, 87, 51)'

// RGBA (with transparency)
color: 'rgba(255, 87, 51, 0.9)'

// HSL
color: 'hsl(9, 100%, 60%)'

// Named colors
color: 'red'
```

### Recommended Color Palettes

**Material Design Colors:**
```typescript
Red:     '#F44336'
Pink:    '#E91E63'
Purple:  '#9C27B0'
Blue:    '#2196F3'
Cyan:    '#00BCD4'
Teal:    '#009688'
Green:   '#4CAF50'
Lime:    '#CDDC39'
Yellow:  '#FFEB3B'
Amber:   '#FFC107'
Orange:  '#FF9800'
Brown:   '#795548'
```

**High Contrast Palette:**
```typescript
Bright Red:    '#FF0000'
Bright Green:  '#00FF00'
Bright Blue:   '#0000FF'
Bright Yellow: '#FFFF00'
Bright Cyan:   '#00FFFF'
Bright Pink:   '#FF00FF'
```

**Pastel Palette:**
```typescript
Pastel Red:    '#FFB3BA'
Pastel Orange: '#FFDFBA'
Pastel Yellow: '#FFFFBA'
Pastel Green:  '#BAFFC9'
Pastel Blue:   '#BAE1FF'
Pastel Purple: '#E0BBE4'
```

## Adding New Marker Types

To create a completely new marker type:

1. Add a new entry to `MARKER_TYPE_CONFIGS`:

```typescript
{
  type: 'treasure',        // Unique identifier
  icon: 'diamond',         // Material Icon
  color: '#FFD700',        // Gold color
  iconColor: '#000000',    // Black icon
  label: 'Treasure Chest' // Display name
}
```

2. The marker type will automatically become available in the marker creation form

3. Update your game maps configuration if needed to include markers with the new type

## Animation Effects

Different marker types have special animations defined in CSS:

- **Spawn**: Breathing effect (grows and shrinks)
- **Resource**: Pulsing glow effect
- **Wonder**: Static glow
- **Unit**: Alternating glow effect

To customize animations, edit `src/app/components/map-viewer/map-viewer.css`:

```css
.marker-spawn .marker-icon {
  animation: spawnBreath 3s infinite ease-in-out;
}
```

## Advanced Customization

### Per-Marker Custom Colors

Markers can override the default color:

```typescript
// In your map config
markers: [
  {
    id: '1',
    x: 50,
    y: 50,
    title: 'Special Resource',
    description: 'A rare resource location',
    type: 'resource',
    color: '#00FF00'  // This overrides the default resource color
  }
]
```

### Icon Size Adjustments

To change the size of all marker icons, edit `map-viewer.css`:

```css
.marker-icon {
  width: 36px;    /* Change this */
  height: 36px;   /* and this */
}

.marker-icon .material-icons {
  font-size: 20px;  /* and this */
}
```

### Border and Shadow Effects

Customize the marker appearance:

```css
.marker-icon {
  border: 2px solid white;  /* Border thickness and color */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);  /* Shadow effect */
}
```

## Testing Your Changes

After making changes:

1. Save the configuration file
2. If the dev server is running, it will hot-reload
3. Check each marker type on the map
4. Verify icons are visible at different zoom levels
5. Test hover and click interactions

## Troubleshooting

### Icon Not Showing

**Problem**: The icon name might be incorrect or not exist.

**Solution**: 
- Double-check the icon name on [Material Icons](https://fonts.google.com/icons)
- Ensure there are no typos
- Icon names are case-sensitive

### Icon Too Small/Large

**Problem**: Icon doesn't fit well in the marker circle.

**Solution**: Adjust the `font-size` in the CSS:
```css
.marker-icon .material-icons {
  font-size: 20px;  /* Adjust this value */
}
```

### Poor Contrast

**Problem**: Icon is hard to see against the background color.

**Solution**: Change the `iconColor` to provide better contrast:
- Use white (`#ffffff`) on dark backgrounds
- Use black (`#000000`) on light backgrounds

### Animation Not Working

**Problem**: Custom marker type doesn't animate.

**Solution**: Add animation rules in `map-viewer.css`:
```css
.marker-yourtype .marker-icon {
  animation: yourAnimation 2s infinite;
}

@keyframes yourAnimation {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}
```

## Examples

### Gaming Theme

```typescript
{
  type: 'spawn',
  icon: 'sports_esports',
  color: '#00FF00',
  iconColor: '#000000',
  label: 'Spawn'
},
{
  type: 'resource',
  icon: 'currency_bitcoin',
  color: '#FFD700',
  iconColor: '#000000',
  label: 'Gold'
},
{
  type: 'wonder',
  icon: 'castle',
  color: '#8B4513',
  iconColor: '#FFD700',
  label: 'Castle'
},
{
  type: 'unit',
  icon: 'person',
  color: '#FF0000',
  iconColor: '#ffffff',
  label: 'Player'
}
```

### Nature Theme

```typescript
{
  type: 'spawn',
  icon: 'home',
  color: '#8B4513',
  iconColor: '#ffffff',
  label: 'Base'
},
{
  type: 'resource',
  icon: 'local_florist',
  color: '#FF69B4',
  iconColor: '#ffffff',
  label: 'Flowers'
},
{
  type: 'wonder',
  icon: 'forest',
  color: '#228B22',
  iconColor: '#ffffff',
  label: 'Ancient Tree'
},
{
  type: 'unit',
  icon: 'pets',
  color: '#D2691E',
  iconColor: '#ffffff',
  label: 'Animal'
}
```

## Best Practices

1. **Consistency**: Keep a consistent visual style across all marker types
2. **Simplicity**: Choose icons that are clear and recognizable
3. **Testing**: Test on different backgrounds and zoom levels
4. **Documentation**: Comment your custom configurations for future reference
5. **Backups**: Keep a backup of the original config before making changes
6. **User Feedback**: Get feedback on icon choices from actual users

## Resources

- [Google Material Icons Gallery](https://fonts.google.com/icons)
- [Material Design Color Palette](https://material.io/design/color/)
- [CSS Color Picker](https://www.w3schools.com/colors/colors_picker.asp)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

## Support

If you need help customizing markers:
1. Check this guide for common solutions
2. Review the example configurations
3. Test your changes incrementally
4. Refer to the main README for general project setup

---

**Note**: All changes to `marker-types.config.ts` require a page reload to take effect. If running a development server, it should automatically reload.
