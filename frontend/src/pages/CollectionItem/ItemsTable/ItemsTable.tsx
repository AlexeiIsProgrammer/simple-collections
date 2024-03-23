import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Center,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import AddCollectionItem from '@components/AddCollectionItem';
import CustomSpinner from '@components/CustomSpinner';
import { COLLECTION_TYPE, SORT_ENUM } from '@models/enums';
import { useGetCollectionItemsQuery } from '@services/collection-item';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import CollectionTableItem from './CollectionTableItem';
import ItemsTableProps from './types';

function ItemsTable({ customFields }: ItemsTableProps) {
  const { collectionId } = useParams();

  const [sortName, setSortName] = useState<SORT_ENUM>(SORT_ENUM.default);

  const {
    data: items,
    isLoading,
    isError,
  } = useGetCollectionItemsQuery(
    {
      collectionId: collectionId || '',
      name: sortName,
    },
    {
      skip: !collectionId,
    }
  );

  const dateItem = useMemo(
    () => customFields.find((field) => field.type === COLLECTION_TYPE.DATE),
    [customFields]
  );

  const stringItem = useMemo(
    () => customFields.find((field) => field.type === COLLECTION_TYPE.STRING),
    [customFields]
  );

  const setSortHandle = (
    sort: SORT_ENUM,
    setSort: React.Dispatch<React.SetStateAction<SORT_ENUM>>
  ) => {
    switch (sort) {
      case SORT_ENUM.asc:
        setSort(SORT_ENUM.desc);
        break;
      case SORT_ENUM.desc:
        setSort(SORT_ENUM.default);
        break;
      case SORT_ENUM.default:
        setSort(SORT_ENUM.asc);
        break;

      default:
        break;
    }
  };

  const getCurrentShevron = (sort: SORT_ENUM) => {
    switch (sort) {
      case SORT_ENUM.asc:
        return <ChevronUpIcon />;
      case SORT_ENUM.desc:
        return <ChevronDownIcon />;
      case SORT_ENUM.default:
        return null;

      default:
        return null;
    }
  };

  if (isLoading) {
    return <CustomSpinner />;
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
        <AddCollectionItem
          collectionId={collectionId || ''}
          alert={
            <>
              <AlertIcon />
              You don&apos;t have any items here
            </>
          }
        />
      </Alert>
    );
  }

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th textAlign="center">ID</Th>
              <Th
                cursor="pointer"
                onClick={() => setSortHandle(sortName, setSortName)}
                textAlign="center"
              >
                Name
                {getCurrentShevron(sortName)}
              </Th>
              {dateItem && (
                <Th textAlign="center">
                  <Center gap={2}>
                    {dateItem.name}
                    <Badge colorScheme="purple">{dateItem.type}</Badge>
                  </Center>
                </Th>
              )}
              {stringItem && (
                <Th textAlign="center">
                  <Center gap={2}>
                    {stringItem.name}
                    <Badge colorScheme="purple">{stringItem.type}</Badge>
                  </Center>
                </Th>
              )}
              <Th textAlign="center">Likes</Th>
              <Th textAlign="center">See</Th>
              <Th textAlign="center">Edit</Th>
              <Th textAlign="center">Delete</Th>
            </Tr>
          </Thead>
          <Tbody pos="relative">
            {items.map((item) => (
              <CollectionTableItem key={item.id} item={item} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Box>
        {items.length > 0 && (
          <AddCollectionItem collectionId={collectionId || ''} />
        )}
      </Box>
    </>
  );
}

export default ItemsTable;
