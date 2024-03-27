import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Grid,
  GridItem,
  HStack,
  LinkBox,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { DEFAULT_COMMENT_IMAGE } from '@constants/index';
import { Link } from 'react-router-dom';
import styles from './CollectionResultItem.module.scss';
import CollectionResultItemProps from './types';

function CollectionResultItem({ item, onClose }: CollectionResultItemProps) {
  const { id, name, tags, user_id, collection_id, comments } = item;
  return (
    <LinkBox
      as={Link}
      onClick={() => onClose()}
      to={`collections/${user_id}/${collection_id}/${id}`}
      className={styles.link}
    >
      <Card className={styles.card} size="md">
        <div className={styles.lines} />
        <div className={styles.angles} />

        <Grid zIndex={1} templateColumns="1fr 1fr">
          <GridItem>
            <CardHeader>{name}</CardHeader>
            {tags?.length > 0 && tags[0].id && (
              <CardBody>
                <HStack wrap="wrap" gap={2}>
                  {tags.map((tag) => (
                    <Tag key={tag.id}>{tag.name}</Tag>
                  ))}
                </HStack>
              </CardBody>
            )}
          </GridItem>
          <GridItem maxHeight={200} overflow="auto">
            {comments?.length > 0 && comments[0].id && (
              <VStack>
                {comments.map((comment) => (
                  <Flex
                    key={comment.id}
                    p={2}
                    background="gray.500"
                    borderRadius={10}
                    m={2}
                  >
                    <Avatar
                      mr={2}
                      size="xs"
                      name={name}
                      src={DEFAULT_COMMENT_IMAGE}
                    />
                    <Text dangerouslySetInnerHTML={{ __html: comment.text }} />
                  </Flex>
                ))}
              </VStack>
            )}
          </GridItem>
        </Grid>
      </Card>
    </LinkBox>
  );
}

export default CollectionResultItem;
