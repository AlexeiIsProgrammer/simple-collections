import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  LinkBox,
  Tag,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import styles from './CollectionResultItem.module.scss';
import CollectionResultItemProps from './types';

function CollectionResultItem({ item }: CollectionResultItemProps) {
  const { id, name, tags, user_id, collection_id } = item;
  return (
    <LinkBox
      as={Link}
      to={`collections/${user_id}/${collection_id}/${id}`}
      className={styles.link}
    >
      <Card className={styles.card} size="md">
        <div className={styles.lines} />
        <div className={styles.angles} />
        <CardHeader>{name}</CardHeader>
        {tags.length > 0 && (
          <CardBody>
            <HStack gap={2}>
              {tags.map((tag) => (
                <Tag key={tag.id}>{tag.name}</Tag>
              ))}
            </HStack>
          </CardBody>
        )}
      </Card>
    </LinkBox>
  );
}

export default CollectionResultItem;
