import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Flex,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useGetCollectionQuery } from '@services/collection';
import EditInputField from '@components/EditInputField';
import ItemsTable from './ItemsTable';
import styles from './CollectionItem.module.scss';

function CollectionItem() {
  const { userId, collectionId } = useParams();

  const {
    data: collection,
    isError,
    isFetching,
  } = useGetCollectionQuery(
    { userId: userId || '', collectionId: collectionId || '' },
    {
      skip: !userId || !collectionId,
    }
  );

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

  if (isError || !collection) {
    return (
      <Alert status="error">
        <AlertIcon />
        There was an error processing collections
      </Alert>
    );
  }

  return (
    <Box className={styles.box} mt={50}>
      <Image className={styles.image} src={collection.image_url} />
      <Box pt={5}>
        <Heading textAlign="center" as="h1">
          {collection.name}
          <Badge ml={2} title="Category">
            {collection.category}
          </Badge>
        </Heading>
      </Box>

      <Stack mt={5} gap={10}>
        {collection.customFields.length > 0 && (
          <Flex
            justifyContent="center"
            alignItems="center"
            direction="row"
            gap={5}
          >
            <Text>Custom Fields →</Text>
            {collection.customFields.map((customField) => (
              <Badge
                key={customField.id}
                title={customField.type}
                colorScheme="green"
              >
                {customField.name}
              </Badge>
            ))}
          </Flex>
        )}

        <EditInputField
          initialValue={collection.description}
          type="textarea"
          saveHandler={() => {}}
        />

        <ItemsTable />
      </Stack>
    </Box>
  );
}

export default CollectionItem;
