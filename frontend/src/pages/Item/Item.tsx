import { Alert, AlertIcon, Box, Flex, Text } from '@chakra-ui/react';
import FilledHeartIcon from '@icons/FilledHeartIcon';
import HeartIcon from '@icons/HeartIcon';
import { useAppSelector } from '@redux/index';
import { authSelector } from '@redux/slices/userSlice';
import {
  useGetCollectionItemQuery,
  useSetLikeMutation,
} from '@services/collection-item';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import Comments from './Comments';
import CustomFields from './CustomFields';
import Tags from './Tags';

function Item() {
  const { t } = useTranslation();
  const { itemId: id, collectionId } = useParams();

  const { user } = useAppSelector(authSelector);
  const [setLike] = useSetLikeMutation();

  const {
    data: item,
    isError,
    isLoading,
  } = useGetCollectionItemQuery(
    { id: id || '', collectionId: collectionId || '' },
    { skip: !id || !collectionId }
  );

  const setLikeHandle = () => {
    if (!user || !id) return;

    setLike({
      itemId: Number(id || 0),
      userId: user.id,
    });
  };

  if (isError) {
    return (
      <Alert status="error">
        <AlertIcon />
        {t('item.error')}
      </Alert>
    );
  }

  return (
    <Box>
      <Tags />
      <Flex alignItems="center" justifyContent="center" gap={5}>
        <Text my={10} textAlign="center" as="h1" fontSize={50}>
          {isLoading || !item ? t('item.nameLoading') : item.name}
        </Text>

        <Flex
          onClick={setLikeHandle}
          direction="column"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
        >
          {item?.likes.some((like) => like.user_id === user?.id) ? (
            <FilledHeartIcon />
          ) : (
            <HeartIcon />
          )}
          <Text fontSize={12}>{item?.likes.length || 0}</Text>
        </Flex>
      </Flex>

      <CustomFields
        itemId={Number(id || 0)}
        customFields={item?.customFields || []}
      />

      <Comments itemId={Number(id || 0)} />
    </Box>
  );
}

export default Item;
