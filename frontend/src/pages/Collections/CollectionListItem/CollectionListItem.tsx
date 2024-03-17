import {
  Badge,
  Box,
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
} from '@chakra-ui/react';
import Markdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import styles from './CollectionListItem.module.scss';
import CollectionItemProps from './types';

function CollectionListItem({ item }: CollectionItemProps) {
  const { name, description, image_url, category, id } = item;
  const { userId } = useParams();
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/collections/${userId}/${id}`)}
      title="See the collection"
      direction={{ base: 'column', sm: 'row' }}
      variant="outline"
      className={styles.item}
    >
      <Box overflow="hidden" maxW={{ base: '100%', sm: '200px' }}>
        <Image
          className={styles.image}
          objectFit="cover"
          src={image_url}
          alt="Caffe Latte"
        />
      </Box>

      <Stack>
        <CardBody>
          <Heading size="md">
            {name} <Badge ml={2}>{category}</Badge>
          </Heading>

          <Markdown remarkPlugins={[remarkGfm]}>{description}</Markdown>
        </CardBody>
      </Stack>
    </Card>
  );
}

export default CollectionListItem;
