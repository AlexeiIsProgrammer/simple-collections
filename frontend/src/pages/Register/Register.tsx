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
import { useAppDispatch, useAppSelector } from '@redux/index';
import { authSelector, setUser } from '@redux/slices/userSlice';
import { useSignUpMutation } from '@services/user';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { RegisterFormData } from './types';

import styles from './Register.module.scss';

function Register() {
  const { t } = useTranslation();
  const toast = useToast();
  const { isAuth } = useAppSelector(authSelector);

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const dispatch = useAppDispatch();
  const [registerUser, { isLoading }] = useSignUpMutation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async ({
    name,
    email,
    password,
    repeatPassword,
  }: RegisterFormData) => {
    try {
      const user = await registerUser({
        name,
        email,
        password,
        repeatPassword,
      }).unwrap();
      dispatch(setUser(user));

      toast({
        title: t('register.register'),
        status: 'success',
        position: 'top',
      });

      navigate(`/collections/${user.id}`);
    } catch (err) {
      const error = err as { data: { message: string; statusCode: number } };

      toast({
        title: t('register.registerFailed'),
        status: 'error',
        position: 'top',
      });

      if (error.data.statusCode === 500)
        setError('email', { type: 'manual', message: error.data.message });

      if (error.data.statusCode === 409)
        setError('repeatPassword', {
          type: 'manual',
          message: error.data.message,
        });
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Center mt={100} maxW="60ch" mx="auto">
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={Boolean(errors.name)}>
            <FormLabel>{t('register.Name')}</FormLabel>
            <Input
              type="text"
              placeholder="Demi Murych"
              {...register('name', { required: true })}
            />
            <FormErrorMessage>
              {errors.name?.message || t('register.Name is required')}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.email)}>
            <FormLabel>{t('register.Email')}</FormLabel>
            <Input
              type="email"
              placeholder="Demi_Murych@see_spec.com"
              {...register('email', { required: true })}
            />
            <FormErrorMessage>
              {errors.email?.message || t('register.Email is required')}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.password)}>
            <FormLabel>{t('register.Password')}</FormLabel>

            <InputGroup size="md">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="DemiMur12345"
                {...register('password', {
                  required: true,
                  minLength: { value: 5, message: t('login.passwordLength') },
                })}
              />
              <InputRightElement width="4.5rem">
                {showPassword ? (
                  <ViewIcon
                    h="1.75rem"
                    cursor="pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <ViewOffIcon
                    h="1.75rem"
                    cursor="pointer"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.password?.message || t('register.Password is required')}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.repeatPassword)}>
            <FormLabel>{t('register.Repeat password')}</FormLabel>

            <InputGroup size="md">
              <Input
                type={showRepeatPassword ? 'text' : 'password'}
                placeholder="DemiMur12345"
                {...register('repeatPassword', {
                  required: true,
                  minLength: { value: 5, message: t('login.passwordLength') },
                  validate: (value) =>
                    value === watch('password') ||
                    t('register.Passwords do not match'),
                })}
              />
              <InputRightElement width="4.5rem">
                {showRepeatPassword ? (
                  <ViewIcon
                    cursor="pointer"
                    h="1.75rem"
                    onClick={() => setShowRepeatPassword(false)}
                  />
                ) : (
                  <ViewOffIcon
                    cursor="pointer"
                    h="1.75rem"
                    onClick={() => setShowRepeatPassword(true)}
                  />
                )}
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.repeatPassword?.message}
            </FormErrorMessage>
          </FormControl>
          <Button type="submit" isLoading={isLoading}>
            {t('register.RegisterButton')}
          </Button>
          <Link as={NavLink} to="/login">
            {t('register.noAccount')}
          </Link>
        </VStack>
      </form>
    </Center>
  );
}

export default Register;
