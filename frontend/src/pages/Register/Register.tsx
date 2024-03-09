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
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { RegisterFormData } from './types';

import styles from './Register.module.scss';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const {
    register,
    handleSubmit,
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
    console.log(name, email, password, repeatPassword);
  };

  return (
    <Center mt={100}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={Boolean(errors.name)}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Demi Murych"
              {...register('name', { required: true })}
            />
            <FormErrorMessage>
              {errors.name && 'Name is required'}
            </FormErrorMessage>
          </FormControl>
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
              {errors.password && 'Password is required'}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.repeatPassword)}>
            <FormLabel>Repeat password</FormLabel>

            <InputGroup size="md">
              <Input
                type={showRepeatPassword ? 'text' : 'password'}
                placeholder="DemiMur12345"
                {...register('repeatPassword', {
                  required: true,
                  validate: (value) =>
                    value === watch('password') || 'Passwords do not match',
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
              {errors.repeatPassword && errors.repeatPassword.message}
            </FormErrorMessage>
          </FormControl>
          <Button type="submit">Register</Button>
          <Link as={NavLink} to="/login">
            Have an account? Click here
          </Link>
        </VStack>
      </form>
    </Center>
  );
}

export default Register;
