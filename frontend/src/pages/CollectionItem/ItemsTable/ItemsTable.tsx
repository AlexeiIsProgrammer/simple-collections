import {
  Alert,
  AlertIcon,
  Button,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useGetCollectionItemsQuery } from '@services/collection-item';
import { useParams } from 'react-router-dom';
import CollectionTableItem from './CollectionTableItem';

function ItemsTable() {
  const { collectionId } = useParams();
  const {
    data: items,
    isFetching,
    isError,
  } = useGetCollectionItemsQuery(collectionId || '', {
    skip: !collectionId,
  });

  if (isFetching) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }

  if (isError || !items) {
    return (
      <Alert status="error">
        <AlertIcon />
        There was an error processing collection items
      </Alert>
    );
  }

  if (items.length === 0) {
    return (
      <Alert status="info" justifyContent="center">
        <AlertIcon />
        You don&apos;t have any items here
        <Button ml={2} colorScheme="blue">
          Wanna add?
        </Button>
      </Alert>
    );
  }

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th textAlign="center">ID</Th>
            <Th textAlign="center">Name</Th>
            <Th textAlign="center">See</Th>
            <Th textAlign="center">Edit</Th>
          </Tr>
        </Thead>
        <Tbody pos="relative">
          {items.map((item) => (
            <CollectionTableItem key={item.id} item={item} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ItemsTable;
