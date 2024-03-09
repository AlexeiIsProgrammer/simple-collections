import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchInput from '@components/SearchInput';
import ColorModeSwitcher from '@components/ColorModeSwitcher';
import logo from '@assets/logo.png';
import { useAppDispatch, useAppSelector } from '@redux/index';
import { authSelector, logout } from '@redux/slices/userSlice';

function Header() {
  const shadowColor = useColorModeValue('black', 'white');
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuth } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  const logoutHandle = () => {
    dispatch(logout());
    navigate('/login');
  };

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
        {isAuth ? (
          <>
            <Text as="span" whiteSpace="nowrap">
              Hello, {user?.name}
            </Text>
            <Button onClick={logoutHandle}>Logout</Button>
          </>
        ) : location.pathname.includes('login') ? (
          <Button onClick={() => navigate('/register')}>Sign up</Button>
        ) : (
          <Button onClick={() => navigate('/login')}>Sign in</Button>
        )}
        <ColorModeSwitcher />
      </Flex>
    </Box>
  );
}

export default Header;
