import { Button, Center, Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function Error() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Center pos="fixed" left="50%" top="50%" transform="translate(-50%, -50%)">
      <Flex gap={5} direction="column" alignItems="center">
        <Text as="h1" fontSize="100px">
          404
        </Text>
        <Text as="p" fontSize="2xl">
          {t('error.name')}
        </Text>
        <Button type="button" onClick={() => navigate('/')}>
          {t('error.button')}
        </Button>
      </Flex>
    </Center>
  );
}

export default Error;
