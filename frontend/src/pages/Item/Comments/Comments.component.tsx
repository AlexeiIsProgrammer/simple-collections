import { InfoIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Heading,
  Skeleton,
  Stack,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { POOLING_INTERVAL } from '@constants/index';
import { Comment } from '@models/interfaces';
import { useGetCommentsQuery } from '@services/collection-item';
import { useTranslation } from 'react-i18next';
import CommentItem from './CommentItem';
import Editor from './Editor';
import CommentsProps from './types';

function Comments({ itemId: id, canInteract }: CommentsProps) {
  const { t } = useTranslation();
  const { onToggle, isOpen } = useDisclosure();

  const {
    data: comments,
    isError,
    isLoading,
  } = useGetCommentsQuery(Number(id || 0), {
    skip: !id,
    pollingInterval: POOLING_INTERVAL,
  });

  if (isError) {
    return (
      <Alert status="error">
        <AlertIcon />
        {t('comments.error')}
      </Alert>
    );
  }

  return (
    <Flex mt={5} direction="column" gap={5}>
      <Heading textAlign="center" as="h2" fontSize={30}>
        {t('comments.comments')}
        {canInteract && (
          <Button ml={2} onClick={onToggle}>
            {isOpen ? t('comments.close') : t('comments.addNew')}
          </Button>
        )}
      </Heading>

      {isOpen && canInteract && (
        <Box position="sticky" top={0} zIndex={1}>
          <Editor itemId={id} onToggle={onToggle} />
        </Box>
      )}

      {comments?.length === 0 ? (
        <Alert status="info">
          <InfoIcon mr={2} />
          {t('comments.noComments')}
        </Alert>
      ) : (
        <VStack>
          {isLoading || !comments ? (
            <Stack>
              <Skeleton height="50px" />
              <Skeleton height="50px" />
              <Skeleton height="50px" />
            </Stack>
          ) : (
            comments.map((comment: Comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          )}
        </VStack>
      )}
    </Flex>
  );
}

export default Comments;
