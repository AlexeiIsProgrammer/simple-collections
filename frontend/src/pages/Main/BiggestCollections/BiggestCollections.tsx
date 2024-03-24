import {
  Alert,
  AlertIcon,
  Box,
  Grid,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { useGetBiggestCollectionsQuery } from '@services/collection';
import CustomSpinner from '@components/CustomSpinner';

import BiggestItem from './BiggestItem';

function BiggestCollections() {
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
        There is an error on getting tags
      </Alert>
    );
  }

  return (
    <Box>
      <Text textAlign="center" fontSize={35}>
        Top-5 biggest collections
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
