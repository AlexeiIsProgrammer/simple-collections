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
import { useGetCommentsQuery } from '@services/collection-item';
import CommentItem from './CommentItem/CommentItem.component';
import Editor from './Editor';
import CommentsProps from './types';

function Comments({ itemId: id }: CommentsProps) {
  const { onToggle, isOpen } = useDisclosure();
  const {
    data: comments,
    isError,
    isLoading,
  } = useGetCommentsQuery(id || '', {
    skip: !id,
    pollingInterval: POOLING_INTERVAL,
  });

  if (isError) {
    return (
      <Alert status="error">
        <AlertIcon />
        There was an error on getting comments section
      </Alert>
    );
  }

  return (
    <Flex mt={5} direction="column" gap={5}>
      <Heading textAlign="center" as="h2" fontSize={30}>
        Comments
        <Button ml={2} onClick={onToggle}>
          {isOpen ? 'Close editor' : 'Add new ?'}
        </Button>
      </Heading>

      {isOpen && (
        <Box position="sticky" top={0} zIndex={1}>
          <Editor itemId={id} onToggle={onToggle} />
        </Box>
      )}

      {comments?.length === 0 ? (
        <Alert status="info">
          <InfoIcon mr={2} />
          There are no any comments
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
            comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          )}
        </VStack>
      )}
    </Flex>
  );
}

export default Comments;
