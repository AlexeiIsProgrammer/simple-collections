import {
  Avatar,
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { DEFAULT_COMMENT_IMAGE } from '@constants/index';
import { ROLE } from '@models/enums';
import CommentProps from './types';

function CommentItem({ comment }: CommentProps) {
  const { name, text, role } = comment;
  const [isLessThan576] = useMediaQuery('(max-width: 576px)');

  return (
    <Card w={isLessThan576 ? '100%' : '65vw'}>
      <CardHeader>
        <Flex flex="1" gap="4" alignItems="flex-start" flexWrap="wrap">
          <Avatar size="xs" name={name} src={DEFAULT_COMMENT_IMAGE} />
          <Box>
            <Heading size="sm">{name}</Heading>
            <Badge colorScheme={role === ROLE.ADMIN ? 'red' : 'green'}>
              {role}
            </Badge>
          </Box>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text dangerouslySetInnerHTML={{ __html: text }} />
      </CardBody>
    </Card>
  );
}

export default CommentItem;
