import { Alert, AlertIcon, Box, Text } from '@chakra-ui/react';
import { useGetCollectionItemQuery } from '@services/collection-item';
import { useParams } from 'react-router-dom';
import Tags from './Tags';

function Item() {
  const { itemId: id, collectionId } = useParams();

  const {
    data: item,
    isError,
    isFetching,
  } = useGetCollectionItemQuery(
    { id: id || '', collectionId: collectionId || '' },
    { skip: !id || !collectionId }
  );

  if (isError) {
    return (
      <Alert status="error">
        <AlertIcon />
        There was an error on getting item info
      </Alert>
    );
  }

  return (
    <Box>
      <Tags />
      <Text mt={10} textAlign="center" as="h1" fontSize={50}>
        {isFetching || !item ? '[Your item name is loading...]' : item.name}
      </Text>
    </Box>
  );
}

export default Item;
