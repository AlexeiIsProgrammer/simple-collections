import { Box, Flex, Image, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import SearchInput from '@components/SearchInput';
import ColorModeSwitcher from '@components/ColorModeSwitcher';
import logo from '@assets/logo.png';

function Header() {
  const shadowColor = useColorModeValue('black', 'white');
  const navigate = useNavigate();

  return (
    <Box p={5} boxShadow={`0px 1px 1px ${shadowColor}`}>
      <Flex gap={5} alignItems="center" direction="row">
        <Image
          title="To the main"
          onClick={() => navigate('/')}
          cursor="pointer"
          boxSize="50px"
          objectFit="contain"
          src={logo}
          alt="Logo"
        />
        <SearchInput />
        <ColorModeSwitcher />
      </Flex>
    </Box>
  );
}

export default Header;
