import { Alert, AlertIcon, StackDivider, VStack } from '@chakra-ui/react';
import { useGetUserCollectionsQuery } from '@services/collection';
import CustomSpinner from '@components/CustomSpinner';
import CollectionListItem from '../CollectionListItem/CollectionListItem';
import CollectionListProps from './types';

function CollectionsList({ userId }: CollectionListProps) {
  const {
    data: collections,
    isError,
    isFetching,
  } = useGetUserCollectionsQuery(userId, {
    skip: !userId,
  });

  if (isFetching) {
    return <CustomSpinner />;
  }

  if (isError || !collections) {
    return (
      <Alert status="error">
        <AlertIcon />
        There was an error processing collections
      </Alert>
    );
  }

  if (collections.length === 0) {
    <Alert status="info">
      <AlertIcon />
      You dont&quos;t have any collections here
    </Alert>;
  }

  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
    >
      {collections.map((collection) => (
        <CollectionListItem key={collection.id} item={collection} />
      ))}
    </VStack>
  );
}

export default CollectionsList;
