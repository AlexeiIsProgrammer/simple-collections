import { Button, ButtonGroup } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const lngs = ['en', 'be'];

function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    if (i18n.language === lng) return;

    const changingLanguage = i18n.language === 'en' ? 'be' : 'en';
    localStorage.setItem('language', changingLanguage);
    i18n.changeLanguage(changingLanguage);
  };

  useEffect(() => {
    const localStorageLanguage = localStorage.getItem('language');
    if (localStorageLanguage) i18n.changeLanguage(localStorageLanguage);
  }, [i18n]);

  return (
    <ButtonGroup size="sm" isAttached variant="outline">
      {lngs.map((lng) => (
        <Button
          onClick={() => changeLanguage(lng)}
          fontWeight={i18n.resolvedLanguage === lng ? 'bold' : 'normal'}
          key={lng}
        >
          {t(lng)}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default LanguageSwitcher;
