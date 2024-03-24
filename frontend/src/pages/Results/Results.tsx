import {
  Alert,
  AlertIcon,
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
import { useGetTagQuery } from '@services/tag';
import { Link, NavLink, useParams } from 'react-router-dom';

function Results() {
  const { tagId } = useParams();

  const { data: tag } = useGetTagQuery(tagId || '', { skip: !tagId });

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
          {tag?.name}
        </Tag>
      </Flex>
      <VStack mt={10}>
        {items?.map(({ id, name, collection_id, user_id, collection_name }) => (
          <Stat
            key={id}
            cursor="pointer"
            as={Link}
            p={2}
            border="1px solid transparent"
            borderRadius={5}
            _hover={{
              borderColor: 'inherit',
            }}
            to={`/collections/${user_id}/${collection_id}/${id}`}
          >
            <StatLabel fontSize={26}>{name}</StatLabel>
            <StatHelpText fontSize={16}>
              Collection: {collection_name}
            </StatHelpText>
          </Stat>
        ))}
      </VStack>
    </Box>
  );
}

export default Results;
