import {
  Badge,
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Stack,
  Text,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react';
import toDateFormat from '@utils/toDateFormat';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LastAddedCardProps from './types';

function LastAddedCard({ item }: LastAddedCardProps) {
  const {
    name,
    user_id,
    id,
    collection_id,
    collection_name,
    created_at,
    username,
  } = item;

  const [isLessThan576] = useMediaQuery('(max-width: 576px)');
  const { colorMode } = useColorMode();
  const { t } = useTranslation();

  return (
    <Card
      title={t('lastItem.go', { name })}
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
      h="100%"
      cursor="pointer"
      transition=".2s ease box-shadow"
      _hover={{
        boxShadow: `0px 0px 3px ${colorMode === 'dark' ? '#fff' : '#000'}`,
      }}
      as={Link}
      to={`/collections/${user_id}/${collection_id}/${id}`}
    >
      <Stack>
        <CardBody pb={3}>
          <Flex
            justifyContent="space-between"
            flexDirection={isLessThan576 ? 'column-reverse' : 'row'}
            gap={isLessThan576 ? 2 : 10}
          >
            <Box>
              <Heading size="md">{name}</Heading>
              <Text fontSize={12}>
                {t('lastItem.collection')}: {collection_name}
              </Text>
            </Box>
          </Flex>
        </CardBody>

        <CardFooter pt={0}>
          <Text fontSize={14}>
            <Trans i18nKey="lastItem.created">
              Created at <b>{{ date: toDateFormat(created_at) }}</b> by
            </Trans>
            <Badge colorScheme="purple">{username}</Badge>
          </Text>
        </CardFooter>
      </Stack>
    </Card>
  );
}

export default LastAddedCard;
