export interface Language {
  code: string;
  name: string;
  flag: string;
  textCode?: string;
}

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧', textCode: 'EN' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', textCode: 'FR' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', textCode: 'DE' },
  { code: 'es', name: 'Español', flag: '🇪🇸', textCode: 'ES' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱', textCode: 'PL' },
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
    'en': 'Spawn',
    'uk': 'Точки появи'
  },
  'hard_objective': {
    'en': 'Hard Objective',
    'uk': 'Основна ціль'
  },
  'soft_objective': {
    'en': 'Soft Objective',
    'uk': 'Прихована ціль'
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
  },
  
  // Objectives
  'objectives': {
    'en': 'Objectives',
    'uk': 'Завдання'
  },
  'hard_objectives': {
    'en': 'Hard Objectives',
    'uk': 'Основні завдання'
  },
  'soft_objectives': {
    'en': 'Soft Objectives',
    'uk': 'Приховані завдання'
  },
  'no_objectives': {
    'en': 'No objectives available for this map',
    'uk': 'Для цієї карти немає доступних завдань'
  },
  
  // Random Challenge
  'randomChallenge': {
    'en': 'Random Challenge',
    'uk': 'Випадковий виклик'
  },
  'rollChallenge': {
    'en': 'Roll Challenge',
    'uk': 'Кинути виклик'
  },
  'rolling': {
    'en': 'Rolling',
    'uk': 'Кидаємо'
  },
  'map': {
    'en': 'Map',
    'uk': 'Карта'
  },
  'weapon': {
    'en': 'Weapon',
    'uk': 'Зброя'
  },
  'difficulty': {
    'en': 'Difficulty',
    'uk': 'Складність'
  },
  'rollAgain': {
    'en': 'Roll Again',
    'uk': 'Кинути знову'
  },
  'consumable': {
    'en': 'Consumable',
    'uk': 'Витратний матеріал'
  },
  'armor': {
    'en': 'Armor',
    'uk': 'Броня'
  },
  'draw': {
    'en': 'Draw',
    'uk': 'Малювати'
  },
  'eraser': {
    'en': 'Eraser',
    'uk': 'Гумка',
    'es': 'Borrador',
    'fr': 'Gomme',
    'de': 'Radiergummi',
    'pl': 'Gumka'
  },
  
  // Common UI
  'home': {
    'en': 'Home',
    'uk': 'Головна',
    'es': 'Inicio',
    'fr': 'Accueil',
    'de': 'Startseite',
    'pl': 'Strona główna'
  },
  'about': {
    'en': 'About',
    'uk': 'Про додаток',
    'es': 'Acerca de',
    'fr': 'À propos',
    'de': 'Über',
    'pl': 'O programie'
  },
  'close': {
    'en': 'Close',
    'uk': 'Закрити',
    'es': 'Cerrar',
    'fr': 'Fermer',
    'de': 'Schließen',
    'pl': 'Zamknij'
  },
  'loading': {
    'en': 'Loading...',
    'uk': 'Завантаження...',
    'es': 'Cargando...',
    'fr': 'Chargement...',
    'de': 'Laden...',
    'pl': 'Ładowanie...'
  },
  'error': {
    'en': 'Error',
    'uk': 'Помилка',
    'es': 'Error',
    'fr': 'Erreur',
    'de': 'Fehler',
    'pl': 'Błąd'
  },
  'noMapsFound': {
    'en': 'No maps found',
    'uk': 'Карт не знайдено',
    'es': 'No se encontraron mapas',
    'fr': 'Aucune carte trouvée',
    'de': 'Keine Karten gefunden',
    'pl': 'Nie znaleziono map'
  },
  'filterByCategory': {
    'en': 'Filter by Category',
    'uk': 'Фільтр за категорією',
    'es': 'Filtrar por categoría',
    'fr': 'Filtrer par catégorie',
    'de': 'Nach Kategorie filtern',
    'pl': 'Filtruj według kategorii'
  },
  'interactiveMap': {
    'en': 'Interactive Map',
    'uk': 'Інтерактивна карта',
    'es': 'Mapa interactivo',
    'fr': 'Carte interactive',
    'de': 'Interaktive Karte',
    'pl': 'Interaktywna mapa'
  },
  'chooseMapPrompt': {
    'en': 'Choose a map from the dropdown below to begin exploring.',
    'uk': 'Виберіть карту зі списку нижче, щоб почати дослідження.',
    'es': 'Elija un mapa del menú desplegable a continuación para comenzar a explorar.',
    'fr': 'Choisissez une carte dans la liste déroulante ci-dessous pour commencer à explorer.',
    'de': 'Wählen Sie eine Karte aus der Dropdown-Liste unten aus, um mit der Erkundung zu beginnen.',
    'pl': 'Wybierz mapę z listy rozwijanej poniżej, aby rozpocząć eksplorację.'
  }
};
