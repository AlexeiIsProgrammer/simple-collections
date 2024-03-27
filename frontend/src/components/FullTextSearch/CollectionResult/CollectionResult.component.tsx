import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  GridItem,
  LinkBox,
  useColorMode,
} from '@chakra-ui/react';
import { COLLECTION_STATE } from '@models/enums';
import { useTranslation } from 'react-i18next';
import Markdown from 'react-markdown';
import { Link } from 'react-router-dom';
import styles from './CollectionResult.module.scss';
import CollectionResultProps from './types';

function CollectionResult({ collection, onClose }: CollectionResultProps) {
  const { id, name, category, description, image_url, user_id, customFields } =
    collection;
  const { t } = useTranslation();
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
          <Badge ml={2} title={t('fullTextSearch.category')}>
            {t(`category.${category}`)}
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

        {customFields?.length > 0 && customFields[0].id && (
          <CardFooter>
            {customFields.map((customField) => (
              <Badge
                key={customField.id}
                colorScheme={
                  customField.state === COLLECTION_STATE.BLOCKED
                    ? 'red'
                    : 'green'
                }
              >
                {customField.name}
              </Badge>
            ))}
          </CardFooter>
        )}
      </GridItem>
    </LinkBox>
  );
}

export default CollectionResult;
