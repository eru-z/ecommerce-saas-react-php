export const translations = {
  en: {
    profileSettings: 'Profile settings',
    preferences: 'Preferences',
    language: 'Language',
    theme: 'Theme',
    savePreferences: 'Save preferences',
    updatePassword: 'Update password',
  },
  de: {
    profileSettings: 'Profileinstellungen',
    preferences: 'Einstellungen',
    language: 'Sprache',
    theme: 'Design',
    savePreferences: 'Einstellungen speichern',
    updatePassword: 'Passwort aktualisieren',
  },
};

export type TranslationKey = keyof typeof translations.en;
