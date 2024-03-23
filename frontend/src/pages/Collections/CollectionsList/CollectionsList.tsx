import {
  Alert,
  AlertIcon,
  StackDivider,
  VStack,
  useToast,
} from '@chakra-ui/react';
import {
  useDeleteCollectionMutation,
  useGetUserCollectionsQuery,
  useUpdateCollectionMutation,
} from '@services/collection';
import CustomSpinner from '@components/CustomSpinner';
import CollectionListItem from '../CollectionListItem/CollectionListItem';
import CollectionListProps from './types';

function CollectionsList({ userId }: CollectionListProps) {
  const toast = useToast();
  const {
    data: collections,
    isError,
    isFetching,
  } = useGetUserCollectionsQuery(userId, {
    skip: !userId,
  });

  const [deleteCollection] = useDeleteCollectionMutation();
  const [updateCollection] = useUpdateCollectionMutation();

  const deleteCollectionHandle = (id: string) => {
    deleteCollection(id)
      .unwrap()
      .then(() => {
        toast({
          title: 'Collection has been successfully deleted!',
          status: 'success',
          position: 'top',
        });
      })
      .catch(() => {
        toast({
          title: 'Deleting went wrong...',
          status: 'error',
          position: 'top',
        });
      });
  };

  const updateCollectionHandle = (id: string, field: string, value: string) => {
    updateCollection({ id, body: { field, value } })
      .unwrap()
      .then(() => {
        toast({
          title: 'Collection name has been successfully changed!',
          status: 'success',
          position: 'top',
        });
      })
      .catch(() => {
        toast({
          title: 'Changing went wrong...',
          status: 'error',
          position: 'top',
        });
      });
  };

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
        <CollectionListItem
          key={collection.id}
          item={collection}
          deleteCollectionHandle={deleteCollectionHandle}
          updateCollectionHandle={updateCollectionHandle}
        />
      ))}
    </VStack>
  );
}

export default CollectionsList;
