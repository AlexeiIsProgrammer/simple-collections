import { useColorMode, IconButton } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';

function ColorModeSwitcher() {
  const { colorMode, setColorMode } = useColorMode();

  const changeThemeHandle = () => {
    const changingColor = colorMode === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', changingColor);
    setColorMode(changingColor);
  };

  useEffect(() => {
    const localStorageTheme = localStorage.getItem('theme');
    if (localStorageTheme) setColorMode(localStorageTheme);
  }, [setColorMode]);

  return (
    <IconButton
      aria-label="Toggle color mode"
      icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
      onClick={changeThemeHandle}
      variant="ghost"
    />
  );
}

export default ColorModeSwitcher;
