import { DeleteIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
} from '@chakra-ui/react';
import EditInputField from '@components/EditInputField';
import Markdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import styles from './CollectionListItem.module.scss';
import CollectionItemProps from './types';

function CollectionListItem({
  item,
  deleteCollectionHandle,
  updateCollectionHandle,
}: CollectionItemProps) {
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
          <Heading
            title="Edit heading"
            size="md"
            onClick={(e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) =>
              e.stopPropagation()
            }
          >
            <Flex alignItems="center" flexWrap="wrap-reverse" gap={2}>
              <EditInputField
                type="input"
                initialValue={name}
                saveHandler={(value: string) =>
                  updateCollectionHandle(id, 'name', value)
                }
              />
              <Badge>{category}</Badge>
            </Flex>
          </Heading>

          <Markdown className={styles.description} remarkPlugins={[remarkGfm]}>
            {description}
          </Markdown>

          <IconButton
            className={styles.remove}
            onClick={(e) => {
              e.stopPropagation();
              deleteCollectionHandle(id);
            }}
            aria-label="Delete item"
            icon={<DeleteIcon />}
            title={`Delete the ${name}'s collection`}
            colorScheme="red"
          />
        </CardBody>
      </Stack>
    </Card>
  );
}

export default CollectionListItem;
