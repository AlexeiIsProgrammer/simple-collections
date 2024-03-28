import {
  Alert,
  AlertIcon,
  Box,
  Grid,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import CustomSpinner from '@components/CustomSpinner';
import { useGetBiggestCollectionsQuery } from '@services/collection';
import { useTranslation } from 'react-i18next';

import BiggestItem from './BiggestItem';

function BiggestCollections() {
  const { t } = useTranslation();
  const [isLessThan1130] = useMediaQuery('(max-width: 1130px)');
  const [isLessThan576] = useMediaQuery('(max-width: 576px)');

  const {
    data: collections,
    isLoading,
    isError,
  } = useGetBiggestCollectionsQuery();

  if (isError) {
    return (
      <Alert status="error">
        <AlertIcon />
        {t('biggest.error')}
      </Alert>
    );
  }

  return (
    <Box>
      <Text textAlign="center" fontSize={35}>
        {collections && collections.length > 0
          ? t('biggest.top')
          : t('biggest.empty')}
      </Text>
      <Grid
        h="100%"
        gap={50}
        placeItems="center"
        templateColumns={`repeat(${isLessThan1130 ? (isLessThan576 ? 1 : 2) : 3}, 1fr)`}
      >
        {isLoading ? (
          <CustomSpinner />
        ) : (
          collections?.map((collection, ind) => (
            <BiggestItem key={collection.id} ind={ind} item={collection} />
          ))
        )}
      </Grid>
    </Box>
  );
}

export default BiggestCollections;
