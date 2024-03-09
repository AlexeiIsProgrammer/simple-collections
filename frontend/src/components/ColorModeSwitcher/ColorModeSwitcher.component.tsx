import { useColorMode, IconButton } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

function ColorModeSwitcher() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Toggle color mode"
      icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
      variant="ghost"
    />
  );
}

export default ColorModeSwitcher;
