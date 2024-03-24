import { Alert, AlertIcon, Box, Flex, Text } from '@chakra-ui/react';
import HeartIcon from '@icons/HeartIcon';
import {
  useGetCollectionItemQuery,
  useSetLikeMutation,
} from '@services/collection-item';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '@redux/index';
import { authSelector } from '@redux/slices/userSlice';
import FilledHeartIcon from '@icons/FilledHeartIcon';
import Comments from './Comments';
import Tags from './Tags';
import CustomFields from './CustomFields';

function Item() {
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
      itemId: id,
      userId: user.id,
    });
  };

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
      <Flex alignItems="center" justifyContent="center" gap={5}>
        <Text my={10} textAlign="center" as="h1" fontSize={50}>
          {isLoading || !item ? '[Your item name is loading...]' : item.name}
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

      <CustomFields itemId={id || ''} customFields={item?.customFields || []} />

      <Comments itemId={id || ''} />
    </Box>
  );
}

export default Item;
