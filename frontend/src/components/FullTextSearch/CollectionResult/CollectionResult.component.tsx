import Markdown from 'react-markdown';
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  GridItem,
  LinkBox,
  useColorMode,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import styles from './CollectionResult.module.scss';
import CollectionResultProps from './types';

function CollectionResult({ collection, onClose }: CollectionResultProps) {
  const { id, name, category, description, image_url, user_id } = collection;

  const { colorMode } = useColorMode();

  return (
    <LinkBox
      maxH="200px"
      overflow="hidden"
      as={Link}
      onClick={() => onClose()}
      to={`/collections/${user_id}/${id}`}
      className={styles.link}
    >
      <GridItem
        backgroundImage={image_url}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundBlendMode={colorMode === 'light' ? 'luminosity' : 'multiply'}
        borderRadius={28}
        as={Card}
      >
        <CardHeader color="white" fontSize={20}>
          {name}
          <Badge ml={2} title="category">
            {category}
          </Badge>
        </CardHeader>
        <CardBody
          color="white"
          pt={0}
          overflow="hidden"
          textOverflow="ellipsis"
        >
          <Markdown className={styles.description}>{description}</Markdown>
        </CardBody>
      </GridItem>
    </LinkBox>
  );
}

export default CollectionResult;
