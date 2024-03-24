import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchInput from '@components/SearchInput';
import ColorModeSwitcher from '@components/ColorModeSwitcher';
import logo from '@assets/logo.png';
import { useAppDispatch, useAppSelector } from '@redux/index';
import { authSelector, logout } from '@redux/slices/userSlice';
import { EditIcon, HamburgerIcon } from '@chakra-ui/icons';
import { ROLE } from '@models/enums';
import FullTextSearch from '@components/FullTextSearch';
import { useRef } from 'react';

function Header() {
  const { user, isAuth } = useAppSelector(authSelector);
  const shadowColor = useColorModeValue('black', 'white');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const disclosure = useDisclosure();
  const searchRef = useRef<HTMLInputElement>(null);

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
        <SearchInput
          ref={searchRef}
          onFocus={() => {
            disclosure.onOpen();
            searchRef.current?.blur();
          }}
        />
        <FullTextSearch disclosure={disclosure} />
        {isAuth ? (
          <>
            <Text as="span" whiteSpace="nowrap">
              Hello, {user?.name}
            </Text>
            <ButtonGroup size="sm" isAttached variant="outline">
              {user && (
                <IconButton
                  onClick={() => navigate(`/collections/${user.id}`)}
                  aria-label="To the collection"
                  title="To the collection"
                  colorScheme="green"
                  icon={<HamburgerIcon />}
                />
              )}
              <Button onClick={logoutHandle}>Logout</Button>
              {user && user.role === ROLE.ADMIN && (
                <IconButton
                  onClick={() => navigate('/admin')}
                  title="To the admin panel"
                  aria-label="To the admin panel"
                  colorScheme="blue"
                  icon={<EditIcon />}
                />
              )}
            </ButtonGroup>
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
