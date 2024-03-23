import { Alert, AlertIcon, Box, Link, List, ListItem } from '@chakra-ui/react';
import { useGetTagsQuery } from '@services/tag';
import { NavLink } from 'react-router-dom';
import styles from './TagsCloud.module.scss';

function TagsCloud() {
  const { data: tags, isLoading, isError } = useGetTagsQuery();

  if (isError) {
    return (
      <Alert status="error">
        <AlertIcon />
        There is an error on getting tags
      </Alert>
    );
  }

  return (
    <Box maxW="md">
      <List className={styles.list}>
        {tags?.map(({ id, name }) => (
          <ListItem className={styles.item} key={id}>
            <Link
              data-weight={Math.floor(Math.random() * 9)}
              className={styles.link}
              as={NavLink}
              to={`results/${id}`}
            >
              #{name}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default TagsCloud;
