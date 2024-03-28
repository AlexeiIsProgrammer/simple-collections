import { Alert, AlertIcon, Box, Link, List, ListItem } from '@chakra-ui/react';
import CustomSpinner from '@components/CustomSpinner';
import { useGetTagsQuery } from '@services/tag';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import styles from './TagsCloud.module.scss';

function TagsCloud() {
  const { t } = useTranslation();
  const { data: tags, isLoading, isError } = useGetTagsQuery();

  if (isError) {
    return (
      <Alert status="error">
        <AlertIcon />
        {t('tags.error')}
      </Alert>
    );
  }

  return (
    <Box maxW="lg">
      <List className={styles.list}>
        {isLoading ? (
          <CustomSpinner />
        ) : (
          tags?.map(({ id, name }) => (
            <ListItem title={name} className={styles.item} key={id}>
              <Link
                data-weight={Math.floor(Math.random() * 9)}
                className={styles.link}
                as={NavLink}
                to={`results/${id}`}
              >
                #{name}
              </Link>
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
}

export default TagsCloud;
