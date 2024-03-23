import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import CommentProps from './types';

function CommentItem({ comment }: CommentProps) {
  const { name, text } = comment;

  return (
    <Card w="65vw">
      <CardHeader>
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Box>
            <Heading size="sm">{name}</Heading>
            <Text>Common user</Text>
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
