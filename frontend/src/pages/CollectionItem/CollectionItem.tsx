import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import CustomSpinner from '@components/CustomSpinner';
import EditInputField from '@components/EditInputField';
import { ROLE } from '@models/enums';
import { useAppSelector } from '@redux/index';
import { authSelector } from '@redux/slices/userSlice';
import {
  useGetCollectionQuery,
  useUpdateCollectionMutation,
} from '@services/collection';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import styles from './CollectionItem.module.scss';
import ItemsTable from './ItemsTable';

function CollectionItem() {
  const { t } = useTranslation();
  const { userId, collectionId } = useParams();
  const { user, isAuth } = useAppSelector(authSelector);

  const [updateCollection] = useUpdateCollectionMutation();

  const {
    data: collection,
    isError,
    isFetching,
  } = useGetCollectionQuery(
    { userId: Number(userId || 0), collectionId: Number(collectionId || 0) },
    {
      skip: !userId || !collectionId,
    }
  );

  const updateCollectionHandle = (value: string) => {
    updateCollection({
      id: Number(collectionId || 0),
      body: {
        field: 'description',
        value,
      },
    });
  };

  const canEdit = useMemo(
    () => isAuth && (user?.id === +(userId || 1) || user?.role === ROLE.ADMIN),
    [userId, user?.id, user?.role, isAuth]
  );

  if (isFetching) {
    return <CustomSpinner />;
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
    <Box color="white" className={styles.box} mt={50}>
      <Image className={styles.image} src={collection.image_url} />
      <Box pt={5}>
        <Heading textAlign="center" as="h1">
          {collection.name}
          <Badge ml={2} title="Category">
            {t(`category.${collection.category}`)}
          </Badge>
        </Heading>
      </Box>

      <Stack mt={5} gap={10}>
        {collection.customFields.length > 0 && (
          <Flex
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            direction="row"
            gap={5}
          >
            <Text>{t(`create.Custom fields`)} →</Text>
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
          readonly={!canEdit}
          initialValue={collection.description}
          type="textarea"
          saveHandler={(value) => updateCollectionHandle(value)}
        />

        <ItemsTable canEdit={canEdit} customFields={collection.customFields} />
      </Stack>
    </Box>
  );
}

export default CollectionItem;
