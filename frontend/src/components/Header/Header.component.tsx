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
  useMediaQuery,
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
import LanguageSwitcher from '@components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

function Header() {
  const { t } = useTranslation();
  const { user, isAuth } = useAppSelector(authSelector);
  const shadowColor = useColorModeValue('black', 'white');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [isLessThan768] = useMediaQuery('(max-width: 768px)');

  const disclosure = useDisclosure();
  const searchRef = useRef<HTMLInputElement>(null);

  const logoutHandle = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Box p={5} boxShadow={`0px 1px 1px ${shadowColor}`}>
      <Flex
        wrap={isLessThan768 ? 'wrap' : 'nowrap'}
        gap={5}
        alignItems="center"
        justifyContent={isLessThan768 ? 'center' : 'normal'}
        direction="row"
      >
        <Image
          title={t('header.To the main')}
          onClick={() => navigate('/')}
          cursor="pointer"
          boxSize="50px"
          objectFit="contain"
          src={logo}
          alt="Logo"
        />
        <SearchInput
          flex={isLessThan768 ? '1 1 auto' : 'none'}
          ref={searchRef}
          onFocus={() => {
            disclosure.onOpen();
            searchRef.current?.blur();
          }}
        />
        <FullTextSearch disclosure={disclosure} />

        <LanguageSwitcher />
        {isAuth ? (
          <>
            <Text as="span" whiteSpace="nowrap">
              {t('header.Hello')}, {user?.name}
            </Text>
            <ButtonGroup size="sm" isAttached variant="outline">
              {user && (
                <IconButton
                  onClick={() => navigate(`/collections/${user.id}`)}
                  aria-label={t('header.To the collection')}
                  title={t('header.To the collection')}
                  colorScheme="green"
                  icon={<HamburgerIcon />}
                />
              )}
              <Button onClick={logoutHandle}>{t('header.Logout')}</Button>
              {user && user.role === ROLE.ADMIN && (
                <IconButton
                  onClick={() => navigate('/admin')}
                  title={t('header.To the admin panel')}
                  aria-label={t('header.To the admin panel')}
                  colorScheme="blue"
                  icon={<EditIcon />}
                />
              )}
            </ButtonGroup>
          </>
        ) : location.pathname.includes('login') ? (
          <Button onClick={() => navigate('/register')}>
            {t('header.Sign up')}
          </Button>
        ) : (
          <Button onClick={() => navigate('/login')}>
            {t('header.Sign in')}
          </Button>
        )}
        <ColorModeSwitcher />
      </Flex>
    </Box>
  );
}

export default Header;
