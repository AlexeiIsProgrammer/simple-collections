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
import { useMemo } from 'react';
import { ROLE } from '@models/enums';
import Comments from './Comments';
import CustomFields from './CustomFields';
import Tags from './Tags';

function Item() {
  const { t } = useTranslation();
  const { itemId: id, userId, collectionId } = useParams();

  const { isAuth, user } = useAppSelector(authSelector);
  const [setLike] = useSetLikeMutation();

  const canEdit = useMemo(
    () => isAuth && (user?.id === +(userId || 1) || user?.role === ROLE.ADMIN),
    [userId, user?.id, user?.role, isAuth]
  );

  const canInteract = useMemo(
    () => isAuth && user?.id !== +(userId || 1),
    [isAuth, userId, user?.id]
  );

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

        {canInteract && (
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
        )}
      </Flex>

      <CustomFields
        canEdit={canEdit}
        itemId={Number(id || 0)}
        customFields={item?.customFields || []}
      />

      <Comments canInteract={canInteract} itemId={Number(id || 0)} />
    </Box>
  );
}

export default Item;
