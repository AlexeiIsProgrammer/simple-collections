import {
  Alert,
  AlertIcon,
  Select,
  StackDivider,
  VStack,
  useToast,
} from '@chakra-ui/react';
import CustomSpinner from '@components/CustomSpinner';
import { CATEGORIES } from '@constants/index';
import {
  useDeleteCollectionMutation,
  useGetUserCollectionsQuery,
  useUpdateCollectionMutation,
} from '@services/collection';
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CollectionListItem from '../CollectionListItem/CollectionListItem';
import CollectionListProps from './types';

function CollectionsList({ userId }: CollectionListProps) {
  const { t } = useTranslation();
  const toast = useToast();

  const [currentCategory, setCurrentCategory] = useState('');

  const {
    data: collections,
    isError,
    isFetching,
  } = useGetUserCollectionsQuery(
    { userId, category: currentCategory },
    {
      skip: !userId,
    }
  );

  const [deleteCollection] = useDeleteCollectionMutation();
  const [updateCollection] = useUpdateCollectionMutation();

  const deleteCollectionHandle = (id: number) => {
    deleteCollection(id)
      .unwrap()
      .then(() => {
        toast({
          title: t('collection.deleted'),
          status: 'success',
          position: 'top',
        });
      })
      .catch(() => {
        toast({
          title: t('collection.deletedFailed'),
          status: 'error',
          position: 'top',
        });
      });
  };

  const updateCollectionHandle = (id: number, field: string, value: string) => {
    updateCollection({ id, body: { field, value } })
      .unwrap()
      .then(() => {
        toast({
          title: t('collection.changed'),
          status: 'success',
          position: 'top',
        });
      })
      .catch(() => {
        toast({
          title: t('collection.changedFailed'),
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
        {t('collection.error')}
      </Alert>
    );
  }

  return (
    <>
      <Select
        mr="auto"
        mb={2}
        value={currentCategory}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setCurrentCategory(e.target.value)
        }
      >
        <option value="">{t('collection.choose')}</option>
        {CATEGORIES.map((category) => (
          <option value={category} key={category}>
            {t(`category.${category}`)}
          </option>
        ))}
      </Select>
      {collections.length === 0 ? (
        <Alert status="info">
          <AlertIcon />
          {t('collection.empty')}
        </Alert>
      ) : (
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
      )}
    </>
  );
}

export default CollectionsList;
