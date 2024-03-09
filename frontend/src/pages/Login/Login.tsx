import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { LoginFormData } from './types';

import styles from './Login.module.scss';

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
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
    console.log(email, password);
  };

  return (
    <VStack spacing={4}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={Boolean(errors.email)}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Demi_Murych@see_spec.com"
            {...register('email', { required: true })}
          />{' '}
          <FormErrorMessage>
            {errors.email && 'Email is required'}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.password)}>
          <FormLabel>Password</FormLabel>

          <InputGroup size="md">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="DemiMur12345"
              {...register('password', { required: true })}
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
            {errors.password && 'Password is required'}
          </FormErrorMessage>
        </FormControl>
        <Button type="submit">Login</Button>
      </form>
    </VStack>
  );
}

export default Login;
