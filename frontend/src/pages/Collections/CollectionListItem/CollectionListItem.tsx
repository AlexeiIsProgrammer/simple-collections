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
  useBoolean,
} from '@chakra-ui/react';
import EditInputField from '@components/EditInputField';
import { useTranslation } from 'react-i18next';
import Markdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import styles from './CollectionListItem.module.scss';
import CollectionItemProps from './types';
import { useEffect, useState } from 'react';

function CollectionListItem({
  item,
  deleteCollectionHandle,
  updateCollectionHandle,
}: CollectionItemProps) {
  const { t } = useTranslation();
  const { name, description, image_url, category, id } = item;
  const { userId } = useParams();
  const navigate = useNavigate();

  const [hasImageLoaded, { on }] = useBoolean(false);

  return (
    <Card
      onClick={() => navigate(`/collections/${userId}/${id}`)}
      title={t('collection.see')}
      direction={{ base: 'column', sm: 'row' }}
      variant="outline"
      className={styles.item}
    >
      <Box overflow="hidden" maxW={{ base: '100%', sm: '200px' }}>
        <Image
          onLoad={() => on()}
          className={styles.image}
          objectFit="cover"
          src={hasImageLoaded ? image_url : 'https://i.gifer.com/GzgM.gif'}
          alt="Collection Item"
        />
      </Box>

      <Stack>
        <CardBody>
          <Heading
            title={t('collection.edit')}
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
              <Badge>{t(`category.${category}`)}</Badge>
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
            title={t('collection.delete', { name })}
            colorScheme="red"
          />
        </CardBody>
      </Stack>
    </Card>
  );
}

export default CollectionListItem;
