import { Button, Center, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Error() {
  const navigate = useNavigate();

  return (
    <Center pos="fixed" left="50%" top="50%" transform="translate(-50%, -50%)">
      <Flex gap={5} direction="column" alignItems="center">
        <Text as="h1" fontSize="100px">
          404
        </Text>
        <Text as="p" fontSize="2xl">
          Sorry, the page you are looking for does not exist.
        </Text>
        <Button type="button" onClick={() => navigate('/')}>
          Go to the main?
        </Button>
      </Flex>
    </Center>
  );
}

export default Error;
