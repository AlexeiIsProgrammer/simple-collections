import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { ErrorType } from '@models/types';
import { useAppDispatch, useAppSelector } from '@redux/index';
import { authSelector, setUser } from '@redux/slices/userSlice';
import { useSignInMutation } from '@services/user';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LoginFormData } from './types';

import styles from './Login.module.scss';

function Login() {
  const { t } = useTranslation();
  const toast = useToast();
  const { isAuth } = useAppSelector(authSelector);

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();
  const [loginUser, { isLoading }] = useSignInMutation();

  const navigate = useNavigate();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async ({ email, password }: LoginFormData) => {
    try {
      const user = await loginUser({
        email,
        password,
      }).unwrap();

      dispatch(setUser(user));

      toast({
        title: t('login.login'),
        status: 'success',
        position: 'top',
      });

      navigate(`/collections/${user.id}`);
    } catch (err) {
      const error = err as ErrorType;

      toast({
        title: t('login.loginFailed'),
        status: 'error',
        position: 'top',
      });

      if (error.status === 500) {
        setError('email', { type: 'manual', message: error.data.message });
        setError('password', { type: 'manual', message: error.data.message });
      }
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Center mt={100} maxW="60ch" mx="auto">
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={Boolean(errors.email)}>
            <FormLabel>{t('login.Email')}</FormLabel>
            <Input
              type="email"
              placeholder="Demi_Murych@see_spec.com"
              {...register('email', { required: true })}
            />
            <FormErrorMessage>
              {errors.email?.message || t('login.Email is required')}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.password)}>
            <FormLabel>{t('login.Password')}</FormLabel>

            <InputGroup size="md">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="DemiMur12345"
                {...register('password', { required: true, minLength: 5 })}
              />
              <InputRightElement width="4.5rem">
                {showPassword ? (
                  <ViewIcon
                    cursor="pointer"
                    h="1.75rem"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <ViewOffIcon
                    cursor="pointer"
                    h="1.75rem"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.password?.message || t('login.Password is required')}
            </FormErrorMessage>
          </FormControl>
          <Button isLoading={isLoading} type="submit">
            {t('login.Login')}
          </Button>
          <Link as={NavLink} to="/register">
            {t('login.dontHave')}
          </Link>
        </VStack>
      </form>
    </Center>
  );
}

export default Login;
