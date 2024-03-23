import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Flex,
  Stat,
  StatHelpText,
  StatLabel,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useGetCollectionItemsByTagNameQuery } from '@services/collection-item';
import { Link, NavLink, useParams } from 'react-router-dom';

function Results() {
  const { tagId } = useParams();

  const {
    data: items,
    isLoading,
    isError,
  } = useGetCollectionItemsByTagNameQuery(tagId || '', { skip: !tagId });

  if (isError || (!items && !isLoading)) {
    return (
      <Alert status="error">
        <AlertIcon />
        There was an error processing results
      </Alert>
    );
  }

  if (items?.length === 0) {
    return (
      <Alert status="info">
        <AlertIcon />
        There aren&apos;t any items here
        <Button ml={2} as={NavLink} to="/">
          Back?
        </Button>
      </Alert>
    );
  }

  return (
    <Box>
      <Flex gap={5} alignItems="center" justifyContent="center">
        <Text as="h1" fontSize={50} textAlign="center">
          Results
        </Text>
        <Tag size="lg" colorScheme="green">
          Tag
        </Tag>
      </Flex>
      <VStack mt={10}>
        {items?.map(({ id, name, collection_id, user_id }) => (
          <Stat
            key={id}
            cursor="pointer"
            as={Link}
            to={`/collections/${user_id}/${collection_id}/${id}`}
          >
            <StatLabel>{name}</StatLabel>
            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
          </Stat>
        ))}
      </VStack>
    </Box>
  );
}

export default Results;
