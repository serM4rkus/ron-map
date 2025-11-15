# InteractiveMapApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.10.

## Features

- **Multi-layer Map Support**: View different floor plans and map layers
- **Interactive Markers**: Click on markers to view details about spawn points, resources, wonders, and units
- **Customizable Marker Icons**: Each marker type displays a unique Material Icon with custom colors
- **Synchronized Legend**: Legend displays the same icons as markers for easy identification
- **Legend Filtering**: Toggle visibility of different marker types
- **Drawing Tools**: Draw tactical lines on the map with 5 different colors
- **Language Support**: Switch between English 🇬🇧 and Ukrainian 🇺🇦
- **Pan & Zoom**: Navigate large maps with mouse controls
- **Searchable Map Selector**: Quickly find maps with the search feature

## Customizing Marker Icons and Colors

The application uses **Google Material Icons** for marker visualization. Each marker type can be customized with a unique icon and color scheme.

### Quick Start

**File to edit**: `src/app/config/marker-types.config.ts`

**See also**: 
- 📖 [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Fast 3-step guide
- 📚 [MARKER_CUSTOMIZATION.md](MARKER_CUSTOMIZATION.md) - Complete documentation

### How to Change Marker Icons

1. Open `src/app/config/marker-types.config.ts`
2. Find the marker type you want to customize in the `MARKER_TYPE_CONFIGS` array
3. Modify the configuration properties:

```typescript
{
  type: 'spawn',           // Marker type identifier
  icon: 'flag',            // Material Icon name - CHANGE THIS
  color: '#4CAF50',        // Background color - CHANGE THIS
  iconColor: '#ffffff',    // Icon color - CHANGE THIS
  label: 'Spawn Point'     // Display label
}
```

### Finding Material Icons

1. Visit [Google Material Icons](https://fonts.google.com/icons)
2. Browse or search for an icon you like
3. Click on the icon to see its name
4. Copy the icon name (e.g., `star`, `place`, `flag`, `castle`)
5. Use this name in the `icon` property

### Popular Icon Suggestions

Here are some recommended icons for different marker types:

**Location & Navigation:**
- `location_on`, `place`, `pin_drop`, `room`, `map`, `explore`, `navigation`

**Military & Units:**
- `shield`, `security`, `person`, `groups`, `military_tech`, `sports_martial_arts`

**Buildings & Structures:**
- `apartment`, `domain`, `castle`, `home`, `villa`, `warehouse`, `church`

**Resources & Nature:**
- `grass`, `park`, `forest`, `nature`, `local_florist`, `eco`, `terrain`

**Special Locations:**
- `star`, `grade`, `emoji_events`, `workspace_premium`, `diamond`, `attractions`

**Flags & Markers:**
- `flag`, `outlined_flag`, `tour`, `bookmark`, `push_pin`

### Example: Changing the Wonder Icon

To change the wonder marker from a star to a castle:

```typescript
{
  type: 'wonder',
  icon: 'castle',          // Changed from 'star' to 'castle'
  color: '#9C27B0',        // Purple - keep or change
  iconColor: '#ffffff',    // White icon color
  label: 'Wonder'
}
```

### Color Customization

You can use any valid CSS color format:

- **Hex colors**: `#FF5733`, `#2196F3`
- **RGB**: `rgb(255, 87, 51)`, `rgba(33, 150, 243, 0.8)`
- **Named colors**: `red`, `blue`, `green`, `purple`
- **HSL**: `hsl(120, 100%, 50%)`

### Adding New Marker Types

To add a completely new marker type:

1. Add a new configuration object to `MARKER_TYPE_CONFIGS`:

```typescript
{
  type: 'treasure',
  icon: 'diamond',
  color: '#FFD700',        // Gold color
  iconColor: '#000000',    // Black icon
  label: 'Treasure'
}
```

2. The marker type will automatically be available when creating new markers

### Current Default Configuration

Each marker type displays with a unique Material Icon:

| Type | Icon | Color | Description |
|------|------|-------|-------------|
| **Spawn** | 🚩 flag | Green `#4CAF50` | Starting locations for players or units |
| **Resource** | 🌿 grass | Amber `#FFC107` | Collectible resources and materials |
| **Wonder** | ⭐ star | Purple `#9C27B0` | Special buildings and landmarks |
| **Unit** | 🛡️ shield | Red `#F44336` | Military units and characters |
| **Custom** | 📍 place | Blue `#2196F3` | General purpose markers |

> **Note**: The emojis above are for documentation only. The actual application uses Material Icons which provide a consistent, scalable design.

### Tips for Best Results

- Choose **contrasting colors** for `color` and `iconColor` for visibility
- Use **recognizable icons** that match the marker's purpose
- Keep **color schemes consistent** within your theme
- Test markers at different **zoom levels** to ensure visibility

For a comprehensive guide with more examples, icon suggestions, and troubleshooting tips, see **[MARKER_CUSTOMIZATION.md](MARKER_CUSTOMIZATION.md)**.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Adding New Languages

To add a new language:

1. Open `src/app/config/languages.config.ts`
2. Add the new language to the `LANGUAGES` array:
   ```typescript
   { code: 'fr', name: 'Français', flag: '🇫🇷' }
   ```
3. Add translations for all keys in the `TRANSLATIONS` object:
   ```typescript
   'selectMap': {
     'en': 'Select Map',
     'uk': 'Оберіть карту',
     'fr': 'Sélectionner une carte'
   }
   ```

## Adding New Maps

To add new maps, edit `src/app/config/game-maps.config.ts` and add your map configuration to the `GAME_MAPS` array.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Documentation

This project includes comprehensive documentation for various features:

### Marker Customization
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick 3-step guide to change marker icons
- **[MARKER_CUSTOMIZATION.md](MARKER_CUSTOMIZATION.md)** - Complete customization guide with examples
- **[VISUAL_GUIDE.md](VISUAL_GUIDE.md)** - Visual reference showing marker appearance and animations


## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
