# Game Maps

This directory contains the game map images used by the RoN Interactive Map application.

## Map Files

- **ancient-world.png** - Ancient World map showing historical civilizations (1200x800)
- **medieval-realm.png** - Medieval fantasy-inspired map (1200x800)

## Map Format Requirements

- **Format**: PNG images
- **Recommended Size**: 1200x800 pixels minimum
- **Color Space**: RGB or RGBA
- **Background**: Should represent the terrain/game world

## Adding New Maps

To add new maps:

1. Place your map image in this directory
2. Update `GameMapService` in `src/app/services/game-map.ts`
3. Add a new entry to the `gameMaps` array with:
   - Unique ID
   - Display name
   - Image URL (relative to public folder)
   - Dimensions
   - Initial markers (optional)

Example:
```typescript
{
  id: 'my-map',
  name: 'My Custom Map',
  imageUrl: '/maps/my-map.png',
  width: 1200,
  height: 800,
  description: 'My custom game map',
  markers: [
    { id: 'm1', x: 100, y: 100, title: 'Location 1', description: 'A place', type: 'city', color: '#FF6B6B' }
  ]
}
```

## Marker Types

- **city** - Cities and settlements (red)
- **resource** - Resources like gold, iron (gold)
- **wonder** - Wonders of the world (teal)
- **unit** - Military units and armies (red)
- **custom** - Custom markers (custom color)
