import { translations, TranslationKey } from '../utils/i18n';
import { useSettings } from '../contexts/SettingsContext';

export const useTranslate = () => {
  const { language } = useSettings();
  return (key: TranslationKey) => translations[language][key];
};
