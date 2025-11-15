export interface Language {
  code: string;
  name: string;
  flag: string;
  textCode?: string;
}

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧', textCode: 'EN' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦', textCode: 'UA' }
];

export interface Translations {
  [key: string]: {
    [lang: string]: string;
  };
}

export const TRANSLATIONS: Translations = {
  // Map selector
  'selectMap': {
    'en': 'Select Map',
    'uk': 'Оберіть карту'
  },
  'search': {
    'en': 'Search...',
    'uk': 'Пошук...'
  },
  'layers': {
    'en': 'Layers',
    'uk': 'Шари'
  },
  'drawingTools': {
    'en': 'Drawing Tools',
    'uk': 'Інструменти малювання'
  },
  'clearAll': {
    'en': 'Clear All',
    'uk': 'Очистити все'
  },
  'legend': {
    'en': 'Legend',
    'uk': 'Легенда'
  },
  'showAll': {
    'en': 'Show All',
    'uk': 'Показати все'
  },
  'hideAll': {
    'en': 'Hide All',
    'uk': 'Приховати все'
  },
  
  // Legend items
  'spawn': {
    'en': 'Spawn Points',
    'uk': 'Точки появи'
  },
  'resource': {
    'en': 'Resources',
    'uk': 'Ресурси'
  },
  'wonder': {
    'en': 'Wonders',
    'uk': 'Чудеса'
  },
  'unit': {
    'en': 'Units',
    'uk': 'Юніти'
  },
  
  // Map names
  '4U Gas Station': {
    'en': '4U Gas Station',
    'uk': '4U Заправка'
  },
  'Medieval Realm': {
    'en': 'Medieval Realm',
    'uk': 'Середньовічне Царство'
  },
  'Brisa Cove': {
    'en': 'Brisa Cove',
    'uk': 'Бріза Коув'
  },
  
  // Layer names
  'Base Map': {
    'en': 'Base Map',
    'uk': 'Базова карта'
  },
  'Floor 1': {
    'en': 'Floor 1',
    'uk': 'Поверх 1'
  },
  'Floor 2': {
    'en': 'Floor 2',
    'uk': 'Поверх 2'
  },
  'Ground Floor': {
    'en': 'Ground Floor',
    'uk': 'Перший поверх'
  },
  
  // Marker form
  'addNewMarker': {
    'en': 'Add New Marker',
    'uk': 'Додати новий маркер'
  },
  'coordinates': {
    'en': 'Coordinates',
    'uk': 'Координати'
  },
  'title': {
    'en': 'Title',
    'uk': 'Назва'
  },
  'description': {
    'en': 'Description',
    'uk': 'Опис'
  },
  'type': {
    'en': 'Type',
    'uk': 'Тип'
  },
  'custom': {
    'en': 'Custom',
    'uk': 'Власний'
  },
  'save': {
    'en': 'Save',
    'uk': 'Зберегти'
  },
  'cancel': {
    'en': 'Cancel',
    'uk': 'Скасувати'
  }
};
