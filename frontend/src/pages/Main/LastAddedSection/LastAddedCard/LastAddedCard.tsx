import {
  Card,
  Stack,
  CardBody,
  Flex,
  Heading,
  CardFooter,
  Badge,
  useColorMode,
  Box,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import toDateFormat from '@utils/toDateFormat';
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
  return (
    <Card
      title={`To the ${name} item`}
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
              <Text fontSize={12}>Collection: {collection_name}</Text>
            </Box>
          </Flex>
        </CardBody>

        <CardFooter pt={0}>
          <Text fontSize={14}>
            Created at <b>{toDateFormat(created_at)}</b> by{' '}
            <Badge colorScheme="purple">{username}</Badge>
          </Text>
        </CardFooter>
      </Stack>
    </Card>
  );
}

export default LastAddedCard;
